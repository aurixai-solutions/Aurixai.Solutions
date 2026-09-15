#!/bin/bash

# ==========================================
# Aurix AI Solutions - Production Deployment Script
# ==========================================
# Purpose: Deploy Figma Make static site to web hosting
# Usage: ./deploy.sh
# Prerequisites: 
#   - aurix_site.zip in the same directory as this script
#   - Root or sudo access to target web directory
#   - unzip utility installed
# ==========================================

set -e  # Exit on any error

# ────────────────────────────────────────────────────────────
# Configuration
# ────────────────────────────────────────────────────────────

TARGET_DIR="/var/www/aurixai.solutions"
ZIP_FILE="aurix_site.zip"
BACKUP_DIR="/var/www/aurix_backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.tar.gz"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ZIP_PATH="${SCRIPT_DIR}/${ZIP_FILE}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ────────────────────────────────────────────────────────────
# Helper Functions
# ────────────────────────────────────────────────────────────

log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# ────────────────────────────────────────────────────────────
# Pre-flight Checks
# ────────────────────────────────────────────────────────────

log_info "Aurix AI Solutions - Starting Deployment"
echo "════════════════════════════════════════════════════════"

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    log_warning "Not running as root. You may need sudo privileges."
    echo "Run with: sudo ./deploy.sh"
fi

# Check if zip file exists
if [ ! -f "$ZIP_PATH" ]; then
    log_error "Deployment archive not found: $ZIP_PATH"
    echo ""
    echo "Please ensure $ZIP_FILE is in the current directory:"
    echo "  $(pwd)"
    echo ""
    echo "To create the archive from your Figma Make project:"
    echo "  1. Export your site as static HTML"
    echo "  2. Create archive: zip -r aurix_site.zip dist/*"
    echo "  3. Upload to server and run this script"
    exit 1
fi

log_success "Deployment archive found: $ZIP_PATH"

# Check for unzip utility
if ! command -v unzip >/dev/null 2>&1; then
    log_error "'unzip' command not found"
    echo ""
    echo "Install with:"
    echo "  Ubuntu/Debian: sudo apt install unzip"
    echo "  CentOS/RHEL:   sudo yum install unzip"
    echo "  macOS:         brew install unzip"
    exit 1
fi

log_success "Required utilities found"

# ────────────────────────────────────────────────────────────
# Backup Existing Installation
# ────────────────────────────────────────────────────────────

if [ -d "$TARGET_DIR" ] && [ "$(ls -A $TARGET_DIR 2>/dev/null)" ]; then
    log_info "Backing up existing installation..."
    
    # Create backup directory if it doesn't exist
    mkdir -p "$BACKUP_DIR"
    
    # Create compressed backup
    tar -czf "$BACKUP_FILE" -C "$TARGET_DIR" . 2>/dev/null || {
        log_warning "Backup creation failed, but continuing with deployment"
    }
    
    if [ -f "$BACKUP_FILE" ]; then
        log_success "Backup created: $BACKUP_FILE"
        
        # Keep only last 5 backups
        log_info "Cleaning old backups (keeping last 5)..."
        cd "$BACKUP_DIR"
        ls -t backup_*.tar.gz | tail -n +6 | xargs rm -f 2>/dev/null || true
        cd - >/dev/null
    fi
else
    log_info "No existing installation found - performing fresh deployment"
fi

# ────────────────────────────────────────────────────────────
# Prepare Target Directory
# ────────────────────────────────────────────────────────────

log_info "Preparing target directory: $TARGET_DIR"

# Create directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Clear existing files (except .htaccess if it exists)
if [ -f "$TARGET_DIR/.htaccess" ]; then
    cp "$TARGET_DIR/.htaccess" "/tmp/.htaccess.backup" 2>/dev/null || true
    log_info "Preserving existing .htaccess file"
fi

# Remove old files
find "$TARGET_DIR" -mindepth 1 -maxdepth 1 ! -name '.htaccess' -exec rm -rf {} + 2>/dev/null || true

log_success "Target directory prepared"

# ────────────────────────────────────────────────────────────
# Extract Deployment Files
# ────────────────────────────────────────────────────────────

log_info "Extracting files from $ZIP_FILE..."

# Safety: copy zip to /tmp before cleaning target directory
TMP_ZIP="/tmp/aurix_deploy_${TIMESTAMP}.zip"
cp "$ZIP_PATH" "$TMP_ZIP"
log_success "Archive copied to $TMP_ZIP for safe extraction"

unzip -o "$TMP_ZIP" -d "$TARGET_DIR" >/dev/null 2>&1

log_success "Files extracted successfully"

# Clean up temp zip
rm -f "$TMP_ZIP"

# ────────────────────────────────────────────────────────────
# Create/Update .htaccess
# ────────────────────────────────────────────────────────────

log_info "Configuring .htaccess..."

cat > "$TARGET_DIR/.htaccess" << 'HTACCESS_EOF'
# ==========================================
# Aurix AI Solutions - Apache Configuration
# ==========================================

# Enable RewriteEngine
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Force HTTPS (uncomment if SSL is configured)
    # RewriteCond %{HTTPS} off
    # RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

    # Remove www prefix (or add it - choose one)
    # RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
    # RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

    # React Router / SPA support
    # Redirect all requests to index.html except existing files
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-l
    RewriteRule . /index.html [L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
    # Prevent clickjacking
    Header set X-Frame-Options "SAMEORIGIN"
    
    # XSS Protection
    Header set X-XSS-Protection "1; mode=block"
    
    # Prevent MIME sniffing
    Header set X-Content-Type-Options "nosniff"
    
    # Referrer Policy
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    
    # Content Security Policy (adjust as needed)
    # Header set Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:;"
</IfModule>

# Caching Rules
<IfModule mod_expires.c>
    ExpiresActive On
    
    # Default expiration
    ExpiresDefault "access plus 1 week"
    
    # HTML
    ExpiresByType text/html "access plus 0 seconds"
    
    # CSS and JavaScript
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType application/x-javascript "access plus 1 year"
    
    # Images
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
    
    # Fonts
    ExpiresByType font/ttf "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType application/font-woff "access plus 1 year"
    
    # Other
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType application/json "access plus 0 seconds"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css text/xml text/javascript
    AddOutputFilterByType DEFLATE application/xml application/xhtml+xml application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript application/x-javascript
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# Protect sensitive files
<FilesMatch "\.(htaccess|htpasswd|ini|log|sh|sql|conf|bak)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# Disable directory browsing
Options -Indexes

# Custom error pages (optional - create these files in your project)
# ErrorDocument 404 /404.html
# ErrorDocument 500 /500.html

# Character encoding
AddDefaultCharset UTF-8

# Prevent access to hidden files
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>
HTACCESS_EOF

log_success ".htaccess configured"

# ────────────────────────────────────────────────────────────
# Set Permissions
# ────────────────────────────────────────────────────────────

log_info "Setting file permissions..."

# Directories: 755 (rwxr-xr-x)
find "$TARGET_DIR" -type d -exec chmod 755 {} \; 2>/dev/null

# Files: 644 (rw-r--r--)
find "$TARGET_DIR" -type f -exec chmod 644 {} \; 2>/dev/null

# Special: Make .htaccess read-only
chmod 444 "$TARGET_DIR/.htaccess" 2>/dev/null || true

log_success "Permissions set"

# ────────────────────────────────────────────────────────────
# Admin Panel Configuration
# ────────────────────────────────────────────────────────────

if [ -f "$TARGET_DIR/admin/index.html" ]; then
    log_info "Found admin panel iframe configuration"
    log_warning "Remember to update ADMIN_PANEL_URL in /admin/index.html"
    echo "  Edit: $TARGET_DIR/admin/index.html"
    echo "  Set: ADMIN_PANEL_URL to your Figma Make admin panel URL"
fi

# ────────────────────────────────────────────────────────────
# Verification
# ────────────────────────────────────────────────────────────

log_info "Verifying deployment..."

if [ -f "$TARGET_DIR/index.html" ]; then
    log_success "index.html found"
else
    log_error "index.html not found!"
    log_warning "The deployment may be incomplete. Check the zip file structure."
    exit 1
fi

# Check for common assets
ASSET_CHECKS=("assets" "index.html")
for asset in "${ASSET_CHECKS[@]}"; do
    if [ -e "$TARGET_DIR/$asset" ]; then
        log_success "Found: $asset"
    else
        log_warning "Missing: $asset (may be expected depending on build)"
    fi
done

# ────────────────────────────────────────────────────────────
# Final Report
# ────────────────────────────────────────────────────────────

echo ""
echo "════════════════════════════════════════════════════════"
log_success "Deployment Complete!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📍 Installation Path: $TARGET_DIR"
echo "🌐 Your site should now be live"
echo ""

if [ -f "$BACKUP_FILE" ]; then
    echo "💾 Backup saved to: $BACKUP_FILE"
    echo ""
fi

echo "Next Steps:"
echo "  1. Visit your domain to verify the site loads correctly"
echo "  2. Test the admin panel at: yourdomain.com/admin"
echo "  3. Configure the admin panel URL in /admin/index.html"
echo "  4. Test all routes and functionality"
echo "  5. Enable HTTPS if not already active (recommended)"
echo ""

if [ -f "$TARGET_DIR/admin/index.html" ]; then
    echo "⚙️  Admin Panel Configuration:"
    echo "  File: $TARGET_DIR/admin/index.html"
    echo "  Update: ADMIN_PANEL_URL = 'your-figma-make-url/admin'"
    echo ""
fi

echo "Troubleshooting:"
echo "  • If routes don't work, verify mod_rewrite is enabled:"
echo "    sudo a2enmod rewrite && sudo systemctl restart apache2"
echo "  • If files don't load, check file permissions"
echo "  • If admin panel doesn't work, update the iframe URL"
echo "  • Check Apache error logs: tail -f /var/log/apache2/error.log"
echo ""

log_info "To rollback to previous version:"
echo "  cd $BACKUP_DIR"
echo "  tar -xzf backup_TIMESTAMP.tar.gz -C $TARGET_DIR"
echo ""

echo "════════════════════════════════════════════════════════"

# Optional: Restart web server
read -p "Restart Apache web server now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log_info "Restarting Apache..."
    if command -v systemctl >/dev/null 2>&1; then
        sudo systemctl restart apache2 2>/dev/null || sudo systemctl restart httpd 2>/dev/null || {
            log_warning "Could not restart web server automatically"
        }
    elif command -v service >/dev/null 2>&1; then
        sudo service apache2 restart 2>/dev/null || sudo service httpd restart 2>/dev/null || {
            log_warning "Could not restart web server automatically"
        }
    else
        log_warning "Could not determine how to restart web server"
    fi
    log_success "Web server restart complete"
fi

exit 0