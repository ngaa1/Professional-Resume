
import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { Icons } from './Icon';
import SkillCard from './SkillCard';
import { Skills } from '../types';

interface SkillsSectionProps {
  skills: Skills;
}

const ICON_MAP: Record<string, LucideIcon> = {
  // Chinese Keys
  "专业技能": Icons.Briefcase,
  "编程与开发": Icons.Code,
  "软技能": Icons.MessageSquare,
  // English Keys
  "Professional Skills": Icons.Briefcase,
  "Programming & Development": Icons.Code,
  "Soft Skills": Icons.MessageSquare,
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Derive categories from the skills object directly to support multiple languages
  const categories = Object.keys(skills);

  // Reset active index if categories change (e.g. language switch)
  useEffect(() => {
    setActiveIndex(0);
  }, [skills]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-12 print:px-0 print:max-w-full">
      
      {/* 
        SCREEN VIEW: Carousel 
        Hidden in Print
      */}
      <div className="relative group/carousel print:hidden">
        
        {/* Main Viewport */}
        <div className="overflow-hidden rounded-2xl py-2">
          <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {categories.map((category) => (
              <div key={category} className="w-full flex-shrink-0 px-1">
                 <SkillCard 
                    title={category} 
                    skills={skills[category] || []} 
                    icon={ICON_MAP[category] || Icons.Code} 
                 />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 lg:-left-20 p-2 md:p-3 rounded-full bg-surface border border-border text-secondary hover:text-accent hover:shadow-lg hover:border-accent transition-all z-10 shadow-sm group"
          aria-label="Previous skill category"
        >
          <Icons.ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button 
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 lg:-right-20 p-2 md:p-3 rounded-full bg-surface border border-border text-secondary hover:text-accent hover:shadow-lg hover:border-accent transition-all z-10 shadow-sm group"
          aria-label="Next skill category"
        >
          <Icons.ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

      </div>

      {/* Screen Category Tabs */}
      <div className="flex justify-center items-center flex-wrap gap-3 mt-6 print:hidden">
        {categories.map((category, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border ${
              idx === activeIndex 
                ? 'bg-accent text-on-accent border-accent shadow-md shadow-glow scale-105' 
                : 'bg-surface text-secondary border-border hover:border-accent hover:text-accent hover:bg-accent-light'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 
        PRINT VIEW: Stacked Grid
        Hidden on Screen, Visible in Print
      */}
      <div className="hidden print:grid grid-cols-1 gap-6">
          {categories.map((category) => (
              <div key={category} className="break-inside-avoid">
                 <SkillCard 
                    title={category} 
                    skills={skills[category] || []} 
                    icon={ICON_MAP[category] || Icons.Code} 
                 />
              </div>
            ))}
      </div>
    </div>
  );
};

export default SkillsSection;
