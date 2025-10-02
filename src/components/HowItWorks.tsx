import { Card, CardContent } from "./ui/card";
import { MousePointer, Clock, Upload, CreditCard } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      icon: MousePointer,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      icon: Clock,
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: 3,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      icon: Upload,
      color: "bg-green-100 text-green-600"
    },
    {
      id: 4,
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.description'),
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600"
    }
  ];
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 font-bold text-4xl">{t('howItWorks.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="relative">
                <Card className="text-center p-6 h-full transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 rounded-full ${step.color} mx-auto mb-4 flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <div className="mb-3 text-2xl text-muted-foreground">
                      {step.id.toString().padStart(2, '0')}
                    </div>
                    
                    <h3 className="mb-3 font-bold text-xl">{step.title}</h3>
                    
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Connector Line */}
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}