import { Button } from "./ui/button";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function CTA() {
  const { t, isRTL } = useLanguage();
  
  return (
    <section className="py-16 px-4 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="mb-6 font-bold text-4xl text-white">
          {t('cta.title')}
        </h2>
        
        <p className="mb-8 text-xl opacity-90 max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Calendar className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('cta.bookDemo')}
          </Button>
          
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
            {t('cta.createCampaign')}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Button>
        </div>

        {/* Features highlight */}
        <div className="grid md:grid-cols-3 gap-8 opacity-90">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="mb-2 text-white">{t('cta.support.title')}</h4>
            <p className="text-sm">{t('cta.support.description')}</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="mb-2 text-white">{t('cta.setup.title')}</h4>
            <p className="text-sm">{t('cta.setup.description')}</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <ArrowRight className="w-6 h-6" />
            </div>
            <h4 className="mb-2 text-white">{t('cta.results.title')}</h4>
            <p className="text-sm">{t('cta.results.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}