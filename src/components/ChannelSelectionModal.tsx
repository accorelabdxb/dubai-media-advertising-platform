import { X } from "lucide-react";

// Import TV logos
import xFactorLogo from "../images/DTV/X-Factor/XF-logo-season2.png";
import wwtbmLogo from "../images/DTV/WWTBM/WWTBM.png";
import theDoctorsLogo from "../images/DTV/The Doctors/TheDoctors.png";
import sharkTankLogo from "../images/DTV/Shark Tank 3/Shark Tank 3.png";
import akherKalamLogo from "../images/DTV_Ramadan/Akher_Kalam/Akher_Kalam.png";
import duroobLogo from "../images/DTV_Ramadan/Duroob/Duroob.png";

// Import Racing logos
import dwcLogo from "../images/Racing/DWC/DWCLogo.png";
import racingAlEmaratLogo from "../images/Racing/Racing Al Emarat/Racing Al Emarat Logo.png";
import racingJebelAliLogo from "../images/Racing/Racing Jebel Ali/Racing Jebel Ali.png";
import racingMeydanLogo from "../images/Racing/Racing Meydan/Racing Meydan.png";

// Import Sama logos
import natureAliLogo from "../images/Sama/Nature with Ali bin Thaleth/Nature with Ali bin Thaleth.png";
import masaaDubaiLogo from "../images/Sama/Masaa Dubai/Masaa-Dubai-color.png";
import kunoozAlDarLogo from "../images/Sama/Kunooz Al Dar 3/Kunooz Al Dar 3.png";
import alHaiAlThaqafiLogo from "../images/Sama/Al Hai Al Thaqafi/Al-Hai-Al-Thaqafi.png";

// Import Sama Ramadan logos
import alMandoosLogo from "../images/Sama Ramadan/Al Mandoos/mandoos-logo-white.png";
import souqAlQadeemLogo from "../images/Sama Ramadan/souq-al-Qadeem/souq-al-Qadeem.png";

// Import Sports logos
import alMalabLogo from "../images/Sports/Al Malab Logo/Al Malab Logo.png";
import alSalatLogo from "../images/Sports/Al Salat Logo/Al Salat Logo.png";
import jamaheerLogo from "../images/Sports/Jamaheer/Jamaheer Logo.png";
import stadAlDawriLogo from "../images/Sports/Stad Al Dawri/Stad Al Dawri.png";

// Import Mobile logos
import awaanLogo from "../images/awaan1.png";

// Import Radio logos
import radio2Logo from "../images/radio2.svg";

// Import Print/Newspaper logos
import newsLogo from "../images/news.png";

interface ChannelSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  channelType: 'tv' | 'radio' | 'print' | 'mobile';
  onChannelSelect: () => void;
}

export function ChannelSelectionModal({ isOpen, onClose, channelType, onChannelSelect }: ChannelSelectionModalProps) {
  const getChannelData = () => {
    if (channelType === 'tv') {
      return {
        title: 'اختر القناة',
        categories: [
          {
            name: 'دي تي في',
            channels: [
              { src: xFactorLogo, alt: 'إكس فاكتر' },
              { src: wwtbmLogo, alt: 'دبليو دبليو تي بي إم' },
              { src: theDoctorsLogo, alt: 'ذا دكتورز' },
              { src: sharkTankLogo, alt: 'شارك تانك 3' },
            ]
          },
          {
            name: 'دي تي في رمضان',
            channels: [
              { src: akherKalamLogo, alt: 'آخر كلام' },
              { src: duroobLogo, alt: 'دروب' },
            ]
          },
          {
            name: 'رايسنغ',
            channels: [
              { src: racingMeydanLogo, alt: 'رايسنغ ميدان' },
              { src: racingJebelAliLogo, alt: 'رايسنغ جبل علي' },
              { src: racingAlEmaratLogo, alt: 'رايسنغ الإمارات' },
              { src: dwcLogo, alt: 'دي دبليو سي' },
            ]
          },
          {
            name: 'سما',
            channels: [
              { src: natureAliLogo, alt: 'نيتشر مع علي بن ثلث' },
              { src: masaaDubaiLogo, alt: 'مساء دبي' },
              { src: kunoozAlDarLogo, alt: 'كنوز الدار 3' },
              { src: alHaiAlThaqafiLogo, alt: 'الحي الثقافي' },
            ]
          },
          {
            name: 'سما رمضان',
            channels: [
              { src: alMandoosLogo, alt: 'المندوس' },
              { src: souqAlQadeemLogo, alt: 'سوق القديم' },
            ]
          },
          {
            name: 'سبورتس',
            channels: [
              { src: alMalabLogo, alt: 'الملعب' },
              { src: alSalatLogo, alt: 'السلة' },
              { src: jamaheerLogo, alt: 'جماهير' },
              { src: stadAlDawriLogo, alt: 'ستاد الدوري' },
            ]
          },
        ]
      };
    } else if (channelType === 'radio') {
      return {
        title: 'اختر القناة',
        categories: [
          {
            name: 'قنوات الراديو',
            channels: [
              { src: radio2Logo, alt: 'راديو' },
            ]
          },
        ]
      };
    } else if (channelType === 'mobile') {
      return {
        title: 'اختر القناة',
        categories: [
          {
            name: 'تطبيقات الموبايل',
            channels: [
              { src: awaanLogo, alt: 'أوان' },
            ]
          },
        ]
      };
    } else if (channelType === 'print') {
      return {
        title: 'اختر القناة',
        categories: [
          {
            name: 'الصحف',
            channels: [
              { src: newsLogo, alt: 'أخبار' },
            ]
          },
        ]
      };
    }
    return { title: 'اختر القناة', categories: [] };
  };

  const channelData = getChannelData();

  const handleChannelClick = () => {
    onClose();
    onChannelSelect();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[9998]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-2xl shadow-lg z-[9999] flex flex-col overflow-hidden"
        style={{ height: '600px', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="relative p-6 pb-4 border-b border-gray-200 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
          <h2 className="text-2xl text-center pr-10 font-bold">
            {channelData.title}
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 p-6" style={{ height: '600px', overflowY: 'auto' }}>
          <div className="space-y-8">
          {channelData.categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2 mt-4">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {category.channels.map((channel, channelIndex) => (
                  <div
                    key={channelIndex}
                    onClick={handleChannelClick}
                    className="flex flex-col items-center p-4 border rounded-lg hover:shadow-lg hover:border-primary transition-all duration-300 cursor-pointer group bg-white"
                  >
                    <div className="w-50 h-20 flex items-center justify-center mb-2 overflow-hidden">
                      <img
                        src={channel.src}
                        alt={channel.alt}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center">
                      {channel.alt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}
