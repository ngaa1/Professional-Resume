import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  title: string;
  skills: string[];
  icon: LucideIcon;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon: Icon }) => {
  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-glow hover:border-accent/30 transition-all duration-300 h-full">
      {/* Header section */}
      <div className="flex items-center gap-3 mb-5 border-b border-border pb-4">
        <div className="p-2 bg-accent-light rounded-lg text-accent">
            <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg text-primary tracking-tight">{title}</h3>
      </div>
      
      {/* Skills list - Vertical list with bullets for better readability of long text */}
      <div className="flex flex-col gap-3">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0 group-hover:scale-125 transition-transform" />
            <span className="text-sm text-secondary font-medium leading-relaxed group-hover:text-primary transition-colors text-justify">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;