# Read all HTML files, add zh-HK lang button after zh button
$files = Get-ChildItem "D:\WB\beauty-platform\*.html"
$headerBtn = "        <button class=""lang-flag-btn"" onclick=""setLang('zh-HK')"" title=""粵語 (香港)"">`u{1F1ED}`u{1F1F0}</button>"
$mobileBtn = "    <button class=""lang-flag-btn"" onclick=""setLang('zh-HK')"" title=""粵語 (香港)"">`u{1F1ED}`u{1F1F0}</button>"
$updated = 0

foreach ($f in $files) {
    $lines = Get-Content $f.FullName -Encoding UTF8
    $newLines = @()
    $modified = $false

    $inHeaderLang = $false
    $inMobileLang = $false

    for ($i = 0; $i -lt $lines.Length; $i++) {
        $line = $lines[$i]
        $nextLine = if ($i + 1 -lt $lines.Length) { $lines[$i + 1] } else { "" }
        $next2Line = if ($i + 2 -lt $lines.Length) { $lines[$i + 2] } else { "" }

        $newLines += $line

        # Detect header lang-switcher section: zh btn + </div> (8 spaces) + <a href="login
        if ($line -match 'onclick="setLang\(\''zh'\''\)"') {
            if ($nextLine -match '^\s+</div>' -and $next2Line -match '^\s+<a href="login') {
                $newLines += $headerBtn
                $modified = $true
                Write-Host "  [HEADER] $($f.Name) line $($i+1)"
            }
            # Detect mobile nav: zh btn + </div> (4 spaces) + </nav>
            elseif ($nextLine.Trim() -eq '</div>' -and $next2Line.Trim() -eq '</nav>') {
                $newLines += $mobileBtn
                $modified = $true
                Write-Host "  [MOBILE] $($f.Name) line $($i+1)"
            }
        }
    }

    if ($modified) {
        Set-Content $f.FullName -Value $newLines -Encoding UTF8
        $updated++
    }
}
Write-Host "Total files modified: $updated"
