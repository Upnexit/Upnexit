import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, MapPin, Briefcase, Calendar, Award, Code2, Mail, Phone, Sparkles } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InternalLinks from '@/components/InternalLinks';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

type FounderInfo = {
  slug: string;
  name: string;
  nameBn: string;
  role: string;
  roleBn: string;
  image: string;
  shortBio: string;
  shortBioBn: string;
  address: string;
  addressBn: string;
  education: { year: string; title: string; titleBn: string; place: string; placeBn: string }[];
  educationBadge?: string;
  educationBadgeBn?: string;
  expertise: string[];
  expertiseBn: string[];
  story: string;
  storyBn: string;
  email?: string;
  phone?: string;
};

const FOUNDERS: Record<string, FounderInfo> = {
  'mehedi-hasan': {
    slug: 'mehedi-hasan',
    name: 'MD. Mehedi Hasan',
    nameBn: 'এম.ডি. মেহেদী হাসান',
    role: 'CEO & Founder, Upnex It',
    roleBn: 'সিইও ও প্রতিষ্ঠাতা, আপনেক্স আইটি',
    image: 'https://jbkzetqirqmyuijkfhvy.supabase.co/storage/v1/object/public/team-photos/1772611825155.jpeg',
    shortBio:
      'Skilled Electrical Engineer, IT expert and server specialist. Co-founder & CEO of Upnex It — leading custom software, school & hospital management solutions across Bangladesh.',
    shortBioBn:
      'দক্ষ ইলেকট্রিক্যাল ইঞ্জিনিয়ার, আইটি বিশেষজ্ঞ এবং সার্ভার এক্সপার্ট। আপনেক্স আইটি-এর সহ-প্রতিষ্ঠাতা ও সিইও।',
    address: 'Sonaranga Village, Sapahar Upazila, Naogaon District, Rajshahi Division, Bangladesh',
    addressBn: 'সোনারাঙ্গা গ্রাম, সাপাহার উপজেলা, নওগাঁ জেলা, রাজশাহী বিভাগ, বাংলাদেশ',
    educationBadge: 'Diploma in EEE (ongoing)',
    educationBadgeBn: 'ডিপ্লোমা EEE (চলমান)',
    education: [
      {
        year: 'Present',
        title: 'Diploma in Electrical Engineering (Ongoing)',
        titleBn: 'ডিপ্লোমা ইন ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং (চলমান)',
        place: 'Bangladesh Polytechnic Institute, Rajshahi',
        placeBn: 'বাংলাদেশ পলিটেকনিক ইনস্টিটিউট, রাজশাহী',
      },
      {
        year: '2025',
        title: 'SSC — Science Group',
        titleBn: 'এসএসসি — বিজ্ঞান বিভাগ',
        place: 'Al Hilal Islami Academy & College',
        placeBn: 'আল হিলাল ইসলামি একাডেমি অ্যান্ড কলেজ',
      },
      {
        year: 'Primary',
        title: 'Primary Education (Foundation)',
        titleBn: 'প্রাথমিক শিক্ষা (হাতেখড়ি)',
        place: 'Sonaranga Sarkarpara Government Primary School',
        placeBn: 'সোনারাঙ্গা সরকারপাড়া সরকারি প্রাথমিক বিদ্যালয়',
      },
    ],
    expertise: ['Electrical Engineering', 'Server Management', 'Cloud Infrastructure', 'Custom Software Architecture', 'IT Consulting', 'Team Leadership', 'Entrepreneurship'],
    expertiseBn: ['ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং', 'সার্ভার ম্যানেজমেন্ট', 'ক্লাউড ইনফ্রাস্ট্রাকচার', 'কাস্টম সফটওয়্যার আর্কিটেকচার', 'আইটি কনসাল্টিং', 'টিম লিডারশিপ', 'উদ্যোক্তা'],
    story:
      'MD. Mehedi Hasan was born and raised in Sonaranga village, Sapahar Upazila, Naogaon. His learning journey began at Sonaranga Sarkarpara Government Primary School, where his curiosity for technology took root. He completed his SSC in 2025 from Al Hilal Islami Academy & College in the Science group, and is currently pursuing a Diploma in Electrical Engineering at Bangladesh Polytechnic Institute, Rajshahi. Combining hands-on electrical and server engineering with entrepreneurial vision, he founded Upnex It to deliver world-class custom software, school management and hospital management solutions across Bangladesh.',
    storyBn:
      'এম.ডি. মেহেদী হাসানের জন্ম ও বেড়ে ওঠা নওগাঁ জেলার সাপাহার উপজেলার সোনারাঙ্গা গ্রামে। তাঁর শিক্ষাজীবনের হাতেখড়ি হয় সোনারাঙ্গা সরকারপাড়া সরকারি প্রাথমিক বিদ্যালয় থেকে। ২০২৫ সালে আল হিলাল ইসলামি একাডেমি অ্যান্ড কলেজ থেকে বিজ্ঞান বিভাগে এসএসসি সম্পন্ন করেন এবং বর্তমানে বাংলাদেশ পলিটেকনিক ইনস্টিটিউট, রাজশাহী-তে ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং-এ ডিপ্লোমা অধ্যয়নরত। ইলেকট্রিক্যাল ও সার্ভার ইঞ্জিনিয়ারিং দক্ষতার সাথে উদ্যোক্তা মনোভাব মিশিয়ে তিনি আপনেক্স আইটি প্রতিষ্ঠা করেছেন।',
  },
  'arafat-rahman': {
    slug: 'arafat-rahman',
    name: 'AR. Arafat Rahman',
    nameBn: 'এ.আর. আরাফাত রহমান',
    role: 'Co-Founder & Director, Upnex It',
    roleBn: 'সহ-প্রতিষ্ঠাতা ও পরিচালক, আপনেক্স আইটি',
    image: 'https://jbkzetqirqmyuijkfhvy.supabase.co/storage/v1/object/public/team-photos/1772611974154.jpeg',
    shortBio:
      'Skilled Computer Engineer and UI/UX Designer. Co-founder & Director of Upnex It — leading product design, user experience and strategic direction.',
    shortBioBn:
      'দক্ষ কম্পিউটার ইঞ্জিনিয়ার এবং UI/UX ডিজাইনার। আপনেক্স আইটি-এর সহ-প্রতিষ্ঠাতা ও পরিচালক।',
    address: 'Nidpur, Niamatpur Upazila, Naogaon District, Rajshahi Division, Bangladesh',
    addressBn: 'নিদপুর, নিয়ামতপুর উপজেলা, নওগাঁ জেলা, রাজশাহী বিভাগ, বাংলাদেশ',
    education: [
      {
        year: '2025',
        title: 'SSC (Secondary School Certificate)',
        titleBn: 'এসএসসি (মাধ্যমিক)',
        place: 'Alil Al Islami Academy & College',
        placeBn: 'আলিল আল ইসলামি একাডেমি অ্যান্ড কলেজ',
      },
    ],
    expertise: ['Computer Engineering', 'UI/UX Design', 'Product Strategy', 'Frontend Development', 'Brand Design'],
    expertiseBn: ['কম্পিউটার ইঞ্জিনিয়ারিং', 'UI/UX ডিজাইন', 'প্রোডাক্ট স্ট্র্যাটেজি', 'ফ্রন্টএন্ড ডেভেলপমেন্ট', 'ব্র্যান্ড ডিজাইন'],
    story:
      'AR. Arafat Rahman co-founded Upnex It to craft beautiful, user-friendly digital products. His expertise in computer engineering and design ensures every Upnex It product is both technically robust and a delight to use.',
    storyBn:
      'এ.আর. আরাফাত রহমান আপনেক্স আইটি সহ-প্রতিষ্ঠা করেছেন সুন্দর ও ব্যবহারবান্ধব ডিজিটাল পণ্য তৈরির জন্য। তাঁর কম্পিউটার ইঞ্জিনিয়ারিং ও ডিজাইন দক্ষতা প্রতিটি প্রোডাক্টকে শক্তিশালী ও ব্যবহারে আনন্দদায়ক করে তোলে।',
  },
};

const FounderProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const founder = slug ? FOUNDERS[slug] : undefined;

  if (!founder) return <Navigate to="/about" replace />;

  const isBn = lang === 'bn';
  const name = isBn ? founder.nameBn : founder.name;
  const role = isBn ? founder.roleBn : founder.role;
  const bio = isBn ? founder.shortBioBn : founder.shortBio;
  const address = isBn ? founder.addressBn : founder.address;
  const story = isBn ? founder.storyBn : founder.story;
  const expertise = isBn ? founder.expertiseBn : founder.expertise;

  // JSON-LD Person schema for SEO
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: founder.name,
    alternateName: [founder.nameBn, founder.name.replace(/\./g, ''), founder.name.split(' ').slice(-2).join(' ')],
    jobTitle: founder.role,
    image: founder.image,
    url: `https://upnexit.pro.bd/about/${founder.slug}`,
    worksFor: {
      '@type': 'Organization',
      name: 'Upnex It',
      url: 'https://upnexit.pro.bd',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Niamatpur',
      addressRegion: 'Naogaon, Rajshahi',
      addressCountry: 'BD',
      streetAddress: 'Nidpur, Niamatpur Upazila',
    },
    alumniOf: founder.education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.place,
    })),
    knowsAbout: founder.expertise,
    nationality: 'Bangladeshi',
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title={`${founder.name} - ${founder.role} | Upnex It`}
        description={`${founder.name} (${founder.nameBn}) — ${founder.role}. ${founder.shortBio}`}
        canonical={`https://upnexit.pro.bd/about/${founder.slug}`}
        ogImage={founder.image}
        type="profile"
        keywords={`${founder.name}, ${founder.nameBn}, ${founder.role}, Upnex It founder, Upnex It CEO, Upnex It director, Naogaon software developer, Niamatpur IT expert, ${founder.name.toLowerCase()}, ${founder.name.replace(/[.,]/g, '')}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, hsl(145 63% 96%) 0%, hsl(0 0% 100%) 35%, hsl(46 80% 96%) 75%, hsl(145 45% 94%) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(145 63% 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(145 63% 32%) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {isBn ? 'About-এ ফিরে যান' : 'Back to About'}
          </Link>

          <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr] gap-6 md:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto md:mx-0"
            >
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl opacity-50" />
              <div className="relative aspect-square w-56 sm:w-64 md:w-full max-w-[340px] rounded-3xl overflow-hidden border-4 border-background shadow-elevated">
                <img
                  src={founder.image}
                  alt={`${founder.name} - ${founder.role} of Upnex It, based in Niamatpur, Naogaon, Bangladesh`}
                  title={`${founder.name} - ${founder.role}`}
                  loading="eager"
                  width={340}
                  height={340}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-glow">
                ✓ {isBn ? 'যাচাইকৃত' : 'Verified'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" /> {isBn ? 'প্রতিষ্ঠাতা প্রোফাইল' : 'Founder Profile'}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-3">
                {name}
              </h1>
              <p className="text-base md:text-lg font-semibold text-primary mb-4">{role}</p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                {bio}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> {isBn ? 'নিয়ামতপুর, নওগাঁ' : 'Niamatpur, Naogaon'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" /> SSC 2025
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground">
                  <Briefcase className="h-3.5 w-3.5 text-primary" /> Upnex It
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detail grid */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-2xl border border-border p-5 md:p-6 hover:shadow-elevated hover:border-primary/20 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">{isBn ? 'ঠিকানা' : 'Address'}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{address}</p>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-background rounded-2xl border border-border p-5 md:p-6 hover:shadow-elevated hover:border-primary/20 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-3">{isBn ? 'শিক্ষাগত যোগ্যতা' : 'Education'}</h3>
              <ul className="space-y-3">
                {founder.education.map((e, i) => (
                  <li key={i} className="border-l-2 border-primary/30 pl-3">
                    <p className="text-xs font-bold text-primary flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {e.year}
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{isBn ? e.titleBn : e.title}</p>
                    <p className="text-xs text-muted-foreground">{isBn ? e.placeBn : e.place}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-background rounded-2xl border border-border p-5 md:p-6 hover:shadow-elevated hover:border-primary/20 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">{isBn ? 'বর্তমান ভূমিকা' : 'Current Role'}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{role}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {isBn ? 'কোম্পানি: ' : 'Company: '}
                <Link to="/" className="text-primary font-semibold hover:underline">Upnex It</Link>
              </p>
            </motion.div>
          </div>

          {/* Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 bg-background rounded-2xl border border-border p-5 md:p-7"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base md:text-lg">{isBn ? 'দক্ষতা ও অভিজ্ঞতা' : 'Expertise'}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {expertise.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-primary/8 text-primary border border-primary/15 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 rounded-2xl p-6 md:p-8 border border-primary/15"
            style={{ background: 'linear-gradient(135deg, hsl(145 63% 32% / 0.04), hsl(46 92% 55% / 0.04))' }}
          >
            <h3 className="font-bold text-foreground text-lg md:text-xl mb-3">
              {isBn ? 'যাত্রার গল্প' : 'The Journey'}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{story}</p>
          </motion.div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/contact">
              <Button size="lg" className="gap-2 rounded-xl">
                <Mail className="h-4 w-4" /> {isBn ? 'যোগাযোগ করুন' : 'Get in Touch'}
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="gap-2 rounded-xl">
                {isBn ? 'কোম্পানি সম্পর্কে' : 'About Company'}
              </Button>
            </Link>
            {Object.values(FOUNDERS)
              .filter((f) => f.slug !== founder.slug)
              .map((f) => (
                <Link key={f.slug} to={`/about/${f.slug}`}>
                  <Button size="lg" variant="ghost" className="gap-2 rounded-xl">
                    {isBn ? 'দেখুন: ' : 'Meet '} {isBn ? f.nameBn : f.name}
                  </Button>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <InternalLinks exclude="/about" />
      <Footer />
    </div>
  );
};

export default FounderProfile;
