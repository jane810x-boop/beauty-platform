import re
import os

i18n_path = r'D:\WB\beauty-platform\js\i18n.js'
with open(i18n_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find zh-HK block boundaries
# zh-HK starts with 'zh-HK': {
zhHK_start = content.find("'zh-HK': {")
if zhHK_start == -1:
    print('zh-HK block not found')
    exit(1)

# Find end of zh-HK block
brace_count = 0
started = False
zhHK_end = zhHK_start
for i in range(zhHK_start, len(content)):
    if content[i] == '{':
        brace_count += 1
        started = True
    elif content[i] == '}':
        brace_count -= 1
        if started and brace_count == 0:
            zhHK_end = i
            break

zhHK_block = content[zhHK_start:zhHK_end+1]
print(f'zh-HK block: chars {zhHK_start}-{zhHK_end}')

# Remove emoji prefixes from trust.* keys (excluding _desc)
# The icons to remove: ✅, 🚚, ↩️, 🔒, 🅿️, 💳, 💠
icons = ['✅', '🚚', '↩️', '🔒']

new_block = zhHK_block
for icon in icons:
    # Only fix trust.* (not trust.*_desc)
    # Pattern: 'trust.xxx': 'ICON ...
    pattern = rf"('trust\.\w+'):\s*'{icon}\s*"
    new_block = re.sub(pattern, rf"\1: '", new_block)

# Count changes
old_count = sum(1 for icon in icons if icon in zhHK_block and any(f"'trust.'\"'`)[^_]'" if False else False for _ in [0]))
# Just count icon occurrences in trust lines before/after
old_trust_icons = len(re.findall(r"'trust\.\w+':\s*['\"]?[✅🚚↩️🔒]", zhHK_block))
new_trust_icons = len(re.findall(r"'trust\.\w+':\s*['\"]?[✅🚚↩️🔒]", new_block))
print(f'Old trust icon occurrences: {old_trust_icons}')
print(f'New trust icon occurrences: {new_trust_icons}')
print(f'Removed: {old_trust_icons - new_trust_icons} duplicates')

# Replace in content
new_content = content[:zhHK_start] + new_block + content[zhHK_end+1:]

with open(i18n_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('✅ Fixed zh-HK trust badge icon duplicates')
