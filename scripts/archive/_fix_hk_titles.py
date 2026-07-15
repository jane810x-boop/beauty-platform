import glob

# Fix garbled title attribute that PowerShell wrote incorrectly
broken_title = '\u7e7b\u75f3\u72ac\u8c26 (\u68f5\u6be4\u5ec9)'
good_title = '\u7cae\u8a9e (HK)'

# The garbled bytes as they appear in the file (after UTF-8 interpretation of wrong chars)
# "\u7e7b\u75f3\u72ac\u8c26" = 绮佃獮, "\u68f5\u6be4\u5ec9" = 棣欐腐
broken = '\u7e7b\u75f3\u72ac\u8c26 (\u68f5\u6be4\u5ec9)'
good = '\u7cae\u8a9e (HK)'

count = 0
for path in glob.glob('D:/WB/beauty-platform/*.html'):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if broken in content:
        new_content = content.replace(broken, good)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Fixed title: {path}')
        count += 1

print(f'Done. {count} files fixed')
