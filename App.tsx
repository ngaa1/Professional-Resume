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
import { Icons } from './components/Icon';

function App() {
  const { labels, experience, education, honors, skills } = RESUME_DATA;
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
    <div className="min-h-screen pb-20 print:bg-white print:pb-0 relative transition-colors duration-300">
      <Header data={RESUME_DATA} toggleTheme={toggleTheme} currentTheme={currentTheme} />

      <main className="max-w-5xl mx-auto px-4 md:px-8 space-y-12 relative z-20 print:mt-0 print:px-0">
        
        {/* Experience Section */}
        <section>
          <SectionTitle title={labels.experience} icon={Icons.Briefcase} />
          <div className="mt-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 page-break">
          {/* Education */}
          <section className="bg-surface rounded-2xl border border-border p-6 md:p-8 h-full shadow-sm hover:shadow-glow hover:border-accent/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent-light rounded-lg text-accent">
                    <Icons.GraduationCap className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-primary">{labels.education}</h2>
            </div>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-border last:border-0 pb-2 group">
                  <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-surface border-2 border-accent rounded-full z-10"></span>
                  
                  {/* Watermark Logo */}
                  {edu.logo && (
                    <div 
                      className="absolute right-[-10px] top-[-10px] md:right-0 md:top-0 pointer-events-none select-none z-0 transition-all duration-300 opacity-[var(--c-logo-opacity)] group-hover:opacity-[var(--c-logo-opacity-hover)]"
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
                    <h3 className="font-bold text-primary text-lg pr-12 md:pr-0">{edu.school}</h3>
                    <div className="flex justify-between items-center text-sm font-bold text-secondary mt-1">
                        <span>{edu.degree}</span>
                        <span className="bg-accent-light text-accent px-2 py-0.5 rounded text-xs border border-border">{edu.year}</span>
                    </div>
                  </div>
                  <div className="relative z-10">
                      {edu.gpa && (
                        <p className="text-sm text-secondary mt-2 font-medium">GPA: <span className="font-bold text-primary">{edu.gpa}</span></p>
                      )}
                      {edu.thesis && (
                        <p className="text-sm text-secondary mt-2">
                          <span className="font-bold text-secondary/60 text-xs uppercase tracking-wide">Thesis:</span> {edu.thesis}
                        </p>
                      )}
                      {edu.courses && (
                          <p className="text-sm text-secondary mt-2 leading-relaxed">
                              <span className="font-bold text-secondary/60 text-xs uppercase tracking-wide mr-1">Core Courses:</span>
                              {edu.courses}
                          </p>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Honors */}
          <section className="bg-surface rounded-2xl border border-border p-6 md:p-8 h-full shadow-sm hover:shadow-glow hover:border-accent/30 transition-all duration-300">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent-light rounded-lg text-accent">
                    <Icons.Award className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-primary">{labels.honors}</h2>
            </div>

            <div className="space-y-4">
              {honors.map((honor, index) => (
                <div key={index} className="group p-5 rounded-xl bg-surface border border-border hover:border-accent/50 hover:shadow-glow transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-primary text-sm md:text-base group-hover:text-accent transition-colors">{honor.title}</h3>
                    <span className="text-xs font-bold text-accent bg-accent-light border border-border px-2 py-0.5 rounded-full whitespace-nowrap">{honor.year}</span>
                  </div>
                  <p className="text-xs font-bold text-secondary/60 uppercase tracking-wide mb-2">{honor.company}</p>
                  <p className="text-sm text-secondary leading-relaxed font-medium">
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

        {/* World Map Section */}
        <WorldMapSection />

      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-8 mt-16 text-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>
        <p className="text-secondary/60 text-sm font-bold">
          © {new Date().getFullYear()} {RESUME_DATA.name}
        </p>
      </footer>

      {/* AI ChatBot */}
      <ChatBot />

      {/* Simple Scroll Button */}
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
