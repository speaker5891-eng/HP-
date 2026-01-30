import React from 'react';
import { SectionId } from '../types';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id={SectionId.HOME} className="relative h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/30 z-10"></div>
        {/* Changed to actual construction photo for authenticity with High Priority Loading */}
        <img 
          src="work-04.jpg" 
          alt="Steel Construction Works" 
          className="w-full h-full object-cover opacity-60 animate-kenburns"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 pt-20">
        <div className="max-w-4xl opacity-0 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 mb-4 md:mb-6">
            <span className="h-px w-8 bg-orange-500"></span>
            <span className="text-orange-400 font-mono text-xs md:text-sm tracking-[0.2em] uppercase">
              SINCE 1924 / GUNMA
            </span>
          </div>
          
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6 md:mb-8 drop-shadow-lg">
            鐵を<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500">
              極め
            </span>
            、未来を創る。
          </h1>
          
          <p className="text-base md:text-xl text-slate-300 max-w-xl mb-10 md:mb-12 leading-relaxed opacity-0 animate-fade-in-up delay-200">
            100年の歴史が紡ぐ、確かな技術。<br/>
            群馬県昭和村から、鉄の可能性を追求し続ける<br/>
            プロフェッショナル集団です。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 opacity-0 animate-fade-in-up delay-300">
            <button 
              onClick={() => document.getElementById(SectionId.WORKS)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 md:py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold tracking-wider rounded transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(234,88,12,0.4)] hover:shadow-[0_8px_30px_rgba(234,88,12,0.6)] text-sm md:text-base"
            >
              施工実績を見る
            </button>
            <button 
              onClick={() => document.getElementById(SectionId.ABOUT)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 md:py-4 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 text-white font-bold tracking-wider rounded transition-all hover:border-white/30 text-sm md:text-base"
            >
              私たちについて
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-slate-500 hover:text-orange-500 transition-colors cursor-pointer"
           onClick={() => document.getElementById(SectionId.ABOUT)?.scrollIntoView({ behavior: 'smooth' })}>
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default Hero;