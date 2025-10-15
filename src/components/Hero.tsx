import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from "../images/hero.jpeg";
import { useLanguage } from "../contexts/LanguageContext";

// Import logos
import mobile1 from "../images/mobile1.svg";
import newspaper1 from "../images/newspaper1.svg";
import radio1 from "../images/radio1.svg";
import tv1 from "../images/tv1.svg";

interface HeroProps {
  onOpenSignInModal?: () => void;
  onOpenChannelModal?: (type: 'tv' | 'radio' | 'print' | 'mobile') => void;
}

export function Hero({ onOpenSignInModal, onOpenChannelModal }: HeroProps) {
  const { t, isRTL } = useLanguage();

  const handleBookSlotClick = () => {
    onOpenSignInModal?.();
  };

  const handleLogoClick = (type: 'tv' | 'radio' | 'print' | 'mobile') => {
    onOpenChannelModal?.(type);
  };

  // Logo carousel data
  const logos = [
    { src: mobile1, alt: "Mobile", category: "Platform", type: 'mobile' as const },
    { src: newspaper1, alt: "Newspaper", category: "Platform", type: 'print' as const },
    { src: radio1, alt: "Radio", category: "Platform", type: 'radio' as const },
    { src: tv1, alt: "TV", category: "Platform", type: 'tv' as const },
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
                  onClick={() => handleLogoClick(logo.type)}
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

              {/* second set of logos */}
              {logos.map((logo, index) => (
                <div
                  key={`second-${index}`}
                  onClick={() => handleLogoClick(logo.type)}
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

              {/* third set of logos */}
              {logos.map((logo, index) => (
                <div
                  key={`third-${index}`}
                  onClick={() => handleLogoClick(logo.type)}
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