import React from 'react';
import { ResumeData } from '../types';
import { Icons } from './Icon';

interface HeaderProps {
  data: ResumeData;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="pt-12 pb-8 relative print:pt-0 print:pb-4">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Top bar with Print Button */}
        <div className="flex justify-end mb-4 print:hidden">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-200 rounded-lg hover:border-accent hover:text-accent transition-all shadow-sm"
          >
            <Icons.Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-slate-200 shadow-lg shadow-slate-200/50 relative overflow-hidden print:shadow-none print:border-none print:p-0">
          
          {/* Decorative tech accent top right */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent -translate-y-1/2 translate-x-1/3 rounded-full blur-xl print:hidden"></div>
          
          <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
            
            {/* Left Column: Name & Contact */}
            <div className="flex-1 min-w-0">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-tech bg-indigo-50 border border-indigo-100 rounded-full tracking-wide">
                STRUCTURAL ENGINEER & DEVELOPER
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-2">
                {data.name}
              </h1>
              <p className="text-xl text-secondary font-light mb-6">
                {data.title}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-secondary">
                <a href={`mailto:${data.email}`} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-100 hover:border-accent hover:text-accent transition-colors">
                  <Icons.Mail className="w-4 h-4" />
                  <span>{data.email}</span>
                </a>
                <a href={`tel:${data.phone}`} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-100 hover:border-accent hover:text-accent transition-colors">
                  <Icons.Phone className="w-4 h-4" />
                  <span>{data.phone}</span>
                </a>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-100">
                  <Icons.MessageSquare className="w-4 h-4" />
                  <span>WeChat: {data.wechat}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Summary */}
            <div className="flex-1 lg:max-w-lg">
               <div className="p-6 bg-surface rounded-xl border border-slate-100 relative">
                  <Icons.User className="absolute top-6 right-6 w-12 h-12 text-slate-200 stroke-1" />
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Profile</h3>
                  <p className="text-slate-600 leading-relaxed text-justify relative z-10">
                    {data.summary}
                  </p>
               </div>
            </div>
          </div>

          {/* Tags / Tech Stack Section */}
          <div className="mt-8 pt-8 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Icons.Code className="w-3 h-3" />
              Key Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.tags?.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md shadow-sm hover:border-accent hover:text-accent transition-colors cursor-default"
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