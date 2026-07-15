$files = Get-ChildItem "D:\WB\beauty-platform\*.html"
$updated = 0

foreach ($f in $files) {
    $lines = Get-Content $f.FullName -Encoding UTF8
    $newLines = @()
    $modified = $false

    for ($i = 0; $i -lt $lines.Length; $i++) {
        $line = $lines[$i]
        $nextLine = if ($i + 1 -lt $lines.Length) { $lines[$i + 1] } else { "" }
        $next2Line = if ($i + 2 -lt $lines.Length) { $lines[$i + 2] } else { "" }

        $newLines += $line

        if ($line -match "setLang\('zh'\)") {
            $nextTrim = $nextLine.Trim()
            $next2Trim = $next2Line.Trim()
            if ($nextTrim -eq '</div>' -and $next2Trim -eq '</nav>') {
                # Mobile nav zh-HK button
                $indent = $line -replace '^( +).*', '$1'
                $hkBtn = $indent + "<button class=""lang-flag-btn"" onclick=""setLang('zh-HK')"" title=""粵語 (香港)"">`u{1F1ED}`u{1F1F0}</button>"
                $newLines += $hkBtn
                $modified = $true
                Write-Host "[MOBILE] $($f.Name):$($i+1)"
            } elseif ($nextTrim -eq '</div>' -and $next2Line -match '<a href=""login') {
                # Header zh-HK button
                $indent = $line -replace '^( +).*', '$1'
                $hkBtn = $indent + "<button class=""lang-flag-btn"" onclick=""setLang('zh-HK')"" title=""粵語 (香港)"">`u{1F1ED}`u{1F1F0}</button>"
                $newLines += $hkBtn
                $modified = $true
                Write-Host "[HEADER] $($f.Name):$($i+1)"
            }
        }
    }

    if ($modified) {
        Set-Content $f.FullName -Value $newLines -Encoding UTF8
        $updated++
    }
}
Write-Host "Done. Total files modified: $updated"
