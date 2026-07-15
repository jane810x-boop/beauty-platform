$files = Get-ChildItem "D:\WB\beauty-platform\*.html"
$headerBtn = "        <button class=`"lang-flag-btn`" onclick=`"setLang('zh-HK')`" title=`"粵語 (香港)`">🇭🇰</button>"
$mobileBtn = "    <button class=`"lang-flag-btn`" onclick=`"setLang('zh-HK')`" title=`"粵語 (香港)`">🇭🇰</button>"
$updated = 0

foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw -Encoding UTF8
    if ($c -notmatch "setLang\('zh-HK'\)") {
        $orig = $c

        # Header lang-switcher: zh btn followed by </div> + <a href="login
        $c = $c -replace "(onclick=`"setLang\('zh'\))`" title=`"中文`"([^`r`n]*)</button>`r?`n      </div>`r?`n        <a href=`"login",
                     "`$1)`" title=`"中文`"`$2</button>`r`n$headerBtn`r`n        <a href=`"login"

        # Mobile nav: zh btn followed by </div> + </nav>
        $c = $c -replace "(onclick=`"setLang\('zh'\))`" title=`"中文`"([^`r`n]*)</button>`r?`n  </div>`r?`n</nav>",
                     "`$1)`" title=`"中文`"`$2</button>`r`n$mobileBtn`r`n</nav>"

        if ($c -ne $orig) {
            Set-Content $f.FullName -Value $c -Encoding UTF8 -NoNewline
            Write-Host "Updated: $($f.Name)"
            $updated++
        }
    }
}
Write-Host "Total files updated: $updated"
