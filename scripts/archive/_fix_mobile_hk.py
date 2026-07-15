import glob, re

count = 0
for path in glob.glob('D:/WB/beauty-platform/*.html'):
    with open(path, 'rb') as f:
        data = f.read()

    good_title = '粵語 (HK)'.encode('utf-8')
    good_title_b64 = '5rKv1b8gKEhLKQ=='.encode()  # base64 of good_title, not needed
    
    # Pattern: anything between title=" and " that comes after setLang('zh-HK')
    # Match the title attribute value after zh-HK button
    pattern = rb"(setLang\('zh-HK'\)[^>]*?\btitle=\")[^\"]+\""

    def fix_title(m):
        return m.group(1) + good_title + b'"'

    new_data, n = re.subn(pattern, fix_title, data)
    
    if n > 0:
        with open(path, 'wb') as f:
            f.write(new_data)
        print(f'Fixed {n} btn(s) in: {path}')
        count += 1

print(f'Done. {count} files updated')
