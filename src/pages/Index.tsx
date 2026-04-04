import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import VideoSection from '@/components/VideoSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import ClientReviewsSection from '@/components/ClientReviewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-0 overflow-x-hidden">
      <SEOHead
        title="Upnex It - Custom Software Solutions | কাস্টম সফটওয়্যার সমাধান"
        description="Upnex It provides professional custom software solutions including School Management, Hospital Management, Web Development and more for businesses in Bangladesh."
        canonical="https://upnexit.com/"
      />
      <Navbar />
      <HeroSection />
      <VideoSection />
      <ServicesSection />
      <StatsSection />
      <AboutSection />
      <ClientReviewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
