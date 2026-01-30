import React, { useState, useEffect } from 'react';
import { Menu, X, Flame } from 'lucide-react';
import { SectionId } from '../types';
import { COMPANY_NAME } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: SectionId) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: SectionId.HOME, label: 'トップ' },
    { id: SectionId.ABOUT, label: '会社概要' },
    { id: SectionId.SERVICES, label: '事業内容' },
    { id: SectionId.WORKS, label: '施工実績' },
    { id: SectionId.RECRUIT, label: '採用情報' },
    { id: SectionId.CONTACT, label: 'お問い合わせ' },
  ];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollTo(SectionId.HOME)}>
          <div className="bg-orange-600 p-1.5 rounded text-white group-hover:bg-orange-500 transition-colors">
            {/* Welding Torch / Flame Icon */}
            <Flame size={24} fill="currentColor" className="text-white" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-widest text-white">
            {COMPANY_NAME}
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-slate-300 hover:text-orange-500 transition-colors tracking-wider relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <button 
            onClick={() => scrollTo(SectionId.CONTACT)}
            className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-sm font-bold text-sm tracking-wider transition-all transform hover:-translate-y-0.5"
          >
            ご相談・お見積り
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white hover:text-orange-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen py-8' : 'max-h-0'}`}>
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-lg font-medium text-slate-300 hover:text-orange-500 transition-colors w-full text-center py-2"
            >
              {link.label}
            </button>
          ))}
           <button 
            onClick={() => scrollTo(SectionId.CONTACT)}
            className="bg-orange-600 text-white px-8 py-3 rounded mt-4 font-bold"
          >
            ご相談・お見積り
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;