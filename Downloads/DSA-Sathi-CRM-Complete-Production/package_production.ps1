Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$baseDir = "c:\Users\Asus\Downloads\DSA-Sathi-CRM-Complete-Production"
$zipPath = "$baseDir\dsacrm-production-build.zip"

Write-Host "Creating clean production build package..." -ForegroundColor Cyan

if (Test-Path $zipPath) {
    Remove-Item -Force $zipPath
}

$archive = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

$filesToInclude = @(
    @{ Path = "$baseDir\.htaccess"; Entry = ".htaccess" },
    @{ Path = "$baseDir\index.html"; Entry = "index.html" },
    @{ Path = "$baseDir\login.html"; Entry = "login.html" },
    @{ Path = "$baseDir\crm.html"; Entry = "crm.html" },
    @{ Path = "$baseDir\onboarding.html"; Entry = "onboarding.html" },
    @{ Path = "$baseDir\config.js"; Entry = "config.js" },
    @{ Path = "$baseDir\theme.js"; Entry = "theme.js" },
    @{ Path = "$baseDir\package.json"; Entry = "package.json" },
    @{ Path = "$baseDir\api\index.php"; Entry = "api/index.php" },
    @{ Path = "$baseDir\api\login.php"; Entry = "api/login.php" },
    @{ Path = "$baseDir\api\session.php"; Entry = "api/session.php" },
    @{ Path = "$baseDir\api\logout.php"; Entry = "api/logout.php" },
    @{ Path = "$baseDir\api\crms.php"; Entry = "api/crms.php" },
    @{ Path = "$baseDir\api\ping.php"; Entry = "api/ping.php" },
    @{ Path = "$baseDir\crm\index.php"; Entry = "crm/index.php" },
    @{ Path = "$baseDir\crm\index.html"; Entry = "crm/index.html" },
    @{ Path = "$baseDir\login\index.php"; Entry = "login/index.php" },
    @{ Path = "$baseDir\login\index.html"; Entry = "login/index.html" },
    @{ Path = "$baseDir\onboarding\index.php"; Entry = "onboarding/index.php" },
    @{ Path = "$baseDir\onboarding\index.html"; Entry = "onboarding/index.html" },
    @{ Path = "$baseDir\data\users.json"; Entry = "data/users.json" },
    @{ Path = "$baseDir\data\sessions.json"; Entry = "data/sessions.json" },
    @{ Path = "$baseDir\data\crm_db.json"; Entry = "data/crm_db.json" }
)

foreach ($f in $filesToInclude) {
    if (Test-Path $f.Path) {
        $entry = $archive.CreateEntry($f.Entry, [System.IO.Compression.CompressionLevel]::Optimal)
        $entryStream = $entry.Open()
        $fileStream = [System.IO.File]::OpenRead($f.Path)
        $fileStream.CopyTo($entryStream)
        $fileStream.Close()
        $fileStream.Dispose()
        $entryStream.Close()
        $entryStream.Dispose()
        Write-Host " [OK] Added to root: $($f.Entry)" -ForegroundColor Green
    } else {
        Write-Error " [FAIL] Missing file: $($f.Path)"
    }
}

$archive.Dispose()

$fileInfo = Get-Item $zipPath
$kb = [Math]::Round($fileInfo.Length / 1024, 2)
Write-Host ""
Write-Host "Created primary package: $zipPath ($kb KB)" -ForegroundColor Green

# Copy to other accessible locations
$copyTargets = @(
    "c:\Users\Asus\Downloads\dsacrm-production-build.zip",
    "c:\Users\Asus\Desktop\dsacrm-production-build.zip",
    "C:\Users\Asus\.gemini\antigravity\brain\d309206a-814a-43af-95da-79b510067a33\dsacrm-production-build.zip"
)

foreach ($dest in $copyTargets) {
    try {
        $parent = Split-Path -Parent $dest
        if (-not (Test-Path $parent)) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }
        Copy-Item -Path $zipPath -Destination $dest -Force
        Write-Host " [OK] Copied to: $dest" -ForegroundColor Green
    } catch {
        Write-Warning "Could not copy to $dest : $_"
    }
}

Write-Host ""
Write-Host "Verifying ZIP contents from disk..." -ForegroundColor Cyan
$readArchive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
Write-Host "Total entries in ZIP: $($readArchive.Entries.Count)" -ForegroundColor Yellow
foreach ($entry in $readArchive.Entries) {
    Write-Host "  -> $($entry.FullName) ($($entry.Length) bytes)"
}
$readArchive.Dispose()
