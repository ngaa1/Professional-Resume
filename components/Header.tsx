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

  const tagsList = data.tags || [];

  // Deterministic positioning to ensure consistent server/client rendering
  const getTagStyle = (index: number) => {
    // Spread tags pseudo-randomly across the container
    const top = ((index * 19) % 85) + 5; // 5% to 90% top
    const left = ((index * 37) % 90) + 2; // 2% to 92% left
    
    // Stagger animations
    const delay = index * 1.5; 
    const duration = 10 + (index % 5) * 2; // 10s to 18s duration
    
    // Vary font sizes for texture
    const sizeClasses = ['text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
    const sizeClass = sizeClasses[index % sizeClasses.length];

    return {
      style: {
        top: `${top}%`,
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      },
      className: `absolute font-bold text-white whitespace-nowrap select-none pointer-events-none animate-float-fade ${sizeClass}`
    };
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white pt-16 pb-20 relative overflow-hidden print:bg-white print:text-black print:p-0 print:mb-8">
      
      {/* Dynamic Background Tags (Looming Effect) */}
      <div className="absolute inset-0 overflow-hidden print:hidden z-0">
        {tagsList.map((tag, index) => {
            const { style, className } = getTagStyle(index);
            return (
                <span key={index} className={className} style={style}>
                    {tag}
                </span>
            );
        })}
      </div>

      <style>{`
        @keyframes float-fade {
          0% { opacity: 0; transform: translateY(15px) scale(0.95); }
          50% { opacity: 0.08; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-15px) scale(0.95); }
        }
        .animate-float-fade {
          animation-name: float-fade;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          /* Use mix-blend-mode for better texture on supported browsers */
          mix-blend-mode: overlay;
        }
      `}</style>

      {/* Existing Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none print:hidden z-0" />
      
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