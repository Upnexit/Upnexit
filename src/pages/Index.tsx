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
        canonical="https://upnexit.pro.bd/"
      />
      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Upnex It",
            "alternateName": "আপনেক্স আইটি",
            "url": "https://upnexit.pro.bd",
            "logo": "https://upnexit.pro.bd/logo.png",
            "image": "https://upnexit.pro.bd/og-image.jpg",
            "description": "Professional custom software solutions for businesses in Bangladesh. School Management, Hospital Management, Web Development.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Sapahar",
              "addressLocality": "Naogaon",
              "addressRegion": "Rajshahi",
              "addressCountry": "BD"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "25.034",
              "longitude": "88.585"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+880-1628112731",
              "contactType": "customer service",
              "email": "upnex360@gmail.com",
              "availableLanguage": ["Bengali", "English"]
            },
            "foundingDate": "2023",
            "areaServed": "BD",
            "knowsAbout": ["School Management Software", "Hospital Management Software", "Custom Software Development", "Web Application Development"],
            "sameAs": []
          })
        }}
      />
      {/* JSON-LD WebSite Schema for Sitelinks Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Upnex It",
            "url": "https://upnexit.pro.bd",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://upnexit.pro.bd/services?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
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
