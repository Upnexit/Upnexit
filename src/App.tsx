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
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import TeamManagement from "./pages/admin/TeamManagement";
import Messages from "./pages/admin/Messages";
import ServicesManagement from "./pages/admin/ServicesManagement";
import SiteSettings from "./pages/admin/SiteSettings";
import ClientReviewsManagement from "./pages/admin/ClientReviewsManagement";
import ChatbotManagement from "./pages/admin/ChatbotManagement";
import ChatbotWidget from "./components/ChatbotWidget";

const queryClient = new QueryClient();

const AppRoutes = () => {
  usePageTracker();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="team" element={<TeamManagement />} />
        <Route path="messages" element={<Messages />} />
        <Route path="services" element={<ServicesManagement />} />
        <Route path="reviews" element={<ClientReviewsManagement />} />
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
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
