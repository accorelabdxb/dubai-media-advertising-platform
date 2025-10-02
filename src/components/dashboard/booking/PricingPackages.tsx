import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Switch } from "../../ui/switch";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  Gift,
  TrendingUp,
  Calendar,
  Users,
  Zap
} from "lucide-react";
import { BookingData } from "../DashboardLayout";

interface PricingPackagesProps {
  data: BookingData;
  onUpdate: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PricingPackages({ data, onUpdate, onNext, onBack }: PricingPackagesProps) {
  const { t } = useLanguage();
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const addOns = [
    {
      id: 'peak-hour',
      name: t('addons.peakHour.name'),
      description: t('addons.peakHour.desc'),
      price: 1500,
      icon: TrendingUp
    },
    {
      id: 'weekend',
      name: t('addons.weekend.name'),
      description: t('addons.weekend.desc'),
      price: 1000,
      icon: Calendar
    },
    {
      id: 'multi-slot',
      name: t('addons.multiSlot.name'),
      description: t('addons.multiSlot.desc'),
      price: -300,
      icon: Zap
    },
    {
      id: 'audience-analytics',
      name: t('addons.analytics.name'),
      description: t('addons.analytics.desc'),
      price: 500,
      icon: Users
    }
  ];

  const seasonalPackages = [
    {
      id: 'ramadan-bundle',
      name: t('packages.ramadan.name'),
      description: t('packages.ramadan.desc'),
      originalPrice: 25000,
      discountedPrice: 18000,
      discount: 28,
      features: [
        t('packages.ramadan.feature1'),
        t('packages.ramadan.feature2'),
        t('packages.ramadan.feature3'),
        t('packages.ramadan.feature4'),
        t('packages.ramadan.feature5')
      ],
      badge: t('packages.ramadan.badge'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'fifa-bundle',
      name: t('packages.fifa.name'),
      description: t('packages.fifa.desc'),
      originalPrice: 35000,
      discountedPrice: 28000,
      discount: 20,
      features: [
        t('packages.fifa.feature1'),
        t('packages.fifa.feature2'),
        t('packages.fifa.feature3'),
        t('packages.fifa.feature4'),
        t('packages.fifa.feature5')
      ],
      badge: t('packages.fifa.badge'),
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'eid-celebration',
      name: t('packages.eid.name'),
      description: t('packages.eid.desc'),
      originalPrice: 20000,
      discountedPrice: 15000,
      discount: 25,
      features: [
        t('packages.eid.feature1'),
        t('packages.eid.feature2'),
        t('packages.eid.feature3'),
        t('packages.eid.feature4'),
        t('packages.eid.feature5')
      ],
      badge: t('packages.eid.badge'),
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const toggleAddOn = (addOnId: string) => {
    const updatedAddOns = selectedAddOns.includes(addOnId)
      ? selectedAddOns.filter(id => id !== addOnId)
      : [...selectedAddOns, addOnId];
    
    setSelectedAddOns(updatedAddOns);
    updatePricing(updatedAddOns, selectedPackage);
  };

  const selectPackage = (packageId: string | null) => {
    setSelectedPackage(packageId);
    updatePricing(selectedAddOns, packageId);
  };

  const updatePricing = (addOnIds: string[], packageId: string | null) => {
    const basePrice = data.pricing?.basePrice || 0;
    const addOnPrices = addOnIds.map(id => addOns.find(addon => addon.id === id)?.price || 0);
    const addOnTotal = addOnPrices.reduce((sum, price) => sum + price, 0);
    
    let finalPrice = basePrice + addOnTotal;
    let packageDiscount = 0;
    
    if (packageId) {
      const selectedPkg = seasonalPackages.find(pkg => pkg.id === packageId);
      if (selectedPkg) {
        finalPrice = selectedPkg.discountedPrice;
        packageDiscount = selectedPkg.originalPrice - selectedPkg.discountedPrice;
      }
    }

    onUpdate({
      pricing: {
        basePrice,
        addOns: addOnIds.map(id => {
          const addon = addOns.find(a => a.id === id)!;
          return { name: addon.name, price: addon.price };
        }),
        package: packageId ? {
          name: seasonalPackages.find(p => p.id === packageId)!.name,
          discount: packageDiscount
        } : undefined,
        totalPrice: finalPrice
      }
    });
  };

  const calculateSavings = () => {
    if (!selectedPackage) return 0;
    const pkg = seasonalPackages.find(p => p.id === selectedPackage);
    return pkg ? pkg.originalPrice - pkg.discountedPrice : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('pricing.back')}
            </Button>
            <div>
              <h1 className="text-2xl font-medium">{t('pricing.title')}</h1>
              <p className="text-gray-600">{t('pricing.subtitle')}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {t('pricing.step')}
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Base Pricing & Add-ons */}
          <div className="lg:col-span-2 space-y-6">
            {/* Base Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>{t('pricing.basePricing')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{data.program?.name}</h4>
                    <p className="text-sm text-gray-600">
                      {data.program?.date} {t('pricing.at')} {data.program?.timeSlot}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">AED {data.pricing?.basePrice.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{t('pricing.basePrice')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  {t('pricing.enhanceCampaign')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {addOns.map((addon) => {
                  const Icon = addon.icon;
                  const isSelected = selectedAddOns.includes(addon.id);
                  
                  return (
                    <div key={addon.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{addon.name}</h4>
                          <p className="text-sm text-gray-600">{addon.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className={`font-medium ${addon.price < 0 ? 'text-green-600' : 'text-gray-900'}`}>
                            {addon.price < 0 ? '' : '+'}AED {Math.abs(addon.price).toLocaleString()}
                          </p>
                          {addon.price < 0 && <p className="text-sm text-green-600">{t('pricing.discount')}</p>}
                        </div>
                        <Switch
                          checked={isSelected}
                          onCheckedChange={() => toggleAddOn(addon.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Seasonal Packages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  {t('pricing.seasonalPackages')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {seasonalPackages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedPackage === pkg.id
                          ? 'ring-2 ring-primary border-primary'
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => selectPackage(selectedPackage === pkg.id ? null : pkg.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{pkg.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {pkg.badge}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            selectedPackage === pkg.id
                              ? 'border-primary bg-primary'
                              : 'border-gray-300'
                          }`}>
                            {selectedPackage === pkg.id && (
                              <div className="w-full h-full rounded-full bg-white transform scale-50" />
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-medium text-gray-900">
                              AED {pkg.discountedPrice.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              AED {pkg.originalPrice.toLocaleString()}
                            </span>
                            <Badge className="bg-green-100 text-green-800">
                              {pkg.discount}% OFF
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-1">
                          {pkg.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                              <span className="text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Pricing Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>{t('pricing.pricingSummary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('pricing.basePrice')}</span>
                    <span>AED {data.pricing?.basePrice.toLocaleString()}</span>
                  </div>
                  
                  {data.pricing?.addOns.map((addon, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{addon.name}</span>
                      <span className={addon.price < 0 ? 'text-green-600' : 'text-gray-600'}>
                        {addon.price < 0 ? '' : '+'}AED {Math.abs(addon.price).toLocaleString()}
                      </span>
                    </div>
                  ))}

                  {data.pricing?.package && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">
                        {data.pricing.package.name} {t('pricing.discount')}
                      </span>
                      <span className="text-green-600">
                        -AED {data.pricing.package.discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{t('pricing.totalPrice')}</span>
                    <span className="text-xl font-medium">
                      AED {data.pricing?.totalPrice.toLocaleString()}
                    </span>
                  </div>
                  
                  {calculateSavings() > 0 && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-green-600">{t('pricing.youSave')}</span>
                      <span className="text-sm font-medium text-green-600">
                        AED {calculateSavings().toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    💡 <strong>{t('pricing.proTip')}</strong> {t('pricing.proTipText')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end mt-6">
          <Button onClick={onNext} size="lg">
            {t('pricing.continueToMaterial')}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}