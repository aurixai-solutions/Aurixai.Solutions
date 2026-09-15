# Aurix AI Solutions Deployment Guide

## 1. Local Preparation (Run on your computer)

1.  Download the project source code.
2.  Open a terminal in the project directory.
3.  Run the build script:
    ```bash
    chmod +x build_and_zip.sh
    ./build_and_zip.sh
    ```
    This will create a `aurix_site.zip` file containing the optimized production build.

    *Note: If you are on Windows, you can manually zip the contents of the `dist` folder into `aurix_site.zip`.*

## 2. Server Deployment (Run on your Unix host)

1.  Upload `aurix_site.zip` and `deploy.sh` to your server.
2.  SSH into your server and navigate to where you uploaded the files.
3.  Make the script executable:
    ```bash
    chmod +x deploy.sh
    ```
4.  Run the deployment script:
    ```bash
    ./deploy.sh
    ```
    The script will:
    - Check for `aurix_site.zip`
    - Create the target directory `/var/www/aurixai.solutions/public_html` if needed
    - Extract the files
    - Set correct permissions (755 for folders, 644 for files)

## 3. Post-Deployment (Content Updates)

-   **Admin Panel:** Continue to use the Admin Panel at `/admin` (connected to Supabase).
-   **Export Content:** When you make changes in the Admin Panel, click "Export JSON".
-   **Update Site:** Upload the downloaded `content.json` file to `/var/www/aurixai.solutions/public_html/content.json` on your server.
    -   Your site will automatically pick up the new content without needing a rebuild.
