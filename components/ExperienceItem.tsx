
import React, { useState, useRef } from 'react';
import { Experience, Labels } from '../types';
import { Icons } from './Icon';
import ImageViewer from './ImageViewer';

interface ExperienceItemProps {
  data: Experience;
  labels: Labels;
  isFirst: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ data, labels }) => {
  const [expanded, setExpanded] = useState(false);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Image Viewer State
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);

  const handleImageClick = (images: string[], index: number = 0) => {
    setViewerImages(images);
    setViewerIndex(index);
    setIsViewerOpen(true);
  };

  const handleProjectSummaryClick = (index: number) => {
    setExpanded(true);
    // Delay to allow state update and rendering of the expanded list
    setTimeout(() => {
      const el = projectRefs.current[index];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Optional: Add temporary highlight class if desired, handled via standard hover effects usually sufficient 
        // but let's make it clear which one was selected
        el.classList.add('border-accent', 'shadow-glow');
        setTimeout(() => {
            el.classList.remove('border-accent', 'shadow-glow');
        }, 1500);
      }
    }, 100);
  };

  // Logo sizing logic
  const isGAD = data.company.includes("GAD");
  const logoWidthClass = isGAD 
    ? "w-[160px] md:w-[180px]" 
    : "w-[240px] md:w-[280px]";

  return (
    <>
      <div className={`relative overflow-hidden bg-surface rounded-2xl border border-border p-6 md:p-8 hover:shadow-glow hover:border-accent/30 transition-all duration-300 mb-6 group print:border-none print:shadow-none print:p-0 print:mb-8 page-break`}>
          
        {/* Watermark Logo - Reduced opacity in print */}
        {data.logo && (
          <div 
            className="absolute right-6 top-6 pointer-events-none select-none z-0 transition-all duration-300 opacity-[var(--c-logo-opacity)] group-hover:opacity-[var(--c-logo-opacity-hover)] print:opacity-[0.05]"
            style={{
              mixBlendMode: 'var(--c-logo-blend)' as any,
              filter: 'var(--c-logo-filter)'
            }}
          >
            <img 
              src={data.logo} 
              alt="Company Logo" 
              className={`${logoWidthClass} h-auto object-contain`} 
            />
          </div>
        )}

        <div className="relative z-10">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-2 print:mb-2">
            <div>
              <h3 className="text-2xl font-bold text-primary tracking-tight print:text-black">{data.company}</h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-lg text-accent font-bold print:text-gray-800">{data.position}</p>
              </div>
            </div>
            <div className="flex items-center text-sm font-bold text-accent bg-accent-light border border-border px-3 py-1.5 rounded-lg whitespace-nowrap print:bg-transparent print:border-gray-300 print:text-black print:px-0">
              {data.year}
            </div>
          </div>

          {/* Description */}
          <p className="text-secondary leading-relaxed mb-6 text-justify font-medium border-l-2 border-accent-light pl-4 print:border-gray-200 print:text-black print:pl-0 print:mb-4">
            {data.description}
          </p>

          {/* Responsibilities Grid */}
          <div className="mb-8 print:mb-4">
            <h4 className="text-xs font-bold text-secondary/60 uppercase tracking-wider mb-3 flex items-center gap-2 print:text-black">
                <div className="p-1 bg-accent-light rounded-full print:hidden">
                  <Icons.User className="w-3 h-3 text-accent" />
                </div>
                {labels.core_responsibilities}
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {data.core_responsibilities.map((resp, index) => (
                <div key={index} className="flex items-start text-secondary text-sm pl-2 hover:bg-accent-light/50 rounded py-1 transition-colors print:text-black print:pl-0">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 mr-3 flex-shrink-0 print:bg-black" />
                  <span className="font-medium">{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="border-t border-border pt-6 print:border-gray-200 print:pt-4">
            
            {/* Interactive Toggle Header (Hidden in Print) */}
            <div 
              className="flex items-center justify-between cursor-pointer group/projects mb-4 print:hidden"
              onClick={() => setExpanded(!expanded)}
            >
              <h4 className="text-xs font-bold text-secondary/60 uppercase tracking-wider flex items-center gap-2 group-hover/projects:text-accent transition-colors">
                <Icons.Briefcase className="w-4 h-4" />
                {labels.projects}
                <span className="ml-2 px-2 py-0.5 text-[10px] bg-border text-secondary rounded group-hover/projects:bg-accent group-hover/projects:text-on-accent transition-colors">
                  {expanded ? labels.collapse : labels.expand}
                </span>
              </h4>
              <div className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
                  <Icons.ChevronDown className="w-5 h-5 text-secondary/40 group-hover/projects:text-accent" />
              </div>
            </div>

            {/* Print-Only Header */}
            <h4 className="hidden print:flex text-xs font-bold text-black uppercase tracking-wider mb-3 items-center gap-2">
              {labels.projects}
            </h4>

            {/* Expanded Projects View: Full Cards */}
            <div className={`space-y-4 ${expanded ? 'block' : 'hidden'} print:block`}>
              {data.projects.map((project, idx) => (
                <div 
                  key={idx} 
                  ref={(el) => { projectRefs.current[idx] = el; }}
                  className="bg-surface-hover p-5 rounded-xl border border-border hover:border-accent hover:shadow-md hover:shadow-glow transition-all duration-500 print:border-none print:p-0 print:mb-2 print:bg-transparent print:shadow-none flex flex-col md:flex-row gap-6"
                >
                  {/* Left: Content */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-primary mb-2 text-sm flex items-center gap-2 print:text-black">
                      <span className="w-1 h-3 bg-accent rounded-full print:bg-black shrink-0"></span>
                      {project.name}
                    </h5>
                    <p className="text-secondary text-sm leading-relaxed text-justify print:text-gray-700">
                      {project.description}
                    </p>
                  </div>

                  {/* Right: Image (Interactive) */}
                  {project.images && project.images.length > 0 && (
                    <div 
                      className="w-full md:w-48 h-32 md:h-auto flex-shrink-0 cursor-pointer overflow-hidden rounded-lg group/image relative border border-border print:hidden"
                      onClick={() => handleImageClick(project.images!, 0)}
                    >
                      <img 
                        src={project.images[0]} 
                        alt={project.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110" 
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-white font-bold text-xs bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                           <Icons.Image className="w-3.5 h-3.5" />
                           <span>View Photos ({project.images.length})</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Collapsed Projects View: Summary List (Clickable) */}
            <div className={`${!expanded ? 'block' : 'hidden'} print:hidden mt-2 animate-in fade-in slide-in-from-top-2 duration-300`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {data.projects.map((project, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => handleProjectSummaryClick(idx)}
                            className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-border hover:bg-surface-hover/50 transition-all group/summary cursor-pointer"
                            title="Click to view details / 点击查看详情"
                        >
                            <span className="w-1.5 h-1.5 bg-accent/40 group-hover/summary:bg-accent rounded-full shrink-0 transition-colors"></span>
                            <span className="text-sm font-medium text-secondary group-hover/summary:text-primary transition-colors line-clamp-1">
                                {project.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Image Viewer Overlay */}
      <ImageViewer 
        images={viewerImages} 
        initialIndex={viewerIndex} 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
      />
    </>
  );
};

export default ExperienceItem;
