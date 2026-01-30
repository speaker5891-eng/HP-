import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { WORKS } from '../constants';
import { ArrowRight, X, ZoomIn } from 'lucide-react';
import { WorkItem } from '../types';

const Works: React.FC = () => {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedWork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedWork]);

  return (
    <section id={SectionId.WORKS} className="py-16 md:py-24 bg-slate-950 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
          <div>
            <span className="text-orange-500 font-bold text-xs tracking-[0.2em] uppercase block mb-3">WORKS</span>
            <h3 className="text-2xl md:text-5xl font-bold text-white">施工・製作実績</h3>
          </div>
          <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group px-4 py-2 rounded-full hover:bg-white/5 border border-transparent hover:border-slate-700">
            <span className="text-sm">すべての実績を見る</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-orange-500" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {WORKS.map((work) => (
            <div 
              key={work.id} 
              onClick={() => setSelectedWork(work)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-2xl border border-slate-800/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,88,12,0.15)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-900 relative">
                <img 
                  src={work.imageUrl} 
                  alt={work.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-orange-600/90 p-3 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ZoomIn className="w-6 h-6" />
                    </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full pointer-events-none">
                {/* Gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-0"></div>
                
                <div className="relative z-10">
                    <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold text-orange-400 border border-orange-500/30 bg-orange-950/50 text-white rounded uppercase tracking-wider backdrop-blur-sm">
                    {work.category}
                    </span>
                    <h4 className="text-lg md:text-xl font-bold text-white drop-shadow-md group-hover:text-orange-500 transition-colors">
                    {work.title}
                    </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedWork && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-lg animate-fade-in"
          onClick={() => setSelectedWork(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedWork(null)}
              className="absolute -top-12 right-0 md:right-0 p-2 text-slate-400 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-2xl border border-slate-800">
              <img 
                src={selectedWork.imageUrl} 
                alt={selectedWork.title} 
                className="w-full h-auto max-h-[80vh] object-contain bg-black"
              />
            </div>

            {/* Caption */}
            <div className="mt-6 text-center animate-fade-in-up">
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2 block">
                {selectedWork.category}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedWork.title}</h3>
              <p className="text-slate-400 text-sm">
                有限会社 林鐵工所 施工実績 No.{selectedWork.id}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Works;