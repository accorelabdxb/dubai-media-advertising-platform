import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  Tv, 
  Radio, 
  Newspaper, 
  Smartphone,
  Filter
} from "lucide-react";
import { BookingData } from "../DashboardLayout";

interface MediaSelectionProps {
  data: BookingData;
  onUpdate: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function MediaSelection({ data, onUpdate, onNext, onBack }: MediaSelectionProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'tv' | 'radio' | 'print' | 'digital'>('all');

  const getMediaOutletData = (id: string, nameKey: string, type: 'tv' | 'radio' | 'print' | 'digital', logo: string, descKey: string, reach: string, reachType: string, premium: boolean) => ({
    id,
    name: t(nameKey),
    type,
    logo,
    description: t(descKey),
    reach: `${reach} ${t(`media.${reachType}`)}`,
    premium
  });

  const mediaOutlets = [
    // TV Channels
    getMediaOutletData('1', 'media.dubaiTV.name', 'tv', '📺', 'media.dubaiTV.desc', '2.1M', 'viewers', true),
    getMediaOutletData('2', 'media.samaDubai.name', 'tv', '📺', 'media.samaDubai.desc', '1.8M', 'viewers', false),
    getMediaOutletData('3', 'media.dubaiSports.name', 'tv', '⚽', 'media.dubaiSports.desc', '1.5M', 'viewers', true),
    getMediaOutletData('4', 'media.dubaiOne.name', 'tv', '📺', 'media.dubaiOne.desc', '900K', 'viewers', false),
    
    // Radio Stations
    getMediaOutletData('5', 'media.noorDubai.name', 'radio', '📻', 'media.noorDubai.desc', '800K', 'listeners', false),
    getMediaOutletData('6', 'media.dubaiFM.name', 'radio', '📻', 'media.dubaiFM.desc', '650K', 'listeners', false),
    getMediaOutletData('7', 'media.dubaiEye.name', 'radio', '📻', 'media.dubaiEye.desc', '400K', 'listeners', true),
    
    // Newspapers
    getMediaOutletData('8', 'media.alBayan.name', 'print', '📰', 'media.alBayan.desc', '300K', 'readers', false),
    getMediaOutletData('9', 'media.emiratesToday.name', 'print', '📰', 'media.emiratesToday.desc', '150K', 'readers', false),
    getMediaOutletData('10', 'media.gulfNews.name', 'print', '📰', 'media.gulfNews.desc', '500K', 'readers', true),
    
    // Digital Platforms
    getMediaOutletData('11', 'media.dubaiPortal.name', 'digital', '💻', 'media.dubaiPortal.desc', '2.5M', 'visitors', true),
    getMediaOutletData('12', 'media.dubaiTourism.name', 'digital', '📱', 'media.dubaiTourism.desc', '1.2M', 'users', false),
    getMediaOutletData('13', 'media.socialBundle.name', 'digital', '📱', 'media.socialBundle.desc', '5M', 'impressions', true)
  ];

  const filteredOutlets = mediaOutlets.filter(outlet => {
    const matchesSearch = outlet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         outlet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || outlet.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tv': return <Tv className="h-5 w-5" />;
      case 'radio': return <Radio className="h-5 w-5" />;
      case 'print': return <Newspaper className="h-5 w-5" />;
      case 'digital': return <Smartphone className="h-5 w-5" />;
      default: return null;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      tv: 'bg-blue-100 text-blue-800',
      radio: 'bg-green-100 text-green-800',
      print: 'bg-purple-100 text-purple-800',
      digital: 'bg-orange-100 text-orange-800'
    };
    return <Badge className={colors[type as keyof typeof colors]}>{t(`media.type.${type}`)}</Badge>;
  };

  const handleSelectOutlet = (outlet: typeof mediaOutlets[0]) => {
    onUpdate({
      mediaOutlet: {
        id: outlet.id,
        name: outlet.name,
        type: outlet.type,
        logo: outlet.logo
      }
    });
  };

  const isSelected = (outletId: string) => {
    return data.mediaOutlet?.id === outletId;
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('dashboard.backToDashboard')}
            </Button>
            <div>
              <h1 className="text-2xl font-medium">{t('mediaSelection.title')}</h1>
              <p className="text-gray-600">{t('mediaSelection.subtitle')}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {t('mediaSelection.step')} 1 {t('mediaSelection.of')} 6
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('mediaSelection.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {[
              { key: 'all', label: t('mediaSelection.allMedia'), count: mediaOutlets.length },
              { key: 'tv', label: t('mediaSelection.tvChannels'), count: mediaOutlets.filter(o => o.type === 'tv').length },
              { key: 'radio', label: t('mediaSelection.radioStations'), count: mediaOutlets.filter(o => o.type === 'radio').length },
              { key: 'print', label: t('mediaSelection.printMedia'), count: mediaOutlets.filter(o => o.type === 'print').length },
              { key: 'digital', label: t('mediaSelection.digitalPlatforms'), count: mediaOutlets.filter(o => o.type === 'digital').length }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={selectedFilter === filter.key ? 'default' : 'outline'}
                onClick={() => setSelectedFilter(filter.key as any)}
                className="gap-2"
              >
                {filter.label}
                <Badge variant="secondary" className="text-xs">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Media Outlets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {filteredOutlets.map((outlet) => (
            <Card
              key={outlet.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected(outlet.id)
                  ? 'ring-2 ring-primary border-primary bg-primary/5'
                  : 'hover:border-gray-300'
              }`}
              onClick={() => handleSelectOutlet(outlet)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{outlet.logo}</div>
                    <div>
                      {getTypeIcon(outlet.type)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {getTypeBadge(outlet.type)}
                    {outlet.premium && (
                      <Badge variant="default" className="bg-yellow-100 text-yellow-800 text-xs">
                        ⭐ {t('mediaSelection.premium')}
                      </Badge>
                    )}
                  </div>
                </div>

                <h3 className="font-medium text-gray-900 mb-1">{outlet.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{outlet.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{outlet.reach}</span>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    isSelected(outlet.id)
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  }`}>
                    {isSelected(outlet.id) && (
                      <div className="w-full h-full rounded-full bg-white transform scale-50" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOutlets.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('mediaSelection.noResults')}</h3>
            <p className="text-gray-600">{t('mediaSelection.noResults.description')}</p>
          </div>
        )}

        {/* Selected Outlet Summary */}
        {data.mediaOutlet && (
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{data.mediaOutlet.logo}</div>
                  <div>
                    <h4 className="font-medium text-blue-900">{t('mediaSelection.selected')} {data.mediaOutlet.name}</h4>
                    <p className="text-sm text-blue-700">
                      {filteredOutlets.find(o => o.id === data.mediaOutlet?.id)?.description}
                    </p>
                  </div>
                </div>
                {getTypeBadge(data.mediaOutlet.type)}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        <div className="flex justify-end">
          <Button
            onClick={onNext}
            disabled={!data.mediaOutlet}
            size="lg"
          >
            {t('mediaSelection.continue')}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}