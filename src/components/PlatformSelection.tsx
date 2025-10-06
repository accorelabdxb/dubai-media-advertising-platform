import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tv, Radio, Newspaper, Smartphone } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import tvImage from "../images/tv.svg";
import radioImage from "../images/radio.svg";
import printingImage from "../images/printing.svg";
import socialmediaImage from "../images/socialmedia.svg";
import xFactorImage from "../images/DTV/X-Factor/XF-logo-season2.png";
import wwtbmImage from "../images/DTV/WWTBM/WWTBM.png";
import theDoctorsImage from "../images/DTV/The Doctors/TheDoctors.png";
import sharkTank3Image from "../images/DTV/Shark Tank 3/Shark Tank 3.png";
import duroobImage from "../images/DTV_Ramadan/Duroob/Duroob.png";
import akherKalamImage from "../images/DTV_Ramadan/Akher_Kalam/Akher_Kalam.png";
import dwcImage from "../images/Racing/DWC/DWCLogo.png";
import racingAlEmaratImage from "../images/Racing/Racing Al Emarat/Racing Al Emarat Logo.png";
import racingJebelAliImage from "../images/Racing/Racing Jebel Ali/Racing Jebel Ali.png";
import racingMeydanImage from "../images/Racing/Racing Meydan/Racing Meydan.png";
import natureWithAliBinThalethImage from "../images/Sama/Nature with Ali bin Thaleth/Nature with Ali bin Thaleth.png";
import masaaDubaiImage from "../images/Sama/Masaa Dubai/Masaa-Dubai-color.png";
import kunoozAlDar3Image from "../images/Sama/Kunooz Al Dar 3/Kunooz Al Dar 3.png";
import alHaiAlThaqafiImage from "../images/Sama/Al Hai Al Thaqafi/Al-Hai-Al-Thaqafi.png";
import alMandoosImage from "../images/Sama Ramadan/Al Mandoos/mandoos-logo-white.png";
import souqAlQadeemImage from "../images/Sama Ramadan/souq-al-Qadeem/souq-al-Qadeem.png";
import alMalabLogoImage from "../images/Sports/Al Malab Logo/Al Malab Logo.png";
import alSalatLogoImage from "../images/Sports/Al Salat Logo/Al Salat Logo.png";
import jamaheerImage from "../images/Sports/Jamaheer/Jamaheer Logo.png";
import stadAlDawriImage from "../images/Sports/Stad Al Dawri/Stad Al Dawri.png";


export function PlatformSelection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<keyof typeof channelTabs>('dtv');
  
  // Debug: Log image imports
  console.log('Image imports:', {
    duroobImage,
    akherKalamImage,
    xFactorImage,
    wwtbmImage
  });
  
  const channelTabs = {
    dtv: {
      name: 'دي تي في',
      channels: [
        { 
          name: 'إكس فاكتر', 
          description: 'رياليتي شو', 
          color: 'from-purple-600 to-purple-700', 
          shortName: 'XF',
          image: xFactorImage
        },
        { 
          name: 'دبليو دبليو تي بي إم', 
          description: 'جيم شو', 
          color: 'from-yellow-600 to-yellow-700', 
          shortName: 'WWTBM',
          image: wwtbmImage
        },
        { 
          name: 'ذا دكتورز', 
          description: 'ميديكال شو', 
          color: 'from-green-600 to-green-700', 
          shortName: 'DOC',
          image: theDoctorsImage
        },
        { 
          name: 'شارك تانك 3', 
          description: 'بزنس شو', 
          color: 'from-blue-600 to-blue-700', 
          shortName: 'ST3',
          image: sharkTank3Image
        }
      ]
    },
    dtvramadan: {
      name: 'دي تي في_رمضان',
      channels: [
        { 
          name: 'آخر كلام', 
          description: 'توك شو', 
          color: 'from-green-600 to-green-700', 
          shortName: 'AK',
          image: akherKalamImage
        },
        { 
          name: 'دروب', 
          description: 'مغامرة', 
          color: 'from-blue-600 to-blue-700', 
          shortName: 'درب',
          image: duroobImage
        }
      ]
    },
    racing: {
      name: 'رايسنغ',
      channels: [
        { name: 'رايسنغ ميدان', description: 'سباقات بريميوم', color: 'from-red-600 to-red-700', shortName: 'MEY', image: racingMeydanImage },
        { name: 'رايسنغ جبل علي', description: 'سباقات مضمار', color: 'from-amber-500 to-amber-600', shortName: 'JA', image: racingJebelAliImage },
        { name: 'رايسنغ الإمارات', description: 'سباقات الإمارات', color: 'from-gray-700 to-gray-800', shortName: 'UAE', image: racingAlEmaratImage },
        { name: 'دي دبليو سي', description: 'كأس دبي العالمي', color: 'from-yellow-600 to-yellow-700', shortName: 'DWC', image: dwcImage }
      ]
    },
    sama: {
      name: 'سما',
      channels: [
        { name: 'نيتشر مع علي بن ثلث', description: 'عام', color: 'from-blue-600 to-blue-700', shortName: 'سما', image: natureWithAliBinThalethImage },
        { name: 'مساء دبي', description: 'أطفال', color: 'from-pink-400 to-pink-500', shortName: 'أطفال', image: masaaDubaiImage },
        { name: 'كنوز الدار 3', description: 'قناة موسيقى', color: 'from-purple-600 to-purple-700', shortName: 'موسيقى', image: kunoozAlDar3Image },
        { name: 'الحي الثقافي', description: 'أخبار وحالي', color: 'from-red-600 to-red-700', shortName: 'أخبار', image: alHaiAlThaqafiImage }
      ]
    },
    samaplus: {
      name: 'سما رمضان',
      channels: [
        { name: 'المندوس', description: 'خاص برمضان', color: 'from-yellow-500 to-yellow-600', shortName: 'المندوس', image: alMandoosImage },
        { name: 'سوق القديم', description: 'السوق التقليدي', color: 'from-indigo-600 to-indigo-700', shortName: 'سوق القديم', image: souqAlQadeemImage }
      ]
    },
    sports: {
      name: 'سبورتس',
      channels: [
        { name: 'الملعب', description: 'برنامج رياضي', color: 'from-green-700 to-green-800', shortName: 'الملعب', image: alMalabLogoImage },
        { name: 'السلة', description: 'برنامج كرة سلة', color: 'from-emerald-600 to-emerald-700', shortName: 'السلة', image: alSalatLogoImage },
        { name: 'جماهير', description: 'مشجعي كرة القدم', color: 'from-blue-700 to-blue-800', shortName: 'جماهير', image: jamaheerImage },
        { name: 'ستاد الدوري', description: 'ملعب الدوري', color: 'from-yellow-600 to-yellow-700', shortName: 'ستاد الدوري', image: stadAlDawriImage }
      ]
    }
  } as const;
  
  const platforms = [
    {
      id: "tv",
      title: t('platforms.tv.title'),
      description: t('platforms.tv.description'),
      icon: Tv,
      image: "https://images.unsplash.com/photo-1646725357533-20bdc7b7bf27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxldmlzaW9uJTIwYnJvYWRjYXN0aW5nJTIwc3R1ZGlvfGVufDF8fHx8MTc1ODU0NTU2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tvIcon: tvImage,
      color: "bg-blue-500"
    },
    {
      id: "radio",
      title: t('platforms.radio.title'),
      description: t('platforms.radio.description'),
      icon: Radio,
      image: "https://images.unsplash.com/photo-1627667050069-43757d48d6eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWRpbyUyMHBvZGNhc3QlMjBzdHVkaW8lMjBtaWNyb3Bob25lfGVufDF8fHx8MTc1ODYyMjMzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      radioIcon: radioImage,
      color: "bg-orange-500"
    },
    {
      id: "print",
      title: t('platforms.print.title'),
      description: t('platforms.print.description'),
      icon: Newspaper,
      image: "https://images.unsplash.com/photo-1758506971791-d99431a94f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjBwcmludCUyMG1lZGlhfGVufDF8fHx8MTc1ODYyMjMzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      printingIcon: printingImage,
      color: "bg-gray-600"
    },
    {
      id: "social",
      title: t('platforms.social.title'),
      description: t('platforms.social.description'),
      icon: Smartphone,
      image: "https://images.unsplash.com/photo-1756698706083-565cf6668180?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMG1vYmlsZSUyMHBob25lfGVufDF8fHx8MTc1ODYyMjMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      socialIcon: socialmediaImage,
      color: "bg-purple-500"
    }
  ];
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 font-bold text-4xl">{t('platforms.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('platforms.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <Card 
                key={platform.id} 
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  
                  <ImageWithFallback
                    src={platform.image}
                    alt={platform.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 ${platform.color} opacity-80 transition-opacity duration-300 group-hover:opacity-70`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>
                  {/* Add TV image for TV platform */}
                  {platform.id === "tv" && (
                    <div className="absolute top-4 right-4 w-24 h-20 bg-yellow-400 border-4 border-red-500 rounded-lg p-2 shadow-2xl z-10">
                      {platform.tvIcon ? (
                        <img 
                          src={platform.tvIcon} 
                          alt="TV Icon" 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            console.error("TV image failed to load:", platform.tvIcon);
                            e.currentTarget.style.display = 'none';
                          }}
                          onLoad={() => console.log("TV image loaded successfully:", platform.tvIcon)}
                        />
                      ) : (
                        <div className="w-full h-full bg-red-600 flex items-center justify-center text-white text-xs">
                          NO IMG
                        </div>
                      )}
                    </div>
                  )}
                  {/* Add Radio image for Radio platform */}
                  {platform.id === "radio" && (
                    <div className="absolute top-4 right-4 w-24 h-16 bg-green-400 border-4 border-blue-500 rounded-lg p-2 shadow-2xl z-10">
                      {platform.radioIcon ? (
                        <img 
                          src={platform.radioIcon} 
                          alt="Radio Icon" 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            console.error("Radio image failed to load:", platform.radioIcon);
                            e.currentTarget.style.display = 'none';
                          }}
                          onLoad={() => console.log("Radio image loaded successfully:", platform.radioIcon)}
                        />
                      ) : (
                        <div className="w-full h-full bg-red-600 flex items-center justify-center text-white text-xs">
                          NO IMG
                        </div>
                      )}
                    </div>
                  )}
                  {/* Add Print Media image for Print platform */}
                  {platform.id === "print" && (
                    <div className="absolute top-4 right-4 w-24 h-20 bg-purple-400 border-4 border-orange-500 rounded-lg p-2 shadow-2xl z-10">
                      {platform.printingIcon ? (
                        <img 
                          src={platform.printingIcon} 
                          alt="Print Icon" 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            console.error("Print image failed to load:", platform.printingIcon);
                            e.currentTarget.style.display = 'none';
                          }}
                          onLoad={() => console.log("Print image loaded successfully:", platform.printingIcon)}
                        />
                      ) : (
                        <div className="w-full h-full bg-red-600 flex items-center justify-center text-white text-xs">
                          NO IMG
                        </div>
                      )}
                    </div>
                  )}
                  {/* Add Social Media image for Social platform */}
                  {platform.id === "social" && (
                    <div className="absolute top-4 right-4 w-24 h-16 bg-cyan-400 border-4 border-pink-500 rounded-lg p-2 shadow-2xl z-10">
                      {platform.socialIcon ? (
                        <img 
                          src={platform.socialIcon} 
                          alt="Social Media Icon" 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            console.error("Social media image failed to load:", platform.socialIcon);
                            e.currentTarget.style.display = 'none';
                          }}
                          onLoad={() => console.log("Social media image loaded successfully:", platform.socialIcon)}
                        />
                      ) : (
                        <div className="w-full h-full bg-red-600 flex items-center justify-center text-white text-xs">
                          NO IMG
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <CardHeader className="py-6">
                  <CardTitle className="text-center font-bold text-xl">{platform.title}</CardTitle>
                  <CardDescription className="text-center">
                    {platform.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
        
        {/* Channel Tabs Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">جميع القنوات</h3>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {Object.entries(channelTabs).map(([key, tab]) => (
                <button 
                  key={key}
                  onClick={() => setActiveTab(key as keyof typeof channelTabs)}
                  className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === key 
                      ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border hover:border-gray-300 border border-transparent'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            
            {/* Tab Content - Dynamic based on active tab */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {channelTabs[activeTab].channels.map((channel, index) => (
                <div key={index} className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-r ${channel.color} rounded-lg flex items-center justify-center mb-3 overflow-hidden`}>
                    {'image' in channel && channel.image ? (
                      <img 
                        src={channel.image} 
                        alt={channel.name} 
                        className="w-full h-full object-contain"
                        style={{ objectFit: 'contain' }}
                        onError={(e) => {
                          console.error(`${channel.name} image failed to load:`, ('image' in channel) ? channel.image : 'no image');
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <span className={`text-white font-bold text-xs text-center ${('image' in channel && channel.image) ? 'hidden' : ''}`}>
                      {channel.shortName}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">{channel.name}</span>
                  <span className="text-xs text-gray-500">{channel.description}</span>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}