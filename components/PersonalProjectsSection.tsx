

import React, { useState } from 'react';
import { Project } from '../types';
import { Icons } from './Icon';
import { LucideIcon } from 'lucide-react';
import ImageViewer from './ImageViewer';

interface PersonalProjectsSectionProps {
  projects: Project[];
}

const PersonalProjectsSection: React.FC<PersonalProjectsSectionProps> = ({ projects }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);

  const handleImageClick = (images: string[], index: number = 0) => {
    setViewerImages(images);
    setViewerIndex(index);
    setIsViewerOpen(true);
  };
  
  // Map specific projects to icons
  const getIcon = (name: string): LucideIcon => {
    if (name.includes("量化") || name.toLowerCase().includes("quant")) return Icons.LineChart;
    if (name.includes("图像") || name.includes("图片") || name.includes("水印") || name.toLowerCase().includes("image")) return Icons.Image;
    if (name.includes("道路") || name.toLowerCase().includes("road")) return Icons.Map;
    return Icons.Terminal;
  };

  return (
    <>
      <div className="flex flex-col gap-6 page-break">
        {projects.map((project, index) => {
           const Icon = getIcon(project.name);
           return (
             <div key={index} className="bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-glow hover:border-accent/30 transition-all duration-300 flex flex-col md:flex-row gap-6 group">
                {/* Left: Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-accent-light rounded-lg text-accent group-hover:bg-accent group-hover:text-on-accent transition-colors duration-300">
                             <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg text-primary tracking-tight group-hover:text-accent transition-colors">
                            {project.name}
                        </h3>
                    </div>
                    
                    <p className="text-secondary text-sm font-medium mb-3">{project.description}</p>

                    {project.highlights && (
                        <div className="flex flex-col gap-2">
                             {project.highlights.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-1.5 shrink-0" />
                                    <span className="text-sm text-secondary/90 leading-relaxed text-justify">
                                        {point}
                                    </span>
                                </div>
                             ))}
                        </div>
                    )}
                </div>

                {/* Right: Image */}
                {project.images && project.images.length > 0 && (
                   <div 
                      className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border group/image relative self-start"
                      onClick={() => handleImageClick(project.images!, 0)}
                    >
                      <img 
                        src={project.images[0]} 
                        alt={project.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-white font-bold text-xs bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                           <Icons.Image className="w-3.5 h-3.5" />
                           <span>View Photos</span>
                        </div>
                      </div>
                    </div>
                )}
             </div>
           );
        })}
      </div>

      <ImageViewer 
        images={viewerImages} 
        initialIndex={viewerIndex} 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
      />
    </>
  );
};

export default PersonalProjectsSection;