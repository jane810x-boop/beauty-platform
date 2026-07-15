$c = Get-Content "D:\WB\beauty-platform\cart.html" -Raw -Encoding UTF8
# Find the zh button line
$lines = $c -split "`r?`n"
$zhIdx = -1
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "setLang\('zh'\)") {
        $zhIdx = $i
        break
    }
}
if ($zhIdx -ge 0) {
    Write-Host "zh btn found at line $($zhIdx+1):"
    Write-Host "  LINE $($zhIdx+1): $($lines[$zhIdx])"
    Write-Host "  LINE $($zhIdx+2): $($lines[$zhIdx+1])"
    Write-Host "  LINE $($zhIdx+3): $($lines[$zhIdx+2])"
    Write-Host "  LINE $($zhIdx+4): $($lines[$zhIdx+3])"
    Write-Host "  LINE $($zhIdx+5): $($lines[$zhIdx+4])"
}
