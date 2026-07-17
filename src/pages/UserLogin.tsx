import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';

const getSafeRedirectPath = (value: string | null) => {
  if (!value) return '/dashboard';
  try {
    const decoded = decodeURIComponent(value);
    if (!decoded.startsWith('/') || decoded.startsWith('//')) return '/dashboard';
    if (decoded.startsWith('/login')) return '/dashboard';
    return decoded;
  } catch {
    return '/dashboard';
  }
};

const getOAuthRedirectUrl = (targetPath: string) => {
  const isProductionHost = window.location.hostname === 'upnexit.pro.bd';
  const origin = isProductionHost ? 'https://upnexit.pro.bd' : window.location.origin;
  return `${origin}/login?redirect=${encodeURIComponent(targetPath)}`;
};

const UserLogin = () => {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';
  const [searchParams] = useSearchParams();
  const redirect = getSafeRedirectPath(searchParams.get('redirect'));
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'apple' | null>(null);

  useEffect(() => {
    if (!user) return;
    let target = redirect;
    try {
      const stored = sessionStorage.getItem('post_login_redirect');
      if (stored) {
        target = stored;
        sessionStorage.removeItem('post_login_redirect');
      }
    } catch {}
    navigate(target, { replace: true });
  }, [user, redirect, navigate]);

  const handleGoogleLogin = async () => {
    setSocialLoading('google');
    try {
      try { sessionStorage.setItem('post_login_redirect', redirect); } catch {}
      const result = await lovable.auth.signInWithOAuth('google', { redirect_uri: getOAuthRedirectUrl(redirect) });
      if (result.error) {
        toast({ title: isBn ? 'Google লগইন ব্যর্থ' : 'Google login failed', variant: 'destructive' });
        return;
      }
      if (result.redirected) return;
      navigate(redirect, { replace: true });
    } catch {
      toast({ title: isBn ? 'কিছু ভুল হয়েছে' : 'Something went wrong', variant: 'destructive' });
    } finally {
      setSocialLoading(null);
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

  const trustPoints = isBn
    ? ['নিরাপদ ও এনক্রিপ্টেড', 'দ্রুত সেটআপ', '২৪/৭ সাপোর্ট']
    : ['Secure & Encrypted', 'Quick Setup', '24/7 Support'];

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* ===== LEFT PANEL — Brand / Info (Desktop only) ===== */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative flex-col justify-between p-10 xl:p-14 overflow-hidden"
        style={{ background: 'var(--gradient-hero)' }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        {/* Top — Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Upnex It" className="w-11 h-11 rounded-xl object-contain bg-white/10 p-1" />
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Upnex <span className="opacity-80">It</span>
            </span>
          </Link>
        </motion.div>

        {/* Center — Headline */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="relative z-10 space-y-6">
          <h2 className="text-3xl xl:text-4xl font-black text-white leading-tight">
            {isBn ? (
              <>আপনার ব্যবসাকে<br /><span className="text-secondary">ডিজিটাল</span> করুন</>
            ) : (
              <>Transform Your<br />Business <span className="text-secondary">Digitally</span></>
            )}
          </h2>
          <p className="text-white/90 text-sm xl:text-base leading-relaxed max-w-sm">
            {isBn
              ? 'আমরা আপনার প্রতিষ্ঠানের জন্য মানসম্মত সফটওয়্যার সলিউশন প্রদান করি। লগইন করুন এবং আপনার প্রজেক্ট পরিচালনা করুন।'
              : 'We provide quality software solutions for your organization. Login and manage your projects seamlessly.'}
          </p>

          {/* Trust badges */}
          <div className="flex flex-col gap-2.5 pt-2">
            {trustPoints.map((point, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2.5 text-white/95 text-sm">
                <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-secondary" />
                </div>
                {point}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom — Copyright */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="relative z-10">
          <p className="text-white/75 text-xs">
            © {new Date().getFullYear()} Upnex It. {isBn ? 'সর্বস্বত্ব সংরক্ষিত' : 'All rights reserved'}
          </p>
        </motion.div>

        {/* Decorative floating shapes */}
        <motion.div animate={{ y: [0, -25, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(46 92% 55% / 0.12), transparent 70%)' }}
        />
        <motion.div animate={{ y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-20 -right-10 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(0 0% 100% / 0.06), transparent 70%)' }}
        />
      </div>

      {/* ===== RIGHT PANEL — Login Form ===== */}
      <div className="flex-1 flex flex-col">
        {/* Mobile brand bar */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-border bg-background">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Upnex It" className="w-8 h-8 rounded-lg object-contain" />
            <span className="text-lg font-extrabold text-foreground tracking-tight">
              Upnex <span className="text-gradient">It</span>
            </span>
          </Link>
          <span className="text-[10px] text-muted-foreground font-medium px-2 py-1 bg-muted rounded-full">
            {isBn ? 'নিরাপদ লগইন' : 'Secure Login'}
          </span>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-5 py-8 sm:py-12 bg-background relative">
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 0.5px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-[400px] relative z-10"
          >
            {/* Header */}
            <div className="text-center mb-7">
              {/* Mobile-only icon */}
              <div className="lg:hidden mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
              </div>

              <h1 className="text-2xl sm:text-[28px] font-black text-foreground tracking-tight leading-tight">
                {mode === 'login'
                  ? (isBn ? 'আপনার অ্যাকাউন্টে প্রবেশ করুন' : 'Welcome back')
                  : (isBn ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'Create your account')
                }
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                {mode === 'login'
                  ? (isBn ? 'আপনার অর্ডার ও প্রজেক্ট পরিচালনা করতে লগইন করুন' : 'Sign in to manage your orders & projects')
                  : (isBn ? 'আপনার তথ্য দিয়ে অ্যাকাউন্ট তৈরি করুন' : 'Fill in your details to get started')
                }
              </p>
            </div>

            {/* Social Buttons */}
            <div className="mb-5">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={!!socialLoading}
                className="w-full h-[50px] rounded-xl border border-border bg-background hover:bg-muted/50 transition-all flex items-center justify-center gap-3 text-sm font-semibold text-foreground disabled:opacity-50 group"
              >
                {socialLoading === 'google' ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-muted-foreground/30 border-t-primary rounded-full" />
                ) : (
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                {isBn ? 'Google দিয়ে চালিয়ে যান' : 'Continue with Google'}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {isBn ? 'অথবা ইমেইল দিয়ে' : 'or with email'}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 ml-0.5">
                    {isBn ? 'আপনার নাম' : 'Full Name'}
                  </label>
                  <Input
                    type="text"
                    placeholder={isBn ? 'আপনার পূর্ণ নাম' : 'John Doe'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-[50px] rounded-xl bg-muted/40 border-border/60 focus:bg-background focus:border-primary/40 transition-all text-sm px-4"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5 ml-0.5">
                  {isBn ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder={isBn ? 'name@example.com' : 'name@example.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-11 h-[50px] rounded-xl bg-muted/40 border-border/60 focus:bg-background focus:border-primary/40 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-foreground ml-0.5">
                    {isBn ? 'পাসওয়ার্ড' : 'Password'}
                  </label>
                  {mode === 'login' && (
                    <button type="button" className="text-xs text-primary hover:underline font-medium">
                      {isBn ? 'ভুলে গেছেন?' : 'Forgot?'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-11 pr-11 h-[50px] rounded-xl bg-muted/40 border-border/60 focus:bg-background focus:border-primary/40 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                variant="hero"
                className="w-full h-[50px] rounded-xl font-bold text-sm mt-1.5 gap-2"
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
                ) : (
                  <>
                    {mode === 'login' ? (isBn ? 'লগইন করুন' : 'Sign In') : (isBn ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account')}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Toggle mode */}
            <p className="text-center text-sm text-muted-foreground mt-6">
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

            {/* Terms */}
            <p className="text-center text-[10px] text-muted-foreground mt-4 leading-relaxed">
              {isBn ? 'লগইন করে আপনি আমাদের ' : 'By signing in, you agree to our '}
              <Link to="/terms-of-service" className="text-primary hover:underline">
                {isBn ? 'শর্তাবলী' : 'Terms of Service'}
              </Link>
              {isBn ? ' ও ' : ' & '}
              <Link to="/privacy-policy" className="text-primary hover:underline">
                {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
              </Link>
              {isBn ? ' মেনে নিচ্ছেন।' : '.'}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
