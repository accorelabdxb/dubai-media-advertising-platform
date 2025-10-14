import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Upload, File, X, Check } from "lucide-react";
import { SignupData } from "../SignupPage";
import { useLanguage } from "../../contexts/LanguageContext";

interface BusinessDetailsProps {
  data: SignupData;
  onUpdate: (updates: Partial<SignupData>) => void;
}

export function BusinessDetails({ data, onUpdate }: BusinessDetailsProps) {
  const { t } = useLanguage();
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (files: FileList | null, type: 'tradeLicense' | 'idFiles') => {
    if (!files) return;

    if (type === 'tradeLicense') {
      const file = files[0];
      if (file && (file.type.includes('pdf') || file.type.includes('image'))) {
        onUpdate({ tradeLicenseFile: file });
      }
    } else if (type === 'idFiles') {
      const fileArray = Array.from(files).filter(file => 
        file.type.includes('image') || file.type.includes('pdf')
      );
      onUpdate({ idFiles: [...data.idFiles, ...fileArray] });
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'tradeLicense' | 'idFiles') => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files, type);
  };

  const removeIdFile = (index: number) => {
    const newFiles = data.idFiles.filter((_, i) => i !== index);
    onUpdate({ idFiles: newFiles });
  };

  const removeTradeLicense = () => {
    onUpdate({ tradeLicenseFile: null });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="companyName">{t('signup.businessDetails.companyName')} </Label>
        <Input
          id="companyName"
          value={data.companyName}
          onChange={(e) => onUpdate({ companyName: e.target.value })}
          placeholder={t('signup.businessDetails.companyNamePlaceholder')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tradeLicenseNumber">{t('signup.businessDetails.tradeLicenseNumber')} </Label>
        <Input
          id="tradeLicenseNumber"
          value={data.tradeLicenseNumber}
          onChange={(e) => onUpdate({ tradeLicenseNumber: e.target.value })}
          placeholder={t('signup.businessDetails.tradeLicenseNumberPlaceholder')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>{t('signup.businessDetails.uploadTradeLicense')} </Label>
        <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
          <CardContent className="p-6">
            {data.tradeLicenseFile ? (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <File className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">{data.tradeLicenseFile.name}</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeTradeLicense}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className={`text-center py-8 ${dragOver ? 'bg-blue-50' : ''}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => handleDrop(e, 'tradeLicense')}
              >
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  {t('signup.businessDetails.dragDropTradeLicense')}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {t('signup.businessDetails.tradeLicenseFormats')}
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e.target.files, 'tradeLicense')}
                  className="hidden"
                  id="tradeLicenseUpload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('tradeLicenseUpload')?.click()}
                >
                  {t('signup.businessDetails.chooseFile')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="idType">{t('signup.businessDetails.idType')} </Label>
        <select
          id="idType"
          value={data.idType || 'emiratesId'}
          onChange={(e) => onUpdate({ idType: e.target.value })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          required
        >
          <option value="emiratesId">{t('signup.businessDetails.emiratesIdOption')}</option>
          <option value="passport">{t('signup.businessDetails.passportOption')}</option>
          <option value="visa">{t('signup.businessDetails.visaOption')}</option>
        </select>
        <p className="text-xs text-gray-500">
          {t('signup.businessDetails.idTypeNote')}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="idNumber">
          {data.idType === 'passport' 
            ? t('signup.businessDetails.passportNumber') 
            : data.idType === 'visa'
            ? t('signup.businessDetails.visaNumber')
            : t('signup.businessDetails.emiratesId')} 
        </Label>
        <Input
          id="idNumber"
          value={data.emiratesId}
          onChange={(e) => onUpdate({ emiratesId: e.target.value })}
          placeholder={
            data.idType === 'passport'
              ? t('signup.businessDetails.passportNumberPlaceholder')
              : data.idType === 'visa'
              ? t('signup.businessDetails.visaNumberPlaceholder')
              : t('signup.businessDetails.emiratesIdPlaceholder')
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label>
          {data.idType === 'passport'
            ? t('signup.businessDetails.uploadPassport')
            : data.idType === 'visa'
            ? t('signup.businessDetails.uploadVisa')
            : t('signup.businessDetails.uploadIdCopy')} 
        </Label>
        <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
          <CardContent className="p-6">
            {data.idFiles.length > 0 && (
              <div className="space-y-2 mb-4">
                {data.idFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <File className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeIdFile(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <div
              className={`text-center py-8 ${dragOver ? 'bg-blue-50' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => handleDrop(e, 'idFiles')}
            >
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                {t('signup.businessDetails.uploadBothSides')}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                {t('signup.businessDetails.idFormats')}
              </p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                multiple
                onChange={(e) => handleFileUpload(e.target.files, 'idFiles')}
                className="hidden"
                id="idFilesUpload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('idFilesUpload')?.click()}
              >
                {t('signup.businessDetails.chooseFiles')}
              </Button>
            </div>
          </CardContent>
        </Card>
        <p className="text-xs text-gray-500">
          {t('signup.businessDetails.idUploadNote')}
        </p>
      </div>
    </div>
  );
}