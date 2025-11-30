import { ResumeData } from './types';

// ============================================================================
// THEME CONFIGURATION
// ============================================================================

// Automatic Theme Switching Configuration
export const ENABLE_AUTO_THEME_SWITCH = true; // Set to false to force use of SELECTED_THEME below
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
    '--c-surface': '#ffffff',        // White
    '--c-surface-hover': '#ffffff',  // White
    '--c-border': '#e2e8f0',         // Slate 200
    '--c-bg-page': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    '--c-accent-light': '#f0f9ff',   // Sky 50
    '--c-shadow-text': '#bae6fd',    // Sky 200
    '--c-shadow-glow': 'rgba(14, 165, 233, 0.15)',
    '--c-particle': 'rgba(14, 165, 233, 1)',
  },
  'github-dark': {
    '--c-primary': '#e6edf3',        // GitHub FG Default
    '--c-secondary': '#848d97',      // GitHub FG Muted
    '--c-accent': '#2f81f7',         // GitHub Accent Blue
    '--c-accent-hover': '#58a6ff',   // GitHub Accent Blue Hover
    '--c-surface': '#161b22',        // GitHub Canvas Overlay
    '--c-surface-hover': '#1f242c',  // Slightly lighter
    '--c-border': '#30363d',         // GitHub Border Default
    '--c-bg-page': '#0d1117',        // GitHub Canvas Default
    '--c-accent-light': 'rgba(56, 139, 253, 0.15)', // Accent Subtle
    '--c-shadow-text': 'rgba(255, 255, 255, 0.05)', // Very subtle background text
    '--c-shadow-glow': 'rgba(0, 0, 0, 0.5)',        // Darker shadows
    '--c-particle': 'rgba(47, 129, 247, 1)',
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

export const RESUME_DATA: ResumeData = {
    "lang": "zh",
    "name": "李楚龙",
    "title": "项目负责人/结构工程师",
    "email": "nglichulong@outlook.com",
    "phone": "13865379680",
    "wechat": "nglichulong",
    "summary": "拥有设计院和光伏行业双重工作经验的结构工程师。在GAD杰地设计集团期间参与多个公建、商业和住宅项目的结构设计，积累了扎实的建筑结构设计基础和参数化建模能力；现于天合光能跟踪支架工程技术中心工作，成功支持50+全球项目，实施20个项目（总容量600MW），独立开发智能支架分析系统（T-STARS）并获得公司专利。两份工作体现了从建筑结构设计到新能源支架专业领域的技术深化，以及从单一项目执行到全球项目管理和工具创新的职业发展。",
    "tags": [
        "土木工程", "结构力学", "代尔夫特理工硕士", "雅思7.5", 
        "GAD绿城设计院", "住宅公建项目", "参数化设计", "天合光能", 
        "项目工程负责人", "团队管理", "光伏支架", "python开发", 
        "软件专著", "有限元理论", "海外派驻", "欧标计算", "美标计算"
    ],
    "labels": {
        "about_me": "个人简介",
        "experience": "工作经历",
        "education": "教育背景",
        "honors": "公司荣誉与激励",
        "skills": "技能特长",
        "core_responsibilities": "核心职责",
        "projects": "参与项目",
        "view_more": "查看详情",
        "collapse": "收起",
        "expand": "展开"
    },
    "education": [
        {
            "degree": "结构工程硕士",
            "school": "荷兰代尔夫特理工大学 （2025年QS排名第49，土木工程QS排名第6）",
            "year": "2019 九月~2021 七月",
            "gpa": "7.5/10",
            "courses": "结构力学，结构弹塑性分析，有限元计算基本理论，地震结构响应，木结构，钢结构，预应力混凝土，板壳结构理论，生态工程，风险管理",
            "thesis": "使用有限微分法对板壳结构进行建模和分析（python编程，算法设计）"
        },
        {
            "degree": "土木工程学士",
            "school": "英国利物浦大学",
            "year": "2017 九月~2019 七月",
            "gpa": "7.0/10",
            "thesis": "铆接金属复合材料连接的有限元建模和分析"
        },
        {
            "degree": "土木工程学士",
            "school": "西交利物浦大学（苏州）",
            "year": "2015 九月~2017 七月",
            "gpa": "7.0/10"
        }
    ],
    "experience": [
        {
            "company": "天合光能股份有限公司",
            "logo": "https://static.trinasolar.com/sites/default/files/logo_0.png",
            "position": "欧洲/南美/北美区项目工程负责人&结构工程师",
            "year": "2023 六月~至今",
            "description": "在跟踪支架工程技术中心工作，负责全球项目技术支持、支架结构设计与优化，以及工具开发。支持横跨欧美50多个项目，实施20个重点项目（总容量600MW），提供定制化解决方案并平衡成本与质量。熟练掌握美标、欧标等多种规范，对基础设计、施工定位等问题提供专业解决方案。",
            "core_responsibilities": [
                "全球项目技术支持：提供技术方案设计、结构计算和规范校核",
                "支架结构优化：针对不同项目进行结构参数调整和优化，降低成本",
                "软件开发：独立开发和维护工程计算工具，提升团队工作效率",
                "跨部门协作：与销售、研发、生产等部门紧密配合，确保项目顺利推进",
                "技术标准制定：参与公司技术标准和规范的制定和优化"
            ],
            "projects": [
                {
                    "name": "阿根廷 SAM FAFEAL 230MW 等大型光伏支架项目",
                    "description": "完成大批量的光伏支架结构设计和计算，包括地形环境验证，梁柱结构、柱位布置、桩基设计，打桩方案，替代桩基设计，和现场施工的拉拔测试流程设计。同时于客户和项目经理进行沟通交流，确保项目按计划进行，客户满意度高。应对第三方审核要求，提供专业技术支持，提供专业英语计算书和当地规范计算算例。"
                },
                {
                    "name": "天合光能智能支架迅捷分析系统（T-STARS）",
                    "description": "独立开发支架计算软件，实现计算快速高效、高度自定义、操作便捷和结果可靠。具备开放架构，支持大批量重复计算和结构优化，革新售中技术流程，已形成软件专著，成为售中工程团队首个公司专利。"
                },
                {
                    "name": "AI报价工具数据迁移程序（DT）",
                    "description": "为欧洲团队开发数据迁移程序，解决大批量数据资产化难题，保障B级项目顺利推进，确保AI训练顺利进行。"
                },
                {
                    "name": "西班牙团队技术支持与交流",
                    "description": "赴西班牙与当地销售、售前、研发及售中团队进行技术交流，推广T-STARS系统，解决V1P产品工程计算问题，赋能当地团队独立进行工程计算工作。"
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
                    "description": "大体量公建项目，负责地上七层结构主体，框剪结构，异形楼板，包括剪力墙选型，柱位布置，负责地上结构墙板柱深化出图，以及楼板立柱配筋图。"
                },
                {
                    "name": "昆明俊发东海岸公园项目",
                    "description": "异形景观平台\"花瓣\"结构选型优化，梁系生成优化，Grasshopper参数化建模和计算。"
                },
                {
                    "name": "杭州小梅山会议中心项目",
                    "description": "大跨度钢结构屋面结构设计，异形飘带钢结构屋面结构设计，运用参数化设计进行梁系布置，和工厂单位进行深化配合。"
                },
                {
                    "name": "楚肆水街书城结构优化",
                    "description": "中庭屋盖上的钢桁架结构优化，Rhino + Grasshopper全参数化模型，优化弦杆位置，截面尺寸。"
                },
                {
                    "name": "重庆大学校企合作学术项目",
                    "description": "土木工程学院研究生校外导师，超高层建筑环桁架/伸臂桁架，柱的综合优化，一个 Rhino 加 Grasshopper 和 YJK 联动的参数化分析，利用遗传算法进行优化，多算例检验，验证超高层建筑环桁架/伸臂桁架加强层位置的一般规律。"
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
            "description": "独立开发的智能支架分析系统（T-STARS）获得公司专利授权，成为售中工程团队首个公司专利。"
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
            "光伏支架结构设计与优化：熟练掌握支架产品（1P单驱/双驱/G2、2P推杆/回转）的设计与计算",
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
    }
};