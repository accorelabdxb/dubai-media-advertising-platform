import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PlatformSelection } from "./components/PlatformSelection";
import { HowItWorks } from "./components/HowItWorks";
import { FeaturedPrograms } from "./components/FeaturedPrograms";
import { Analytics } from "./components/Analytics";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { SignupPage } from "./components/SignupPage";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { SignInModal } from "./components/SignInModal";
import { ChannelSelectionModal } from "./components/ChannelSelectionModal";
import { LanguageProvider } from "./contexts/LanguageContext";

type Page = 'home' | 'signup' | 'dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [selectedChannelType, setSelectedChannelType] = useState<'tv' | 'radio' | 'print' | 'mobile'>('tv');

  const navigateToSignup = () => setCurrentPage('signup');
  const navigateToHome = () => setCurrentPage('home');
  const navigateToDashboard = () => setCurrentPage('dashboard');
  
  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);
  
  const openChannelModal = (type: 'tv' | 'radio' | 'print' | 'mobile') => {
    setSelectedChannelType(type);
    setIsChannelModalOpen(true);
  };
  const closeChannelModal = () => setIsChannelModalOpen(false);
  
  const handleSignIn = () => {
    closeSignInModal();
    navigateToDashboard();
  };
  
  const handleSignUp = () => {
    closeSignInModal();
    navigateToSignup();
  };
  
  const handleChannelSelect = () => {
    closeChannelModal();
    openSignInModal();
  };

  // Handle URL-based navigation on initial load
  if (typeof window !== 'undefined' && window.location.pathname === '/dashboard' && currentPage === 'home') {
    setCurrentPage('dashboard');
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen">
        {currentPage === 'signup' && <SignupPage onBack={navigateToHome} />}
        
        {currentPage === 'dashboard' && <DashboardLayout onNavigateHome={navigateToHome} />}
        
        {currentPage === 'home' && (
          <>
            <Navbar onGetStarted={navigateToSignup} />
            <div id="hero">
              <Hero 
                onOpenSignInModal={openSignInModal}
                onOpenChannelModal={openChannelModal}
              />
            </div>
            <div id="platforms">
              <PlatformSelection />
            </div>
            <div id="how-it-works">
              <HowItWorks />
            </div>
            <div id="programs">
              <FeaturedPrograms />
            </div>
            <div id="analytics">
              <Analytics />
            </div>
            {/* <div id="testimonials">
              <Testimonials />
            </div> */}
            <div id="pricing">
              <CTA />
            </div>
            <div id="contact">
              <Contact />
            </div>
            <Footer />
          </>
        )}
        
        {/* Global Sign In Modal */}
        <SignInModal
          isOpen={isSignInModalOpen}
          onClose={closeSignInModal}
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
        />
        
        {/* Global Channel Selection Modal */}
        <ChannelSelectionModal
          isOpen={isChannelModalOpen}
          onClose={closeChannelModal}
          channelType={selectedChannelType}
          onChannelSelect={handleChannelSelect}
        />
      </div>
    </LanguageProvider>
  );
}