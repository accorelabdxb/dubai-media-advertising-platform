import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BasicAccountInfo } from "./signup/BasicAccountInfo";
import { BusinessDetails } from "./signup/BusinessDetails";
import { UserRoleType } from "./signup/UserRoleType";
import { AddressContact } from "./signup/AddressContact";
import { PaymentPreferences } from "./signup/PaymentPreferences";
import { ComplianceApproval } from "./signup/ComplianceApproval";
import { useLanguage } from "../contexts/LanguageContext";

interface SignupWizardProps {
  isOpen: boolean;
  onClose: () => void;
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
  idType: string;
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
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  instagram?: string;
  
  // Payment Preferences
  paymentMethod: string;
  billingContact: string;
  vatNumber: string;
  
  // Compliance
  infoAccurate: boolean;
  termsAccepted: boolean;
}

export function SignupWizard({ isOpen, onClose }: SignupWizardProps) {
  const { t } = useLanguage();
  
  const getStepTitles = (t: (key: string) => string) => [
    t('signup.steps.basicAccount'),
    t('signup.steps.businessDetails'),
    t('signup.steps.userRole'),
    t('signup.steps.addressContact'),
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
    idType: "emiratesId",
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
    facebook: "",
    twitter: "",
    tiktok: "",
    instagram: "",
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
    onClose();
    setCurrentStep(0);
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
        return <UserRoleType data={formData} onUpdate={updateFormData} />;
      case 3:
        return <AddressContact data={formData} onUpdate={updateFormData} />;
      case 4:
        return <PaymentPreferences data={formData} onUpdate={updateFormData} />;
      case 5:
        return <ComplianceApproval data={formData} onUpdate={updateFormData} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  const handleClose = () => {
    onClose();
    setCurrentStep(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <button
            onClick={handleClose}
            className="absolute right-0 top-0 p-2 hover:bg-accent rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogTitle className="text-2xl text-center pr-10">
            {t('signup.title')}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {t('signup.description')}
          </DialogDescription>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">
                {t('signup.stepOf', { step: currentStep + 1, total: stepTitles.length })}
              </span>
              <span className="text-sm text-muted-foreground">
                {t('signup.percentComplete', { percent: Math.round(progress) })}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
            <h3 className="text-lg font-medium mt-4 text-center">{stepTitles[currentStep]}</h3>
          </div>
        </DialogHeader>

        <div className="mt-6">
          {renderStep()}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t">
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
      </DialogContent>
    </Dialog>
  );
}