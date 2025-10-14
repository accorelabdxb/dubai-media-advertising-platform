import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from "../images/hero.jpeg";
import { useLanguage } from "../contexts/LanguageContext";

// Import logos from different categories
import xFactorLogo from "../images/DTV/X-Factor/XF-logo-season2.png";
import wwtbmLogo from "../images/DTV/WWTBM/WWTBM.png";
import theDoctorsLogo from "../images/DTV/The Doctors/TheDoctors.png";
import sharkTankLogo from "../images/DTV/Shark Tank 3/Shark Tank 3.png";
import akherKalamLogo from "../images/DTV_Ramadan/Akher_Kalam/Akher_Kalam.png";
import duroobLogo from "../images/DTV_Ramadan/Duroob/Duroob.png";
import dwcLogo from "../images/Racing/DWC/DWCLogo.png";
import racingAlEmaratLogo from "../images/Racing/Racing Al Emarat/Racing Al Emarat Logo.png";
import racingJebelAliLogo from "../images/Racing/Racing Jebel Ali/Racing Jebel Ali.png";
import racingMeydanLogo from "../images/Racing/Racing Meydan/Racing Meydan.png";
import natureAliLogo from "../images/Sama/Nature with Ali bin Thaleth/Nature with Ali bin Thaleth.png";
import masaaDubaiLogo from "../images/Sama/Masaa Dubai/Masaa-Dubai-color.png";
import kunoozAlDarLogo from "../images/Sama/Kunooz Al Dar 3/Kunooz Al Dar 3.png";
import alHaiAlThaqafiLogo from "../images/Sama/Al Hai Al Thaqafi/Al-Hai-Al-Thaqafi.png";
import alMandoosLogo from "../images/Sama Ramadan/Al Mandoos/mandoos-logo-white.png";
import souqAlQadeemLogo from "../images/Sama Ramadan/souq-al-Qadeem/souq-al-Qadeem.png";
import alMalabLogo from "../images/Sports/Al Malab Logo/Al Malab Logo.png";
import alSalatLogo from "../images/Sports/Al Salat Logo/Al Salat Logo.png";
import jamaheerLogo from "../images/Sports/Jamaheer/Jamaheer Logo.png";
import stadAlDawriLogo from "../images/Sports/Stad Al Dawri/Stad Al Dawri.png";

interface HeroProps {
  onOpenSignInModal?: () => void;
}

export function Hero({ onOpenSignInModal }: HeroProps) {
  const { t, isRTL } = useLanguage();

  const handleBookSlotClick = () => {
    onOpenSignInModal?.();
  };

  // Logo carousel data
  const logos = [
    { src: xFactorLogo, alt: "X-Factor", category: "DTV" },
    { src: wwtbmLogo, alt: "WWTBM", category: "DTV" },
    { src: theDoctorsLogo, alt: "The Doctors", category: "DTV" },
    { src: sharkTankLogo, alt: "Shark Tank", category: "DTV" },
    { src: akherKalamLogo, alt: "Akher Kalam", category: "DTV Ramadan" },
    { src: duroobLogo, alt: "Duroob", category: "DTV Ramadan" },
    { src: dwcLogo, alt: "DWC", category: "Racing" },
    { src: racingAlEmaratLogo, alt: "Racing Al Emarat", category: "Racing" },
    { src: racingJebelAliLogo, alt: "Racing Jebel Ali", category: "Racing" },
    { src: racingMeydanLogo, alt: "Racing Meydan", category: "Racing" },
    { src: natureAliLogo, alt: "Nature with Ali", category: "Sama" },
    { src: masaaDubaiLogo, alt: "Masaa Dubai", category: "Sama" },
    { src: kunoozAlDarLogo, alt: "Kunooz Al Dar", category: "Sama" },
    { src: alHaiAlThaqafiLogo, alt: "Al Hai Al Thaqafi", category: "Sama" },
    { src: alMandoosLogo, alt: "Al Mandoos", category: "Sama Ramadan" },
    { src: souqAlQadeemLogo, alt: "Souq Al Qadeem", category: "Sama Ramadan" },
    { src: alMalabLogo, alt: "Al Malab", category: "Sports" },
    { src: alSalatLogo, alt: "Al Salat", category: "Sports" },
    { src: jamaheerLogo, alt: "Jamaheer", category: "Sports" },
    { src: stadAlDawriLogo, alt: "Stad Al Dawri", category: "Sports" },
  ];
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 z-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={heroImage}
          alt={t('hero.alt')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="mb-6 text-4xl md:text-6xl font-bold leading-tight">
          {t('hero.title')}
        </h1>
        <p className="mb-8 text-xl md:text-2xl opacity-90">
          {t('hero.subtitle')}
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={handleBookSlotClick}
          >
            {t('hero.bookSlot')}
          </Button>
        </div>
        
        {/* Logo Carousel */}
        <div className="mt-16">
          <div className="logo-carousel-container">
            <div className="animate-logo-scroll will-change-transform">
              {/* First set of logos */}
              {logos.map((logo, index) => (
                <div
                  key={`first-${index}`}
                  onClick={handleBookSlotClick}
                  className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                    title={`${logo.alt} - ${logo.category}`}
                  />
                </div>
              ))}
              {/* Second set for seamless loop */}
              {logos.map((logo, index) => (
                <div
                  key={`second-${index}`}
                  onClick={handleBookSlotClick}
                  className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                    title={`${logo.alt} - ${logo.category}`}
                  />
                </div>
              ))}
              {/* Third set to ensure no gaps */}
              {logos.map((logo, index) => (
                <div
                  key={`third-${index}`}
                  onClick={handleBookSlotClick}
                  className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                    title={`${logo.alt} - ${logo.category}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>




      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div> */}
    </section>
  );
}