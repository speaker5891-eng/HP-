import React from 'react';
import { SectionId } from '../types';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id={SectionId.SERVICES} className="py-16 md:py-24 bg-slate-900 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-orange-500 font-bold text-xs tracking-[0.2em] uppercase block mb-3">OUR SERVICE</span>
          <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">事業内容</h3>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            設計から製作、現場据付まで。一貫体制だからこそできる高品質なサービス。<br/>
            お客様の「困った」を技術で解決します。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={index} 
              className="group bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-xl hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(234,88,12,0.1)] hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform scale-150 group-hover:scale-125 duration-700 pointer-events-none">
                {service.icon}
              </div>

              <div className="mb-6 md:mb-8 w-12 h-12 md:w-14 md:h-14 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-500 group-hover:text-white text-orange-500 transition-all duration-300 shadow-lg">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {/* Clone the icon to control sizing if needed, or just use as is */}
                    {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-6 h-6 md:w-7 md:h-7" })}
                </div>
              </div>
              
              <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{service.title}</h4>
              <p className="text-slate-400 leading-relaxed text-sm">
                {service.description}
              </p>

              <div className="mt-6 w-8 h-0.5 bg-slate-800 group-hover:bg-orange-500 group-hover:w-16 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;