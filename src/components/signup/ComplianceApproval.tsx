import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Shield, CheckCircle, Clock, AlertTriangle, ExternalLink } from "lucide-react";
import { SignupData } from "../SignupPage";
import { useLanguage } from "../../contexts/LanguageContext";

interface ComplianceApprovalProps {
  data: SignupData;
  onUpdate: (updates: Partial<SignupData>) => void;
  onSubmit: () => void;
}

export function ComplianceApproval({ data, onUpdate, onSubmit }: ComplianceApprovalProps) {
  const { t } = useLanguage();
  
  const getApprovalSteps = (t: (key: string) => string) => [
    {
      step: t('signup.complianceApproval.creativeReview'),
      description: t('signup.complianceApproval.creativeReviewDescription'),
      icon: CheckCircle,
      estimatedTime: t('signup.complianceApproval.estimatedTime1')
    },
    {
      step: t('signup.complianceApproval.legalCompliance'),
      description: t('signup.complianceApproval.legalComplianceDescription'),
      icon: Shield,
      estimatedTime: t('signup.complianceApproval.estimatedTime2')
    },
    {
      step: t('signup.complianceApproval.financialVerification'),
      description: t('signup.complianceApproval.financialVerificationDescription'),
      icon: AlertTriangle,
      estimatedTime: t('signup.complianceApproval.estimatedTime3')
    }
  ];
  
  const approvalSteps = getApprovalSteps(t);

  const handleSubmit = () => {
    if (data.infoAccurate && data.termsAccepted) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">{t('signup.complianceApproval.approvalProcess')}</h4>
            <p className="text-sm text-blue-700 mt-1">
              {t('signup.complianceApproval.approvalProcessDescription')}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('signup.complianceApproval.reviewTimeline')}</h3>
        <div className="space-y-3">
          {approvalSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{step.step}</h4>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      <p className="text-xs text-primary mt-2 font-medium">
                        {t('signup.complianceApproval.estimatedTime')} {step.estimatedTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            {t('signup.complianceApproval.afterApproval')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-green-800 space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-green-600 rounded-full mt-2" />
              {t('signup.complianceApproval.afterApproval1')}
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-green-600 rounded-full mt-2" />
              {t('signup.complianceApproval.afterApproval2')}
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-green-600 rounded-full mt-2" />
              {t('signup.complianceApproval.afterApproval3')}
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 bg-green-600 rounded-full mt-2" />
              {t('signup.complianceApproval.afterApproval4')}
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-medium">{t('signup.complianceApproval.finalConfirmation')}</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="infoAccurate"
              checked={data.infoAccurate}
              onCheckedChange={(checked) => onUpdate({ infoAccurate: !!checked })}
            />
            <div className="flex-1">
              <Label htmlFor="infoAccurate" className="cursor-pointer">
                {t('signup.complianceApproval.infoAccurate')}
              </Label>
              <p className="text-xs text-gray-500 mt-1">
                {t('signup.complianceApproval.infoAccurateNote')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="termsAccepted"
              checked={data.termsAccepted}
              onCheckedChange={(checked) => onUpdate({ termsAccepted: !!checked })}
            />
            <div className="flex-1">
              <Label htmlFor="termsAccepted" className="cursor-pointer">
                {t('signup.complianceApproval.termsAccepted')}
              </Label>
              <div className="flex gap-4 mt-2">
                <a 
                  href="#" 
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  {t('signup.complianceApproval.termsConditions')} <ExternalLink className="h-3 w-3" />
                </a>
                <a 
                  href="#" 
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  {t('signup.complianceApproval.privacyPolicy')} <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="text-center">
            <h4 className="font-medium mb-2">{t('signup.complianceApproval.readyToSubmit')}</h4>
            <p className="text-sm text-gray-600 mb-4">
              {t('signup.complianceApproval.readyToSubmitDescription')}
            </p>
            <Button
              onClick={handleSubmit}
              disabled={!data.infoAccurate || !data.termsAccepted}
              className="bg-green-600 hover:bg-green-700"
              size="lg"
            >
              {t('signup.complianceApproval.submitForApproval')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}