
import React from 'react';
import { Project } from '../types';
import { Icons } from './Icon';
import { LucideIcon } from 'lucide-react';

interface PersonalProjectsSectionProps {
  projects: Project[];
}

const ProjectCard: React.FC<{ project: Project; icon: LucideIcon }> = ({ project, icon: Icon }) => (
  <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-glow hover:border-accent/30 transition-all duration-300 h-full flex flex-col group">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2.5 bg-accent-light rounded-xl text-accent group-hover:bg-accent group-hover:text-on-accent transition-colors duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-lg text-primary tracking-tight group-hover:text-accent transition-colors">{project.name}</h3>
    </div>
    <p className="text-secondary text-sm leading-relaxed text-justify flex-grow font-medium">
      {project.description}
    </p>
  </div>
);

const PersonalProjectsSection: React.FC<PersonalProjectsSectionProps> = ({ projects }) => {
  // Map specific projects to icons
  const getIcon = (name: string): LucideIcon => {
    if (name.includes("量化")) return Icons.LineChart;
    if (name.includes("图像")) return Icons.Image;
    if (name.includes("道路")) return Icons.Map;
    return Icons.Terminal;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 page-break">
      {projects.map((project, index) => (
        <ProjectCard 
          key={index} 
          project={project} 
          icon={getIcon(project.name)} 
        />
      ))}
    </div>
  );
};

export default PersonalProjectsSection;
