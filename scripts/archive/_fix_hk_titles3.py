import glob

# Simply replace the garbled title attribute text with the correct one
# Correct Chinese: 粵語 (香港)
# In UTF-8 bytes: E7B2AE = 粀 (wrong?), no...
# Let's just use the literal bytes

good_title_utf8 = '粵語 (香港)'.encode('utf-8')
print(f"Good title UTF-8: {good_title_utf8}")

count = 0
for path in glob.glob('D:/WB/beauty-platform/*.html'):
    with open(path, 'rb') as f:
        content = f.read()

    # The garbled text we see in the file
    broken = '绮佃獮 (棣欐腐)'.encode('utf-8')
    
    if broken in content:
        new_content = content.replace(broken, good_title_utf8)
        with open(path, 'wb') as f:
            f.write(new_content)
        print(f'Fixed: {path}')
        count += 1

print(f'Done. {count} files fixed')
