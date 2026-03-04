import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Shield, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();

      const result = await Promise.race([
        signIn(normalizedEmail, password),
        new Promise<{ error: { message: string } }>((resolve) => {
          setTimeout(() => {
            resolve({ error: { message: 'অনুরোধটি বেশি সময় নিচ্ছে। আবার চেষ্টা করুন।' } });
          }, 12000);
        }),
      ]);

      if (result.error) {
        toast({ title: 'লগইন ব্যর্থ', description: result.error.message, variant: 'destructive' });
      } else {
        toast({ title: '✅ সফল', description: 'লগইন সম্পন্ন হয়েছে!' });
        navigate('/admin');
      }
    } catch {
      toast({ title: 'ত্রুটি', description: 'কিছু ভুল হয়েছে', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(160deg, hsl(145 63% 96%) 0%, hsl(0 0% 100%) 30%, hsl(46 80% 96%) 60%, hsl(145 45% 94%) 100%)'
      }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(145 63% 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(145 63% 32%) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Decorative blobs */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-[10%] w-48 h-48 sm:w-72 sm:h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(145 63% 42% / 0.08), transparent 70%)' }}
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-20 left-[5%] w-40 h-40 sm:w-64 sm:h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(46 92% 55% / 0.1), transparent 70%)' }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-sm sm:max-w-md relative z-10"
      >
        <div className="bg-background/80 backdrop-blur-xl rounded-3xl border border-border shadow-elevated p-6 sm:p-10 relative overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl" style={{ background: 'var(--gradient-hero)' }} />

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative mx-auto mb-5"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto shadow-glow">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
            </motion.div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              অ্যাডমিন প্যানেল
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1.5">
              কন্ট্রোল প্যানেলে প্রবেশ করতে লগইন করুন
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 ml-1">ইমেইল</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-background focus:border-primary/40 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 ml-1">পাসওয়ার্ড</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-background focus:border-primary/40 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="hero"
              className="w-full h-12 rounded-xl font-bold text-sm mt-2 gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                  লগইন হচ্ছে...
                </>
              ) : (
                'লগইন করুন'
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-6">
            শুধুমাত্র অনুমোদিত ব্যবহারকারীদের জন্য
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
