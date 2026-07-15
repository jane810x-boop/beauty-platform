import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

blog_path = r'D:\WB\beauty-platform\js\blog-data.js'
with open(blog_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 简繁转换表（精选常用）
zh_to_hk = {
  '入门': '入門', '指南': '指南', '基础': '基礎', '深度': '深度',
  '解析': '解析', '核心': '核心', '成分': '成分', '护肤': '護膚',
  '流程': '流程', '步骤': '步驟', '不同': '不同', '肤质': '膚質',
  '不同肤质': '不同膚質',
  '文章': '文章', '完整': '完整', '阅读': '閱讀', '时间': '時間',
  '分钟': '分鐘', '韩妆': '韓妝', '韩国': '韓國', '亚洲': '亞洲',
  '美妆': '美妝', '产品': '產品', '品牌': '品牌', '购买': '購買',
  '价格': '價格', '适合': '適合', '所有': '所有', '类型': '類型',
  '肌肤': '肌膚', '问题': '問題', '解决': '解決', '方法': '方法',
  '使用': '使用', '正确': '正確', '方式': '方式', '步骤': '步驟',
  '详细': '詳細', '介绍': '介紹', '好处': '好處', '效果': '效果',
  '推荐': '推薦', '选择': '選擇', '必买': '必買', '清单': '清單',
  '指南': '指南', '分享': '分享', '经验': '經驗', '技巧': '技巧',
  '秘诀': '秘訣', '教程': '教學', '必备': '必備', '知识': '知識',
  '了解': '了解', '发现': '發現', '探索': '探索', '趋势': '趨勢',
  '流行': '流行', '热门': '熱門', '最': '最', '最佳': '最佳',
  '顶级': '頂級', '精华': '精華', '面霜': '面霜', '化妆水': '化妝水',
  '乳液': '乳液', '面膜': '面膜', '防晒': '防曬', '洁面': '潔面',
  '卸妆': '卸妝', '化妆': '化妝', '彩妆': '彩妝', '口红': '口紅',
  '粉底': '粉底', '眼影': '眼影', '睫毛': '睫毛', '腮红': '胭脂',
  '清洁': '清潔', '补水': '補水', '保湿': '保濕', '滋润': '滋潤',
  '控油': '控油', '美白': '美白', '祛斑': '祛斑', '抗老': '抗老',
  '抗皱': '抗皺', '紧致': '緊緻', '细致': '細緻', '毛孔': '毛孔',
  '黑头': '黑頭', '粉刺': '粉刺', '痘痘': '痘痘', '敏感': '敏感',
  '舒缓': '舒緩', '修复': '修復', '镇定': '鎮定', '泛红': '泛紅',
  '干燥': '乾燥', '油腻': '油膩', '混合': '混合', '中性': '中性',
  '干性': '乾性', '油性': '油性', '敏感性': '敏感性', '成熟': '成熟',
  '年轻': '年輕', '肌肤': '肌膚', '健康': '健康', '光泽': '光澤',
  '亮白': '亮白', '均匀': '均勻', '肤色': '膚色', '暗沉': '暗沉',
  '色斑': '色斑', '瑕疵': '瑕疵', '毛孔': '毛孔', '黑眼圈': '黑眼圈',
  '眼袋': '眼袋', '细纹': '細紋', '皱纹': '皺紋', '老化': '老化',
  '年龄': '年齡', '岁月': '歲月', '成熟肌': '熟齡肌', '轻熟': '輕熟',
  '轻熟肌': '輕熟肌',
}

def to_hk(text):
    result = text
    # 长词优先
    keys = sorted(zh_to_hk.keys(), key=len, reverse=True)
    for zh in keys:
        hk = zh_to_hk[zh]
        if zh != hk:
            result = result.replace(zh, hk)
    return result

# Find all 'zh': { ... } blocks
# Pattern: 'zh': { ... } where content uses key-value pairs
# We need to find object literals like:
#   'zh': { name: '...', desc: '...', title: '...', excerpt: '...', body: '...' }

# Find all content blocks with 'zh': {
# These are within blog article objects
zh_blocks = list(re.finditer(r"'zh':\s*\{[^{}]*\}", content))
print(f'Found {len(zh_blocks)} zh blocks')

# For each zh block, add a zh-HK block right after
new_content = content
inserts = 0
offset = 0

for match in zh_blocks:
    zh_str = match.group(0)
    zh_hk_str = zh_str.replace("'zh':", "'zh-HK':")

    # Convert the Chinese values to Traditional
    # Extract string values
    zh_hk_str_converted = zh_hk_str
    # Find all 'string' values
    string_values = re.findall(r":\s*'([^']*)'", zh_hk_str)
    for val in string_values:
        if any('\u4e00' <= c <= '\u9fff' for c in val):
            converted = to_hk(val)
            if converted != val:
                zh_hk_str_converted = zh_hk_str_converted.replace(f"'{val}'", f"'{converted}'")

    # Insert after the original block
    insert_pos = match.end() + offset
    new_content = new_content[:insert_pos] + ',\n    ' + zh_hk_str_converted + new_content[insert_pos:]
    offset += len(',\n    ') + len(zh_hk_str_converted)
    inserts += 1

print(f'Inserted {inserts} zh-HK blocks')

if inserts > 0:
    with open(blog_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('File updated')
else:
    print('No changes')
