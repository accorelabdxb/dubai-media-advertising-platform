import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from "../images/hero.jpeg";
import { useLanguage } from "../contexts/LanguageContext";

interface HeroProps {
  onBookSlot?: () => void;
}

export function Hero({ onBookSlot }: HeroProps) {
  const { t, isRTL } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
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
          <Button size="lg" className="text-lg px-8 py-6">
            {t('hero.getStarted')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={onBookSlot}
          >
            {t('hero.bookSlot')}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}