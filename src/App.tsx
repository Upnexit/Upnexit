import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import { usePageTracker } from "@/hooks/usePageTracker";
import { lazy, Suspense, useEffect, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";

// Eagerly load Index (homepage) for fastest FCP
import Index from "./pages/Index";

// Lazy load all other routes
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const FounderProfile = lazy(() => import("./pages/FounderProfile"));
const Contact = lazy(() => import("./pages/Contact"));
const Consultation = lazy(() => import("./pages/Consultation"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Order = lazy(() => import("./pages/Order"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const UserLogin = lazy(() => import("./pages/UserLogin"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const TeamManagement = lazy(() => import("./pages/admin/TeamManagement"));
const Messages = lazy(() => import("./pages/admin/Messages"));
const ServicesManagement = lazy(() => import("./pages/admin/ServicesManagement"));
const SiteSettings = lazy(() => import("./pages/admin/SiteSettings"));
const ClientReviewsManagement = lazy(() => import("./pages/admin/ClientReviewsManagement"));
const ChatbotManagement = lazy(() => import("./pages/admin/ChatbotManagement"));
const OrdersManagement = lazy(() => import("./pages/admin/OrdersManagement"));
const DemoLinksManagement = lazy(() => import("./pages/admin/DemoLinksManagement"));
const BlogManagement = lazy(() => import("./pages/admin/BlogManagement"));
const PortfolioManagement = lazy(() => import("./pages/admin/PortfolioManagement"));
const SeoRankings = lazy(() => import("./pages/admin/SeoRankings"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load heavy widgets — deferred until idle/interaction to protect LCP
const ChatbotWidget = lazy(() => import("./components/ChatbotWidget"));

const DeferredChatbot = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setShow(true);
    };
    const idle =
      (window as any).requestIdleCallback ||
      ((cb: () => void) => setTimeout(cb, 1));
    const idleId = idle(trigger, { timeout: 4000 });
    const events: Array<keyof WindowEventMap> = [
      "scroll",
      "mousemove",
      "touchstart",
      "keydown",
    ];
    events.forEach((ev) =>
      window.addEventListener(ev, trigger, { once: true, passive: true })
    );
    return () => {
      if ((window as any).cancelIdleCallback) {
        (window as any).cancelIdleCallback(idleId);
      }
      events.forEach((ev) => window.removeEventListener(ev, trigger));
    };
  }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <ChatbotWidget />
    </Suspense>
  );
};

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const AppRoutes = () => {
  usePageTracker();
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/:slug" element={<FounderProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="team" element={<TeamManagement />} />
          <Route path="messages" element={<Messages />} />
          <Route path="services" element={<ServicesManagement />} />
          <Route path="reviews" element={<ClientReviewsManagement />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="demo-links" element={<DemoLinksManagement />} />
          <Route path="chatbot" element={<ChatbotManagement />} />
          <Route path="blog" element={<BlogManagement />} />
          <Route path="portfolio" element={<PortfolioManagement />} />
          <Route path="seo" element={<SeoRankings />} />
          <Route path="settings" element={<SiteSettings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
            <DeferredChatbot />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
