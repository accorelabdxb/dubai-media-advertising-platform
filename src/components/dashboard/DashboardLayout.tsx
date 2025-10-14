import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useLanguage } from "../../contexts/LanguageContext";
import { 
  LayoutDashboard, 
  Calendar, 
  Package, 
  FileText, 
  Globe,
  User,
  LogOut,
  Plus
} from "lucide-react";
import { DashboardHome } from "./DashboardHome";
import { MediaSelection } from "./booking/MediaSelection";
import { ProgramTimeSlot } from "./booking/ProgramTimeSlot";
import { PricingPackages } from "./booking/PricingPackages";
import { AdMaterialUpload } from "./booking/AdMaterialUpload";
import { ReviewConfirmation } from "./booking/ReviewConfirmation";
import { Payment } from "./booking/Payment";
import { ApprovalWorkflow } from "./booking/ApprovalWorkflow";
import { BookingSuccess } from "./booking/BookingSuccess";
import logo from "../../images/logo.svg";

export interface BookingData {
  mediaOutlet?: {
    id: string;
    name: string;
    type: 'tv' | 'radio' | 'print' | 'digital';
    logo?: string;
  };
  program?: {
    id: string;
    name: string;
    timeSlot: string;
    date: string;
    duration: string;
    category: string;
    daysCount?: number;
  };
  pricing?: {
    basePrice: number;
    addOns: Array<{ name: string; price: number }>;
    package?: { name: string; discount: number };
    totalPrice: number;
    daysCount?: number;
    pricePerDay?: number;
  };
  adMaterial?: {
    type: 'upload' | 'request';
    file?: File;
    template?: {
      id: string;
      name: string;
      customization: {
        companyName: string;
        productName: string;
        slogan: string;
        logo?: File;
        colors: string;
        language: string;
      };
    };
  };
  bookingId?: string;
  status?: 'submitted' | 'creative-review' | 'legal-review' | 'approved' | 'scheduled';
}

type DashboardPage = 'home' | 'bookings' | 'packages' | 'invoices';
type BookingStep = 'media-selection' | 'program-time' | 'pricing' | 'ad-material' | 'review' | 'payment' | 'approval' | 'success';

interface DashboardLayoutProps {
  onNavigateHome: () => void;
}

export function DashboardLayout({ onNavigateHome }: DashboardLayoutProps) {
  const [currentPage, setCurrentPage] = useState<DashboardPage>('home');
  const [bookingStep, setBookingStep] = useState<BookingStep | null>(null);
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const { t } = useLanguage();

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...updates }));
  };

  const startBooking = () => {
    setBookingStep('media-selection');
    setBookingData({});
  };

  const nextBookingStep = () => {
    const steps: BookingStep[] = ['media-selection', 'program-time', 'pricing', 'ad-material', 'review', 'payment', 'approval', 'success'];
    const currentIndex = steps.indexOf(bookingStep!);
    if (currentIndex < steps.length - 1) {
      setBookingStep(steps[currentIndex + 1]);
    }
  };

  const prevBookingStep = () => {
    const steps: BookingStep[] = ['media-selection', 'program-time', 'pricing', 'ad-material', 'review', 'payment', 'approval', 'success'];
    const currentIndex = steps.indexOf(bookingStep!);
    if (currentIndex > 0) {
      setBookingStep(steps[currentIndex - 1]);
    }
  };

  const exitBooking = () => {
    setBookingStep(null);
    setCurrentPage('home');
  };

  const renderBookingStep = () => {
    switch (bookingStep) {
      case 'media-selection':
        return <MediaSelection data={bookingData} onUpdate={updateBookingData} onNext={nextBookingStep} onBack={exitBooking} />;
      case 'program-time':
        return <ProgramTimeSlot data={bookingData} onUpdate={updateBookingData} onNext={nextBookingStep} onBack={prevBookingStep} />;
      case 'pricing':
        return <PricingPackages data={bookingData} onUpdate={updateBookingData} onNext={nextBookingStep} onBack={prevBookingStep} />;
      case 'ad-material':
        return <AdMaterialUpload data={bookingData} onUpdate={updateBookingData} onNext={nextBookingStep} onBack={prevBookingStep} />;
      case 'review':
        return <ReviewConfirmation data={bookingData} onUpdate={updateBookingData} onNext={nextBookingStep} onBack={prevBookingStep} />;
      case 'payment':
        return <Payment data={bookingData} onUpdate={updateBookingData} onNext={nextBookingStep} onBack={prevBookingStep} />;
      case 'approval':
        return <ApprovalWorkflow data={bookingData} onUpdate={updateBookingData} onNext={nextBookingStep} onBack={exitBooking} />;
      case 'success':
        return <BookingSuccess data={bookingData} onBookAnother={startBooking} onViewBookings={() => { setBookingStep(null); setCurrentPage('bookings'); }} />;
      default:
        return null;
    }
  };

  if (bookingStep) {
    return (
      <div className="min-h-screen bg-blue-50">
        {renderBookingStep()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-6 w-10" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            >
              {language === 'en' ? 'AR' : 'EN'}
            </Button>

            {/* User Profile */}
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{t('dashboard.user')}</span>
            </div>

            {/* Logout */}
            <Button variant="ghost" size="sm" onClick={onNavigateHome}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-600 text-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={currentPage === 'home' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentPage('home')}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              {t('dashboard.title')}
            </Button>
            <Button
              variant={currentPage === 'bookings' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentPage('bookings')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              {t('dashboard.myBookings')}
            </Button>
            <Button
              variant={currentPage === 'packages' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentPage('packages')}
            >
              <Package className="h-4 w-4 mr-2" />
              {t('dashboard.packages')}
            </Button>
            <Button
              variant={currentPage === 'invoices' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setCurrentPage('invoices')}
            >
              <FileText className="h-4 w-4 mr-2" />
              {t('dashboard.invoices')}
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentPage === 'home' && <DashboardHome onStartBooking={startBooking} />}
          {currentPage === 'bookings' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium mb-4">{t('dashboard.myBookings')}</h2>
              <p className="text-gray-600 mb-6">{t('dashboard.myBookings.description')}</p>
              <Button onClick={startBooking}>
                <Plus className="h-4 w-4 mr-2" />
                {t('dashboard.createNewBooking')}
              </Button>
            </div>
          )}
          {currentPage === 'packages' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium mb-4">{t('dashboard.packages')}</h2>
              <p className="text-gray-600">{t('dashboard.packages.description')}</p>
            </div>
          )}
          {currentPage === 'invoices' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium mb-4">{t('dashboard.invoices')}</h2>
              <p className="text-gray-600">{t('dashboard.invoices.description')}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}