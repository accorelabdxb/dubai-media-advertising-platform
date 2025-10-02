import { Card, CardContent } from "../ui/card";
import { Shield } from "lucide-react";
import { SignupData } from "../SignupPage";
import { useLanguage } from "../../contexts/LanguageContext";

interface UserRoleTypeProps {
  data: SignupData;
  onUpdate: (updates: Partial<SignupData>) => void;
}

export function UserRoleType({ data }: UserRoleTypeProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="space-y-6 text-center">
        <div className="p-8">
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            {t('signup.userRoleType.stepRemoved')}
          </h3>
          <p className="text-gray-600">
            {t('signup.userRoleType.stepRemovedDescription')}
          </p>
        </div>
      </div>

      <div className="space-y-6 text-center">
        <div className="p-8">
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            {t('signup.userRoleType.stepCompleted')}
          </h3>
          <p className="text-gray-600">
            {t('signup.userRoleType.stepCompletedDescription')}
          </p>
        </div>
      </div>

      {data.accountType && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">{t('signup.userRoleType.accountSetup')}</h4>
                <p className="text-sm text-blue-700 mt-1">
                  {data.accountType === 'agency'
                    ? t('signup.userRoleType.agencyMessage')
                    : t('signup.userRoleType.directMessage')
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}