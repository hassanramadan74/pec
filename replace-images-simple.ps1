 Replace old images with optimized ones
Write-Host ""
Write-Host "Replacing images with optimized versions..." -ForegroundColor Cyan
Write-Host ""

# Backup old images first
$backupPath = ".\public\images-backup"
if (Test-Path $backupPath) {
    Write-Host "Backup folder already exists. Skipping backup." -ForegroundColor Yellow
} else {
    Write-Host "Creating backup of original images..." -ForegroundColor Yellow
    Copy-Item -Path ".\public\images" -Destination $backupPath -Recurse
    Write-Host "Backup created!" -ForegroundColor Green
    Write-Host ""
}

# Get all subdirectories in optimized folder
$optimizedFolders = Get-ChildItem -Path ".\public\optimized" -Directory -Recurse

Write-Host "Copying optimized images..." -ForegroundColor Cyan
Write-Host ""

# Copy each optimized folder to images
foreach ($folder in $optimizedFolders) {
    $relativePath = $folder.FullName.Replace((Get-Item ".\public\optimized").FullName, "")
    $destinationPath = Join-Path ".\public\images" $relativePath
    
    Write-Host "   Copying $($folder.Name)..." -ForegroundColor Gray
    
    # Copy files from optimized folder to images folder
    Copy-Item -Path "$($folder.FullName)\*" -Destination $destinationPath -Force
}

# Also copy root level files in optimized
$rootFiles = Get-ChildItem -Path ".\public\optimized" -File
foreach ($file in $rootFiles) {
    Write-Host "   Copying $($file.Name)..." -ForegroundColor Gray
    Copy-Item -Path $file.FullName -Destination ".\public\images\" -Force
}

Write-Host ""
Write-Host "All images replaced with optimized versions!" -ForegroundColor Green
Write-Host ""

# Remove optimized folder
Write-Host "Removing temporary optimized folder..." -ForegroundColor Yellow
Remove-Item -Path ".\public\optimized" -Recurse -Force
Write-Host "Cleanup complete!" -ForegroundColor Green
Write-Host ""

# Show final stats
Write-Host "Final Size:" -ForegroundColor Cyan
$totalSize = (Get-ChildItem -Path ".\public\images" -Recurse -Include *.jpg,*.jpeg,*.png | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "   Total images: $([math]::Round($totalSize, 2)) MB" -ForegroundColor White
Write-Host ""

Write-Host "Done! Your images are now optimized!" -ForegroundColor Green
Write-Host "Restart your dev server to see the improvements." -ForegroundColor White
Write-Host ""

Write-Host "Tip: If everything looks good, you can delete the backup:" -ForegroundColor Yellow
Write-Host "   Remove-Item .\public\images-backup -Recurse -Force" -ForegroundColor Gray
Write-Host ""
