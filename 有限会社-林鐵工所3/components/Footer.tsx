import React from 'react';
import { COMPANY_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white tracking-wider">{COMPANY_NAME}</h2>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-orange-500 transition-colors text-sm">プライバシーポリシー</a>
            <a href="#" className="text-slate-500 hover:text-orange-500 transition-colors text-sm">特定商取引法に基づく表記</a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-slate-700">
          &copy; {new Date().getFullYear()} {COMPANY_NAME}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;