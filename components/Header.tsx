import React from 'react';
import { ResumeData } from '../types';
import { Icons } from './Icon';

interface HeaderProps {
  data: ResumeData;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  return (
    <header className="pt-12 pb-8 relative print:pt-0 print:pb-4">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white shadow-xl shadow-sky-100/50 relative overflow-hidden print:shadow-none print:border-none print:p-0">
          
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
            
            {/* Left Column: Name & Contact */}
            <div className="flex-1 min-w-0">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-bold text-accent bg-sky-50 border border-sky-100 rounded-full tracking-wide">
                STRUCTURAL ENGINEER & DEVELOPER
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-3">
                {data.name}
              </h1>
              <p className="text-xl text-secondary font-medium mb-6 flex items-center gap-2">
                {data.title}
              </p>

              <div className="flex flex-wrap gap-3 text-sm text-secondary font-medium">
                <a href={`mailto:${data.email}`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-100 shadow-sm hover:border-accent hover:text-accent transition-all group">
                  <div className="p-1 bg-sky-50 rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icons.Mail className="w-3.5 h-3.5" />
                  </div>
                  <span>{data.email}</span>
                </a>
                <a href={`tel:${data.phone}`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-100 shadow-sm hover:border-accent hover:text-accent transition-all group">
                  <div className="p-1 bg-sky-50 rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icons.Phone className="w-3.5 h-3.5" />
                  </div>
                  <span>{data.phone}</span>
                </a>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-100 shadow-sm text-secondary group hover:border-accent hover:text-accent transition-all">
                   <div className="p-1 bg-sky-50 rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icons.MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <span>WeChat: {data.wechat}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Summary */}
            <div className="flex-1 lg:max-w-lg">
               <div className="relative p-6 bg-gradient-to-br from-white to-sky-50/50 rounded-xl border border-sky-100/50">
                  <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icons.User className="w-4 h-4" />
                    Profile
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-justify font-medium">
                    {data.summary}
                  </p>
               </div>
            </div>
          </div>

          {/* Tags / Tech Stack Section */}
          <div className="mt-8 pt-8 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Icons.Code className="w-4 h-4 text-accent" />
              Key Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.tags?.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-accent hover:text-accent transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;