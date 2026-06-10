import { lazy, Suspense } from 'react';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import InternalLinks from '@/components/InternalLinks';

// Lazy load below-the-fold sections
const VideoSection = lazy(() => import('@/components/VideoSection'));
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const StatsSection = lazy(() => import('@/components/StatsSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ClientReviewsSection = lazy(() => import('@/components/ClientReviewsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-0 overflow-x-hidden">
      <SEOHead
        title="Upnex It — #1 Software Company in Bangladesh | Custom, School & Hospital Software"
        description="Upnex It is Bangladesh's leading software development company — building affordable Custom Software, School Management, Hospital Management, ERP and Web Applications. Trusted by 10+ clients, 50+ projects delivered."
        canonical="https://upnexit.pro.bd/"
        keywords="software company bangladesh, best software company in bangladesh, custom software development, school management software bangladesh, hospital management software, web development company bangladesh, IT company naogaon, সফটওয়্যার কোম্পানি বাংলাদেশ, স্কুল ম্যানেজমেন্ট সফটওয়্যার, হসপিটাল ম্যানেজমেন্ট সফটওয়্যার, কাস্টম সফটওয়্যার, ওয়েব ডেভেলপমেন্ট বাংলাদেশ, upnex it, upnexit, সফটওয়্যার কোম্পানি নওগাঁ, best IT company bangladesh, affordable software bangladesh, ERP software bangladesh, software development company bd"
      />
      {/* JSON-LD WebPage schema marking this as the canonical homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://upnexit.pro.bd/#webpage",
            "url": "https://upnexit.pro.bd/",
            "name": "Upnex It — Best Software Company in Bangladesh",
            "isPartOf": { "@id": "https://upnexit.pro.bd/#website" },
            "about": { "@id": "https://upnexit.pro.bd/#organization" },
            "primaryImageOfPage": "https://upnexit.pro.bd/logo.png",
            "description": "Official homepage of Upnex It — Bangladesh's trusted software development company offering Custom Software, School Management, Hospital Management, ERP and Web Applications.",
            "inLanguage": ["en", "bn"],
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": ["h1", "h2", "meta[name='description']"]
            }
          })
        }}
      />
      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Upnex It",
            "alternateName": [
              "upnex it",
              "UPNEX IT",
              "UpnexIt",
              "upnexit",
              "Upnex-It",
              "Upnex.It",
              "Upnex IT BD",
              "Upnex It Bangladesh",
              "আপনেক্স আইটি",
              "আপনেক্স",
              "উপনেক্স আইটি"
            ],
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
      {/* JSON-LD LocalBusiness for richer local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://upnexit.pro.bd/#localbusiness",
            "name": "Upnex It",
            "image": "https://upnexit.pro.bd/logo.png",
            "url": "https://upnexit.pro.bd",
            "telephone": "+880-1628112731",
            "priceRange": "৳৳",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Sapahar",
              "addressLocality": "Naogaon",
              "addressRegion": "Rajshahi",
              "addressCountry": "BD"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": 25.034, "longitude": 88.585 },
            "openingHoursSpecification": [{
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Saturday","Sunday"],
              "opens": "09:00",
              "closes": "21:00"
            }]
          })
        }}
      />
      {/* BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upnexit.pro.bd/" }
            ]
          })
        }}
      />
      <Navbar />
      <HeroSection />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <VideoSection />
        <ServicesSection />
        <StatsSection />
        <AboutSection />
        <ClientReviewsSection />
        <ContactSection />
      </Suspense>
      <InternalLinks exclude="/" />
      <Footer />
    </div>
  );
};

export default Index;
