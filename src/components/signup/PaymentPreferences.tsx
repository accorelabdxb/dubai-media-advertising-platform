import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { CreditCard, Building2, Banknote, Info } from "lucide-react";
import { SignupData } from "../SignupPage";
import { useLanguage } from "../../contexts/LanguageContext";

interface PaymentPreferencesProps {
  data: SignupData;
  onUpdate: (updates: Partial<SignupData>) => void;
}

export function PaymentPreferences({ data, onUpdate }: PaymentPreferencesProps) {
  const { t } = useLanguage();
  
  const getPaymentMethods = (t: (key: string) => string) => [
    {
      value: "credit-card",
      title: t('signup.paymentPreferences.creditCard'),
      description: t('signup.paymentPreferences.creditCardDescription'),
      icon: CreditCard,
      popular: true
    },
    {
      value: "bank-transfer",
      title: t('signup.paymentPreferences.bankTransfer'),
      description: t('signup.paymentPreferences.bankTransferDescription'),
      icon: Building2,
      popular: false
    },
    {
      value: "check",
      title: t('signup.paymentPreferences.check'),
      description: t('signup.paymentPreferences.checkDescription'),
      icon: Banknote,
      popular: false
    }
  ];
  
  const paymentMethods = getPaymentMethods(t);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">{t('signup.paymentPreferences.optionalStep')}</h4>
            <p className="text-sm text-blue-700 mt-1">
              {t('signup.paymentPreferences.optionalStepNote')}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">{t('signup.paymentPreferences.preferredPaymentMethod')}</Label>
          <p className="text-sm text-gray-600 mb-4">
            {t('signup.paymentPreferences.choosePaymentMethod')}
          </p>
        </div>

        <RadioGroup
          value={data.paymentMethod}
          onValueChange={(value) => onUpdate({ paymentMethod: value })}
          className="space-y-3"
        >
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.value} className="relative">
                <RadioGroupItem
                  value={method.value}
                  id={method.value}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={method.value}
                  className="cursor-pointer"
                >
                  <Card className="transition-all hover:shadow-md peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{method.title}</h4>
                            {method.popular && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                {t('signup.paymentPreferences.popular')}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {method.description}
                          </p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          data.paymentMethod === method.value
                            ? 'border-primary bg-primary'
                            : 'border-gray-300'
                        }`}>
                          {data.paymentMethod === method.value && (
                            <div className="w-full h-full rounded-full bg-white transform scale-50" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="billingContact">{t('signup.paymentPreferences.billingContact')}</Label>
        <Input
          id="billingContact"
          value={data.billingContact}
          onChange={(e) => onUpdate({ billingContact: e.target.value })}
          placeholder={t('signup.paymentPreferences.billingContactPlaceholder')}
        />
        <p className="text-xs text-gray-500">
          {t('signup.paymentPreferences.billingContactNote')}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vatNumber">{t('signup.paymentPreferences.vatNumber')}</Label>
        <Input
          id="vatNumber"
          value={data.vatNumber}
          onChange={(e) => onUpdate({ vatNumber: e.target.value })}
          placeholder={t('signup.paymentPreferences.vatNumberPlaceholder')}
        />
        <p className="text-xs text-gray-500">
          {t('signup.paymentPreferences.vatNumberNote')}
        </p>
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-yellow-900 flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            {t('signup.paymentPreferences.paymentSecurity')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-yellow-800 space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-yellow-600 rounded-full mt-2" />
              {t('signup.paymentPreferences.securityFeature1')}
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-yellow-600 rounded-full mt-2" />
              {t('signup.paymentPreferences.securityFeature2')}
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-yellow-600 rounded-full mt-2" />
              {t('signup.paymentPreferences.securityFeature3')}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}