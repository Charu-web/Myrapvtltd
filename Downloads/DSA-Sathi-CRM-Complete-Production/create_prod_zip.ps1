Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$baseDir = "c:\Users\Asus\Downloads\DSA-Sathi-CRM-Complete-Production"
$zipPath = "c:\Users\Asus\Downloads\dsacrm-production-build.zip"

if (Test-Path $zipPath) {
    Remove-Item -Force $zipPath
}

$archive = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

$files = @(
    @{ Path = "$baseDir\.htaccess"; Entry = ".htaccess" },
    @{ Path = "$baseDir\index.html"; Entry = "index.html" },
    @{ Path = "$baseDir\login.html"; Entry = "login.html" },
    @{ Path = "$baseDir\crm.html"; Entry = "crm.html" },
    @{ Path = "$baseDir\onboarding.html"; Entry = "onboarding.html" },
    @{ Path = "$baseDir\config.js"; Entry = "config.js" },
    @{ Path = "$baseDir\theme.js"; Entry = "theme.js" },
    @{ Path = "$baseDir\server.js"; Entry = "server.js" },
    @{ Path = "$baseDir\crm-db.js"; Entry = "crm-db.js" },
    @{ Path = "$baseDir\package.json"; Entry = "package.json" },
    @{ Path = "$baseDir\.env"; Entry = ".env" },
    @{ Path = "$baseDir\api\index.php"; Entry = "api/index.php" },
    @{ Path = "$baseDir\api\login.php"; Entry = "api/login.php" },
    @{ Path = "$baseDir\api\session.php"; Entry = "api/session.php" },
    @{ Path = "$baseDir\api\logout.php"; Entry = "api/logout.php" },
    @{ Path = "$baseDir\api\crms.php"; Entry = "api/crms.php" },
    @{ Path = "$baseDir\data\users.json"; Entry = "data/users.json" },
    @{ Path = "$baseDir\data\crm_db.json"; Entry = "data/crm_db.json" },
    @{ Path = "$baseDir\data\sessions.json"; Entry = "data/sessions.json" }
)

foreach ($f in $files) {
    if (Test-Path $f.Path) {
        $entry = $archive.CreateEntry($f.Entry, [System.IO.Compression.CompressionLevel]::Optimal)
        $entryStream = $entry.Open()
        $fileStream = [System.IO.File]::OpenRead($f.Path)
        $fileStream.CopyTo($entryStream)
        $fileStream.Close()
        $fileStream.Dispose()
        $entryStream.Close()
        $entryStream.Dispose()
        Write-Host "Added: $($f.Entry)"
    } else {
        Write-Warning "File missing: $($f.Path)"
    }
}

$archive.Dispose()

# Also make a copy inside the project folder
Copy-Item -Path $zipPath -Destination "$baseDir\dsacrm-production-build.zip" -Force

$kb = [Math]::Round((Get-Item $zipPath).Length / 1024, 2)
Write-Host "SUCCESS: Created $zipPath ($kb KB) with clean Linux forward-slash paths!"
