import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { TrendingUp, Eye, Users, Target } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const getPlatformData = (t: (key: string) => string) => [
  { platform: t('analytics.platform.tv'), reach: 3200000, engagement: 85 },
  { platform: t('analytics.platform.radio'), reach: 1800000, engagement: 72 },
  { platform: t('analytics.platform.print'), reach: 950000, engagement: 68 },
  { platform: t('analytics.platform.social'), reach: 2400000, engagement: 91 }
];

const getMetrics = (t: (key: string) => string) => [
  {
    title: t('analytics.totalReach'),
    value: "8.35M",
    change: "+12%",
    icon: Eye,
    color: "text-blue-600"
  },
  {
    title: t('analytics.avgEngagement'),
    value: "79%",
    change: "+5%",
    icon: Users,
    color: "text-green-600"
  },
  {
    title: t('analytics.conversionRate'),
    value: "4.2%",
    change: "+8%",
    icon: Target,
    color: "text-purple-600"
  },
  {
    title: t('analytics.roi'),
    value: "340%",
    change: "+15%",
    icon: TrendingUp,
    color: "text-orange-600"
  }
];

export function Analytics() {
  const { t } = useLanguage();
  const data = getPlatformData(t);
  const metrics = getMetrics(t);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 font-bold text-4xl">{t('analytics.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('analytics.subtitle')}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <Card key={metric.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-sm ${metric.color}`}>
                        {metric.change} {t('analytics.fromLastMonth')}
                      </p>
                    </div>
                    <IconComponent className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Reach by Platform Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.reachByPlatform')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Bar dataKey="reach" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Engagement Rates */}
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.engagementRates')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.map((item) => (
                <div key={item.platform}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{item.platform}</span>
                    <span className="text-muted-foreground">{item.engagement}%</span>
                  </div>
                  <Progress value={item.engagement} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Demographics Preview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t('analytics.audienceDemographics')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="mb-4">{t('analytics.ageGroups')}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{t('analytics.age.18-24')}</span>
                    <span>22%</span>
                  </div>
                  <Progress value={22} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>{t('analytics.age.25-34')}</span>
                    <span>35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>{t('analytics.age.35-44')}</span>
                    <span>28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>{t('analytics.age.45+')}</span>
                    <span>15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </div>

              <div>
                <h4 className="mb-4">{t('analytics.gender')}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{t('analytics.gender.female')}</span>
                    <span>52%</span>
                  </div>
                  <Progress value={52} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>{t('analytics.gender.male')}</span>
                    <span>48%</span>
                  </div>
                  <Progress value={48} className="h-2" />
                </div>
              </div>

              <div>
                <h4 className="mb-4">{t('analytics.location')}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{t('analytics.location.urban')}</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>{t('analytics.location.suburban')}</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>{t('analytics.location.rural')}</span>
                    <span>10%</span>
                  </div>
                  <Progress value={10} className="h-2" />

                  <div className="flex justify-between">
                    <span>{t('analytics.location.other')}</span>
                    <span>10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}