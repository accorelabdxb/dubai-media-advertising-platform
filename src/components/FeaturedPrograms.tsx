import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, Users, DollarSign } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function FeaturedPrograms() {
  const { t } = useLanguage();

  const programs = [
    {
      id: 1,
      title: t('programs.morningNews'),
      platform: t('platforms.television'),
      timeSlot: t('timeSlots.morning'),
      audience: `2.5M ${t('featured.viewers')}`,
      cost: "$15,000",
      isPrime: true,
      category: t('categories.news')
    },
    {
      id: 2,
      title: t('programs.driveTime'),
      platform: t('platforms.radio'),
      timeSlot: t('timeSlots.evening'),
      audience: `850K ${t('featured.listeners')}`,
      cost: "$5,500",
      isPrime: true,
      category: t('categories.talk')
    },
    {
      id: 3,
      title: t('programs.weekendSports'),
      platform: t('platforms.television'),
      timeSlot: t('timeSlots.afternoon'),
      audience: `1.8M ${t('featured.viewers')}`,
      cost: "$12,000",
      isPrime: false,
      category: t('categories.sports')
    },
    {
      id: 4,
      title: t('programs.businessWeekly'),
      platform: t('platforms.print'),
      timeSlot: t('timeSlots.monday'),
      audience: `500K ${t('featured.readers')}`,
      cost: "$3,200",
      isPrime: false,
      category: t('categories.business')
    },
    {
      id: 5,
      title: t('programs.eveningEntertainment'),
      platform: t('platforms.television'),
      timeSlot: t('timeSlots.primeTime'),
      audience: `3.2M ${t('featured.viewers')}`,
      cost: "$25,000",
      isPrime: true,
      category: t('categories.entertainment')
    },
    {
      id: 6,
      title: t('programs.socialCampaign'),
      platform: t('platforms.socialMedia'),
      timeSlot: t('timeSlots.weekCampaign'),
      audience: `2.1M ${t('featured.reach')}`,
      cost: "$8,500",
      isPrime: false,
      category: t('categories.digital')
    }
  ];
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 font-bold text-4xl">{t('featured.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card key={program.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{program.platform}</Badge>
                  {program.isPrime && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">{t('featured.primeTime')}</Badge>
                  )}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {program.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {program.timeSlot}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {program.audience}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold">{program.cost}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full" variant="purple">
                    {t('featured.bookSlot')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">
            {t('featured.viewAllSlots')}
          </Button>
        </div>
      </div>
    </section>
  );
}