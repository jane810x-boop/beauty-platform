import re
import os
import sys

# Force UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

i18n_path = r'D:\WB\beauty-platform\js\i18n.js'
with open(i18n_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Icons to remove from front of trust.*, product.* values
# These are: ✅ 🚚 🔄 🔒 🅿️ 💳 💠
icons_to_remove = ['✅', '🚚', '🔄', '🔒', '🅿️', '💳', '💠']

# Languages to fix: zh and zh-HK (both had emojis inserted by my generator)
# Pattern: within a language block, fix lines like 'trust.xxx': 'ICON ...' or 'product.xxx': 'ICON ...'

# Find zh block (with no quotes, has no quotes around it)
# Find all language block boundaries
def find_blocks(content):
    """Find (start, end, lang) for all language blocks"""
    blocks = []

    # Patterns: 'lang': { or lang: {
    patterns = [
        (r"^\s*'(ko|en|zh|zh-HK|pt-BR|es)':\s*\{", 'quoted'),
        (r"^\s*(ko|en|zh|pt-BR|es):\s*\{", 'unquoted')
    ]

    for pattern, _ in patterns:
        for match in re.finditer(pattern, content, re.MULTILINE):
            lang = match.group(1)
            start = match.end()
            # Find matching closing brace
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

    # Sort by start position
    blocks.sort(key=lambda x: x[0])
    return blocks

blocks = find_blocks(content)
print(f'Found {len(blocks)} language blocks')

# Process zh and zh-HK blocks
target_langs = ['zh', 'zh-HK']
total_fixes = 0

for start, end, lang, _ in blocks:
    if lang not in target_langs:
        continue

    print(f'\nProcessing {lang} block (chars {start}-{end})')

    block_content = content[start:end]
    new_block = block_content
    fixes_in_block = 0

    for icon in icons_to_remove:
        # Fix lines like 'key': 'ICON ...' where key starts with trust. or product.
        # Only for these specific prefixes to avoid breaking other text
        for prefix in ['trust.', 'product.']:
            # Pattern: 'trust.xxx': 'ICON TEXT
            pattern = rf"('{prefix}[\w]+'):\s*'({re.escape(icon)})\s*"
            new_block, count = re.subn(pattern, r"\1: '", new_block)
            if count > 0:
                print(f'  Removed "{icon}" from {count} {prefix}* key(s)')
                fixes_in_block += count

    if fixes_in_block > 0:
        content = content[:start] + new_block + content[end:]
        total_fixes += fixes_in_block
        print(f'  Total fixes in {lang}: {fixes_in_block}')

print(f'\n=== Total fixes: {total_fixes} ===')

if total_fixes > 0:
    with open(i18n_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('File updated successfully')
else:
    print('No changes needed')
