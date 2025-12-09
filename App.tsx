
import { useState, useEffect } from 'react';
import { 
  RESUME_DATA, 
  THEMES, 
  FONT_THEMES, 
  ENABLE_AUTO_THEME_SWITCH,
  DAY_START_HOUR,
  DAY_END_HOUR,
  SELECTED_THEME,
  SELECTED_FONT_THEME
} from './constants';
import Header from './components/Header';
import SectionTitle from './components/SectionTitle';
import ExperienceItem from './components/ExperienceItem';
import SkillsSection from './components/SkillsSection'; 
import ChatBot from './components/ChatBot';
import WorldMapSection from './components/WorldMapSection';
import PersonalProjectsSection from './components/PersonalProjectsSection';
import { Icons } from './components/Icon';

function App() {
  const { labels, experience, education, honors, skills, personal_projects } = RESUME_DATA;
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'github-dark'>('light');
  const [isAutoTheme, setIsAutoTheme] = useState(ENABLE_AUTO_THEME_SWITCH);

  // Apply Theme Function
  const applyTheme = (themeKey: 'light' | 'github-dark') => {
    const fontKey: 'default' | 'github' = SELECTED_FONT_THEME;
    const root = document.documentElement;

    // Apply Color Theme
    const themeParams = THEMES[themeKey];
    Object.entries(themeParams).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply Font Theme
    const fontParams = FONT_THEMES[fontKey];
    Object.entries(fontParams).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    setCurrentTheme(themeKey);
  };

  // Toggle Theme Function
  const toggleTheme = () => {
    setIsAutoTheme(false);
    const newTheme = currentTheme === 'light' ? 'github-dark' : 'light';
    applyTheme(newTheme);
  };

  // Automatic Theme Switching Logic based on Time of Day
  useEffect(() => {
    if (ENABLE_AUTO_THEME_SWITCH && isAutoTheme) {
      const checkTheme = () => {
        const hour = new Date().getHours();
        
        // Define Daytime based on constants
        const isDayTime = hour >= DAY_START_HOUR && hour < DAY_END_HOUR;
        const newTheme = isDayTime ? 'light' : 'github-dark';
        
        if (newTheme !== currentTheme) {
          applyTheme(newTheme);
        }
      };

      // Apply immediately on mount
      checkTheme();

      // Check every minute to update if the time boundary is crossed while open
      const intervalId = setInterval(checkTheme, 60000);

      return () => clearInterval(intervalId);
    } else {
      // Apply selected theme if auto-switch is disabled or overridden
      applyTheme(currentTheme);
    }
  }, [isAutoTheme, currentTheme]);

  // Initialize theme on mount
  useEffect(() => {
    if (ENABLE_AUTO_THEME_SWITCH) {
      const hour = new Date().getHours();
      const isDayTime = hour >= DAY_START_HOUR && hour < DAY_END_HOUR;
      applyTheme(isDayTime ? 'light' : 'github-dark');
    } else {
      applyTheme(SELECTED_THEME);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20 print:pb-0 relative transition-colors duration-300 print:min-h-0">
      <Header data={RESUME_DATA} toggleTheme={toggleTheme} currentTheme={currentTheme} />

      <main className="max-w-5xl mx-auto px-4 md:px-8 space-y-12 relative z-20 print:px-0 print:space-y-8 print:max-w-full">
        
        {/* Experience Section */}
        <section>
          <SectionTitle title={labels.experience} icon={Icons.Briefcase} />
          <div className="mt-6 print:mt-4">
            {experience.map((item, index) => (
              <ExperienceItem 
                key={index} 
                data={item} 
                labels={labels} 
                isFirst={index === 0}
              />
            ))}
          </div>
        </section>

        {/* Education & Honors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 page-break print:gap-4 print:block">
          {/* Education */}
          <section className="bg-surface rounded-2xl border border-border p-6 md:p-8 h-full shadow-sm hover:shadow-glow hover:border-accent/30 transition-all duration-300 print:border-none print:p-0 print:shadow-none print:mb-8 print:h-auto">
            <div className="flex items-center gap-3 mb-6 print:mb-4">
                <div className="p-2 bg-accent-light rounded-lg text-accent print:hidden">
                    <Icons.GraduationCap className="w-5 h-5" />
                </div>
                {/* Print Only Icon */}
                <Icons.GraduationCap className="w-6 h-6 text-accent hidden print:block" />
                <h2 className="text-xl font-bold text-primary print:text-black">{labels.education}</h2>
            </div>
            
            <div className="space-y-8 print:space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-border last:border-0 pb-2 group print:border-gray-300">
                  <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-surface border-2 border-accent rounded-full z-10 print:bg-black print:border-black"></span>
                  
                  {/* Watermark Logo - Less visible in print */}
                  {edu.logo && (
                    <div 
                      className="absolute right-[-10px] top-[-10px] md:right-0 md:top-0 pointer-events-none select-none z-0 transition-all duration-300 opacity-[var(--c-logo-opacity)] group-hover:opacity-[var(--c-logo-opacity-hover)] print:opacity-[0.05]"
                      style={{
                        mixBlendMode: 'var(--c-logo-blend)' as any,
                        filter: 'var(--c-logo-filter)'
                      }}
                    >
                      <img 
                        src={edu.logo} 
                        alt={`${edu.school} Logo`} 
                        className="w-[140px] md:w-[180px] h-auto object-contain" 
                      />
                    </div>
                  )}

                  <div className="relative z-10 mb-1">
                    <h3 className="font-bold text-primary text-lg pr-12 md:pr-0 print:text-black">{edu.school}</h3>
                    <div className="flex justify-between items-center text-sm font-bold text-secondary mt-1 print:text-gray-700">
                        <span>{edu.degree}</span>
                        <span className="bg-accent-light text-accent px-2 py-0.5 rounded text-xs border border-border print:border-gray-300 print:text-black print:bg-transparent print:px-0">{edu.year}</span>
                    </div>
                  </div>
                  <div className="relative z-10">
                      {edu.gpa && (
                        <p className="text-sm text-secondary mt-2 font-medium print:text-black">GPA: <span className="font-bold text-primary print:text-black">{edu.gpa}</span></p>
                      )}
                      {edu.thesis && (
                        <p className="text-sm text-secondary mt-2 print:text-gray-700">
                          <span className="font-bold text-secondary/60 text-xs uppercase tracking-wide print:text-black">Thesis:</span> {edu.thesis}
                        </p>
                      )}
                      {edu.courses && (
                          <p className="text-sm text-secondary mt-2 leading-relaxed print:text-gray-700">
                              <span className="font-bold text-secondary/60 text-xs uppercase tracking-wide mr-1 print:text-black">Core Courses:</span>
                              {edu.courses}
                          </p>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Honors */}
          <section className="bg-surface rounded-2xl border border-border p-6 md:p-8 h-full shadow-sm hover:shadow-glow hover:border-accent/30 transition-all duration-300 print:border-none print:p-0 print:shadow-none print:h-auto">
             <div className="flex items-center gap-3 mb-6 print:mb-4">
                <div className="p-2 bg-accent-light rounded-lg text-accent print:hidden">
                    <Icons.Award className="w-5 h-5" />
                </div>
                <Icons.Award className="w-6 h-6 text-accent hidden print:block" />
                <h2 className="text-xl font-bold text-primary print:text-black">{labels.honors}</h2>
            </div>

            <div className="space-y-4">
              {honors.map((honor, index) => (
                <div key={index} className="group p-5 rounded-xl bg-surface border border-border hover:border-accent/50 hover:shadow-glow transition-all print:border-none print:p-0 print:shadow-none print:mb-4 print:bg-transparent">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-primary text-sm md:text-base group-hover:text-accent transition-colors print:text-black">{honor.title}</h3>
                    <span className="text-xs font-bold text-accent bg-accent-light border border-border px-2 py-0.5 rounded-full whitespace-nowrap print:bg-transparent print:text-black print:border-gray-300 print:px-0">{honor.year}</span>
                  </div>
                  <p className="text-xs font-bold text-secondary/60 uppercase tracking-wide mb-2 print:text-black">{honor.company}</p>
                  <p className="text-sm text-secondary leading-relaxed font-medium print:text-gray-700">
                    {honor.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Skills Section */}
        <section className="page-break">
           <SectionTitle title={labels.skills} icon={Icons.Code} />
           <SkillsSection skills={skills} />
        </section>

        {/* Personal Projects Section */}
        <section className="page-break">
           <SectionTitle title={labels.personal_projects} icon={Icons.Cpu} />
           <PersonalProjectsSection projects={personal_projects} />
        </section>

        {/* World Map Section - Hidden in Print */}
        <WorldMapSection />

      </main>

      {/* Footer - Simplified for Print */}
      <footer className="max-w-5xl mx-auto px-8 mt-16 text-center print:mt-8 print:px-0">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8 print:bg-gray-200"></div>
        <p className="text-secondary/60 text-sm font-bold print:text-black">
          © {new Date().getFullYear()} {RESUME_DATA.name}
        </p>
      </footer>

      {/* AI ChatBot - Hidden in Print */}
      <div className="print:hidden">
        <ChatBot />
      </div>

      {/* Simple Scroll Button - Hidden in Print */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 bg-accent text-on-accent rounded-full shadow-lg hover:bg-accent-hover hover:shadow-glow hover:scale-110 transition-all duration-300 transform z-50 print:hidden flex items-center justify-center gap-2 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <Icons.ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;
