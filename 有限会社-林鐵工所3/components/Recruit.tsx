import React from 'react';
import { SectionId } from '../types';
import { Users, HardHat, CheckCircle2 } from 'lucide-react';

const Recruit: React.FC = () => {
  const jobs = [
    {
      title: "製作管理者・溶接技術者",
      description: "建築鉄骨の製作を中心とした業務全般をお任せします。",
      details: [
        { label: "業務内容", value: "建築鉄骨の製作・管理、建築鉄骨の組立作業、プロジェクトの進行管理、溶接等の製作業務" },
        { label: "給与", value: "月給 250,000円 ～ 350,000円" },
        { label: "勤務時間", value: "08:30 ～ 17:30" },
        { label: "休日", value: "土・日（完全週休二日制）" },
        { label: "待遇・条件", value: "有資格者・経験者優遇（WES・製作管理技術者・半自動溶接等）、昇給あり、資格・皆勤手当あり" },
      ]
    },
    {
      title: "溶接技術者",
      description: "専門スキルを活かし、ものづくりの最前線で活躍してください。",
      details: [
        { label: "業務内容", value: "半自動溶接による溶接作業" },
        { label: "給与", value: "月給 200,000円 ～ 300,000円" },
        { label: "勤務時間", value: "08:30 ～ 17:30" },
        { label: "休日", value: "土・日（完全週休二日制）" },
        { label: "待遇・条件", value: "有資格者・経験者優遇（半自動溶接JIS-3F・3H）、昇給あり、資格・皆勤手当あり" },
      ]
    }
  ];

  return (
    <section id={SectionId.RECRUIT} className="py-16 md:py-24 bg-slate-900 relative border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-orange-500 font-bold text-xs tracking-[0.2em] uppercase block mb-3">RECRUIT</span>
          <h3 className="text-2xl md:text-5xl font-bold text-white mb-6">採用情報</h3>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            創業100年の技術を次世代へ。<br/>
            私たちと共に、地図に残る仕事に挑戦しませんか？
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {jobs.map((job, index) => (
            <div key={index} className="bg-slate-950 border border-slate-800 rounded-xl p-6 md:p-8 hover:border-orange-500/30 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-orange-500/5">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold mb-4 border border-orange-500/20">
                  <Users size={14} />
                  <span>正社員募集</span>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{job.title}</h4>
                <p className="text-slate-400 text-sm">{job.description}</p>
              </div>

              <div className="flex-grow space-y-4">
                {job.details.map((detail, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-900 pb-3 last:border-0 last:pb-0">
                    <dt className="w-auto sm:w-32 text-sm font-bold text-slate-500 flex-shrink-0 mb-1 sm:mb-0 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        {detail.label}
                    </dt>
                    <dd className="text-slate-300 text-sm leading-relaxed">{detail.value}</dd>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-900">
                <button 
                  onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-3 bg-slate-900 hover:bg-orange-600 text-white rounded font-bold transition-colors border border-slate-700 hover:border-orange-500 flex items-center justify-center gap-2 group text-sm md:text-base"
                >
                  <HardHat className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  この求人に応募する
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 bg-slate-800/50 rounded-xl p-6 md:p-8 max-w-4xl mx-auto border border-slate-700/50">
           <h4 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-orange-500" />
            求める人物像
           </h4>
           <div className="grid md:grid-cols-2 gap-4 text-slate-300 text-sm">
             <ul className="space-y-2">
               <li className="flex items-start gap-2">
                 <span className="text-orange-500 mt-1">•</span>
                 ものづくりが好きで、技術向上に意欲的な方
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-orange-500 mt-1">•</span>
                 チームワークを大切にし、コミュニケーションが取れる方
               </li>
             </ul>
             <ul className="space-y-2">
               <li className="flex items-start gap-2">
                 <span className="text-orange-500 mt-1">•</span>
                 安全意識が高く、責任感を持って業務に取り組める方
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-orange-500 mt-1">•</span>
                 未経験でも「手に職をつけたい」という強い意志のある方
               </li>
             </ul>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Recruit;