
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

export const RESUME_DATA: ResumeData = {
    "lang": "zh",
    "name": "李楚龙",
    "title": "项目负责人/结构工程师",
    "email": "nglichulong@outlook.com",
    "phone": "13865379680",
    "wechat": "nglichulong",
    "summary": "拥有设计院和光伏行业双重工作经验的结构工程师。在GAD杰地设计集团期间参与多个公建、商业和住宅项目的结构设计，积累了扎实的建筑结构设计基础和参数化建模能力；现于天合光能跟踪支架工程技术中心工作，成功支持50+全球项目，实施20个重点项目（总容量600MW），独立开发智能支架分析系统（T-STARS）并获得公司专利。两份工作体现了从建筑结构设计到新能源支架专业领域的技术深化，以及从单一项目执行到全球项目管理和工具创新的职业发展。",
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
        "personal_projects": "个人兴趣与独立开发",
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
    },
    "personal_projects": [
      {
        "name": "量化投资分析系统",
        "description": "基于Python构建的金融数据分析与回测框架。利用Pandas清洗与处理海量交易数据，实现多因子选股策略与趋势跟踪算法的历史回测，并通过可视化图表展示策略收益风险特征，探索自动化交易的可能性。"
      },
      {
        "name": "计算机视觉与图像处理工具",
        "description": "利用OpenCV与Deep Learning技术开发的图像处理应用。实现了特定场景下的目标检测与图像增强算法，可应用于工程图纸识别与预处理，提升了非结构化数据的提取效率。"
      },
      {
        "name": "道路工程路书自动化处理软件",
        "description": "针对道路工程内业痛点开发的自动化工具。通过解析GPS轨迹数据与工程参数，自动生成标准化的路书文档与图表，大幅缩短了人工排版时间，实现了从原始数据到最终报告的自动化工作流。"
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
  getSystemInstruction: (): string => {
    const resumeString = JSON.stringify(RESUME_DATA, null, 2);
    return `
      You are an intelligent and professional AI assistant for Li Chulong's personal resume website.
      
      Your Role:
      - Answer visitor questions accurately based on the provided resume data.
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
