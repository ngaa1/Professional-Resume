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
    <div className={`relative overflow-hidden bg-white rounded-2xl border border-slate-100 p-6 md:p-8 hover:shadow-lg hover:shadow-sky-100/50 hover:border-sky-200 transition-all duration-300 mb-6 group`}>
        
      {/* Watermark Logo */}
      {data.logo && (
        <div className="absolute right-6 top-6 opacity-[0.06] pointer-events-none select-none z-0 mix-blend-multiply filter grayscale-[10%] group-hover:opacity-[0.1] transition-opacity">
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
            <div className="flex items-center gap-2 mt-1">
              <p className="text-lg text-accent font-bold">{data.position}</p>
            </div>
          </div>
          <div className="flex items-center text-sm font-bold text-accent bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-lg whitespace-nowrap">
            {data.year}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 leading-relaxed mb-6 text-justify font-medium border-l-2 border-sky-100 pl-4">
          {data.description}
        </p>

        {/* Responsibilities Grid */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <div className="p-1 bg-sky-50 rounded-full">
                <Icons.User className="w-3 h-3 text-accent" />
              </div>
              {labels.core_responsibilities}
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {data.core_responsibilities.map((resp, index) => (
              <div key={index} className="flex items-start text-slate-700 text-sm pl-2 hover:bg-sky-50/30 rounded py-1 transition-colors">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 mr-3 flex-shrink-0" />
                <span className="font-medium">{resp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects - Simple Flat List */}
        <div className="border-t border-slate-100 pt-6">
          <div 
            className="flex items-center justify-between cursor-pointer group/projects mb-4"
            onClick={() => setExpanded(!expanded)}
          >
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 group-hover/projects:text-accent transition-colors">
              <Icons.Briefcase className="w-4 h-4" />
              {labels.projects}
              <span className="ml-2 px-2 py-0.5 text-[10px] bg-slate-100 text-slate-500 rounded group-hover/projects:bg-accent group-hover/projects:text-white transition-colors">
                {expanded ? labels.collapse : labels.expand}
              </span>
            </h4>
            <div className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
                <Icons.ChevronDown className="w-5 h-5 text-slate-300 group-hover/projects:text-accent" />
            </div>
          </div>

          {expanded ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.projects.map((project, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-accent hover:shadow-md hover:shadow-sky-50 transition-all">
                  <h5 className="font-bold text-primary mb-2 text-sm flex items-center gap-2">
                    <span className="w-1 h-3 bg-accent rounded-full"></span>
                    {project.name}
                  </h5>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-x-6 gap-y-3 cursor-pointer" onClick={() => setExpanded(true)}>
             {data.projects.map((project, idx) => (
               <div key={idx} className="flex items-center group/item px-3 py-1.5 rounded-lg border border-transparent hover:bg-sky-50 hover:border-sky-100 transition-all">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-2 group-hover/item:bg-accent transition-colors" />
                  <span className="text-sm text-slate-600 font-bold group-hover/item:text-accent transition-colors">
                    {project.name}
                  </span>
               </div>
             ))}
          </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ExperienceItem;