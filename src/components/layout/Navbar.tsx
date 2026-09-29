import { Link, useLocation } from 'react-router-dom';
import { Camera, Map, History, Info, Menu, X, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AuthModal from '../ui/AuthModal';
import { Globe, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'or', name: 'ଓଡ଼ିଆ' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.explore'), path: '/explore' },
    { name: t('nav.HistoLens'), path: '/HistoLens' },
    { name: t('common.explore3d'), path: '/explore' }, // Mock route since 3d doesn't have dedicated route yet
    { name: t('nav.photoChallenge'), path: '/photo-challenge' },
    { name: t('nav.community', { defaultValue: 'Stories' }), path: '/stories' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-deep-navy/90 backdrop-blur-md py-2 border-b border-white/10 shadow-lg' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-warm-gold to-heritage-orange flex items-center justify-center font-serif font-bold text-deep-navy group-hover:scale-105 transition-transform">
                H
              </div>
              <span className="font-serif text-xl font-bold tracking-widest text-white uppercase">HISTONEX</span>
            </Link>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => {
                const isActive = location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-2 py-2 text-sm font-medium transition-colors tracking-wide ${
                      isActive 
                        ? 'text-heritage-orange' 
                        : 'text-cream/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-heritage-orange rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm font-medium text-cream hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
              >
                <Globe className="w-4 h-4" />
                {languages.find(l => l.code === i18n.language)?.name || 'English'}
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {langOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-deep-navy/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl py-2 z-50 max-h-[60vh] overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        i18n.language === lang.code 
                          ? 'bg-heritage-orange/20 text-heritage-orange font-bold' 
                          : 'text-cream hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {isLoggedIn ? (
              <div 
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-white/10 text-white border border-white/20 cursor-default"
              >
                <User className="w-4 h-4" />
                Profile
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="px-5 py-2 text-sm font-semibold rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 hover:border-white/40"
              >
                {t('nav.login')}
              </button>
            )}
          </div>

          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cream hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-deep-navy/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-3 rounded-md text-base font-medium text-cream hover:text-white hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-heritage-orange hover:bg-white/5"
              >
                {t('nav.login')}
              </button>
            ) : (
              <div
                className="block px-3 py-3 rounded-md text-base font-medium text-heritage-orange opacity-80"
              >
                {t('nav.profile', { defaultValue: 'Profile' })}
              </div>
            )}
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={() => setIsLoggedIn(true)} 
      />
    </nav>
  );
}
