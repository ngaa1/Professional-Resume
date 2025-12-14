

import { ResumeData } from './types';

// ============================================================================
// THEME CONFIGURATION
// ============================================================================

// Automatic Theme Switching Configuration
export const ENABLE_AUTO_THEME_SWITCH = true; // Set to true \ false to force use of SELECTED_THEME below
export const DAY_START_HOUR = 6;  // Hour when day mode starts (e.g., 6 for 06:00)
export const DAY_END_HOUR = 18;   // Hour when night mode starts (e.g., 18 for 18:00)

// Manual Theme Overrides (Used ONLY when ENABLE_AUTO_THEME_SWITCH is false)
// Color Theme: 'light' | 'github-dark'
export const SELECTED_THEME: 'light' | 'github-dark' = 'light';

// Font Theme: 'default' | 'github'
export const SELECTED_FONT_THEME: 'default' | 'github' = 'default';

export const THEMES = {
  light: {
    '--c-primary': '#0f172a',        // Deep Navy
    '--c-secondary': '#475569',      // Slate 600
    '--c-accent': '#0ea5e9',         // Sky 500
    '--c-accent-hover': '#0284c7',   // Sky 600
    '--c-on-accent': '#ffffff',      // White text on blue accent
    '--c-surface': '#ffffff',        // White
    '--c-surface-hover': '#ffffff',  // White
    '--c-border': '#e2e8f0',         // Slate 200
    '--c-bg-page': 'radial-gradient(circle at 50% 0%, #eff6ff 0%, #bae6fd 100%)', // Stronger radial light blue
    '--c-accent-light': '#f0f9ff',   // Sky 50
    '--c-shadow-text': '#bae6fd',    // Sky 200
    '--c-shadow-glow': 'rgba(14, 165, 233, 0.15)',
    '--c-particle': 'rgba(14, 165, 233, 1)',
    
    // Logo Watermark
    '--c-logo-blend': 'multiply',
    '--c-logo-opacity': '0.06',
    '--c-logo-opacity-hover': '0.1',
    '--c-logo-filter': 'grayscale(10%)',
  },
  'github-dark': {
    '--c-primary': '#ffffff',        // Pure White for high contrast text
    '--c-secondary': '#9198a1',      // Muted gray
    '--c-accent': '#3fb950',         // GitHub Green for icons/highlights
    '--c-accent-hover': '#2ea043',   // Darker green for hover
    '--c-on-accent': '#ffffff',      // White text on green accent
    '--c-surface': '#0d1117',        // Very dark gray (almost black) for cards
    '--c-surface-hover': '#161b22',  // Slightly lighter
    '--c-border': '#30363d',         // Dark border
    // Radial gradient simulating the blue top glow fading to pure black
    '--c-bg-page': 'radial-gradient(circle at 50% 0%, #1c2333 0%, #000000 100%)',
    '--c-accent-light': 'rgba(63, 185, 80, 0.15)', // Green tint
    '--c-shadow-text': 'rgba(255, 255, 255, 0.05)', 
    '--c-shadow-glow': 'rgba(63, 185, 80, 0.2)',   // Greenish glow
    '--c-particle': 'rgba(255, 255, 255, 0.4)',      // Subtle white particles

    // Logo Watermark (Inverted for visibility on dark background)
    '--c-logo-blend': 'normal',
    '--c-logo-opacity': '0.1',
    '--c-logo-opacity-hover': '0.15',
    '--c-logo-filter': 'grayscale(100%) invert(1) brightness(1)',
  }
};

export const FONT_THEMES = {
  default: {
    // Inter + PingFang (Modern, Geometric)
    '--font-sans': '"Inter", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "SimHei", "Arial", sans-serif',
    '--tracking-tight': '-0.025em',
    '--tracking-normal': '0em',
    '--font-weight-bold': '700',
  },
  github: {
    // System Fonts (Clean, Engineering feel, similar to GitHub Desktop)
    '--font-sans': '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    '--tracking-tight': '-0.01em', // Slightly less tight than Inter
    '--tracking-normal': '0px',
    '--font-weight-bold': '600', // GitHub often uses semi-bold (600) where others use bold (700)
  }
};

// ============================================================================
// RESUME CONTENT
// ============================================================================

export const RESUME_DATA_CN: ResumeData = {
    "lang": "zh",
    "name": "李楚龙",
    "title": "项目负责人/结构工程师",
    "email": "nglichulong@outlook.com",
    "phone": "13865379680",
    "wechat": "nglichulong",
    "summary": "拥有设计院和光伏行业双重工作经验的结构工程师。在GAD杰地设计集团期间参与多个公建、商业和住宅项目的结构设计，积累了扎实的建筑结构设计基础和参数化建模能力；现于天合光能跟踪支架工程技术中心工作，2024年度成功支持50+全球项目，实施20个重点项目（总容量600MW）。2025年一个季度最高支持项目总容量2000MW，实施项目容量300MW+，独立开发智能跟踪支架分析系统（T-STARS）并获得公司专利。两份工作体现了从建筑结构设计到新能源跟踪支架专业领域的技术深化，以及从单一项目执行到全球项目管理和工具创新的职业发展。",
    "tags": [
        "土木工程", "结构力学", "代尔夫特理工硕士", "雅思7.5", 
        "GAD绿城设计院", "住宅公建项目", "参数化设计", "天合光能", 
        "项目工程负责人", "团队管理", "光伏跟踪支架", "python开发", 
        "软件专著", "有限元理论", "海外派驻", "欧标计算", "美标计算"
    ],
    "labels": {
        "about_me": "个人简介",
        "experience": "工作经历",
        "education": "教育背景",
        "honors": "荣誉成就",
        "skills": "技能特长",
        "core_responsibilities": "核心职责",
        "projects": "参与项目",
        "personal_projects": "个人项目",
        "view_more": "查看详情",
        "collapse": "收起",
        "expand": "展开"
    },
    "education": [
        {
            "degree": "结构工程硕士",
            "school": "荷兰代尔夫特理工大学 （2025年QS排名第49，土木工程QS排名第6）",
            "logo": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20100%22%3E%3Ctext%20x%3D%22150%22%20y%3D%2270%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20font-size%3D%2260%22%20fill%3D%22%2300A6D6%22%20text-anchor%3D%22middle%22%3ETU%20Delft%3C%2Ftext%3E%3C%2Fsvg%3E",
            "year": "2019 九月~2021 七月",
            "gpa": "7.5/10",
            "courses": "结构力学，结构弹塑性分析，有限元计算基本理论，地震结构响应，木结构，钢结构，预应力混凝土，板壳结构理论，生态工程，风险管理",
            "thesis": "使用有限微分法对板壳结构进行建模和分析（python编程，算法设计）"
        },
        {
            "degree": "土木工程学士",
            "school": "英国利物浦大学",
            "logo": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20100%22%3E%3Ctext%20x%3D%22150%22%20y%3D%2240%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-weight%3D%22bold%22%20font-size%3D%2224%22%20fill%3D%22%23031F5C%22%20text-anchor%3D%22middle%22%3EUNIVERSITY%20OF%3C%2Ftext%3E%3Ctext%20x%3D%22150%22%20y%3D%2275%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-weight%3D%22bold%22%20font-size%3D%2232%22%20fill%3D%22%23031F5C%22%20text-anchor%3D%22middle%22%3ELIVERPOOL%3C%2Ftext%3E%3C%2Fsvg%3E",
            "year": "2017 九月~2019 七月",
            "gpa": "7.0/10",
            "thesis": "铆接金属复合材料连接的有限元建模和分析"
        },
        {
            "degree": "土木工程学士",
            "school": "西交利物浦大学（苏州）",
            "logo": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20100%22%3E%3Ctext%20x%3D%22150%22%20y%3D%2260%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20font-size%3D%2248%22%20fill%3D%22%23101820%22%20text-anchor%3D%22middle%22%3EXJTLU%3C%2Ftext%3E%3C%2Fsvg%3E",
            "year": "2015 九月~2017 七月",
            "gpa": "7.0/10"
        }
    ],
    "experience": [
        {
            "company": "天合光能股份有限公司",
            "logo": "https://static.trinasolar.com/sites/default/files/logo_0.png",
            "position": "欧美区域项目工程负责人&光伏支架高级结构工程师",
            "year": "2023 六月~至今",
            "description": "在跟踪支架工程技术中心工作，负责全球项目技术支持、跟踪支架结构设计与优化，以及工具开发。2024年度成功支持50+全球项目，实施20个重点项目（总容量600MW）。2025年一个季度最高支持项目总容量2000MW，实施项目容量300MW+。提供定制化解决方案并平衡成本与质量。熟练掌握美标、欧标等多种规范，对基础设计、施工定位等问题提供专业解决方案。",
            "core_responsibilities": [
                "全球项目技术支持：提供技术方案设计、结构计算和规范校核",
                "跟踪支架结构优化：针对不同项目进行结构参数调整和优化，降低成本",
                "软件开发：独立开发和维护工程计算工具，提升团队工作效率",
                "跨部门协作：与销售、研发、生产等部门紧密配合，确保项目顺利推进",
                "技术标准制定：参与公司技术标准和规范的制定和优化"
            ],
            "projects": [
                {
                    "name": "阿根廷 SAM FAFEAL 230MW 等大型光伏跟踪支架项目",
                    "description": "完成大批量的光伏跟踪支架结构设计和计算，包括地形环境验证，梁柱结构、柱位布置、桩基设计，打桩方案，替代桩基设计，和现场施工的拉拔测试流程设计。同时于客户和项目经理进行沟通交流，确保项目按计划进行，客户满意度高。应对第三方审核要求，提供专业技术支持，提供专业英语计算书和当地规范计算算例。",
                    "images": [
                      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
                      "https://images.unsplash.com/photo-1545208942-e42b2609c122?w=800&q=80"
                    ]
                },
                {
                    "name": "天合光能智能跟踪支架迅捷分析系统（T-STARS）",
                    "description": "独立开发支架计算软件，实现计算快速高效、对钢结构规范的高度自定义、软件操作便捷和结果可靠。具备开放架构，支持大批量重复计算和支架结构自动优化，革新售中技术流程，已形成软件专著，成为售中工程团队首个公司专利。实现大批量的光伏支架结构设计和计算。",
                    "images": [
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
                      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                    ]
                },
                {
                    "name": "AI报价工具数据迁移程序（DT）",
                    "description": "基于Streamlit开发的自动化数据迁移工具，用于将Excel数据批量转换并导入Access数据库，支持多版本兼容与数据库合并。具备直观GUI、实时进度监控、日志记录及错误检测功能，显著提升大量数据处理效率，降低人工操作风险。提供数据给光伏AI报价系统，参与系统开发和需求设计，提高AI训练精度并实现使用少量参数对光伏支架项目实现快速精确报价。",
                    "images": [
                      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                    ]
                },
                {
                    "name": "西班牙团队技术支持与交流",
                    "description": "赴西班牙与当地销售、售前、研发及售中团队进行技术交流，推广T-STARS系统，解决V1P产品工程计算问题，赋能当地团队独立进行工程计算工作。",
                    "images": [
                      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80"
                    ]
                }
            ]
        },
        {
            "company": "GAD 杰地设计集团重庆公司",
            // Use SVG Data URI to ensure logo displays correctly without hotlinking issues
            "logo": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgMTUwIj48dGV4dCB4PSIxNTAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSIxMjAiIGZpbGw9IiNkNzAwMGYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPmdhZDwvdGV4dD48L3N2Zz4=",
            "position": "结构工程师",
            "year": "2021 七月~2023 三月",
            "description": "参与初设阶段的结构选型设计，与建筑团队保持沟通反馈。参与深化阶段的结构的布置和设计，与甲方保持沟通反馈，进行计算和出图。参与项目后期的与施工方和生产厂家合作，提供技术支持。",
            "core_responsibilities": [
                "结构方案设计：参与项目初期的结构选型和方案设计",
                "参数化建模：使用Rhino+Grasshopper进行复杂结构的参数化设计",
                "结构计算：使用YJK、Midas等软件进行结构分析和计算",
                "施工配合：解决施工过程中的技术问题，提供现场技术支持",
                "图纸深化：完成结构施工图设计和深化工作"
            ],
            "projects": [
                {
                    "name": "良渚文化中心项目",
                    "description": "大体量公建项目，负责地上七层结构主体，框剪结构，异形楼板，包括剪力墙选型，柱位布置，负责地上结构墙板柱深化出图，以及楼板立柱配筋图。",
                    "images": [
                       "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
                       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                    ]
                },
                {
                    "name": "昆明俊发东海岸公园项目",
                    "description": "异形景观平台\"花瓣\"结构选型优化，梁系生成优化，Grasshopper参数化建模和计算。",
                    "images": [
                       "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&q=80"
                    ]
                },
                {
                    "name": "杭州小梅山会议中心项目",
                    "description": "大跨度钢结构屋面结构设计，异形飘带钢结构屋面结构设计，运用参数化设计进行梁系布置，和工厂单位进行深化配合。",
                     "images": [
                       "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                    ]
                },
                {
                    "name": "楚肆水街书城结构优化",
                    "description": "中庭屋盖上的钢桁架结构优化，Rhino + Grasshopper全参数化模型，优化弦杆位置，截面尺寸。",
                     "images": [
                       "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                    ]
                },
                {
                    "name": "重庆大学校企合作学术项目",
                    "description": "土木工程学院研究生校外导师，超高层建筑环桁架/伸臂桁架，柱的综合优化，一个 Rhino 加 Grasshopper 和 YJK 联动的参数化分析，利用遗传算法进行优化，多算例检验，验证超高层建筑环桁架/伸臂桁架加强层位置的一般规律。",
                    "images": [
                       "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&q=80"
                    ]
                },
            ]
        }
    ],
    "honors": [
        {
            "title": "2024年度公司级优秀奋斗员工",
            "company": "天合光能股份有限公司",
            "year": "2024年",
            "description": "因在T-STARS系统开发和全球项目支持方面的突出贡献，获得公司级最高荣誉表彰。"
        },
        {
            "title": "软件专著与专利授权",
            "company": "天合光能股份有限公司",
            "year": "2024年",
            "description": "独立开发的智能跟踪支架分析系统（T-STARS）获得公司专利授权，成为售中工程团队首个公司专利。"
        },
        {
            "title": "股权激励计划参与者",
            "company": "天合光能股份有限公司",
            "year": "2025年",
            "description": "因表现优秀，被纳入公司股权激励计划，体现了公司对个人专业能力和贡献的高度认可。"
        }
    ],
    "skills": {
        "专业技能": [
            "公建/住宅/商业/钢结构屋面：结构选型，设计，计算，深化图纸，节点大样绘制",
            "光伏跟踪支架结构设计与优化：熟练掌握跟踪支架产品（1P单驱/双驱/G2、2P推杆/回转）的设计与计算",
            "多规范应用：熟练掌握并应用美标、欧标等多种国际规范进行结构设计与校核",
            "有限元分析：YJK, Midas, 3D3S，SAP2000等结构分析软件",
            "参数化设计：熟练使用Rhino+Grasshopper进行参数化建模与优化设计",
            "软件工具开发：具备独立开发有限元计算软件的能力，熟悉软件架构设计与实现"
        ],
        "编程与开发": [
            "编程语言：精通Python，能够进行算法设计和数据处理",
            "开发工具：熟练使用VScode、Git等开发工具和代码版本控制",
            "二次开发：具备对工程软件进行二次开发的能力",
            "Web开发：掌握HTML、JavaScript等前端技术，了解Django等后端框架",
            "AI工具：海内外主流AI工具使用，提高开发速度"
        ],
        "软技能": [
            "跨文化沟通：流利的英语沟通能力（雅思7.5），能够与欧美团队高效协作",
            "项目管理：具备项目规划、执行和协调能力，能够处理复杂项目",
            "快速学习：能够迅速掌握新技能和新技术，适应不同的工作环境",
            "创新思维：善于发现问题并提出创新解决方案，推动技术进步"
        ]
    },
    "personal_projects": [
      {
        "name": "量化投资分析系统",
        "description": "基于Python的股票策略回测与分析平台。",
        "highlights": [
           "核心功能：集成数据获取、策略回测、结果分析与可视化模块，支持AKShare数据源。",
           "策略引擎：支持移动平均线交叉等策略的多股票并发回测，提供胜率、回撤等关键指标。",
           "技术实现：采用模块化设计，支持参数配置（初始资金、交易成本），便于策略验证与学习。"
        ],
        "images": [
            "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80"
        ]
      },
      {
        "name": "图片水印清除软件",
        "description": "基于OpenCV的批量图片处理工具。",
        "highlights": [
            "算法应用：基于OpenCV inpaint算法实现高效修复，针对AI生成图片水印进行高效优化。",
            "交互设计：使用Streamlit构建Web界面，支持自定义路径、实时对比与批量处理。",
            "工程实践：实现设置持久化、中文路径支持与容错处理，大幅提升图片后期处理效率。"
        ],
        "images": [
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
        ]
      },
      {
        "name": "道路工程路书自动化处理软件",
        "description": "工程数据自动化处理与图表生成应用。",
        "highlights": [
            "数据处理：自动化处理赔偿、拆迁等多类型工程数据，支持多段桩号范围配置。",
            "图表生成：自动分类管理图标，实现Excel数据到图表的快速转换与预览。",
            "效率提升：提供参数化导出设置，辅助设计人员快速输出标准化的路书文件。"
        ],
        "images": [
            "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=800&q=80"
        ]
      }
    ]
};

export const RESUME_DATA_EN: ResumeData = {
    "lang": "en",
    "name": "Li Chulong",
    "title": "Project Leader / Structural Engineer",
    "email": "nglichulong@outlook.com",
    "phone": "13865379680",
    "wechat": "nglichulong",
    "summary": "Structural engineer with dual experience in design institutes and the photovoltaic industry. At GAD Design Group, participated in structural design for multiple public, commercial, and residential projects, building a solid foundation in architectural structural design and parametric modeling. Currently working at Trina Solar Tracker Engineering Technology Center, successfully supporting 50+ global projects, implementing 20 key projects (total capacity 600MW), and independently developing the intelligent tracker analysis system (T-STARS), which obtained a company patent. Both roles reflect technical deepening from architectural structural design to the specialized field of renewable energy trackers, as well as career development from single project execution to global project management and tool innovation.",
    "tags": [
        "Civil Engineering", "Structural Mechanics", "TU Delft Master", "IELTS 7.5", 
        "GAD Design Group", "Residential & Public Projects", "Parametric Design", "Trina Solar", 
        "Project Engineering Lead", "Team Management", "PV Tracker", "Python Development", 
        "Software Copyright", "Finite Element Theory", "Overseas Assignment", "Eurocode", "US Code"
    ],
    "labels": {
        "about_me": "About Me",
        "experience": "Experience",
        "education": "Education",
        "honors": "Honors & Awards",
        "skills": "Skills",
        "core_responsibilities": "Core Responsibilities",
        "projects": "Key Projects",
        "personal_projects": "Personal Projects",
        "view_more": "View More",
        "collapse": "Collapse",
        "expand": "Expand"
    },
    "education": [
        {
            "degree": "MSc Structural Engineering",
            "school": "TU Delft (QS 2025 Rank 49, Civil Eng Rank 6)",
            "logo": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20100%22%3E%3Ctext%20x%3D%22150%22%20y%3D%2270%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20font-size%3D%2260%22%20fill%3D%22%2300A6D6%22%20text-anchor%3D%22middle%22%3ETU%20Delft%3C%2Ftext%3E%3C%2Fsvg%3E",
            "year": "Sep 2019 - Jul 2021",
            "gpa": "7.5/10",
            "courses": "Structural Mechanics, Structural Elasto-plastic Analysis, FEM Basic Theory, Seismic Structural Response, Timber Structures, Steel Structures, Prestressed Concrete, Plate and Shell Theory, Ecological Engineering, Risk Management",
            "thesis": "Modeling and analysis of plate and shell structures using Finite Difference Method (Python programming, algorithm design)"
        },
        {
            "degree": "BEng Civil Engineering",
            "school": "University of Liverpool",
            "logo": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20100%22%3E%3Ctext%20x%3D%22150%22%20y%3D%2240%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-weight%3D%22bold%22%20font-size%3D%2224%22%20fill%3D%22%23031F5C%22%20text-anchor%3D%22middle%22%3EUNIVERSITY%20OF%3C%2Ftext%3E%3Ctext%20x%3D%22150%22%20y%3D%2275%22%20font-family%3D%22Times%20New%20Roman%2C%20serif%22%20font-weight%3D%22bold%22%20font-size%3D%2232%22%20fill%3D%22%23031F5C%22%20text-anchor%3D%22middle%22%3ELIVERPOOL%3C%2Ftext%3E%3C%2Fsvg%3E",
            "year": "Sep 2017 - Jul 2019",
            "gpa": "7.0/10",
            "thesis": "Finite Element Modeling and Analysis of Riveted Metal Composite Connections"
        },
        {
            "degree": "BEng Civil Engineering",
            "school": "Xi'an Jiaotong-Liverpool University (XJTLU)",
            "logo": "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20100%22%3E%3Ctext%20x%3D%22150%22%20y%3D%2260%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20font-size%3D%2248%22%20fill%3D%22%23101820%22%20text-anchor%3D%22middle%22%3EXJTLU%3C%2Ftext%3E%3C%2Fsvg%3E",
            "year": "Sep 2015 - Jul 2017",
            "gpa": "7.0/10"
        }
    ],
    "experience": [
        {
            "company": "Trina Solar",
            "logo": "https://static.trinasolar.com/sites/default/files/logo_0.png",
            "position": "Europe & Americas Region Project Engineering Lead & Senior PV Tracker Structural Engineer",
            "year": "Jun 2023 - Present",
            "description": "Working at the Tracker Engineering Technology Center, responsible for global project technical support, tracker structural design and optimization, and tool development. Supported over 50 projects across Europe and the Americas, implemented 20 key projects (total capacity 600MW), providing customized solutions while balancing cost and quality. Proficient in US, Euro, and other codes, providing professional solutions for foundation design and construction positioning issues.",
            "core_responsibilities": [
                "Global project technical support: Provide technical solution design, structural calculation, and code verification",
                "Tracker structural optimization: Adjust and optimize structural parameters for different projects to reduce costs",
                "Software development: Independently develop and maintain engineering calculation tools to improve team efficiency",
                "Cross-department collaboration: Work closely with sales, R&D, and production departments to ensure smooth project progress",
                "Technical standard formulation: Participate in the formulation and optimization of company technical standards and specifications"
            ],
            "projects": [
                {
                    "name": "Argentina SAM FAFEAL 230MW & other large-scale PV tracker projects",
                    "description": "Completed large-volume PV tracker structural design and calculation, including terrain verification, beam-column structure, column layout, pile foundation design, piling plans, alternative pile design, and on-site pull-out test process design. Communicated with clients and project managers to ensure projects proceeded as planned with high client satisfaction. Responded to third-party audit requirements, providing professional technical support, English calculation reports, and local code calculation examples.",
                    "images": [
                      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
                      "https://images.unsplash.com/photo-1545208942-e42b2609c122?w=800&q=80"
                    ]
                },
                {
                    "name": "Trina Solar Smart Tracker Analysis & Rapid System (T-STARS)",
                    "description": "Independently developed tracker calculation software, achieving fast and efficient calculations, highly customizable steel structure codes, user-friendly operation, and reliable results. Features an open architecture supporting batch repetitive calculations and automatic tracker structural optimization, revolutionizing the pre-sales technical process. Obtained software copyright and became the first company patent for the pre-sales engineering team. Enables large-scale PV tracker structural design and calculation.",
                    "images": [
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
                      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                    ]
                },
                {
                    "name": "AI Quotation Tool Data Transfer Program (DT)",
                    "description": "Automated data migration tool based on Streamlit for batch converting and importing Excel data into Access databases, supporting multi-version compatibility and database merging. Features intuitive GUI, real-time progress monitoring, logging, and error detection, significantly improving data processing efficiency and reducing manual risks. Supplied data for the PV AI quotation system, participated in system development and requirement design, improved AI training accuracy, and enabled fast and accurate quotation for PV tracker projects using minimal parameters.",
                    "images": [
                      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                    ]
                },
                {
                    "name": "Spain Team Technical Support & Exchange",
                    "description": "Traveled to Spain for technical exchanges with local sales, pre-sales, R&D, and pre-sales teams, promoting the T-STARS system, solving V1P product engineering calculation issues, and empowering the local team to conduct independent engineering calculations.",
                    "images": [
                      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80"
                    ]
                }
            ]
        },
        {
            "company": "GAD Design Group (Chongqing)",
            "logo": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgMTUwIj48dGV4dCB4PSIxNTAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSIxMjAiIGZpbGw9IiNkNzAwMGYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPmdhZDwvdGV4dD48L3N2Zz4=",
            "position": "Structural Engineer",
            "year": "Jul 2021 - Mar 2023",
            "description": "Participated in structural selection design during the preliminary stage, maintaining communication with the architectural team. Participated in structural layout and design during the deepening stage, communicating with the client, performing calculations, and producing drawings. Collaborated with construction parties and manufacturers in the later stages, providing technical support.",
            "core_responsibilities": [
                "Structural scheme design: Participated in structural selection and design in the early stages",
                "Parametric modeling: Using Rhino+Grasshopper for complex structural parametric design",
                "Structural calculation: Using YJK, Midas and other software for structural analysis and calculation",
                "Construction coordination: Solving technical problems during construction, providing on-site support",
                "Drawing deepening: Completing structural construction drawing design and deepening work"
            ],
            "projects": [
                {
                    "name": "Liangzhu Culture Center",
                    "description": "Large-scale public building project. Responsible for the main structure of seven stories above ground, frame-shear wall structure, irregular floor slabs, including shear wall selection, column layout, deepening drawings for above-ground structural walls/slabs/columns, and floor/column reinforcement drawings.",
                    "images": [
                       "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
                       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                    ]
                },
                {
                    "name": "Kunming Junfa East Coast Park",
                    "description": "Structural selection optimization for irregular landscape platform 'Petal', beam system generation optimization, Grasshopper parametric modeling and calculation.",
                    "images": [
                       "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&q=80"
                    ]
                },
                {
                    "name": "Hangzhou Xiaomeishan Conference Center",
                    "description": "Large-span steel roof structure design, irregular ribbon steel roof structure design, using parametric design for beam system layout, coordinating with factory units for deepening.",
                    "images": [
                       "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                    ]
                },
                {
                    "name": "Chusi Water Street Book City Structural Optimization",
                    "description": "Optimization of steel truss structure on atrium roof, Rhino + Grasshopper fully parametric model, optimizing chord positions and section sizes.",
                    "images": [
                       "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                    ]
                },
                {
                    "name": "Chongqing University School-Enterprise Cooperation Academic Project",
                    "description": "Off-campus mentor for graduate students in Civil Engineering. Comprehensive optimization of belt truss/outrigger truss and columns for super high-rise buildings. A parametric analysis linking Rhino + Grasshopper and YJK, using genetic algorithms for optimization, verified by multiple examples to validate general laws for belt/outrigger truss strengthening layer positions in super high-rise buildings.",
                    "images": [
                       "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&q=80"
                    ]
                },
            ]
        }
    ],
    "honors": [
        {
            "title": "2024 Company-level Outstanding Employee",
            "company": "Trina Solar",
            "year": "2024",
            "description": "Received top company honor for outstanding contributions in T-STARS system development and global project support."
        },
        {
            "title": "Software Copyright & Patent Authorization",
            "company": "Trina Solar",
            "year": "2024",
            "description": "The independently developed intelligent tracker analysis system (T-STARS) obtained company patent authorization, becoming the first for the pre-sales engineering team."
        },
        {
            "title": "Equity Incentive Plan Participant",
            "company": "Trina Solar",
            "year": "2025",
            "description": "Included in the 2025 equity incentive plan for excellent performance, reflecting high recognition of professional ability and contribution."
        }
    ],
    "skills": {
        "Professional Skills": [
            "Public/Residential/Commercial/Steel Roof: Structural selection, design, calculation, deepening drawings, detail drawing",
            "PV tracker structural design & optimization: Proficient in tracker products (1P single/dual drive/G2, 2P push rod/slewing drive) design and calculation",
            "Multi-code application: Proficient in US, Euro, and other international codes for structural design and verification",
            "Finite Element Analysis: YJK, Midas, 3D3S, SAP2000, etc.",
            "Parametric Design: Proficient in Rhino+Grasshopper for parametric modeling and optimization",
            "Software Tool Development: Capable of independent development of finite element calculation software, familiar with software architecture"
        ],
        "Programming & Development": [
            "Languages: Proficient in Python for algorithm design and data processing",
            "Tools: Proficient in VSCode, Git for development and version control",
            "Secondary Development: Capable of secondary development for engineering software",
            "Web Development: HTML, JavaScript, basic Django",
            "AI Tools: Proficient in using mainstream AI tools to improve development speed"
        ],
        "Soft Skills": [
            "Cross-cultural Communication: Fluent English (IELTS 7.5), capable of efficient collaboration with European and American teams",
            "Project Management: Capable of project planning, execution, and coordination for complex projects",
            "Rapid Learning: Quickly master new skills and technologies, adapting to different work environments",
            "Innovative Thinking: Good at discovering problems and proposing innovative solutions to drive technical progress"
        ]
    },
    "personal_projects": [
      {
        "name": "Quantitative Investment Analysis System",
        "description": "Python-based stock strategy backtesting & analysis platform.",
        "highlights": [
           "Core Functions: Integrated data acquisition, strategy backtesting, result analysis & visualization (AKShare).",
           "Strategy Engine: Supports moving average crossover strategies, etc., providing win rate, drawdown, and other key indicators.",
           "Implementation: Modular design, supports parameter configuration (initial capital, transaction costs) for easy strategy verification."
        ],
        "images": [
            "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80"
        ]
      },
      {
        "name": "Image Watermark Removal Software",
        "description": "Batch image processing tool based on OpenCV.",
        "highlights": [
            "Algorithm: Uses OpenCV inpaint algorithm for efficient repair, optimized for AI-generated image watermarks.",
            "Interaction: Built with Streamlit Web interface, supports custom paths, real-time comparison, and batch processing.",
            "Engineering: Implemented settings persistence, Chinese path support, and error handling, significantly improving post-processing efficiency."
        ],
        "images": [
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
        ]
      },
      {
        "name": "Road Engineering Roadbook Automation Software",
        "description": "Engineering data automation & chart generation application.",
        "highlights": [
            "Data Processing: Automated processing of compensation/demolition data, supports multi-segment station configuration.",
            "Chart Generation: Auto-categorizes icons, enabling fast conversion and preview from Excel data to charts.",
            "Efficiency: Provides parameterized export settings, assisting designers in quickly outputting standardized roadbook files."
        ],
        "images": [
            "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=800&q=80"
        ]
      }
    ]
};

// ============================================================================
// AI ASSISTANT CONFIGURATION (BACKEND)
// ============================================================================

export const AI_CONFIG = {
  // Toggle between providers: 'google' | 'volcano'
  provider: 'volcano',

  // Google Gemini Configuration
  google: {
    // API Key for local development (optional if not using process.env.API_KEY)
    apiKey: "AIzaSyCevV3eJwzOyECJjJMHXmvjc3zswAKb2dM", 
    model: 'gemini-2.5-flash',
  },

  // Volcano Engine (Ark) OpenAI Compatible API Configuration
  volcano: {
    apiKey: "b88edfc8-b121-4035-bcd4-8d923668c1c1", 
    baseURL: "https://ark.cn-beijing.volces.com/api/v3",
    model: "ep-20251204131532-pnw24",
  },

  // Automatically generates a system prompt based on the resume data above.
  getSystemInstruction: (data: ResumeData): string => {
    const resumeString = JSON.stringify(data, null, 2);
    return `
      You are an intelligent and professional AI assistant for Li Chulong's personal resume website.
      
      Your Role:
      - Answer visitor questions accurately based on the provided resume data.
      - The current language of the resume data is ${data.lang}. Please answer in the same language as the user's question, but prioritize the language of the data context if ambiguous.
      - **Knowledge Expansion:** You are authorized and encouraged to use your general knowledge to provide context and explanations regarding:
        * **Companies:** Provide background on companies mentioned (e.g., Trina Solar/天合光能, GAD Design Group), their industry standing, and main business areas.
        * **Education:** Provide context on universities mentioned (e.g., TU Delft, University of Liverpool, XJTLU), such as their reputation in engineering or global rankings.
        * **Industry Concepts:** Explain technical terms and industry concepts found in the resume (e.g., Photovoltaics, Structural Engineering, Finite Element Analysis, Parametric Design, tracking brackets) to help non-expert visitors understand the work.
      
      - Maintain a polite, professional, and enthusiastic tone, reflecting Li Chulong's engineering expertise.
      - If asked about contact info, refer them to the contact section or provide the email/phone from the data.
      - If asked about topics completely unrelated to the resume or professional background (e.g., general daily life questions, cooking, entertainment not related to the industry), politely state that you only have information regarding his professional background.
      - Keep answers concise and easy to read.
      
      Resume Data:
      ${resumeString}
    `;
  }
};