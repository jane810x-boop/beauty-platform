import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

blog_path = r'D:\WB\beauty-platform\js\blog-data.js'
with open(blog_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 简繁转换（精选常用）
zh_to_hk = {
  '入门': '入門', '基础': '基礎', '深度': '深度', '解析': '解析',
  '核心': '核心', '成分': '成分', '护肤': '護膚', '流程': '流程',
  '步骤': '步驟', '不同肤质': '不同膚質',
  '文章': '文章', '完整': '完整', '阅读': '閱讀', '时间': '時間',
  '分钟': '分鐘', '韩妆': '韓妝', '韩国': '韓國', '亚洲': '亞洲',
  '美妆': '美妝', '产品': '產品', '品牌': '品牌', '购买': '購買',
  '价格': '價格', '适合': '適合', '类型': '類型', '肤质': '膚質',
  '解决': '解決', '方法': '方法', '使用': '使用', '正确': '正確',
  '方式': '方式', '详细': '詳細', '介绍': '介紹', '好处': '好處',
  '效果': '效果', '推荐': '推薦', '选择': '選擇', '必买': '必買',
  '清单': '清單', '分享': '分享', '经验': '經驗', '技巧': '技巧',
  '秘诀': '秘訣', '教程': '教學', '必备': '必備', '知识': '知識',
  '了解': '了解', '发现': '發現', '探索': '探索', '趋势': '趨勢',
  '流行': '流行', '热门': '熱門', '最佳': '最佳', '顶级': '頂級',
  '精华': '精華', '化妆水': '化妝水', '面膜': '面膜', '防晒': '防曬',
  '洁面': '潔面', '卸妆': '卸妝', '化妆': '化妝', '口红': '口紅',
  '眼影': '眼影', '腮红': '胭脂', '清洁': '清潔', '补水': '補水',
  '保湿': '保濕', '滋润': '滋潤', '控油': '控油', '抗皱': '抗皺',
  '紧致': '緊緻', '细致': '細緻', '黑头': '黑頭', '痘痘': '痘痘',
  '舒缓': '舒緩', '修复': '修復', '镇定': '鎮定', '泛红': '泛紅',
  '干燥': '乾燥', '油腻': '油膩', '混合': '混合', '中性': '中性',
  '干性': '乾性', '油性': '油性', '光泽': '光澤', '亮白': '亮白',
  '均匀': '均勻', '肤色': '膚色', '暗沉': '暗沉', '色斑': '色斑',
  '黑眼圈': '黑眼圈', '眼袋': '眼袋', '细纹': '細紋', '皱纹': '皺紋',
  '老化': '老化', '年龄': '年齡', '岁月': '歲月', '年轻': '年輕',
  '敏感': '敏感', '痘印': '痘印', '痤疮': '痤瘡', '胎盘': '胎盤',
  '玻尿酸': '玻尿酸', '烟酰胺': '菸鹼胺', '维生素': '維生素', '精华液': '精華液',
  '乳液霜': '乳液霜', '化妆水': '化妝水', '卸妆水': '卸妝水', '洁面乳': '潔面乳',
  '睡眠面膜': '睡眠面膜', '日霜': '日霜', '晚霜': '晚霜', '眼霜': '眼霜',
  '颈霜': '頸霜', '护手霜': '護手霜', '身体乳': '身體乳', '沐浴露': '沐浴露',
  '洗发水': '洗髮水', '护发素': '護髮素', '发膜': '髮膜', '精油': '精油',
  '喷雾': '噴霧', '唇膏': '唇膏', '唇彩': '唇彩', '睫毛膏': '睫毛膏',
  '眼线': '眼線', '眉笔': '眉筆', '粉饼': '粉餅', '散粉': '散粉',
  '高光': '高光', '阴影': '陰影', '隔离': '隔離', '妆前': '妝前',
  '定妆': '定妝', '卸妆油': '卸妝油', '卸妆膏': '卸妝膏', '洁面皂': '潔面皂',
  '洁面粉': '潔面粉', '洁面啫喱': '潔面喱', '泡沫': '泡沫',
  '凝胶': '凝膠', '面贴': '面貼', '眼贴': '眼貼', '鼻贴': '鼻貼',
  '唇膜': '唇膜', '手膜': '手膜', '足膜': '足膜', '撕拉': '撕拉',
  '涂抹': '塗抹', '片状': '片狀', '膏状': '膏狀', '乳状': '乳狀',
  '啫喱': '喱', '霜状': '霜狀', '水状': '水狀', '油状': '油狀',
  '喷雾状': '噴霧狀', '紧致': '緊緻', '提拉': '提拉', '瘦脸': '瘦臉',
  '瘦腿': '瘦腿', '瘦身': '瘦身', '塑形': '塑形', '美体': '美體',
  '美胸': '美胸', '美手': '美手', '美足': '美足', '美发': '美髮',
  '护发': '護髮', '染发': '染髮', '烫发': '燙髮', '造型': '造型',
  '定型': '定型', '蓬松': '蓬鬆', '顺滑': '順滑', '亮泽': '亮澤',
  '去屑': '去屑', '止痒': '止癢', '防脱': '防脫', '生发': '生髮',
  '睫毛': '睫毛', '眉毛': '眉毛', '胡须': '鬍鬚', '脱毛': '脫毛',
  '私处': '私密處', '腋下': '腋下', '唇部': '唇部', '眼周': '眼周',
  '唇周': '唇周', '法令纹': '法令紋', '川字纹': '川字紋', '鱼尾纹': '魚尾紋',
  '抬头纹': '抬頭紋', '颈纹': '頸紋', '妊娠纹': '妊娠紋', '肥胖纹': '肥胖紋',
  '生长纹': '生長紋', '萎缩纹': '萎縮紋', '膨胀纹': '膨脹紋',
}

def to_hk(text):
    result = text
    keys = sorted(zh_to_hk.keys(), key=len, reverse=True)
    for zh in keys:
        hk = zh_to_hk[zh]
        if zh != hk and zh in result:
            result = result.replace(zh, hk)
    return result

# Find all single-line 'zh': 'value' patterns where value is Chinese string
# But careful: we want to add 'zh-HK': 'converted' next to it

# Find: 'zh': 'some chinese' or "zh": "some chinese"
single_line_pattern = re.compile(r"('zh'):\s*('([^'\\]|\\.)*')")
matches = list(single_line_pattern.finditer(content))
print(f'Found {len(matches)} zh string values')

new_content = content
inserts = 0
offset = 0

for match in matches:
    full_match = match.group(0)  # 'zh': '...'
    zh_value = match.group(2)[1:-1]  # remove quotes

    if not any('\u4e00' <= c <= '\u9fff' for c in zh_value):
        continue  # Skip non-Chinese

    hk_value = to_hk(zh_value)
    if hk_value == zh_value:
        continue  # No conversion

    # Create new line with 'zh-HK'
    # Preserve the quote style
    quote = match.group(2)[0]
    new_line = f"{match.group(1)}: {quote}{zh_value}{quote},\n    '{'zh-HK'}': {quote}{hk_value}{quote},"

    # Replace in content
    insert_pos = match.end() + offset
    # Find the end of the line
    line_end = new_content.find('\n', insert_pos)
    if line_end == -1:
        line_end = len(new_content)

    # Replace just the value, keep the original line
    # Strategy: insert after current position
    actual_end = new_content.find(',', insert_pos - 1) + 1
    if actual_end < insert_pos:
        actual_end = line_end

    new_content = new_content[:actual_end + offset] + f"\n    {'zh-HK'}: {quote}{hk_value}{quote}," + new_content[actual_end + offset:]
    offset += len(f"\n    {'zh-HK'}: {quote}{hk_value}{quote},")
    inserts += 1

print(f'Inserted {inserts} zh-HK string values')

# Also handle arrays: 'zh': ['item1', 'item2']
# Find: 'zh': [ ... ] containing Chinese strings
array_pattern = re.compile(r"('zh'):\s*\[([^\]]*)\]", re.DOTALL)
array_matches = list(array_pattern.finditer(content))
print(f'Found {len(array_matches)} zh array values')

for match in reversed(array_matches):  # Reverse to preserve offsets
    items_str = match.group(2)
    # Check if contains Chinese
    if not any('\u4e00' <= c <= '\u9fff' for c in items_str):
        continue

    # Extract strings
    string_items = re.findall(r"'([^']*)'", items_str)
    hk_items = [to_hk(s) if any('\u4e00' <= c <= '\u9fff' for c in s) else s for s in string_items]

    if hk_items == string_items:
        continue

    # Build new arrays
    hk_str = ', '.join(f"'{s}'" for s in hk_items)
    zh_str = ', '.join(f"'{s}'" for s in string_items)

    # Replace the original array
    old_arr = f"{match.group(1)}: [{items_str}]"
    new_arr = f"{match.group(1)}: [{zh_str}],\n    'zh-HK': [{hk_str}]"

    pos = match.start() + offset
    new_content = new_content[:pos] + new_arr + new_content[match.end() + offset:]
    offset += len(new_arr) - len(old_arr)
    inserts += 1

print(f'Total inserts: {inserts}')

if inserts > 0:
    with open(blog_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('File updated')
