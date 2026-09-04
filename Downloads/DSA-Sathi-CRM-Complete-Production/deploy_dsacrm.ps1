# ============================================================
#   LoanPilot CRM — Hostinger Production Deployment Script
#   Target Subdomain : dsacrm.empireitxpert.in
#   Document Root    : /home/u490416745/domains/empireitxpert.in/public_html/dsacrm
#   Hostinger Server : u490416745@147.93.17.245 port 65002
# ============================================================

$ErrorActionPreference = "Stop"

$PROJECT_ROOT = 'c:\Users\Asus\Downloads\DSA-Sathi-CRM-Complete-Production'
$ZIP_FILE     = "$PROJECT_ROOT\dsacrm-production-build.zip"
$USER         = 'u490416745'
$IP           = '147.93.17.245'
$PORT         = '65002'
$REMOTE_DIR   = '/home/u490416745/domains/empireitxpert.in/public_html/dsacrm'
$SSH_OPTS     = @('-p', $PORT, '-o', 'StrictHostKeyChecking=accept-new', '-o', 'ConnectTimeout=30')

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  LoanPilot CRM - Hostinger Production Deployment" -ForegroundColor Cyan
Write-Host "  Source Package : $ZIP_FILE" -ForegroundColor White
Write-Host "  Target Server  : ${USER}@${IP}:${REMOTE_DIR}" -ForegroundColor White
Write-Host "  Live Domain    : https://dsacrm.empireitxpert.in" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "You will be prompted for your Hostinger SSH password." -ForegroundColor Yellow
Write-Host ""

# STEP 1: Create remote subdomain directory & backup existing
Write-Host "[1/4] Preparing remote subdomain directory..." -ForegroundColor Magenta
$remotePrepCmd = "mkdir -p $REMOTE_DIR && if [ -f $REMOTE_DIR/index.html ]; then echo Backing up existing files...; tar -czf ~/backup_dsacrm_`$(date +%Y%m%d_%H%M%S).tar.gz -C $REMOTE_DIR . 2>/dev/null && echo Backup complete.; else echo Initial deployment.; fi && echo PREP_DONE"
& ssh @SSH_OPTS "${USER}@${IP}" $remotePrepCmd
Write-Host ""

# STEP 2: Upload deployment package
Write-Host "[2/4] Uploading dsacrm-production-build.zip to Hostinger..." -ForegroundColor Magenta
& scp -P $PORT -o StrictHostKeyChecking=accept-new "$ZIP_FILE" "${USER}@${IP}:${REMOTE_DIR}/deploy.zip"
Write-Host "Upload complete." -ForegroundColor Green
Write-Host ""

# STEP 3: Extract zip on Hostinger server
Write-Host "[3/4] Extracting package into $REMOTE_DIR on server..." -ForegroundColor Magenta
$extractCmd = "cd $REMOTE_DIR && unzip -o deploy.zip && rm -f deploy.zip && chmod -R 755 . && chmod 644 .htaccess && echo EXTRACTION_SUCCESS"
& ssh @SSH_OPTS "${USER}@${IP}" $extractCmd
Write-Host ""

# STEP 4: Verification
Write-Host "[4/4] Verifying live deployment..." -ForegroundColor Magenta
$verifyCmd = "echo '=== Listing $REMOTE_DIR ===' && ls -la $REMOTE_DIR/ && echo '=== API Check ===' && test -f $REMOTE_DIR/api/index.php && echo 'api/index.php: FOUND ✓' || echo 'api/index.php: MISSING' && echo '=== Config Check ===' && test -f $REMOTE_DIR/config.js && echo 'config.js: FOUND ✓' || echo 'config.js: MISSING' && echo '=== Index Check ===' && test -f $REMOTE_DIR/index.html && echo 'index.html: FOUND ✓' || echo 'index.html: MISSING'"
& ssh @SSH_OPTS "${USER}@${IP}" $verifyCmd

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "  DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "  Live Website URL : https://dsacrm.empireitxpert.in" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to finish"
