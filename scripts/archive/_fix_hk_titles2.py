import glob

# Fix garbled Chinese title for zh-HK button
# Broken: 绮佃獮 (棣欐腐) = wrong chars that PowerShell stored
# Fixed: 粵語 (香港) = correct Chinese

broken_parts = ['\u7e7b', '\u4f73', '\u72ae', '\u68f5', '\u6be4', '\u5ec9']
good_parts   = ['\u7cae', '\u8a9e', '\u9999', '\u6e2f', '\u6e2f', '\u6e2f']

count = 0
for path in glob.glob('D:/WB/beauty-platform/*.html'):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    for b, g in zip(broken_parts, good_parts):
        content = content.replace(b, g)

    if content != original:
        # Also fix the trailing space: '腐)' should become '港)'
        content = content.replace('\u5ec9', '\u6e2f)')  # 腐 → 港)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed: {path}')

print('Done')
