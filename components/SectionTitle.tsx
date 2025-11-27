import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  icon?: LucideIcon;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon: Icon }) => {
  return (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b-2 border-slate-200">
      {Icon && <Icon className="w-6 h-6 text-accent" />}
      <h2 className="text-2xl font-bold text-primary tracking-tight uppercase">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;