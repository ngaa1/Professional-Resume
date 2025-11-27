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

  // Duplicate tags to ensure seamless infinite scrolling
  const tagsList = data.tags || [];
  const scrollTags = [...tagsList, ...tagsList];

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white pt-16 pb-20 relative overflow-hidden print:bg-white print:text-black print:p-0 print:mb-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none print:hidden" />
      
      {/* Inner container with padding matches App.tsx main container for alignment */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 print:text-black">
              {data.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 font-medium print:text-slate-700">
              {data.title}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm md:text-base md:items-end">
            <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-blue-200 transition-colors group">
              <span className="group-hover:underline">{data.email}</span>
              <Icons.Mail className="w-4 h-4 text-blue-300" />
            </a>
            <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-blue-200 transition-colors group">
              <span className="group-hover:underline">{data.phone}</span>
              <Icons.Phone className="w-4 h-4 text-blue-300" />
            </a>
            <div className="flex items-center gap-2">
              <span>WeChat: {data.wechat}</span>
              <Icons.MessageSquare className="w-4 h-4 text-blue-300" />
            </div>
          </div>
        </div>

        <div className="mt-10 max-w-3xl">
          <h2 className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-2 flex items-center gap-2 print:text-blue-600">
            <Icons.User className="w-4 h-4" />
            {data.labels.about_me}
          </h2>
          <p className="text-slate-100 leading-relaxed text-lg font-light text-justify print:text-slate-700 mb-6">
            {data.summary}
          </p>
          
          {/* Tags Section with Infinite Scroll */}
          {tagsList.length > 0 && (
            <div className="relative w-full overflow-hidden print:hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
              <div className="flex w-max animate-marquee hover-pause py-1">
                {scrollTags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="mx-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-blue-100 text-xs md:text-sm rounded-full border border-white/10 transition-colors cursor-default whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <style>{`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                  animation: marquee 40s linear infinite;
                }
                .hover-pause:hover {
                  animation-play-state: paused;
                }
              `}</style>
            </div>
          )}
        </div>
      </div>

      {/* Print button positioned absolute to the header, outside the content flow */}
      <button 
        onClick={handlePrint}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors print:hidden z-20"
        title="Print Resume"
      >
        <Icons.Printer className="w-5 h-5 text-white" />
      </button>
    </header>
  );
};

export default Header;