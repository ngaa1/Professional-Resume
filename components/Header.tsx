import React, { useState } from 'react';
import { ResumeData } from '../types';
import { Icons } from './Icon';
import WaveParticles from './WaveParticles';

interface HeaderProps {
  data: ResumeData;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyWechat = () => {
    if (data.wechat) {
      navigator.clipboard.writeText(data.wechat).then(() => {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  return (
    <header className="pt-12 pb-8 relative print:pt-0 print:pb-4">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Main Card */}
        <div className="bg-surface rounded-2xl p-8 md:p-10 border border-border shadow-xl shadow-glow relative overflow-hidden print:shadow-none print:border-none print:p-0 transition-colors duration-300">
          
          {/* Dynamic Particle Background */}
          <WaveParticles />

          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-light rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-30 pointer-events-none z-0"></div>

          <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
            
            {/* Left Column: Name & Contact */}
            <div className="flex-1 min-w-0">
              
              {/* Name Block with Shadow Effect */}
              <div className="relative mb-2">
                {/* Shadow Text */}
                <span className="absolute -top-3 md:-top-5 -left-1 text-5xl md:text-7xl font-black text-shadow-text select-none pointer-events-none uppercase z-0 tracking-tighter opacity-100 overflow-hidden w-full whitespace-nowrap">
                  LI CHULONG
                </span>
                {/* Main Text */}
                <h1 className="relative text-4xl md:text-5xl font-extrabold text-primary tracking-tight z-10">
                  {data.name}
                </h1>
              </div>

              {/* Title Block with Shadow Effect */}
              <div className="relative mb-6">
                 {/* Shadow Text */}
                 <span className="absolute -top-2 md:-top-3 -left-1 text-xl md:text-4xl font-black text-shadow-text select-none pointer-events-none uppercase z-0 tracking-tight opacity-100 overflow-hidden w-full whitespace-nowrap block">
                  PROJECT LEADER & STRUCTURAL ENGINEER
                </span>
                {/* Main Text */}
                <p className="relative text-xl text-accent font-bold z-10 flex items-center gap-2">
                  {data.title}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-secondary font-medium">
                <a href={`mailto:${data.email}`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface/80 border border-border shadow-sm hover:border-accent hover:text-accent transition-all group backdrop-blur-sm">
                  <div className="p-1 bg-accent-light rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icons.Mail className="w-3.5 h-3.5" />
                  </div>
                  <span>{data.email}</span>
                </a>
                <a href={`tel:${data.phone}`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface/80 border border-border shadow-sm hover:border-accent hover:text-accent transition-all group backdrop-blur-sm">
                  <div className="p-1 bg-accent-light rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icons.Phone className="w-3.5 h-3.5" />
                  </div>
                  <span>{data.phone}</span>
                </a>
                
                {/* WeChat Copy Button */}
                <button 
                  onClick={handleCopyWechat}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface/80 border border-border shadow-sm text-secondary group hover:border-accent hover:text-accent transition-all backdrop-blur-sm relative cursor-pointer"
                  title="点击复制微信号"
                >
                   <div className="p-1 bg-accent-light rounded-md group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icons.MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <span>WeChat: {data.wechat}</span>
                  
                  {/* Copy Feedback Toast */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-primary text-surface text-xs font-bold rounded-md shadow-lg transition-all duration-200 pointer-events-none whitespace-nowrap z-50 ${showCopied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    已复制微信号
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-primary"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Summary */}
            <div className="flex-1 lg:max-w-lg mt-6 lg:mt-0">
               <div>
                  <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icons.User className="w-4 h-4" />
                    Profile
                  </h3>
                  <p className="text-secondary leading-relaxed text-justify font-medium">
                    {data.summary}
                  </p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;