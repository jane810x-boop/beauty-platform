$files = Get-ChildItem "D:\WB\beauty-platform\*.html"
foreach ($f in $files) {
    $lines = Get-Content $f.FullName -Encoding UTF8
    for ($i = 0; $i -lt $lines.Length; $i++) {
        $line = $lines[$i]
        $nextLine = if ($i + 1 -lt $lines.Length) { $lines[$i + 1] } else { "" }
        $next2Line = if ($i + 2 -lt $lines.Length) { $lines[$i + 2] } else { "" }
        if ($line -match "setLang\('zh'\)") {
            $nextTrim = $nextLine.Trim()
            $next2Trim = $next2Line.Trim()
            $m1 = ($nextTrim -eq '</div>')
            $m2 = ($next2Trim -eq '</nav>')
            $m3 = ($next2Line -match '<a href="login')
            Write-Host "$($f.Name):$($i+1) next='$($nextLine)' nextTrim='$nextTrim' next2Trim='$next2Trim' m1=$m1 m2=$m2 m3=$m3"
        }
    }
}
