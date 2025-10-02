import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { BasicAccountInfo } from "./signup/BasicAccountInfo";
import { BusinessDetails } from "./signup/BusinessDetails";
import { AddressContact } from "./signup/AddressContact";
import { PaymentPreferences } from "./signup/PaymentPreferences";
import { ComplianceApproval } from "./signup/ComplianceApproval";
import { useLanguage } from "../contexts/LanguageContext";

interface SignupPageProps {
  onBack: () => void;
}

export interface SignupData {
  // Basic Account Info
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  language: string;
  
  // Business Details
  companyName: string;
  tradeLicenseNumber: string;
  tradeLicenseFile: File | null;
  emiratesId: string;
  idFiles: File[];
  
  // User Role & Type
  accountType: string;
  companyRole: string;
  
  // Address & Contact
  street: string;
  city: string;
  emirate: string;
  country: string;
  poBox: string;
  landline: string;
  
  // Payment Preferences
  paymentMethod: string;
  billingContact: string;
  vatNumber: string;
  
  // Compliance
  infoAccurate: boolean;
  termsAccepted: boolean;
}

export function SignupPage({ onBack }: SignupPageProps) {
  const { t } = useLanguage();
  
  const getStepTitles = (t: (key: string) => string) => [
    t('signup.steps.basicAccount'),
    t('signup.steps.businessDetails'),
    t('signup.steps.accountTypeAddress'),
    t('signup.steps.paymentPreferences'),
    t('signup.steps.complianceApproval')
  ];
  
  const stepTitles = getStepTitles(t);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    language: "english",
    companyName: "",
    tradeLicenseNumber: "",
    tradeLicenseFile: null,
    emiratesId: "",
    idFiles: [],
    accountType: "",
    companyRole: "",
    street: "",
    city: "",
    emirate: "",
    country: "UAE",
    poBox: "",
    landline: "",
    paymentMethod: "",
    billingContact: "",
    vatNumber: "",
    infoAccurate: false,
    termsAccepted: false
  });

  const progress = ((currentStep + 1) / stepTitles.length) * 100;

  const handleNext = () => {
    if (currentStep < stepTitles.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Registration submitted successfully! Your account is pending review.");
    onBack();
  };

  const updateFormData = (updates: Partial<SignupData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicAccountInfo data={formData} onUpdate={updateFormData} />;
      case 1:
        return <BusinessDetails data={formData} onUpdate={updateFormData} />;
      case 2:
        return <AddressContact data={formData} onUpdate={updateFormData} />;
      case 3:
        return <PaymentPreferences data={formData} onUpdate={updateFormData} />;
      case 4:
        return <ComplianceApproval data={formData} onUpdate={updateFormData} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('signup.backToHome')}
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">{t('signup.title')}</h1>
              <p className="text-muted-foreground">
                {t('signup.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Step {currentStep + 1} of {stepTitles.length}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full mb-4" />
          <h2 className="text-xl font-medium">{stepTitles[currentStep]}</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border shadow-sm p-8">
          {renderStep()}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t bg-white sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('signup.previous')}
            </Button>

            {currentStep < stepTitles.length - 1 ? (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                {t('signup.next')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.infoAccurate || !formData.termsAccepted}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit for Approval
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}