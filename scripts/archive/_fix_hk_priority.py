import glob, re

updated = 0
for path in glob.glob('D:/WB/beauty-platform/*.html'):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    skip_next = False
    removed = 0
    i = 0
    while i < len(lines):
        line = lines[i]

        # If this is the zh button and we already have zh-HK in file, skip it
        if "setLang('zh')" in line and 'zh-HK' not in line:
            # Check if zh-HK appears elsewhere in the file
            rest = ''.join(lines[i+1:])
            if 'zh-HK' in rest:
                # Remove this zh button line
                removed += 1
                i += 1
                continue

        new_lines.append(line)
        i += 1

    if removed > 0:
        with open(path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f'Removed {removed} zh-CN btn(s): {path}')
        updated += 1

print(f'Done. {updated} files updated')
