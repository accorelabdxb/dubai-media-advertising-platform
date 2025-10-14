import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Tv, Menu, X } from "lucide-react";
import logoSvg from "../images/logo-white.svg";
import { useLanguage } from "../contexts/LanguageContext";

const getNavigation = (t: (key: string) => string) => [
  { name: t('nav.platforms'), href: "#platforms", description: t('nav.platforms.description') },
  { name: t('nav.howItWorks'), href: "#how-it-works", description: t('nav.howItWorks.description') },
  { name: t('nav.programs'), href: "#programs", description: t('nav.programs.description') },
  { name: t('nav.analytics'), href: "#analytics", description: t('nav.analytics.description') },
  { name: t('nav.pricing'), href: "#pricing", description: t('nav.pricing.description') },
  { name: t('nav.contact'), href: "#contact", description: t('nav.contact.description') }
];

interface NavbarProps {
  onGetStarted: () => void;
}

export function Navbar({ onGetStarted }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isRTL, language, setLanguage } = useLanguage();
  
  const navigation = getNavigation(t);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className={`flex items-center justify-between h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logoSvg} alt="Logo" style={{ height: '20px' }}/>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Desktop Login Button */}
          <div className={`hidden md:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button 
              variant="ghost" 
              onClick={toggleLanguage}
              className="text-white hover:text-black hover:bg-white text-sm"
            >
              {language === 'ar' ? 'EN' : 'العربية'}
            </Button>
           
            <Button onClick={onGetStarted} className="bg-white text-black hover:bg-gray-200">
              تسجيل الدخول
            </Button>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:bg-white/20 text-white size-9">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side={isRTL ? "left" : "right"} className="w-80">
              <div className={`flex items-center justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex items-center gap-2">
                  <Tv className="w-6 h-6 text-primary" />
                  <span className="text-lg font-bold">{t('nav.adPlatform')}</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground size-9"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full p-3 rounded-lg hover:bg-accent transition-colors group ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <div className="font-medium text-primary group-hover:text-primary">
                      {item.name}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </div>
                  </button>
                ))}
                
                <div className="pt-6 border-t border-border space-y-3">
                  <Button 
                    variant="ghost" 
                    onClick={toggleLanguage}
                    className="w-full"
                  >
                    {language === 'ar' ? 'English' : 'العربية'}
                  </Button>
                  <Button variant="ghost" className="w-full">
                    {t('nav.signIn')}
                  </Button>
                  <Button onClick={onGetStarted} className="w-full">
                    {t('nav.getStarted')}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}