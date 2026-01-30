import React from 'react';
import { SectionId } from '../types';

const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-16 md:py-32 bg-slate-950 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/10 via-slate-950/0 to-transparent pointer-events-none"></div>
        <div className="hidden md:block absolute bottom-20 left-10 text-[20rem] font-bold text-slate-800/20 pointer-events-none leading-none select-none">
            100
        </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="inline-block px-3 py-1 mb-4 border border-orange-500/30 rounded-full bg-orange-500/10 text-orange-400 text-xs tracking-widest font-bold">
              ABOUT US
            </div>
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
              1ｍｍにこだわる。<br />
              それが<span className="text-orange-500">「林鐵工所品質」</span>。
            </h2>
            <div className="space-y-4 md:space-y-6 text-slate-400 leading-relaxed text-sm md:text-lg">
              <p>
                創業以来100年、私たちは「鉄」という素材と向き合い続けてきました。
                硬く、重く、扱いづらい鉄を、意のままに操るには熟練の技が必要です。
              </p>
              <p>
                月間約100tの加工能力を有する工場には、最新の一次加工機や鉄骨専用CADを導入。
                「人の手」と「デジタル」の融合による、新しいものづくりに挑戦しています。
              </p>
              <p>
                小さな部品ひとつから、巨大な建築構造物まで。
                私たちの製品は、見えない場所で社会を支えています。
              </p>
            </div>

            {/* Certifications */}
            <div className="mt-8 pt-6 border-t border-slate-800/50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-xs text-orange-500/80 font-mono tracking-wider border border-orange-500/20 px-2 py-0.5 rounded w-fit">LICENSE</span>
                    <span className="text-slate-300 text-sm">群馬県知事許可（般-24）第13345号</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-xs text-orange-500/80 font-mono tracking-wider border border-orange-500/20 px-2 py-0.5 rounded w-fit">CERTIFICATION</span>
                    <span className="text-slate-300 text-sm">国土交通大臣認定Mグレード　TFBM-235487</span>
                </div>
            </div>

            {/* Signature / Philosophy area */}
            <div className="mt-8 md:mt-12 pt-8 border-t border-slate-800 flex items-center justify-between">
                <div>
                    <p className="text-xs md:text-sm text-slate-500 font-mono mb-1">PHILOSOPHY</p>
                    <p className="text-white font-medium tracking-wider text-sm md:text-base">品質絶対・安全第一</p>
                </div>
                <div className="h-10 md:h-12 w-px bg-slate-800"></div>
                 <div>
                    <p className="text-xs md:text-sm text-slate-500 font-mono mb-1">ESTABLISHED</p>
                    <p className="text-white font-medium tracking-wider text-sm md:text-base">1924</p>
                </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative">
                <div className="absolute -inset-4 border border-orange-500/20 rounded-xl transform rotate-3 z-0"></div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                    <img 
                    src="work-05.jpg" 
                    alt="Precision steel frame inspection" 
                    className="rounded-lg object-cover h-40 md:h-64 w-full shadow-2xl hover:scale-[1.02] transition-transform duration-500" 
                    />
                    <img 
                    src="work-03.jpg" 
                    alt="Factory materials" 
                    className="rounded-lg object-cover h-40 md:h-64 w-full mt-8 shadow-2xl hover:scale-[1.02] transition-transform duration-500" 
                    />
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;