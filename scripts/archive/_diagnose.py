import glob, re

for path in glob.glob('D:/WB/beauty-platform/*.html'):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
    
    # Find all zh-HK buttons and their titles
    matches = re.findall(r"setLang\('zh-HK'\)[^>]*title=\"([^\"]+)\"", content)
    if len(matches) >= 2:
        print(f'{path}:')
        for i, m in enumerate(matches):
            print(f'  [{i}] title chars: {[hex(ord(c)) for c in m]}')
