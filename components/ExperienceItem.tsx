import React, { useState } from 'react';
import { Experience, Labels } from '../types';
import { Icons } from './Icon';

interface ExperienceItemProps {
  data: Experience;
  labels: Labels;
  isFirst: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ data, labels, isFirst }) => {
  // Collapsed by default
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`mb-12 relative overflow-hidden ${!isFirst ? 'pt-8 border-t border-dashed border-slate-200' : ''}`}>
      
      {/* Background Logo Watermark */}
      {data.logo && (
        // Changed to right-0 and positive translate-x to ensure it stays visible on the right side
        // Increased opacity slightly to 0.15 for better visibility
        <div className="absolute right-10 top-10 opacity-[0.10] pointer-events-none select-none z-0 transform translate-x-10 -translate-y-2">
          <img src={data.logo} alt="Company Logo" className="w-[300px] md:w-[400px] h-auto object-contain" />
          {/* Blend overlay to help it merge with background */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-white/90 mix-blend-overlay"></div>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
          <div>
            <h3 className="text-xl font-bold text-primary leading-tight">{data.company}</h3>
            <p className="text-lg text-accent font-medium mt-1">{data.position}</p>
          </div>
          <div className="flex items-center text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full text-sm w-fit whitespace-nowrap">
            {data.year}
          </div>
        </div>

        {/* Main Description */}
        <p className="text-secondary leading-relaxed mb-6 text-justify">
          {data.description}
        </p>

        {/* Core Responsibilities */}
        <div className="mb-6 bg-slate-50 p-5 rounded-lg border border-slate-100 relative bg-opacity-90">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
             <Icons.User className="w-4 h-4" />
             {labels.core_responsibilities}
          </h4>
          <ul className="space-y-2">
            {data.core_responsibilities.map((resp, index) => (
              <li key={index} className="flex items-start text-secondary text-sm md:text-base">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="mt-4">
          <div 
            className="flex items-center justify-between cursor-pointer group mb-3 select-none"
            onClick={() => setExpanded(!expanded)}
          >
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Icons.Briefcase className="w-4 h-4" />
              {labels.projects}
              <span className="text-xs font-normal normal-case ml-2 bg-blue-50 text-blue-600 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {expanded ? labels.collapse : labels.expand}
              </span>
            </h4>
            <div className="p-1 rounded-full hover:bg-slate-100 transition-colors">
              {expanded ? (
                <Icons.ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-accent" />
              ) : (
                <Icons.ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-accent" />
              )}
            </div>
          </div>

          <div className="relative">
            <div 
              className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-500 ease-in-out ${expanded ? '' : 'max-h-32 overflow-hidden'}`}
            >
              {data.projects.map((project, idx) => (
                <div 
                  key={idx} 
                  className="p-4 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg hover:shadow-md transition-shadow hover:border-blue-200"
                >
                  <h5 className="font-bold text-primary mb-2 text-sm">{project.name}</h5>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Gradient Overlay when collapsed */}
            {!expanded && (
              <div 
                className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-4 cursor-pointer"
                onClick={() => setExpanded(true)}
              >
                  <span className="text-sm text-accent font-medium hover:underline flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm border border-slate-100">
                      <Icons.ChevronDown className="w-4 h-4" />
                      {labels.view_more}
                  </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;