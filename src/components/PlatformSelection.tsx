import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tv, Radio, Newspaper, Smartphone } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import tvImage from "../images/tv.svg";
import radioImage from "../images/radio.svg";
import printingImage from "../images/printing.svg";
import socialmediaImage from "../images/socialmedia.svg";


export function PlatformSelection() {
  const { t } = useLanguage();
  
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
      </div>
    </section>
  );
}