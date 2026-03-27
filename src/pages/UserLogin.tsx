import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { lovable } from '@/integrations/lovable/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const UserLogin = () => {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // If already logged in, redirect
  if (user) {
    navigate(redirect, { replace: true });
    return null;
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast({ title: isBn ? 'Google লগইন ব্যর্থ' : 'Google login failed', variant: 'destructive' });
      }
    } catch {
      toast({ title: isBn ? 'কিছু ভুল হয়েছে' : 'Something went wrong', variant: 'destructive' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) {
          toast({ title: isBn ? 'রেজিস্ট্রেশন ব্যর্থ' : 'Registration failed', description: error.message, variant: 'destructive' });
        } else {
          toast({ title: isBn ? '✅ ইমেইল যাচাই করুন' : '✅ Check your email', description: isBn ? 'আপনার ইমেইলে একটি যাচাইকরণ লিংক পাঠানো হয়েছে।' : 'A verification link has been sent to your email.' });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });
        if (error) {
          toast({ title: isBn ? 'লগইন ব্যর্থ' : 'Login failed', description: error.message, variant: 'destructive' });
        } else {
          toast({ title: isBn ? '✅ স্বাগতম!' : '✅ Welcome!' });
          navigate(redirect);
        }
      }
    } catch {
      toast({ title: isBn ? 'ত্রুটি হয়েছে' : 'An error occurred', variant: 'destructive' });
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

          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative mx-auto mb-4"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto shadow-glow">
                <User className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
            </motion.div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              {mode === 'login'
                ? (isBn ? 'আপনার অ্যাকাউন্টে প্রবেশ করুন' : 'Sign in to your account')
                : (isBn ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'Create a new account')
              }
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1.5">
              {isBn ? 'অর্ডার ও কনসালটেশন পরিচালনা করতে লগইন করুন' : 'Login to manage orders & consultations'}
            </p>
          </div>

          {/* Google Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full h-12 rounded-xl font-semibold text-sm mb-4 gap-3 border-border/60 hover:bg-muted/60 transition-all"
          >
            {googleLoading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-muted-foreground/30 border-t-primary rounded-full" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {isBn ? 'Google দিয়ে চালিয়ে যান' : 'Continue with Google'}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">{isBn ? 'অথবা' : 'or'}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3">
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={isBn ? 'আপনার নাম' : 'Your name'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10 h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-background focus:border-primary/40 transition-all text-sm"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder={isBn ? 'ইমেইল অ্যাড্রেস' : 'Email address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-12 rounded-xl bg-muted/50 border-border/60 focus:bg-background focus:border-primary/40 transition-all text-sm"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={isBn ? 'পাসওয়ার্ড' : 'Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
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

            <Button
              type="submit"
              disabled={loading}
              variant="hero"
              className="w-full h-12 rounded-xl font-bold text-sm mt-1 gap-2"
            >
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
              ) : (
                <>
                  {mode === 'login' ? (isBn ? 'লগইন করুন' : 'Sign In') : (isBn ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account')}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle mode */}
          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-5">
            {mode === 'login'
              ? (isBn ? 'অ্যাকাউন্ট নেই?' : "Don't have an account?")
              : (isBn ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?')
            }{' '}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-primary font-bold hover:underline"
            >
              {mode === 'login' ? (isBn ? 'রেজিস্টার করুন' : 'Sign Up') : (isBn ? 'লগইন করুন' : 'Sign In')}
            </button>
          </p>

          {/* Back to home */}
          <div className="text-center mt-4">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {isBn ? 'হোমপেজে ফিরে যান' : 'Back to Homepage'}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserLogin;
