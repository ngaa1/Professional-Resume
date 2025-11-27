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
      // Show button when page is scrolled down 300px
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 print:bg-white print:pb-0 relative">
      <Header data={RESUME_DATA} />

      <main className="max-w-5xl mx-auto px-4 md:px-8 -mt-10 relative z-20 space-y-8 print:mt-0 print:px-0">
        
        {/* Experience Section */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-10 print:shadow-none print:border-none print:p-0">
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
            <div className="flex items-center gap-3 mb-6 pb-2">
                <Icons.Code className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-primary tracking-tight uppercase">
                    {labels.skills}
                </h2>
            </div>
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
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 h-full print:shadow-none print:border-none print:p-0">
            <SectionTitle title={labels.education} icon={Icons.GraduationCap} />
            <div className="space-y-8 mt-6">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-slate-100 last:border-0">
                  <span className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-2 border-accent rounded-full"></span>
                  <div className="mb-1">
                    <h3 className="font-bold text-primary">{edu.school}</h3>
                    <div className="flex justify-between items-center text-sm text-slate-500 mt-1">
                        <span>{edu.degree}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{edu.year}</span>
                    </div>
                  </div>
                  {edu.gpa && (
                     <p className="text-sm text-slate-600 mt-1">GPA: {edu.gpa}</p>
                  )}
                  {edu.thesis && (
                    <p className="text-sm text-slate-600 mt-2 italic">
                      <span className="font-medium not-italic text-slate-700">毕业论文:</span> {edu.thesis}
                    </p>
                  )}
                  {edu.courses && (
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                          <span className="font-medium text-slate-700">核心课程:</span> {edu.courses}
                      </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Honors */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 h-full print:shadow-none print:border-none print:p-0">
            <SectionTitle title={labels.honors} icon={Icons.Award} />
            <div className="space-y-6 mt-6">
              {honors.map((honor, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-100 hover:border-blue-100 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-primary text-sm md:text-base">{honor.title}</h3>
                    <span className="text-xs font-bold text-accent bg-blue-50 px-2 py-1 rounded">{honor.year}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{honor.company}</p>
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
      <footer className="max-w-5xl mx-auto px-8 mt-16 text-center text-slate-400 text-sm pb-8 print:hidden">
        <p>© {new Date().getFullYear()} {RESUME_DATA.name}. All Rights Reserved.</p>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent-hover hover:shadow-xl transition-all duration-300 transform z-50 print:hidden ${
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