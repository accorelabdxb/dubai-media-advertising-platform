import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Badge } from "../../ui/badge";
import { useLanguage } from "../../../contexts/LanguageContext";
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  FileVideo, 
  FileAudio, 
  FileImage, 
  FilePlus,
  CheckCircle,
  Palette,
  Play,
  Eye
} from "lucide-react";
import { BookingData } from "../DashboardLayout";

interface AdMaterialUploadProps {
  data: BookingData;
  onUpdate: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AdMaterialUpload({ data, onUpdate, onNext, onBack }: AdMaterialUploadProps) {
  const { t } = useLanguage();
  const [uploadMode, setUploadMode] = useState<'upload' | 'request'>('upload');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customization, setCustomization] = useState({
    companyName: '',
    productName: '',
    slogan: '',
    colors: '',
    language: 'english'
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const templates = [
    {
      id: 'tv-commercial-30s',
      name: t('templates.tv30s.name'),
      type: 'TV',
      duration: `30 ${t('duration.seconds')}`,
      thumbnail: '📺',
      basePrice: 2500,
      description: t('templates.tv30s.desc')
    },
    {
      id: 'tv-commercial-60s',
      name: t('templates.tv60s.name'),
      type: 'TV',
      duration: `60 ${t('duration.seconds')}`,
      thumbnail: '🎬',
      basePrice: 4000,
      description: t('templates.tv60s.desc')
    },
    {
      id: 'radio-jingle-15s',
      name: t('templates.radio15s.name'),
      type: 'Radio',
      duration: `15 ${t('duration.seconds')}`,
      thumbnail: '🎵',
      basePrice: 1500,
      description: t('templates.radio15s.desc')
    },
    {
      id: 'radio-jingle-30s',
      name: t('templates.radio30s.name'),
      type: 'Radio',
      duration: `30 ${t('duration.seconds')}`,
      thumbnail: '📻',
      basePrice: 2000,
      description: t('templates.radio30s.desc')
    },
    {
      id: 'print-full-page',
      name: t('templates.printFull.name'),
      type: 'Print',
      duration: t('duration.fullPage'),
      thumbnail: '📰',
      basePrice: 1800,
      description: t('templates.printFull.desc')
    },
    {
      id: 'print-half-page',
      name: t('templates.printHalf.name'),
      type: 'Print',
      duration: t('duration.halfPage'),
      thumbnail: '📄',
      basePrice: 1200,
      description: t('templates.printHalf.desc')
    },
    {
      id: 'digital-story',
      name: t('templates.digitalStory.name'),
      type: 'Digital',
      duration: `15 ${t('duration.seconds')}`,
      thumbnail: '📱',
      basePrice: 800,
      description: t('templates.digitalStory.desc')
    },
    {
      id: 'digital-post',
      name: t('templates.digitalPost.name'),
      type: 'Digital',
      duration: t('duration.static'),
      thumbnail: '💻',
      basePrice: 600,
      description: t('templates.digitalPost.desc')
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
    onUpdate({
      adMaterial: {
        type: 'upload',
        file: file
      }
    });
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      onUpdate({
        adMaterial: {
          type: 'request',
          template: {
            id: templateId,
            name: template.name,
            customization: customization
          }
        }
      });
    }
  };

  const handleCustomizationChange = (field: string, value: string) => {
    const updatedCustomization = { ...customization, [field]: value };
    setCustomization(updatedCustomization);
    
    if (selectedTemplate) {
      const template = templates.find(t => t.id === selectedTemplate);
      if (template) {
        onUpdate({
          adMaterial: {
            type: 'request',
            template: {
              id: selectedTemplate,
              name: template.name,
              customization: updatedCustomization
            }
          }
        });
      }
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('video/')) return <FileVideo className="h-8 w-8 text-blue-500" />;
    if (file.type.startsWith('audio/')) return <FileAudio className="h-8 w-8 text-green-500" />;
    if (file.type.startsWith('image/')) return <FileImage className="h-8 w-8 text-purple-500" />;
    return <FilePlus className="h-8 w-8 text-gray-500" />;
  };

  const getAcceptedFormats = () => {
    const mediaType = data.mediaOutlet?.type;
    switch (mediaType) {
      case 'tv':
        return '.mp4,.mov,.avi (Max 100MB, 15-60 seconds)';
      case 'radio':
        return '.mp3,.wav,.aac (Max 50MB, 15-60 seconds)';
      case 'print':
        return '.jpg,.png,.pdf (Max 25MB, 300 DPI minimum)';
      case 'digital':
        return '.jpg,.png,.mp4,.gif (Max 50MB, various sizes)';
      default:
        return '.mp4,.mp3,.jpg,.png,.pdf (Max 100MB)';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('adMaterial.back')}
            </Button>
            <div>
              <h1 className="text-2xl font-medium">{t('adMaterial.title')}</h1>
              <p className="text-gray-600">{t('adMaterial.subtitle')}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {t('adMaterial.step')}
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Mode Selection */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={uploadMode === 'upload' ? 'default' : 'outline'}
            onClick={() => setUploadMode('upload')}
            className="flex-1"
          >
            <Upload className="h-4 w-4 mr-2" />
            {t('adMaterial.uploadMyAd')}
          </Button>
          <Button
            variant={uploadMode === 'request' ? 'default' : 'outline'}
            onClick={() => setUploadMode('request')}
            className="flex-1"
          >
            <Palette className="h-4 w-4 mr-2" />
            {t('adMaterial.requestDesign')}
          </Button>
        </div>

        {uploadMode === 'upload' ? (
          <div className="space-y-6">
            {/* Upload Zone */}
            <Card>
              <CardHeader>
                <CardTitle>{t('adMaterial.uploadYourAd')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-primary bg-primary/5'
                      : uploadedFile
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadedFile ? (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        {getFileIcon(uploadedFile)}
                      </div>
                      <div>
                        <h4 className="font-medium text-green-900">{uploadedFile.name}</h4>
                        <p className="text-sm text-green-700">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                      <Button variant="outline" onClick={() => setUploadedFile(null)}>
                        {t('adMaterial.replaceFile')}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <Upload className="h-12 w-12 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {t('adMaterial.dragDrop')}
                        </h4>
                        <p className="text-sm text-gray-600 mt-2">
                          {t('adMaterial.acceptedFormats')}: {getAcceptedFormats()}
                        </p>
                      </div>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        accept=".mp4,.mp3,.jpg,.png,.pdf,.mov,.avi,.wav,.aac,.gif"
                      />
                      <label htmlFor="file-upload" className="inline-block cursor-pointer">
                        <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                          {t('adMaterial.chooseFile')}
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                {uploadedFile && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900">{t('adMaterial.reviewProcess')}</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          {t('adMaterial.reviewProcessDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle>{t('adMaterial.chooseTemplate')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {templates
                    .filter(template => {
                      const mediaType = data.mediaOutlet?.type;
                      if (!mediaType) return true;
                      switch (mediaType) {
                        case 'tv': return template.type === 'TV';
                        case 'radio': return template.type === 'Radio';
                        case 'print': return template.type === 'Print';
                        case 'digital': return template.type === 'Digital';
                        default: return true;
                      }
                    })
                    .map((template) => (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedTemplate === template.id
                            ? 'ring-2 ring-primary border-primary bg-primary/5'
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-3xl mb-3">{template.thumbnail}</div>
                          <h4 className="font-medium mb-1">{template.name}</h4>
                          <Badge variant="outline" className="mb-2">
                            {template.duration}
                          </Badge>
                          <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                          <p className="font-medium">+AED {template.basePrice.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Customization Form */}
            {selectedTemplate && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('adMaterial.customizeTemplate')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">{t('customize.companyName')} *</Label>
                      <Input
                        id="companyName"
                        value={customization.companyName}
                        onChange={(e) => handleCustomizationChange('companyName', e.target.value)}
                        placeholder={t('customize.companyNamePlaceholder')}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productName">{t('customize.productName')}</Label>
                      <Input
                        id="productName"
                        value={customization.productName}
                        onChange={(e) => handleCustomizationChange('productName', e.target.value)}
                        placeholder={t('customize.productNamePlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slogan">{t('customize.slogan')} *</Label>
                    <Textarea
                      id="slogan"
                      value={customization.slogan}
                      onChange={(e) => handleCustomizationChange('slogan', e.target.value)}
                      placeholder={t('customize.sloganPlaceholder')}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="colors">{t('customize.colors')}</Label>
                      <Select 
                        value={customization.colors} 
                        onValueChange={(value) => handleCustomizationChange('colors', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('customize.colorPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">{t('colors.professional')}</SelectItem>
                          <SelectItem value="vibrant">{t('colors.vibrant')}</SelectItem>
                          <SelectItem value="elegant">{t('colors.elegant')}</SelectItem>
                          <SelectItem value="fresh">{t('colors.fresh')}</SelectItem>
                          <SelectItem value="luxury">{t('colors.luxury')}</SelectItem>
                          <SelectItem value="custom">{t('colors.custom')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">{t('customize.language')}</Label>
                      <Select 
                        value={customization.language} 
                        onValueChange={(value) => handleCustomizationChange('language', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">{t('lang.english')}</SelectItem>
                          <SelectItem value="arabic">{t('lang.arabic')}</SelectItem>
                          <SelectItem value="both">{t('lang.both')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">{t('customize.logoUpload')}</Label>
                    <input
                      type="file"
                      id="logo"
                      accept=".png,.jpg,.jpeg,.svg"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90"
                    />
                    <p className="text-xs text-gray-500">{t('customize.logoFormats')}</p>
                  </div>

                  {/* Preview */}
                  <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Play className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">{t('adMaterial.templatePreview')}</h4>
                    </div>
                    <div className="text-center py-8 bg-white rounded border-2 border-dashed border-gray-300">
                      <div className="text-4xl mb-2">
                        {templates.find(t => t.id === selectedTemplate)?.thumbnail}
                      </div>
                      <h4 className="font-medium">{customization.companyName || t('customize.yourCompany')}</h4>
                      <p className="text-sm text-gray-600">{customization.slogan || t('customize.yourMessage')}</p>
                      <Badge variant="outline" className="mt-2">
                        {templates.find(t => t.id === selectedTemplate)?.name}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Continue Button */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={onNext}
            disabled={uploadMode === 'upload' ? !uploadedFile : !selectedTemplate || !customization.companyName || !customization.slogan}
            size="lg"
          >
            {t('adMaterial.continueToReview')}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}