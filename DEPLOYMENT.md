# Aurix AI Solutions - Deployment Guide

This guide covers deploying your Figma Make site to your own web hosting and integrating the admin panel via iframe.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Deployment to Web Hosting](#deployment-to-web-hosting)
4. [Admin Panel Integration](#admin-panel-integration)
5. [Offline Resilience](#offline-resilience)
6. [Troubleshooting](#troubleshooting)

---

## Overview

Your Aurix AI Solutions site is built with:
- **Frontend**: React + TypeScript static site (Figma Make)
- **Backend**: Supabase Edge Functions + PostgreSQL
- **Admin**: Hosted on Figma Make, embeddable via iframe

The architecture ensures:
- ✅ Content continues serving even if admin connection is lost
- ✅ Admin panel appears on your domain (e.g., `aurixai.solutions/admin`)
- ✅ Seamless experience for demos and presentations

---

## Prerequisites

Before deployment, ensure you have:

- [ ] Access to your web hosting server (SSH/FTP/cPanel)
- [ ] Root or sudo access (for Apache configuration)
- [ ] Apache web server with `mod_rewrite` enabled
- [ ] `unzip` utility installed on server
- [ ] Your Figma Make admin panel URL
- [ ] Supabase project configured with API keys

---

## Deployment to Web Hosting

### Step 1: Export Your Site

1. In Figma Make, export your site as a static build
2. Download the resulting `dist` folder
3. Create a zip archive:
   ```bash
   cd dist
   zip -r ../aurix_site.zip .
   ```

### Step 2: Upload to Server

Upload both files to your server:
- `aurix_site.zip`
- `deploy.sh`

```bash
# Example using scp
scp aurix_site.zip deploy.sh user@yourserver.com:~/
```

### Step 3: Run Deployment Script

SSH into your server and run:

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
sudo ./deploy.sh
```

The script will:
1. ✅ Back up existing installation
2. ✅ Extract files to `/var/www/aurixai.solutions/public_html`
3. ✅ Create/update `.htaccess` with proper configuration
4. ✅ Set correct file permissions
5. ✅ Verify deployment

### Step 4: Verify Deployment

1. Visit your domain: `https://aurixai.solutions`
2. Test navigation and routes
3. Check admin panel: `https://aurixai.solutions/admin`

---

## Admin Panel Integration

Your site includes an iframe-based admin panel at `/admin/index.html` that embeds your Figma Make admin panel while appearing to stay on your domain.

### Configuration

1. **Locate the admin iframe file:**
   ```bash
   /var/www/aurixai.solutions/public_html/admin/index.html
   ```

2. **Update the admin panel URL:**

   Open `/admin/index.html` and find this line (around line 99):
   ```javascript
   const ADMIN_PANEL_URL = 'REPLACE_WITH_YOUR_FIGMA_MAKE_ADMIN_URL/admin';
   ```

   Replace with your actual Figma Make URL:
   ```javascript
   const ADMIN_PANEL_URL = 'https://your-project.figma.com/admin';
   ```

3. **Save and test:**
   Visit `https://aurixai.solutions/admin` to verify the iframe loads correctly.

### How It Works

The iframe implementation provides:

- **Seamless Integration**: Admin panel appears at `yourdomain.com/admin`
- **Loading States**: Shows spinner while admin panel loads
- **Error Handling**: Displays helpful error messages if connection fails
- **Offline Detection**: Warns users if network connection is lost
- **Retry Mechanism**: Automatic retry with exponential backoff

### Security Considerations

The iframe uses the `sandbox` attribute with these permissions:
- `allow-same-origin`: Required for iframe to function
- `allow-scripts`: Enables admin panel interactivity
- `allow-forms`: Allows form submissions
- `allow-popups`: For modals and dialogs
- `allow-modals`: For confirmation dialogs

### Cross-Origin Communication (Optional)

The iframe includes message passing support. Your admin panel can send status updates:

```javascript
// In your Figma Make admin panel
window.parent.postMessage({ type: 'admin-ready' }, '*');
```

The iframe will respond to:
- `admin-ready`: Hides loading spinner
- `admin-error`: Shows error message

---

## Offline Resilience

### How It Works

Your architecture ensures uninterrupted service:

1. **Static Content**: HTML/CSS/JS served directly from your web server
2. **Dynamic Content**: Cached in browser and served from KV store
3. **Admin Panel**: If connection fails, site continues serving existing content
4. **Automatic Recovery**: When connection resumes, admin updates flow through

### What Happens During Downtime

| Component | Behavior |
|-----------|----------|
| **Public Site** | ✅ Continues serving normally |
| **Navigation** | ✅ All routes remain functional |
| **Content** | ✅ Last-fetched content displayed |
| **Admin Panel** | ⚠️ Shows "offline" message |
| **Form Submissions** | ⚠️ Queue locally (if implemented) |

### Testing Offline Mode

1. Deploy your site normally
2. Disconnect your Figma Make/Supabase connection
3. Verify public site remains accessible
4. Check admin panel shows appropriate offline message

---

## Troubleshooting

### Routes Return 404

**Problem**: Direct navigation to routes like `/solutions` returns 404

**Solution**: Enable Apache `mod_rewrite`

```bash
# Enable mod_rewrite
sudo a2enmod rewrite

# Restart Apache
sudo systemctl restart apache2
```

Verify `.htaccess` contains:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Admin Panel Won't Load

**Problem**: Iframe shows error or infinite loading

**Causes & Solutions**:

1. **Incorrect URL**
   - Check `ADMIN_PANEL_URL` in `/admin/index.html`
   - Ensure URL includes `/admin` path
   - Verify URL is accessible in a regular browser

2. **CORS Issues**
   - Figma Make should allow iframe embedding
   - Check browser console for CORS errors
   - Contact Figma Make support if needed

3. **Browser Restrictions**
   - Some browsers block mixed content (HTTP iframe in HTTPS page)
   - Ensure both your site and admin panel use HTTPS

4. **Network/Firewall**
   - Verify your server can reach Figma Make's servers
   - Check firewall rules allow outbound HTTPS

### API Keys Not Working

**Problem**: Forms don't send emails or AI research fails

**Solution**: Configure API keys in Supabase

1. Go to Supabase Dashboard: `https://supabase.com/dashboard/project/YOUR_PROJECT_ID`
2. Navigate to: **Edge Functions** → **Secrets**
3. Add secrets:
   - `RESEND_API_KEY`: Get from [resend.com/api-keys](https://resend.com/api-keys)
   - `ANTHROPIC_API_KEY`: Get from [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
4. Wait 1-2 minutes for propagation
5. Run diagnostics in Admin Panel → Diagnostics tab

### Permissions Errors

**Problem**: Files or directories not accessible

**Solution**: Set correct permissions

```bash
# Fix permissions
cd /var/www/aurixai.solutions/public_html
sudo find . -type d -exec chmod 755 {} \;
sudo find . -type f -exec chmod 644 {} \;

# Fix ownership (replace www-data with your web server user)
sudo chown -R www-data:www-data .
```

### Admin Panel URL Configuration

**Problem**: "Admin panel URL not configured" error

**Solution**: Edit `/admin/index.html` and replace placeholder:

```javascript
// ❌ Wrong - leaves placeholder
const ADMIN_PANEL_URL = 'REPLACE_WITH_YOUR_FIGMA_MAKE_ADMIN_URL/admin';

// ✅ Correct - actual URL
const ADMIN_PANEL_URL = 'https://make.figma.com/projects/abc123/admin';
```

### Mixed Content Warnings

**Problem**: Browser blocks iframe due to mixed content (HTTPS page loading HTTP iframe)

**Solution**:
1. Ensure your site uses HTTPS (Let's Encrypt/SSL certificate)
2. Ensure Figma Make admin panel uses HTTPS
3. Update all URLs to use `https://`

### Check Apache Logs

For any unexplained issues:

```bash
# Error log
tail -f /var/log/apache2/error.log

# Access log
tail -f /var/log/apache2/access.log
```

---

## Advanced Configuration

### Custom Domain for Admin Panel

To use a subdomain like `admin.aurixai.solutions`:

1. **Create subdomain in DNS:**
   ```
   admin.aurixai.solutions → CNAME → yourdomain.com
   ```

2. **Update Apache virtual host:**
   ```apache
   <VirtualHost *:443>
       ServerName admin.aurixai.solutions
       DocumentRoot /var/www/aurixai.solutions/public_html/admin
       
       # SSL configuration
       SSLEngine on
       SSLCertificateFile /path/to/cert.pem
       SSLCertificateKeyFile /path/to/key.pem
   </VirtualHost>
   ```

3. **Restart Apache:**
   ```bash
   sudo systemctl restart apache2
   ```

### Deployment Rollback

If something goes wrong, restore from backup:

```bash
# List backups
ls -lh /var/www/aurixai.solutions/backups/

# Restore specific backup
cd /var/www/aurixai.solutions/backups/
tar -xzf backup_20250224_143022.tar.gz -C /var/www/aurixai.solutions/public_html/

# Restart Apache
sudo systemctl restart apache2
```

### Automated Deployments

For CI/CD integration, the `deploy.sh` script can be called from automation:

```bash
# Example GitHub Actions workflow
- name: Deploy to production
  run: |
    scp aurix_site.zip deploy.sh user@server:/tmp/
    ssh user@server 'cd /tmp && sudo ./deploy.sh'
```

---

## Support

For issues specific to:
- **Figma Make**: Contact Figma support
- **Supabase**: Check [Supabase documentation](https://supabase.com/docs)
- **Deployment**: Review Apache/server logs
- **This project**: Check the troubleshooting section above

---

## Maintenance Checklist

### Weekly
- [ ] Check Apache logs for errors
- [ ] Verify admin panel loads correctly
- [ ] Test form submissions

### Monthly
- [ ] Review and clean old backups
- [ ] Update SSL certificates (if using Let's Encrypt)
- [ ] Check API key validity in Diagnostics panel
- [ ] Test offline resilience

### As Needed
- [ ] Deploy content updates via Admin panel
- [ ] Update Figma Make URL if it changes
- [ ] Monitor Supabase usage/quota

---

**Last Updated**: February 24, 2025

---

© 2025 Aurix AI Solutions. All rights reserved.
