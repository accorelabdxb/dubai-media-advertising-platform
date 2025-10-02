import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { SignupData } from "../SignupPage";
import { useLanguage } from "../../contexts/LanguageContext";

interface BasicAccountInfoProps {
  data: SignupData;
  onUpdate: (updates: Partial<SignupData>) => void;
}

export function BasicAccountInfo({ data, onUpdate }: BasicAccountInfoProps) {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(data.password);
  const passwordsMatch = data.password === data.confirmPassword && data.confirmPassword !== "";

  const getStrengthColor = (strength: number) => {
    if (strength < 25) return "bg-red-500";
    if (strength < 50) return "bg-orange-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength < 25) return t('signup.basicAccount.passwordStrength.weak');
    if (strength < 50) return t('signup.basicAccount.passwordStrength.fair');
    if (strength < 75) return t('signup.basicAccount.passwordStrength.good');
    return t('signup.basicAccount.passwordStrength.strong');
  };

  const sendEmailVerification = () => {
    // Simulate email verification
    setTimeout(() => setEmailVerified(true), 1000);
  };

  const sendMobileOTP = () => {
    // Simulate OTP send
    setTimeout(() => setMobileVerified(true), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t('signup.basicAccount.firstName')} *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onUpdate({ firstName: e.target.value })}
            placeholder={t('signup.basicAccount.firstNamePlaceholder')}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">{t('signup.basicAccount.lastName')} *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onUpdate({ lastName: e.target.value })}
            placeholder={t('signup.basicAccount.lastNamePlaceholder')}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t('signup.basicAccount.email')} *</Label>
        <div className="flex gap-2">
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder={t('signup.basicAccount.emailPlaceholder')}
            required
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={sendEmailVerification}
            disabled={!data.email || emailVerified}
            className="shrink-0"
          >
            {emailVerified ? (
              <><Check className="h-4 w-4 mr-2" /> {t('signup.basicAccount.verified')}</>
            ) : (
              t('signup.basicAccount.verify')
            )}
          </Button>
        </div>
        {emailVerified && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <Check className="h-4 w-4" />
            {t('signup.basicAccount.emailVerified')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobile">{t('signup.basicAccount.mobile')} *</Label>
        <div className="flex gap-2">
          <Input
            id="mobile"
            type="tel"
            value={data.mobile}
            onChange={(e) => onUpdate({ mobile: e.target.value })}
            placeholder={t('signup.basicAccount.mobilePlaceholder')}
            required
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={sendMobileOTP}
            disabled={!data.mobile || mobileVerified}
            className="shrink-0"
          >
            {mobileVerified ? (
              <><Check className="h-4 w-4 mr-2" /> {t('signup.basicAccount.verified')}</>
            ) : (
              t('signup.basicAccount.sendOTP')
            )}
          </Button>
        </div>
        {mobileVerified && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <Check className="h-4 w-4" />
            {t('signup.basicAccount.mobileVerified')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t('signup.basicAccount.password')} *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={(e) => onUpdate({ password: e.target.value })}
            placeholder={t('signup.basicAccount.passwordPlaceholder')}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {data.password && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getStrengthColor(passwordStrength)}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
              <span className="text-sm">{getStrengthText(passwordStrength)}</span>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p className={data.password.length >= 8 ? "text-green-600" : ""}>
                • {t('signup.basicAccount.passwordRequirements.length')}
              </p>
              <p className={/[A-Z]/.test(data.password) ? "text-green-600" : ""}>
                • {t('signup.basicAccount.passwordRequirements.uppercase')}
              </p>
              <p className={/[a-z]/.test(data.password) ? "text-green-600" : ""}>
                • {t('signup.basicAccount.passwordRequirements.lowercase')}
              </p>
              <p className={(/[0-9]/.test(data.password) && /[^A-Za-z0-9]/.test(data.password)) ? "text-green-600" : ""}>
                • {t('signup.basicAccount.passwordRequirements.special')}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t('signup.basicAccount.confirmPassword')} *</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={data.confirmPassword}
            onChange={(e) => onUpdate({ confirmPassword: e.target.value })}
            placeholder={t('signup.basicAccount.confirmPasswordPlaceholder')}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {data.confirmPassword && (
          <div className="flex items-center gap-1 text-sm">
            {passwordsMatch ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-green-600">{t('signup.basicAccount.passwordsMatch')}</span>
              </>
            ) : (
              <>
                <X className="h-4 w-4 text-red-600" />
                <span className="text-red-600">{t('signup.basicAccount.passwordsDontMatch')}</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="language">{t('signup.basicAccount.preferredLanguage')} *</Label>
        <Select value={data.language} onValueChange={(value) => onUpdate({ language: value })}>
          <SelectTrigger>
            <SelectValue placeholder={t('signup.basicAccount.languagePlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">{t('signup.basicAccount.english')}</SelectItem>
            <SelectItem value="arabic">{t('signup.basicAccount.arabic')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}