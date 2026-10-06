# =============================================================================
# Automated Windows PowerShell Deployment Script for AYURPRAVAH 2027
# =============================================================================
$ErrorActionPreference = "Stop"

# Load configuration from deploy-config.sh if present
$SSH_HOST = "ayurpravah.com"
$SSH_USER = "u597814446"
$SSH_PORT = "65002"
$REMOTE_DIR = "domains/ayurpravah.com/public_html"

if (Test-Path "deploy-config.sh") {
    $lines = Get-Content "deploy-config.sh"
    foreach ($line in $lines) {
        if ($line -match '^SSH_HOST="(.*)"') { $SSH_HOST = $matches[1] }
        if ($line -match '^SSH_USER="(.*)"') { $SSH_USER = $matches[1] }
        if ($line -match '^SSH_PORT="(.*)"') { $SSH_PORT = $matches[1] }
        if ($line -match '^REMOTE_DIR="(.*)"') { $REMOTE_DIR = $matches[1] }
    }
}

Write-Host "=========================================================" -ForegroundColor Green
Write-Host "🚀 Deploying AYURPRAVAH 2027 to $SSH_HOST via PowerShell..." -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Green

# 1. Build React frontend locally
Write-Host "🔨 Step 1/4: Building React frontend locally (npm run build)..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Local build failed! Aborting deployment." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Local build completed!" -ForegroundColor Green

# 2. Package archive using native Windows tar
Write-Host "📦 Step 2/4: Creating deployment archive..." -ForegroundColor Cyan
if (Test-Path "ayurpravah-deploy.tar.gz") { Remove-Item "ayurpravah-deploy.tar.gz" -Force }
tar --exclude="node_modules" `
    --exclude=".git" `
    --exclude=".env" `
    --exclude="deploy-*.sh" `
    --exclude="deploy-*.ps1" `
    --exclude="storage/logs/*" `
    --exclude="storage/framework/cache/data/*" `
    --exclude="storage/framework/sessions/*" `
    --exclude="storage/framework/views/*" `
    -czf ayurpravah-deploy.tar.gz .

if (-not (Test-Path "ayurpravah-deploy.tar.gz")) {
    Write-Host "❌ Failed to create deployment archive!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Archive created!" -ForegroundColor Green

# 3. Upload archive to Hostinger
Write-Host "📤 Step 3/4: Uploading archive to Hostinger ($SSH_USER@$SSH_HOST)..." -ForegroundColor Cyan
scp -P $SSH_PORT ayurpravah-deploy.tar.gz "${SSH_USER}@${SSH_HOST}:~/ayurpravah-deploy.tar.gz"
Remove-Item "ayurpravah-deploy.tar.gz" -Force
Write-Host "✅ Upload complete!" -ForegroundColor Green

# 4. Remote extraction & configuration
Write-Host "⚙️ Step 4/4: Executing remote configuration over SSH..." -ForegroundColor Cyan

$remoteCommands = @"
set -e
mkdir -p $REMOTE_DIR
cd $REMOTE_DIR

if [ -f ".env" ]; then
    cp .env .env.backup
fi

tar -xzf ~/ayurpravah-deploy.tar.gz
rm -f ~/ayurpravah-deploy.tar.gz

if [ -f ".env.backup" ]; then
    mv .env.backup .env
elif [ -f ".env.production" ]; then
    cp .env.production .env
fi

composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
php artisan key:generate --force 2>/dev/null || true
php artisan storage:link || true
php artisan migrate --force
php artisan db:seed --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
chmod -R 775 storage bootstrap/cache

echo "DEPLOY_COMPLETE"
"@

ssh -p $SSH_PORT "${SSH_USER}@${SSH_HOST}" $remoteCommands

Write-Host "=========================================================" -ForegroundColor Green
Write-Host "✅ Deployment finished successfully!" -ForegroundColor Green
Write-Host "🌐 Visit: https://ayurpravah.com" -ForegroundColor Cyan
Write-Host "🔐 Admin: https://ayurpravah.com/admin" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Green
