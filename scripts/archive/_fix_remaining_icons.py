import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

i18n_path = r'D:\WB\beauty-platform\js\i18n.js'
with open(i18n_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all emoji-leading keys in zh and zh-HK blocks
def find_blocks(content):
    blocks = []
    patterns = [
        (r"'(ko|en|zh|zh-HK|pt-BR|es)':\s*\{", 'quoted'),
        (r"(ko|en|zh|pt-BR|es):\s*\{", 'unquoted')
    ]
    for pattern, _ in patterns:
        for match in re.finditer(pattern, content):
            lang = match.group(1)
            start = match.end()
            brace_count = 1
            end = start
            for i in range(start, len(content)):
                if content[i] == '{':
                    brace_count += 1
                elif content[i] == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        end = i
                        break
            blocks.append((start, end, lang, match.start()))
    blocks.sort(key=lambda x: x[0])
    return blocks

blocks = find_blocks(content)

# Icons that may appear as duplicates
icons = ['✅', '🚚', '🔄', '🔒', '🅿️', '💳', '💠', '📦', '🎁', '💎', '⭐', '🌟', '✨', '🎉', '🎊']

target_langs = ['zh', 'zh-HK']
total_fixes = 0

for start, end, lang, _ in blocks:
    if lang not in target_langs:
        continue

    block = content[start:end]
    new_block = block
    fixes = 0

    for icon in icons:
        # Match: 'any.key': 'ICON ... or "ICON ...
        # Use both single and double quotes
        for quote in ["'", '"']:
            pattern = rf"('[\w.]+'):\s*{quote}{re.escape(icon)}\s*"
            new_block, count = re.subn(pattern, rf"\1: {quote}", new_block)
            if count > 0:
                fixes += count

    if fixes > 0:
        content = content[:start] + new_block + content[end:]
        total_fixes += fixes
        print(f'{lang}: {fixes} fixes')

print(f'\n=== Total: {total_fixes} ===')

if total_fixes > 0:
    with open(i18n_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('File updated')
