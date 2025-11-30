import { useState, useEffect } from 'react';
import { RESUME_DATA, THEMES, SELECTED_THEME } from './constants';
import Header from './components/Header';
import SectionTitle from './components/SectionTitle';
import ExperienceItem from './components/ExperienceItem';
import SkillsSection from './components/SkillsSection'; 
import { Icons } from './components/Icon';

function App() {
  const { labels, experience, education, honors, skills } = RESUME_DATA;
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Apply Theme
  useEffect(() => {
    const root = document.documentElement;
    const themeParams = THEMES[SELECTED_THEME];
    
    // Apply each CSS variable to the root element
    Object.entries(themeParams).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
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
      <Header data={RESUME_DATA} />

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

        {/* Skills Section */}
        <section className="page-break">
           <SectionTitle title={labels.skills} icon={Icons.Code} />
           <SkillsSection skills={skills} />
        </section>

        {/* Education & Honors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 page-break">
          {/* Education */}
          <section className="bg-surface rounded-2xlkz border border-border p-6 md:p-8 h-full shadow-sm hover:shadow-glow hover:border-accent/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent-light rounded-lg text-accent">
                    <Icons.GraduationCap className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-primary">{labels.education}</h2>
            </div>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-border last:border-0 pb-2">
                  <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-surface border-2 border-accent rounded-full"></span>
                  <div className="mb-1">
                    <h3 className="font-bold text-primary text-lg">{edu.school}</h3>
                    <div className="flex justify-between items-center text-sm font-bold text-secondary mt-1">
                        <span>{edu.degree}</span>
                        <span className="bg-accent-light text-accent px-2 py-0.5 rounded text-xs border border-border">{edu.year}</span>
                    </div>
                  </div>
                  {edu.gpa && (
                     <p className="text-sm text-secondary mt-2 font-medium">GPA: <span className="font-bold text-primary">{edu.gpa}</span></p>
                  )}
                  {edu.thesis && (
                    <p className="text-sm text-secondary mt-2">
                      <span className="font-bold text-secondary/60 text-xs uppercase tracking-wide">Thesis:</span> {edu.thesis}
                    </p>
                  )}
                  {edu.courses && (
                      <p className="text-xs text-secondary/80 mt-3 leading-relaxed bg-accent-light p-3 rounded-lg border border-border font-medium">
                          <span className="text-primary font-bold block mb-1">Core Courses:</span>
                          {edu.courses}
                      </p>
                  )}
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
                    <span className="text-[10px] font-bold text-white bg-secondary group-hover:bg-accent px-2 py-0.5 rounded-full transition-colors">{honor.year}</span>
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

      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-8 mt-16 text-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>
        <p className="text-secondary/60 text-sm font-bold">
          © {new Date().getFullYear()} {RESUME_DATA.name}
        </p>
      </footer>

      {/* Simple Scroll Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent-hover hover:shadow-glow transition-all duration-300 transform z-50 print:hidden flex items-center justify-center gap-2 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <Icons.ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}

export default App;