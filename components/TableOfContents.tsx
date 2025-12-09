
import React, { useEffect, useState } from 'react';
import { Icons } from './Icon';

const SECTIONS = [
  { id: 'profile', label: '个人简介', icon: Icons.User },
  { id: 'experience', label: '工作经历', icon: Icons.Briefcase },
  { id: 'education', label: '教育背景', icon: Icons.GraduationCap },
  { id: 'honors', label: '荣誉激励', icon: Icons.Award },
  { id: 'skills', label: '技能特长', icon: Icons.Code },
  { id: 'projects', label: '个人项目', icon: Icons.Cpu },
  { id: 'map', label: '我的足迹', icon: Icons.MapPin },
];

const TableOfContents: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('profile');

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

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed xl:left-2 2xl:left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 print:hidden">
      {SECTIONS.map(({ id, label, icon: Icon }) => {
        const isActive = activeId === id;
        
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`
              group flex items-center gap-3 xl:px-4 2xl:px-5 xl:py-2.5 2xl:py-3 rounded-2xl transition-all duration-300 text-left
              ${isActive 
                ? 'bg-surface border border-accent/20 text-accent shadow-lg shadow-glow scale-105 translate-x-2' 
                : 'bg-transparent border border-transparent text-secondary hover:bg-surface/60 hover:text-primary hover:shadow-sm'
              }
              backdrop-blur-sm
            `}
            aria-label={`Scroll to ${label}`}
          >
            <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
            
            <span className={`text-sm font-bold tracking-wide whitespace-nowrap`}>
              {label}
            </span>
            
            {/* Active Dot Indicator */}
            <div className={`
              w-1.5 h-1.5 rounded-full ml-auto transition-all duration-300
              ${isActive ? 'bg-accent opacity-100' : 'bg-transparent opacity-0'}
            `} />
          </button>
        );
      })}
    </nav>
  );
};

export default TableOfContents;
