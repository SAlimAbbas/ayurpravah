#!/bin/bash
# =============================================================================
# Automated Deployment Script for AYURPRAVAH 2027 (ayurpravah.com)
# Builds React frontend locally, uploads to Hostinger, runs migrations & cache
# =============================================================================
set -e

# Load configuration
if [ -f "deploy-config.sh" ]; then
    source deploy-config.sh
else
    echo "❌ deploy-config.sh not found!"
    echo "👉 Please copy deploy-config.sh.example to deploy-config.sh and configure your SSH credentials."
    exit 1
fi

echo "========================================================="
echo "🚀 Deploying AYURPRAVAH 2027 to ${SSH_HOST}..."
echo "========================================================="

# 1. Build React frontend locally (saves server RAM & avoids Hostinger OOM)
echo "🔨 Step 1/4: Building React frontend locally (npm run build)..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Local build failed! Aborting deployment."
    exit 1
fi
echo "✅ Local build completed successfully!"

# 2. Package AYURPRAVAH files (excluding heavy local dev files)
echo "📦 Step 2/4: Creating deployment archive..."
tar --exclude='node_modules' \
    --exclude='.git' \
    --exclude='.env' \
    --exclude='deploy-*.sh' \
    --exclude='deploy-*.ps1' \
    --exclude='storage/logs/*' \
    --exclude='storage/framework/cache/data/*' \
    --exclude='storage/framework/sessions/*' \
    --exclude='storage/framework/views/*' \
    -czf ayurpravah-deploy.tar.gz .

if [ ! -f "ayurpravah-deploy.tar.gz" ]; then
    echo "❌ Failed to create deployment archive!"
    exit 1
fi
echo "✅ Archive created (ayurpravah-deploy.tar.gz)"

# 3. Upload archive to Hostinger over SSH
echo "📤 Step 3/4: Uploading archive to Hostinger server (${SSH_USER}@${SSH_HOST}:${SSH_PORT})..."
scp -P ${SSH_PORT} ayurpravah-deploy.tar.gz ${SSH_USER}@${SSH_HOST}:~/ayurpravah-deploy.tar.gz
rm -f ayurpravah-deploy.tar.gz
echo "✅ Upload complete!"

# 4. Server-side setup via SSH
echo "⚙️  Step 4/4: Extracting and configuring AYURPRAVAH on Hostinger server..."
ssh -p ${SSH_PORT} ${SSH_USER}@${SSH_HOST} << ENDSSH
set -e

TARGET_DIR="${REMOTE_DIR}"
echo "Navigating to: \$TARGET_DIR"
mkdir -p "\$TARGET_DIR"
cd "\$TARGET_DIR"

# Backup production .env if already present on server
if [ -f ".env" ]; then
    cp .env .env.backup
fi

# Extract new release
echo "Extracting release files..."
tar -xzf ~/ayurpravah-deploy.tar.gz
rm -f ~/ayurpravah-deploy.tar.gz

# Remove Hostinger default placeholder page if present
rm -f default.php

# Detect PHP 8.3 binary on Hostinger or fallback to system php
PHP_BIN="php"
if [ -f "/opt/alt/php83/usr/bin/php" ]; then
    PHP_BIN="/opt/alt/php83/usr/bin/php"
elif command -v php8.3 >/dev/null 2>&1; then
    PHP_BIN="php8.3"
fi
echo "Using PHP binary: \$(\$PHP_BIN -v | head -n 1)"

# Detect Composer binary
if [ -f "/usr/local/bin/composer" ]; then
    COMPOSER_CMD="\$PHP_BIN /usr/local/bin/composer"
else
    COMPOSER_CMD="\$PHP_BIN \$(which composer)"
fi

# Restore .env if backup exists, otherwise use .env.production
if [ -f ".env.backup" ]; then
    mv .env.backup .env
elif [ -f ".env.production" ]; then
    echo "Configuring .env from .env.production..."
    cp .env.production .env
fi

# Install production composer dependencies
echo "Installing Composer dependencies..."
\$COMPOSER_CMD install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Generate app key if needed
\$PHP_BIN artisan key:generate --force 2>/dev/null || true

# Create storage symlink for uploaded images & media
echo "Creating storage symlink..."
\$PHP_BIN artisan storage:link || true

# Run database migrations
echo "Running database migrations..."
\$PHP_BIN artisan migrate --force

# Seed initial database records (roles, conclaves, default admin, etc.)
echo "Seeding initial conclaves, settings & admin account..."
\$PHP_BIN artisan db:seed --force

# Optimize Laravel cache for high performance
echo "Caching configurations, routes, and views..."
\$PHP_BIN artisan config:cache
\$PHP_BIN artisan route:cache
\$PHP_BIN artisan view:cache

# Set permissions for storage & cache
echo "Securing directory permissions..."
chmod -R 775 storage bootstrap/cache


echo "========================================================="
echo "✅ AYURPRAVAH 2027 Deployment finished successfully!"
echo "🌐 Visit: https://ayurpravah.com"
echo "🔐 Admin: https://ayurpravah.com/admin"
echo "========================================================="
ENDSSH
