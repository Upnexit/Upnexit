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
        title="Upnex It - Best Software Company in Bangladesh | সেরা সফটওয়্যার কোম্পানি"
        description="Upnex It is a leading software company in Bangladesh providing School Management Software, Hospital Management System, Custom Software Development & Web Applications at affordable prices."
        canonical="https://upnexit.pro.bd/"
        keywords="software company bangladesh, best software company in bangladesh, custom software development, school management software bangladesh, hospital management software, web development company bangladesh, IT company naogaon, সফটওয়্যার কোম্পানি বাংলাদেশ, স্কুল ম্যানেজমেন্ট সফটওয়্যার, হসপিটাল ম্যানেজমেন্ট সফটওয়্যার, কাস্টম সফটওয়্যার, ওয়েব ডেভেলপমেন্ট বাংলাদেশ, upnex it, upnexit, সফটওয়্যার কোম্পানি নওগাঁ, best IT company bangladesh, affordable software bangladesh, ERP software bangladesh, software development company bd"
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
