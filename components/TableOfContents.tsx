
import React, { useEffect, useState } from 'react';
import { Icons } from './Icon';
import { Labels } from '../types';

interface TableOfContentsProps {
  labels: Labels;
  lang: 'zh' | 'en';
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ labels, lang }) => {
  const [activeId, setActiveId] = useState<string>('profile');

  // Construct sections dynamically based on labels
  const sections = [
    { id: 'profile', label: labels.about_me, icon: Icons.User },
    { id: 'experience', label: labels.experience, icon: Icons.Briefcase },
    { id: 'education', label: labels.education, icon: Icons.GraduationCap },
    { id: 'honors', label: labels.honors, icon: Icons.Award },
    { id: 'skills', label: labels.skills, icon: Icons.Code },
    { id: 'projects', label: labels.personal_projects, icon: Icons.Cpu },
    { id: 'map', label: lang === 'zh' ? '我的足迹' : 'My Footprint', icon: Icons.MapPin },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -50% 0px', 
        threshold: 0
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="fixed left-2 xl:left-4 2xl:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 print:hidden">
      {sections.map(({ id, label, icon: Icon }) => {
        const isActive = activeId === id;
        
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            title={label}
            className={`
              group flex items-center gap-3 p-3 xl:px-4 2xl:px-5 xl:py-2.5 2xl:py-3 rounded-2xl transition-all duration-300 text-left
              ${isActive 
                ? 'bg-surface border border-accent/20 text-accent shadow-lg shadow-glow scale-105 translate-x-1 xl:translate-x-2' 
                : 'bg-transparent border border-transparent text-secondary hover:bg-surface/60 hover:text-primary hover:shadow-sm'
              }
              backdrop-blur-sm
            `}
            aria-label={`Scroll to ${label}`}
          >
            <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
            
            <span className={`hidden xl:block text-sm font-bold tracking-wide whitespace-nowrap opacity-0 xl:opacity-100 transition-opacity duration-300`}>
              {label}
            </span>
            
            {/* Active Dot Indicator */}
            <div className={`
              hidden xl:block w-1.5 h-1.5 rounded-full ml-auto transition-all duration-300
              ${isActive ? 'bg-accent opacity-100' : 'bg-transparent opacity-0'}
            `} />
          </button>
        );
      })}
    </nav>
  );
};

export default TableOfContents;
