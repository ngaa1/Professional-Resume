# 图片目录结构说明

## 目录结构

```
public/images/
├── experience/          # 工作经历项目图片
│   ├── [project_name1]/  # 项目1的图片目录
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   └── ...
│   └── [project_name2]/  # 项目2的图片目录
│       ├── 1.jpg
│       └── ...
└── personal_projects/   # 个人项目图片
    ├── [project_name1]/  # 项目1的图片目录
    │   ├── 1.jpg
    │   └── ...
    └── [project_name2]/  # 项目2的图片目录
        ├── 1.jpg
        └── ...
```

## 使用说明

1. **目录命名规则**：
   - 项目目录名称使用项目名称的小写形式，特殊字符替换为下划线
   - 例如：项目名称 "阿根廷 SAM FAFEAL 230MW" 对应的目录名为 "argentina_sam_fafeal_230mw"

2. **图片命名规则**：
   - 图片文件使用数字序号命名（如 1.jpg, 2.jpg, 3.jpg）
   - 支持常见图片格式：jpg, jpeg, png, gif, webp
   - 建议图片分辨率不超过 1920x1080，以提高加载速度

3. **图片加载机制**：
   - 系统会先尝试从本地目录加载图片
   - 如果本地目录不存在或图片不存在，会自动回退到使用原始URL
   - 例如：对于工作经历项目，系统会尝试从 `/images/experience/[project_name]/[index].jpg` 加载图片

4. **添加新图片**：
   - 按照上述目录结构创建相应的项目目录
   - 将图片文件放入对应目录，使用数字序号命名
   - 无需修改代码，系统会自动识别并加载

## 示例

假设我们有一个工作经历项目 "西班牙团队技术支持与交流"，对应的图片目录结构如下：

```
public/images/
└── experience/
    └── spain_team_technical_support_exchange/
        ├── 1.jpg
        └── 2.jpg
```

系统会自动尝试从以下路径加载图片：
- `/images/experience/spain_team_technical_support_exchange/1.jpg`
- `/images/experience/spain_team_technical_support_exchange/2.jpg`

如果这些本地图片不存在，系统会回退到使用原始URL。