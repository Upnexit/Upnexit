import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import { usePageTracker } from "@/hooks/usePageTracker";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Consultation from "./pages/Consultation";
import NotFound from "./pages/NotFound";
import ServiceDetail from "./pages/ServiceDetail";
import Order from "./pages/Order";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Portfolio from "./pages/Portfolio";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import TeamManagement from "./pages/admin/TeamManagement";
import Messages from "./pages/admin/Messages";
import ServicesManagement from "./pages/admin/ServicesManagement";
import SiteSettings from "./pages/admin/SiteSettings";
import ClientReviewsManagement from "./pages/admin/ClientReviewsManagement";
import ChatbotManagement from "./pages/admin/ChatbotManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import DemoLinksManagement from "./pages/admin/DemoLinksManagement";
import BlogManagement from "./pages/admin/BlogManagement";
import PortfolioManagement from "./pages/admin/PortfolioManagement";
import ChatbotWidget from "./components/ChatbotWidget";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const AppRoutes = () => {
  usePageTracker();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/order" element={<Order />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
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
        <Route path="settings" element={<SiteSettings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
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
            <ChatbotWidget />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
