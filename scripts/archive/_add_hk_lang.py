import os, glob

HK = '\U0001F1ED\U0001F1F0'
updated = 0

for path in glob.glob('D:/WB/beauty-platform/*.html'):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    modified = False

    for i, line in enumerate(lines):
        new_lines.append(line)
        if "setLang('zh')" in line and 'zh-HK' not in line:
            next_line = lines[i+1].strip() if i+1 < len(lines) else ''
            next2_line = lines[i+2].strip() if i+2 < len(lines) else ''
            next2_raw = lines[i+2] if i+2 < len(lines) else ''

            indent = len(line) - len(line.lstrip())
            btn = ' ' * indent + '<button class="lang-flag-btn" onclick="setLang(\'zh-HK\')" title="粵語 (香港)">' + HK + '</button>'

            if next_line == '</div>' and next2_line == '</nav>':
                new_lines.append(btn + '\n')
                modified = True
                print(f'[MOBILE] {os.path.basename(path)}:{i+1}')
            elif next_line == '</div>' and next2_raw.lstrip().startswith('<a href="login'):
                new_lines.append(btn + '\n')
                modified = True
                print(f'[HEADER] {os.path.basename(path)}:{i+1}')
            elif next_line == '</div>' and next2_raw.lstrip().startswith('<a href="cart'):
                new_lines.append(btn + '\n')
                modified = True
                print(f'[HEADER] {os.path.basename(path)}:{i+1}')

    if modified:
        with open(path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        updated += 1

print(f'Done. {updated} files updated')
