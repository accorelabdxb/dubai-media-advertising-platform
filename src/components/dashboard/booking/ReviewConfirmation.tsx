import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Checkbox } from "../../ui/checkbox";
import { Separator } from "../../ui/separator";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  CreditCard,
  FileText,
  CheckCircle,
  AlertTriangle,
  Edit
} from "lucide-react";
import { BookingData } from "../DashboardLayout";

interface ReviewConfirmationProps {
  data: BookingData;
  onUpdate: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ReviewConfirmation({ data, onUpdate, onNext, onBack }: ReviewConfirmationProps) {
  const { t } = useLanguage();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const generateBookingReference = () => {
    return `MI-${Date.now().toString().slice(-8)}`;
  };

  // Helper function to translate add-on names
  const translateAddonName = (addonName: string) => {
    // Map English addon names to translation keys
    const addonKeyMap: { [key: string]: string } = {
      'Peak Hour Boost': 'addons.peakHour.name',
      'تعزيز ساعات الذروة': 'addons.peakHour.name',
      'Weekend Premium': 'addons.weekend.name', 
      'باقة عطلة نهاية الأسبوع المميزة': 'addons.weekend.name',
      'Multi-Slot Discount': 'addons.multiSlot.name',
      'خصم متعدد الفترات': 'addons.multiSlot.name',
      'Audience Analytics': 'addons.analytics.name',
      'تحليلات الجمهور': 'addons.analytics.name'
    };
    
    const translationKey = addonKeyMap[addonName];
    return translationKey ? t(translationKey) : addonName;
  };

  // Helper function to translate program categories
  const translateProgramCategory = (category: string) => {
    // Map categories to translation keys
    const categoryKeyMap: { [key: string]: string } = {
      'News & Current Affairs': 'program.morningDubai.category',
      'الأخبار والشؤون الجارية': 'program.morningDubai.category',
      'Lifestyle': 'program.cityPulse.category',
      'أسلوب الحياة': 'program.cityPulse.category',
      'News': 'program.primeTimeNews.category',
      'الأخبار': 'program.primeTimeNews.category',
      'Business': 'program.businessToday.category',
      'الأعمال': 'program.businessToday.category'
    };
    
    const translationKey = categoryKeyMap[category];
    return translationKey ? t(translationKey) : category;
  };

  // Helper function to translate package names
  const translatePackageName = (packageName: string) => {
    const packageKeyMap: { [key: string]: string } = {
      'Ramadan Special Bundle': 'packages.ramadan.name',
      'باقة رمضان الخاصة': 'packages.ramadan.name',
      'FIFA World Cup Package': 'packages.fifa.name',
      'باقة كأس العالم FIFA': 'packages.fifa.name',
      'Eid Celebration Special': 'packages.eid.name',
      'عرض احتفال العيد الخاص': 'packages.eid.name'
    };
    
    const translationKey = packageKeyMap[packageName];
    return translationKey ? t(translationKey) : packageName;
  };

  // Helper function to translate template names
  const translateTemplateName = (templateName: string) => {
    const templateKeyMap: { [key: string]: string } = {
      '30s TV Ad': 'templates.tv30s.name',
      'إعلان تلفزيوني 30 ثانية': 'templates.tv30s.name',
      '60s TV Ad': 'templates.tv60s.name',
      'إعلان تلفزيوني 60 ثانية': 'templates.tv60s.name',
      '15s Radio Jingle': 'templates.radio15s.name',
      'جنجل إذاعي 15 ثانية': 'templates.radio15s.name',
      '30s Radio Ad': 'templates.radio30s.name',
      'إعلان إذاعي 30 ثانية': 'templates.radio30s.name',
      'Full Page Print Ad': 'templates.printFull.name',
      'إعلان مطبوع صفحة كاملة': 'templates.printFull.name',
      'Half Page Print Ad': 'templates.printHalf.name',
      'إعلان مطبوع نصف صفحة': 'templates.printHalf.name',
      'Instagram Story': 'templates.digitalStory.name',
      'قصة إنستغرام': 'templates.digitalStory.name',
      'Social Media Post': 'templates.digitalPost.name',
      'منشور وسائل التواصل': 'templates.digitalPost.name'
    };
    
    const translationKey = templateKeyMap[templateName];
    return translationKey ? t(translationKey) : templateName;
  };

  const handleSubmit = () => {
    const bookingId = generateBookingReference();
    onUpdate({
      bookingId,
      status: 'submitted'
    });
    onNext();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('review.back')}
            </Button>
            <div>
              <h1 className="text-2xl font-medium">{t('review.title')}</h1>
              <p className="text-gray-600">{t('review.subtitle')}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {t('review.step')}
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                {t('review.bookingSummary')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Media Outlet */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{data.mediaOutlet?.logo}</div>
                  <div>
                    <h4 className="font-medium">{data.mediaOutlet?.name}</h4>
                    <Badge variant="outline">
                      {data.mediaOutlet?.type?.toUpperCase()} {t('review.channel')}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onBack}>
                  <Edit className="h-4 w-4 mr-1" />
                  {t('review.edit')}
                </Button>
              </div>

              <Separator />

              {/* Program & Schedule */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t('review.programSchedule')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">{t('review.program')}</p>
                    <p className="font-medium">{data.program?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('review.category')}</p>
                    <p className="font-medium">{data.program?.category && translateProgramCategory(data.program.category)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('review.date')}</p>
                    <p className="font-medium">
                      {data.program?.date && formatDate(data.program.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('review.timeSlot')}</p>
                    <p className="font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {data.program?.timeSlot}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Pricing Breakdown */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  {t('review.pricingBreakdown')}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('review.basePrice')}</span>
                    <span>AED {data.pricing?.basePrice.toLocaleString()}</span>
                  </div>
                  
                  {data.pricing?.addOns && data.pricing.addOns.length > 0 && (
                    <>
                      <div className="text-sm font-medium text-gray-700">{t('review.addOns')}</div>
                      {data.pricing.addOns.map((addon, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600 pl-4">{translateAddonName(addon.name)}</span>
                          <span className={addon.price < 0 ? 'text-green-600' : 'text-gray-600'}>
                            {addon.price < 0 ? '' : '+'}AED {Math.abs(addon.price).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </>
                  )}

                  {data.pricing?.package && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 pl-4">{translatePackageName(data.pricing.package.name)}</span>
                      <span className="text-green-600">
                        -AED {data.pricing.package.discount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <Separator />
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>{t('review.totalAmount')}</span>
                    <span>AED {data.pricing?.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Advertisement Material */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {t('review.adMaterial')}
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  {data.adMaterial?.type === 'upload' ? (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{t('review.uploadedFile')}</p>
                        <p className="text-sm text-gray-600">
                          {data.adMaterial.file?.name || t('review.yourUploadedAd')}
                        </p>
                        <Badge variant="outline" className="mt-1">
                          {t('review.readyForReview')}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded">
                        <FileText className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">{t('review.customTemplateDesign')}</p>
                        <p className="text-sm text-gray-600">
                          {data.adMaterial?.template?.name && translateTemplateName(data.adMaterial.template.name)}
                        </p>
                        <div className="text-sm text-gray-600 mt-1">
                          <p>{t('review.company')}: {data.adMaterial?.template?.customization.companyName}</p>
                          <p>{t('review.message')}: {data.adMaterial?.template?.customization.slogan}</p>
                        </div>
                        <Badge variant="outline" className="mt-1">
                          {t('review.toBeCreated')}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">{t('review.importantInfo')}</h4>
                  <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                    <li>{t('review.reviewTime')}</li>
                    <li>{t('review.paymentProcess')}</li>
                    <li>{t('review.changesFees')}</li>
                    <li>{t('review.cancellation')}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>{t('review.termsConditions')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <div className="text-sm">
                  <label htmlFor="terms" className="cursor-pointer">
                    {t('review.agreeToTerms')}{' '}
                    <a href="#" className="text-primary hover:underline">
                      {t('review.termsOfService')}
                    </a>{' '}
                    {t('review.and')}{' '}
                    <a href="#" className="text-primary hover:underline">
                      {t('review.adPolicy')}
                    </a>
                    *
                  </label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketing"
                  checked={marketingConsent}
                  onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
                />
                <div className="text-sm">
                  <label htmlFor="marketing" className="cursor-pointer">
                    {t('review.marketingConsent')}
                  </label>
                </div>
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <p className="font-medium mb-1">{t('review.keyTerms')}</p>
                <ul className="space-y-1">
                  <li>{t('review.bookingApproval')}</li>
                  <li>{t('review.paymentDue')}</li>
                  <li>{t('review.contentCompliance')}</li>
                  <li>{t('review.contentRejection')}</li>
                  <li>{t('review.refundPolicy')}</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('review.backToEdit')}
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={!termsAccepted}
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              {t('review.submitForApproval')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {!termsAccepted && (
            <p className="text-sm text-red-600 text-center">
              {t('review.acceptTermsRequired')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}