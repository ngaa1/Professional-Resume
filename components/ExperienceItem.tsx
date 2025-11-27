import React, { useState } from 'react';
import { Experience, Labels } from '../types';
import { Icons } from './Icon';

interface ExperienceItemProps {
  data: Experience;
  labels: Labels;
  isFirst: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ data, labels, isFirst }) => {
  const [expanded, setExpanded] = useState(false);

  // Logo sizing logic
  const isGAD = data.company.includes("GAD");
  const logoWidthClass = isGAD 
    ? "w-[160px] md:w-[180px]" 
    : "w-[240px] md:w-[280px]";

  return (
    <div className="relative pl-8 md:pl-0">
      
      {/* Timeline Line (Desktop only) */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-slate-200 -ml-[1px]"></div>
      
      {/* Timeline Dot (Desktop only) */}
      <div className="hidden md:flex absolute left-0 top-8 w-3 h-3 bg-white border-2 border-accent rounded-full -translate-x-[5px] z-10"></div>

      <div className={`mb-12 relative overflow-hidden bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:shadow-lg hover:shadow-slate-200/40 transition-shadow duration-300`}>
        
        {/* Watermark Logo (Adjusted for Light Theme) */}
        {data.logo && (
          <div className="absolute right-6 top-6 opacity-[0.08] pointer-events-none select-none z-0 mix-blend-multiply filter grayscale-[20%]">
            <img 
              src={data.logo} 
              alt="Company Logo" 
              className={`${logoWidthClass} h-auto object-contain`} 
            />
          </div>
        )}

        <div className="relative z-10">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-2">
            <div>
              <h3 className="text-2xl font-bold text-primary tracking-tight">{data.company}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                <p className="text-lg text-tech font-semibold">{data.position}</p>
              </div>
            </div>
            <div className="flex items-center text-sm font-medium text-slate-500 bg-surface border border-slate-200 px-3 py-1.5 rounded-md">
              {data.year}
            </div>
          </div>

          {/* Description */}
          <p className="text-secondary leading-relaxed mb-8 text-justify border-l-2 border-slate-100 pl-4">
            {data.description}
          </p>

          {/* Responsibilities Grid */}
          <div className="mb-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
               <Icons.User className="w-3 h-3" />
               {labels.core_responsibilities}
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {data.core_responsibilities.map((resp, index) => (
                <div key={index} className="flex items-start text-secondary text-sm bg-surface rounded-md p-3 border border-slate-100/50">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects - Tech Folder Style */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 bg-slate-100/50 border-b border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
              onClick={() => setExpanded(!expanded)}
            >
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Icons.Briefcase className="w-3 h-3 text-accent" />
                {labels.projects}
                <span className="ml-2 px-2 py-0.5 text-[10px] bg-white border border-slate-200 rounded text-slate-400">
                  {expanded ? '-' : '+'}
                </span>
              </h4>
              <div className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
                 <Icons.ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className={`relative transition-all duration-500 ease-in-out bg-white ${expanded ? 'opacity-100' : 'max-h-24 opacity-90'}`}>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100`}>
                {data.projects.map((project, idx) => (
                  <div key={idx} className="bg-white p-5 hover:bg-sky-50/30 transition-colors">
                    <h5 className="font-bold text-primary mb-2 text-sm flex items-center gap-2">
                      <span className="w-1 h-4 bg-accent rounded-sm"></span>
                      {project.name}
                    </h5>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed text-justify pl-3 border-l border-slate-100 ml-0.5">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
              
               {/* Fade Overlay for collapsed state */}
               {!expanded && (
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent flex items-end justify-center pb-2 cursor-pointer"
                  onClick={() => setExpanded(true)}
                >
                  <span className="text-xs font-medium text-accent flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    View All Projects
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;