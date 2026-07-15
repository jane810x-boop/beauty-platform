import glob

HK = '\U0001F1ED\U0001F1F0'
broken = 'u{1F1ED}u{1F1F0}'
count = 0

for path in glob.glob('D:/WB/beauty-platform/*.html'):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if broken in content:
        new_content = content.replace(broken, HK)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Fixed: {path}')
        count += 1

print(f'Done. {count} files fixed')
