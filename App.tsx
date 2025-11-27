import React, { useState, useEffect } from 'react';
import { RESUME_DATA } from './constants';
import Header from './components/Header';
import SectionTitle from './components/SectionTitle';
import ExperienceItem from './components/ExperienceItem';
import SkillCard from './components/SkillCard';
import { Icons } from './components/Icon';

function App() {
  const { labels, experience, education, honors, skills } = RESUME_DATA;
  const [showScrollTop, setShowScrollTop] = useState(false);

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
    <div className="min-h-screen pb-20 print:bg-white print:pb-0 relative">
      <Header data={RESUME_DATA} />

      <main className="max-w-5xl mx-auto px-4 md:px-8 space-y-12 relative z-20 print:mt-0 print:px-0">
        
        {/* Experience Section */}
        <section>
          <SectionTitle title={labels.experience} icon={Icons.Briefcase} />
          <div className="mt-6 md:pl-4 md:border-l border-dashed border-slate-200/50">
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
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkillCard 
              title="专业技能" 
              skills={skills["专业技能"]} 
              icon={Icons.Briefcase} 
            />
            <SkillCard 
              title="编程与开发" 
              skills={skills["编程与开发"]} 
              icon={Icons.Code} 
            />
            <SkillCard 
              title="软技能" 
              skills={skills["软技能"]} 
              icon={Icons.MessageSquare} 
            />
          </div>
        </section>

        {/* Education & Honors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 page-break">
          {/* Education */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:border-slate-300 transition-colors h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-sky-50 text-accent rounded-lg">
                    <Icons.GraduationCap className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-primary">{labels.education}</h2>
            </div>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-slate-100 last:border-0">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-white border-2 border-accent rounded-full"></span>
                  <div className="mb-1">
                    <h3 className="font-bold text-primary">{edu.school}</h3>
                    <div className="flex justify-between items-center text-sm font-medium text-slate-500 mt-1">
                        <span>{edu.degree}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{edu.year}</span>
                    </div>
                  </div>
                  {edu.gpa && (
                     <p className="text-sm text-slate-600 mt-2 text-xs">GPA: <span className="font-bold text-primary">{edu.gpa}</span></p>
                  )}
                  {edu.thesis && (
                    <p className="text-sm text-slate-600 mt-2">
                      <span className="font-semibold text-primary text-xs uppercase tracking-wide">Thesis:</span> {edu.thesis}
                    </p>
                  )}
                  {edu.courses && (
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed bg-surface p-2 rounded border border-slate-100">
                          {edu.courses}
                      </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Honors */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:border-slate-300 transition-colors h-full">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                    <Icons.Award className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-primary">{labels.honors}</h2>
            </div>

            <div className="space-y-4">
              {honors.map((honor, index) => (
                <div key={index} className="group p-4 rounded-lg border border-slate-100 bg-surface hover:bg-white hover:border-accent/30 hover:shadow-sm transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-primary text-sm md:text-base group-hover:text-accent transition-colors">{honor.title}</h3>
                    <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded">{honor.year}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{honor.company}</p>
                  <p className="text-sm text-secondary leading-relaxed">
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
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8"></div>
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} {RESUME_DATA.name} | Built with React & Tailwind
        </p>
      </footer>

      {/* Tech-styled Scroll Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-white text-primary border border-slate-200 rounded-lg shadow-lg hover:border-accent hover:text-accent hover:shadow-xl transition-all duration-300 transform z-50 print:hidden flex items-center justify-center gap-2 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <Icons.ArrowUp className="w-5 h-5" />
        <span className="text-xs font-bold hidden md:inline">TOP</span>
      </button>
    </div>
  );
}

export default App;