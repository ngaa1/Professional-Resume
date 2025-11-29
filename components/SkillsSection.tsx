import React from 'react';
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {CATEGORY_ORDER.map((category) => (
        <SkillCard 
          key={category} 
          title={category} 
          skills={skills[category]} 
          icon={ICON_MAP[category]} 
        />
      ))}
    </div>
  );
};

export default SkillsSection;