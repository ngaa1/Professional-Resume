import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  icon?: LucideIcon;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon: Icon }) => {
  return (
    <div className="flex items-center gap-3 mb-8 group">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-slate-200 shadow-sm group-hover:border-accent/50 transition-colors">
        {Icon && <Icon className="w-5 h-5 text-accent" />}
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-primary tracking-tight leading-none">
          {title}
        </h2>
        <div className="h-1 w-12 bg-gradient-to-r from-accent to-tech mt-1 rounded-full"></div>
      </div>
    </div>
  );
};

export default SectionTitle;