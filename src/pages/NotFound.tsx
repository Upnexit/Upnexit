import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, hsl(150 20% 8%), hsl(145 25% 12%), hsl(150 20% 10%))' }}
      onMouseMove={handleMouseMove}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, hsl(145 63% 40%), transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], x: mousePos.x * 2, y: mousePos.y * 2 }}
          transition={{ scale: { duration: 4, repeat: Infinity }, x: { duration: 0.3 }, y: { duration: 0.3 } }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, hsl(46 92% 55%), transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], x: mousePos.x * -1.5, y: mousePos.y * -1.5 }}
          transition={{ scale: { duration: 5, repeat: Infinity }, x: { duration: 0.3 }, y: { duration: 0.3 } }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(hsl(145 50% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(145 50% 50%) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-6"
        >
          <h1
            className="text-[140px] sm:text-[180px] font-black leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, hsl(145 63% 45%), hsl(46 92% 55%), hsl(145 63% 35%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px hsla(145, 63%, 40%, 0.2))',
            }}
          >
            404
          </h1>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Search className="w-16 h-16 sm:w-20 sm:h-20" style={{ color: 'hsla(145, 50%, 60%, 0.15)' }} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{ color: 'hsl(0 0% 95%)' }}
        >
          পেজটি খুঁজে পাওয়া যায়নি
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm sm:text-base mb-2"
          style={{ color: 'hsla(145, 15%, 65%, 0.9)' }}
        >
          আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে, মুছে ফেলা হয়েছে বা কখনও ছিল না।
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-xs mb-8 font-mono px-3 py-1.5 rounded-lg inline-block"
          style={{ color: 'hsla(0, 60%, 65%, 0.8)', background: 'hsla(0, 50%, 40%, 0.1)' }}
        >
          {location.pathname}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/">
            <Button variant="hero" size="lg" className="gap-2 px-8">
              <Home className="h-4 w-4" />
              হোম পেজে যান
            </Button>
          </Link>
          <Button
            variant="heroOutline"
            size="lg"
            className="gap-2 px-8"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            পূর্বের পেজে ফিরুন
          </Button>
        </motion.div>

        {/* Retry hint */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: 'hsla(145, 20%, 55%, 0.6)' }}
        >
          <RefreshCw className="h-3 w-3" />
          রিলোড করুন
        </motion.button>
      </div>
    </div>
  );
};

export default NotFound;
