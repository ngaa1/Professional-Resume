import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  title: string;
  skills: string[];
  icon: LucideIcon;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 text-accent rounded-lg">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-lg text-primary">{title}</h3>
      </div>
      <ul className="space-y-3 flex-1">
        {skills.map((skill, index) => (
          <li key={index} className="text-secondary text-sm leading-relaxed flex items-start">
            <span className="mr-2 text-accent/60 font-bold">•</span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;