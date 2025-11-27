import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  title: string;
  skills: string[];
  icon: LucideIcon;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-accent/30 hover:shadow-md transition-all h-full">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
        <div className="p-2 bg-indigo-50 text-tech rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg text-primary tracking-tight">{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-surface border border-slate-200 rounded hover:border-accent hover:text-accent transition-colors select-all"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;