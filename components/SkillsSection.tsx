import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Icons } from './Icon';
import SkillCard from './SkillCard';
import { Skills } from '../types';

interface SkillsSectionProps {
  skills: Skills;
}

const ICON_MAP: Record<string, LucideIcon> = {
  "专业技能": Icons.Briefcase,
  "编程与开发": Icons.Code,
  "软技能": Icons.MessageSquare,
};

const CATEGORY_ORDER = ["专业技能", "编程与开发", "软技能"];

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % CATEGORY_ORDER.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + CATEGORY_ORDER.length) % CATEGORY_ORDER.length);
  };

  return (
    <div className="relative max-w-3xl mx-auto px-2 md:px-12">
      {/* Main Viewport */}
      <div className="overflow-hidden rounded-2xl py-2">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {CATEGORY_ORDER.map((category) => (
            <div key={category} className="w-full flex-shrink-0 px-1">
               <SkillCard 
                  title={category} 
                  skills={skills[category]} 
                  icon={ICON_MAP[category]} 
               />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-surface border border-border text-secondary hover:text-accent hover:shadow-lg hover:border-accent transition-all z-10 shadow-sm group"
        aria-label="Previous skill category"
      >
        <Icons.ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-surface border border-border text-secondary hover:text-accent hover:shadow-lg hover:border-accent transition-all z-10 shadow-sm group"
        aria-label="Next skill category"
      >
        <Icons.ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Category Tabs */}
      <div className="flex justify-center items-center flex-wrap gap-3 mt-6">
        {CATEGORY_ORDER.map((category, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border ${
              idx === activeIndex 
                ? 'bg-accent text-white border-accent shadow-md shadow-glow scale-105' 
                : 'bg-surface text-secondary border-border hover:border-accent hover:text-accent hover:bg-accent-light'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;