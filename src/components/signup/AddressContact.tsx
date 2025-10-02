import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { MapPin, Phone, Building, Building2, User } from "lucide-react";
import { SignupData } from "../SignupPage";
import { useLanguage } from "../../contexts/LanguageContext";

interface AddressContactProps {
  data: SignupData;
  onUpdate: (updates: Partial<SignupData>) => void;
}

export function AddressContact({ data, onUpdate }: AddressContactProps) {
  const { t } = useLanguage();
  
  const getUaeEmirates = (t: (key: string) => string) => [
    { value: "abu-dhabi", label: t('signup.addressContact.emirates.abudhabi') },
    { value: "dubai", label: t('signup.addressContact.emirates.dubai') },
    { value: "sharjah", label: t('signup.addressContact.emirates.sharjah') },
    { value: "ajman", label: t('signup.addressContact.emirates.ajman') },
    { value: "umm-al-quwain", label: t('signup.addressContact.emirates.uaq') },
    { value: "ras-al-khaimah", label: t('signup.addressContact.emirates.rak') },
    { value: "fujairah", label: t('signup.addressContact.emirates.fujairah') }
  ];
  
  const getCountries = (t: (key: string) => string) => [
    { value: "UAE", label: t('signup.addressContact.countries.uae') },
    { value: "saudi", label: t('signup.addressContact.countries.saudi') },
    { value: "qatar", label: t('signup.addressContact.countries.qatar') },
    { value: "kuwait", label: t('signup.addressContact.countries.kuwait') },
    { value: "bahrain", label: t('signup.addressContact.countries.bahrain') },
    { value: "oman", label: t('signup.addressContact.countries.oman') }
  ];

  const getAccountTypes = (t: (key: string) => string) => [
    {
      value: "agency",
      title: t('signup.addressContact.agency'),
      description: t('signup.addressContact.agencyDescription'),
      icon: Building2,
      features: [
        t('signup.addressContact.agencyFeature1'),
        t('signup.addressContact.agencyFeature2'),
        t('signup.addressContact.agencyFeature3'),
        t('signup.addressContact.agencyFeature4')
      ]
    },
    {
      value: "direct",
      title: t('signup.addressContact.direct'),
      description: t('signup.addressContact.directDescription'),
      icon: User,
      features: [
        t('signup.addressContact.directFeature1'),
        t('signup.addressContact.directFeature2'),
        t('signup.addressContact.directFeature3'),
        t('signup.addressContact.directFeature4')
      ]
    }
  ];
  
  const uaeEmirates = getUaeEmirates(t);
  const countries = getCountries(t);
  const accountTypes = getAccountTypes(t);

  return (
    <div className="space-y-6">
      {/* Account Type Selection */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">{t('signup.addressContact.accountType')} *</Label>
          <p className="text-sm text-gray-600 mb-4">
            {t('signup.addressContact.accountTypeDescription')}
          </p>
        </div>
        
        <Select value={data.accountType} onValueChange={(value) => onUpdate({ accountType: value })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('signup.addressContact.selectAccountType')} />
          </SelectTrigger>
          <SelectContent>
            {accountTypes.map((type) => {
              const Icon = type.icon;
              return (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-3 py-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{type.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {type.description}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        
        {data.accountType && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {data.accountType === 'agency' ? <Building2 className="h-4 w-4 text-blue-600" /> : <User className="h-4 w-4 text-blue-600" />}
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">
                    {data.accountType === 'agency' ? t('signup.addressContact.agencyFeatures') : t('signup.addressContact.directFeatures')}
                  </h4>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    {accountTypes.find(type => type.value === data.accountType)?.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-blue-600 rounded-full mt-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Company Address Section */}
      <div className="border-t pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Building className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">{t('signup.addressContact.companyAddress')}</h3>
        </div>

      <div className="space-y-2">
        <Label htmlFor="street">{t('signup.addressContact.streetAddress')} *</Label>
        <Textarea
          id="street"
          value={data.street}
          onChange={(e) => onUpdate({ street: e.target.value })}
          placeholder={t('signup.addressContact.streetAddressPlaceholder')}
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">{t('signup.addressContact.city')} *</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => onUpdate({ city: e.target.value })}
            placeholder={t('signup.addressContact.cityPlaceholder')}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emirate">{t('signup.addressContact.emirate')} *</Label>
          <Select value={data.emirate} onValueChange={(value) => onUpdate({ emirate: value })}>
            <SelectTrigger>
              <SelectValue placeholder={t('signup.addressContact.selectEmirate')} />
            </SelectTrigger>
            <SelectContent>
              {uaeEmirates.map((emirate) => (
                <SelectItem key={emirate.value} value={emirate.value}>
                  {emirate.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">{t('signup.addressContact.country')} *</Label>
          <Select value={data.country} onValueChange={(value) => onUpdate({ country: value })}>
            <SelectTrigger>
              <SelectValue placeholder={t('signup.addressContact.selectCountry')} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="poBox">{t('signup.addressContact.poBox')}</Label>
          <Input
            id="poBox"
            value={data.poBox}
            onChange={(e) => onUpdate({ poBox: e.target.value })}
            placeholder={t('signup.addressContact.poBoxPlaceholder')}
          />
          <p className="text-xs text-gray-500">{t('signup.addressContact.poBoxNote')}</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">{t('signup.addressContact.contactInformation')}</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="landline">{t('signup.addressContact.landline')}</Label>
          <Input
            id="landline"
            type="tel"
            value={data.landline}
            onChange={(e) => onUpdate({ landline: e.target.value })}
            placeholder={t('signup.addressContact.landlinePlaceholder')}
          />
          <p className="text-xs text-gray-500">
            {t('signup.addressContact.landlineNote')}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900">{t('signup.addressContact.addressVerification')}</h4>
            <p className="text-sm text-gray-600 mt-1">
              {t('signup.addressContact.addressVerificationNote')}
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}