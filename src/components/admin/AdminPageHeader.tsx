import { useLocation } from 'react-router-dom';
import { navItems } from '@/pages/admin/AdminLayout';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  gradient?: string;
  actions?: React.ReactNode;
}

/**
 * Shared admin page header — gradient icon swatch (matching current nav item)
 * + bold title + optional subtitle + right-aligned actions slot.
 */
const AdminPageHeader = ({ title, subtitle, icon, gradient, actions }: AdminPageHeaderProps) => {
  const location = useLocation();
  const navMatch = navItems.find(n => n.path === location.pathname);
  const Icon = icon ?? navMatch?.icon;
  const grad = gradient ?? navMatch?.gradient ?? 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)';

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6"
    >
      <div className="flex items-center gap-3 min-w-0">
        {Icon && (
          <span
            className="relative flex items-center justify-center h-11 w-11 rounded-2xl shrink-0 ring-1 ring-white/30 transition-transform duration-300 hover:scale-105"
            style={{
              background: grad,
              boxShadow: '0 8px 24px -6px hsla(0,0%,0%,0.25), inset 0 1px 0 hsla(0,0%,100%,0.25)',
            }}
          >
            <Icon className="h-5 w-5 text-white drop-shadow-sm" />
          </span>
        )}
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight leading-tight truncate">{title}</h1>
          {subtitle && <p className="text-[11px] md:text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </motion.div>
  );
};

export default AdminPageHeader;