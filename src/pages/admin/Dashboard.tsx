import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users, MessageSquare, Eye, Globe, TrendingUp, BarChart3, Activity, ArrowUpRight, Search, X, MapPin } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useMemo, useState, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const bdDistrictGeoUrl = "/bd-districts.json";

const countryNames: Record<string, string> = {
  BD: 'Bangladesh', US: 'United States', IN: 'India', GB: 'United Kingdom', CA: 'Canada',
  AU: 'Australia', DE: 'Germany', FR: 'France', JP: 'Japan', CN: 'China', BR: 'Brazil',
  SA: 'Saudi Arabia', AE: 'UAE', PK: 'Pakistan', NP: 'Nepal', MY: 'Malaysia', SG: 'Singapore',
  KR: 'South Korea', IT: 'Italy', ES: 'Spain', NL: 'Netherlands', SE: 'Sweden', QA: 'Qatar',
  KW: 'Kuwait', OM: 'Oman', BH: 'Bahrain',
};

const alpha2ToNumeric: Record<string, string> = {
  BD: '050', US: '840', IN: '356', GB: '826', CA: '124', AU: '036', DE: '276', FR: '250',
  JP: '392', CN: '156', BR: '076', SA: '682', AE: '784', PK: '586', NP: '524', MY: '458',
  SG: '702', KR: '410', IT: '380', ES: '724', NL: '528', SE: '752', QA: '634', KW: '414',
  OM: '512', BH: '048', RU: '643', MX: '484', EG: '818', TR: '792', TH: '764', ID: '360',
  PH: '608', VN: '704', NG: '566', ZA: '710', KE: '404', GH: '288', ET: '231',
};

// Country centers for zoom [lng, lat, zoom]
const countryFocus: Record<string, { center: [number, number]; zoom: number }> = {
  BD: { center: [90.35, 23.7], zoom: 18 },
  US: { center: [-97, 38], zoom: 3.5 },
  IN: { center: [79, 22], zoom: 5 },
  GB: { center: [-2, 54], zoom: 12 },
  CA: { center: [-96, 56], zoom: 2.5 },
  AU: { center: [134, -25], zoom: 3.5 },
  DE: { center: [10, 51], zoom: 12 },
  FR: { center: [2.5, 46.5], zoom: 10 },
  JP: { center: [138, 36], zoom: 8 },
  CN: { center: [104, 35], zoom: 3.5 },
  BR: { center: [-52, -14], zoom: 3 },
  SA: { center: [45, 24], zoom: 7 },
  AE: { center: [54, 24], zoom: 14 },
  PK: { center: [69, 30], zoom: 7 },
  NP: { center: [84, 28], zoom: 14 },
  MY: { center: [109, 4], zoom: 7 },
  SG: { center: [103.8, 1.35], zoom: 60 },
  KR: { center: [127.5, 36], zoom: 14 },
  IT: { center: [12.5, 42], zoom: 8 },
  ES: { center: [-3.7, 40], zoom: 8 },
  RU: { center: [90, 60], zoom: 2 },
  MX: { center: [-102, 23], zoom: 4 },
  EG: { center: [30, 27], zoom: 8 },
  TR: { center: [35, 39], zoom: 7 },
  TH: { center: [101, 13], zoom: 8 },
  ID: { center: [118, -2], zoom: 3.5 },
};

const PIE_COLORS = ['hsl(145,63%,38%)', 'hsl(200,70%,50%)', 'hsl(46,92%,55%)', 'hsl(340,60%,55%)', 'hsl(270,50%,55%)', 'hsl(20,75%,55%)'];

const Dashboard = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: teamCount } = useQuery({
    queryKey: ['team-count'],
    queryFn: async () => {
      const { count } = await supabase.from('team_members').select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  const { data: unreadCount } = useQuery({
    queryKey: ['unread-count'],
    queryFn: async () => {
      const { count } = await supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false);
      return count ?? 0;
    },
  });

  const { data: pageViews = [] } = useQuery({
    queryKey: ['page-views'],
    queryFn: async () => {
      const { data, error } = await supabase.from('page_views').select('*').order('created_at', { ascending: false }).limit(1000);
      if (error) throw error;
      return data;
    },
  });

  const todayViews = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return pageViews.filter(v => v.created_at?.startsWith(today)).length;
  }, [pageViews]);

  const uniqueVisitors = useMemo(() => new Set(pageViews.map(v => v.visitor_id).filter(Boolean)).size, [pageViews]);

  const dailyChartData = useMemo(() => {
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      days[d.toISOString().split('T')[0]] = 0;
    }
    pageViews.forEach(v => { const day = v.created_at?.split('T')[0]; if (day && days[day] !== undefined) days[day]++; });
    return Object.entries(days).map(([date, views]) => ({ date: new Date(date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' }), views }));
  }, [pageViews]);

  const countryData = useMemo(() => {
    const counts: Record<string, { code: string; name: string; count: number }> = {};
    pageViews.forEach(v => {
      const code = v.country_code || 'XX';
      if (!counts[code]) counts[code] = { code, name: v.country || countryNames[code] || code, count: 0 };
      counts[code].count++;
    });
    return Object.values(counts).sort((a, b) => b.count - a.count);
  }, [pageViews]);

  const countryNumericSet = useMemo(() => {
    const map: Record<string, number> = {};
    countryData.forEach(c => { const num = alpha2ToNumeric[c.code]; if (num) map[num] = c.count; });
    return map;
  }, [countryData]);

  // City/district data for selected country
  const cityData = useMemo(() => {
    if (!selectedCountry) return [];
    const counts: Record<string, number> = {};
    pageViews.forEach(v => {
      if (v.country_code === selectedCountry && v.city) {
        counts[v.city] = (counts[v.city] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([city, count]) => ({ city, count })).sort((a, b) => b.count - a.count);
  }, [pageViews, selectedCountry]);

  // City set for BD district coloring
  const bdCitySet = useMemo(() => {
    const map: Record<string, number> = {};
    pageViews.forEach(v => {
      if (v.country_code === 'BD' && v.city) {
        const c = v.city.toLowerCase();
        map[c] = (map[c] || 0) + 1;
      }
    });
    return map;
  }, [pageViews]);

  const pageData = useMemo(() => {
    const counts: Record<string, number> = {};
    pageViews.forEach(v => { const p = v.page_path || '/'; counts[p] = (counts[p] || 0) + 1; });
    return Object.entries(counts).map(([page, count]) => ({ page, count })).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [pageViews]);

  // Filtered countries for search
  const allCountries = useMemo(() => {
    const set = new Set<string>();
    pageViews.forEach(v => { if (v.country_code) set.add(v.country_code); });
    // Also include common countries
    Object.keys(countryNames).forEach(c => set.add(c));
    return Array.from(set).map(code => ({ code, name: countryNames[code] || code })).sort((a, b) => a.name.localeCompare(b.name));
  }, [pageViews]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return allCountries;
    const q = searchQuery.toLowerCase();
    return allCountries.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [allCountries, searchQuery]);

  const cards = [
    { label: 'আজকের ভিজিটর', value: todayViews, icon: Eye, accent: 'hsl(145,63%,38%)', bg: 'hsl(145,50%,96%)' },
    { label: 'মোট ভিজিটর', value: uniqueVisitors, icon: TrendingUp, accent: 'hsl(200,70%,50%)', bg: 'hsl(200,60%,96%)' },
    { label: 'টিম সদস্য', value: teamCount ?? 0, icon: Users, accent: 'hsl(46,92%,50%)', bg: 'hsl(46,80%,95%)' },
    { label: 'অপঠিত মেসেজ', value: unreadCount ?? 0, icon: MessageSquare, accent: 'hsl(0,70%,58%)', bg: 'hsl(0,60%,96%)' },
  ];

  const getColor = (count: number) => {
    if (count === 0) return 'hsl(220,12%,92%)';
    if (count < 5) return 'hsl(145,50%,72%)';
    if (count < 20) return 'hsl(145,58%,50%)';
    if (count < 50) return 'hsl(145,62%,38%)';
    return 'hsl(145,68%,26%)';
  };




  const mapCenter: [number, number] = selectedCountry && countryFocus[selectedCountry]
    ? countryFocus[selectedCountry].center
    : [0, 20];
  const mapZoom = selectedCountry && countryFocus[selectedCountry]
    ? countryFocus[selectedCountry].zoom
    : 1;

  const handleTooltip = useCallback((name: string, count: number) => {
    setTooltipContent(`${name}: ${count} ভিজিট`);
  }, []);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">ড্যাশবোর্ড</h1>
          <p className="text-xs text-muted-foreground mt-0.5">সামগ্রিক পরিসংখ্যান ও বিশ্লেষণ</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60">
          <Activity className="h-3 w-3 text-emerald-500" />
          <span className="text-[11px] font-medium text-emerald-600">Live</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-2xl border border-[hsl(220,14%,92%)] p-4 md:p-5 hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                <card.icon className="h-4 w-4" style={{ color: card.accent }} />
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{card.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Traffic Chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-2xl border border-[hsl(220,14%,92%)] p-5 md:p-6 hover:shadow-sm transition-shadow"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-sm">সাপ্তাহিক ট্রাফিক</h2>
              <p className="text-[10px] text-muted-foreground">গত ৭ দিনের ভিজিটর</p>
            </div>
          </div>
        </div>
        <div className="h-52 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyChartData}>
              <defs>
                <linearGradient id="colorViews2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(145,63%,38%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(145,63%,38%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(220,10%,55%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(220,10%,55%)' }} axisLine={false} tickLine={false} allowDecimals={false} width={30} />
              <Tooltip
                contentStyle={{ background: 'white', border: '1px solid hsl(220,14%,90%)', borderRadius: '10px', fontSize: '12px', boxShadow: '0 4px 12px hsla(220,10%,10%,0.08)' }}
                formatter={(value: number) => [`${value} ভিজিট`, 'ট্রাফিক']}
              />
              <Area type="monotone" dataKey="views" stroke="hsl(145,63%,38%)" fill="url(#colorViews2)" strokeWidth={2} dot={{ r: 3.5, fill: 'hsl(145,63%,38%)', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 5, strokeWidth: 2, stroke: 'white' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* World Map + Country/City Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-[hsl(220,14%,92%)] overflow-hidden hover:shadow-sm transition-shadow"
        >
          {/* Map Header with Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 pb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Globe className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-sm">
                  {selectedCountry ? `${countryNames[selectedCountry] || selectedCountry} ম্যাপ` : 'বিশ্ব ট্রাফিক ম্যাপ'}
                </h2>
                <p className="text-[10px] text-muted-foreground">
                  {selectedCountry ? 'জেলা/শহর অনুযায়ী ভিজিটর' : 'দেশ অনুযায়ী ভিজিটর বিতরণ'}
                </p>
              </div>
            </div>

            {/* Country Search/Select */}
            <div className="relative">
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="দেশ খুঁজুন..."
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                    onFocus={() => setShowDropdown(true)}
                    className="pl-8 pr-3 py-2 text-xs rounded-xl border border-[hsl(220,14%,90%)] bg-[hsl(220,14%,97%)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 w-44 transition-all"
                  />
                </div>
                {selectedCountry && (
                  <button
                    onClick={() => { setSelectedCountry(null); setSearchQuery(''); }}
                    className="p-2 rounded-xl border border-[hsl(220,14%,90%)] bg-[hsl(220,14%,97%)] hover:bg-red-50 hover:border-red-200 transition-colors"
                    title="বিশ্ব ম্যাপে ফিরুন"
                  >
                    <X className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Dropdown */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 top-full mt-1 w-52 max-h-56 overflow-y-auto bg-white border border-[hsl(220,14%,90%)] rounded-xl shadow-lg z-50"
                  >
                    {/* World option */}
                    <button
                      onClick={() => { setSelectedCountry(null); setSearchQuery(''); setShowDropdown(false); }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-primary/5 transition-colors flex items-center gap-2 ${!selectedCountry ? 'bg-primary/5 text-primary font-semibold' : 'text-foreground'}`}
                    >
                      <Globe className="h-3.5 w-3.5" /> বিশ্ব ম্যাপ
                    </button>
                    <div className="border-t border-[hsl(220,14%,94%)]" />
                    {filteredCountries.map(c => {
                      const countForC = countryData.find(cd => cd.code === c.code)?.count || 0;
                      return (
                        <button
                          key={c.code}
                          onClick={() => { setSelectedCountry(c.code); setSearchQuery(''); setShowDropdown(false); }}
                          className={`w-full text-left px-3 py-2 text-xs hover:bg-primary/5 transition-colors flex items-center justify-between ${selectedCountry === c.code ? 'bg-primary/5 text-primary font-semibold' : 'text-foreground'}`}
                        >
                          <span>{c.name}</span>
                          {countForC > 0 && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-primary/10 text-primary">{countForC}</span>
                          )}
                        </button>
                      );
                    })}
                    {filteredCountries.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-3">কোনো দেশ পাওয়া যায়নি</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Map */}
          <div className="relative p-3 md:p-4" onClick={() => setShowDropdown(false)}>
            {/* Show BD district map when Bangladesh is selected */}
            {selectedCountry === 'BD' ? (
              <BdDistrictMap
                bdCitySet={bdCitySet}
                setTooltipContent={setTooltipContent}
                setTooltipPos={setTooltipPos}
              />
            ) : (
              <ComposableMap
                projectionConfig={{ scale: 147, center: selectedCountry ? mapCenter : [0, 20] as [number, number] }}
                style={{ width: '100%', height: 'auto' }}
              >
                <ZoomableGroup center={mapCenter} zoom={mapZoom} minZoom={0.8} maxZoom={50}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map(geo => {
                        const count = countryNumericSet[geo.id] || 0;
                        const isSelected = selectedCountry && alpha2ToNumeric[selectedCountry] === geo.id;
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={isSelected ? 'hsl(145,60%,42%)' : getColor(count)}
                            stroke="hsl(220,10%,75%)"
                            strokeWidth={isSelected ? 1.2 : 0.6}
                            style={{
                              default: { outline: 'none', transition: 'fill 0.2s' },
                              hover: { outline: 'none', fill: count > 0 ? 'hsl(145,63%,35%)' : 'hsl(220,12%,85%)', cursor: 'pointer', strokeWidth: 1, stroke: 'hsl(220,10%,65%)' },
                              pressed: { outline: 'none' },
                            }}
                            onMouseEnter={() => handleTooltip(geo.properties.name || 'Unknown', count)}
                            onMouseLeave={() => setTooltipContent('')}
                            onMouseMove={e => {
                              const rect = (e.target as SVGElement).closest('svg')?.getBoundingClientRect();
                              if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top - 40 });
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            )}

            {tooltipContent && (
              <div
                className="absolute pointer-events-none z-50 px-3 py-1.5 rounded-lg text-[11px] font-semibold shadow-lg whitespace-nowrap"
                style={{ left: tooltipPos.x, top: tooltipPos.y, transform: 'translateX(-50%)', background: 'hsl(220,20%,18%)', color: 'white' }}
              >
                {tooltipContent}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 px-5 pb-4 text-[10px] text-muted-foreground">
            {[
              { color: 'hsl(220,12%,92%)', label: '0' },
              { color: 'hsl(145,50%,72%)', label: '1-4' },
              { color: 'hsl(145,58%,50%)', label: '5-19' },
              { color: 'hsl(145,62%,38%)', label: '20-49' },
              { color: 'hsl(145,68%,26%)', label: '50+' },
            ].map((l, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded inline-block border border-[hsl(220,14%,88%)]" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Country List / City List */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl border border-[hsl(220,14%,92%)] p-5 hover:shadow-sm transition-shadow"
        >
          <h3 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            {selectedCountry ? (
              <>
                <MapPin className="h-4 w-4 text-primary" />
                {countryNames[selectedCountry] || selectedCountry} — জেলা/শহর
              </>
            ) : 'দেশভিত্তিক ট্রাফিক'}
          </h3>

          {selectedCountry ? (
            /* City/District list */
            cityData.length === 0 ? (
              <p className="text-muted-foreground text-xs text-center py-8">এই দেশ থেকে কোনো শহর/জেলার ডাটা নেই</p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {cityData.slice(0, 20).map((c, i) => {
                  const maxCount = cityData[0]?.count || 1;
                  const pct = Math.round((c.count / maxCount) * 100);
                  return (
                    <div key={c.city} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">{i + 1}</span>
                          <span className="font-medium text-foreground">{c.city}</span>
                        </div>
                        <span className="text-muted-foreground font-semibold">{c.count}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, delay: i * 0.04 }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* Country list */
            countryData.length === 0 ? (
              <p className="text-muted-foreground text-xs text-center py-8">এখনো কোনো ডাটা নেই</p>
            ) : (
              <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
                {countryData.slice(0, 15).map((c, i) => {
                  const maxCount = countryData[0]?.count || 1;
                  const pct = Math.round((c.count / maxCount) * 100);
                  return (
                    <button
                      key={c.code}
                      onClick={() => setSelectedCountry(c.code)}
                      className="w-full space-y-1.5 text-left hover:bg-primary/[0.03] rounded-lg p-1 -m-1 transition-colors"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-muted flex items-center justify-center text-[9px] font-bold text-muted-foreground">{i + 1}</span>
                          <span className="font-medium text-foreground">{c.name}</span>
                        </div>
                        <span className="text-muted-foreground font-semibold">{c.count}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, delay: i * 0.05 }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            )
          )}
        </motion.div>
      </div>

      {/* Page views + Pie chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-[hsl(220,14%,92%)] p-5 hover:shadow-sm transition-shadow"
        >
          <h3 className="font-semibold text-foreground text-sm mb-4">জনপ্রিয় পেজ</h3>
          <div className="space-y-2.5">
            {pageData.map((p, i) => (
              <div key={p.page} className="flex items-center justify-between p-3 rounded-xl bg-[hsl(220,14%,97%)] hover:bg-[hsl(220,14%,95%)] transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                  <span className="text-sm font-medium text-foreground">{p.page}</span>
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-white px-2.5 py-1 rounded-lg border border-[hsl(220,14%,92%)]">{p.count}</span>
              </div>
            ))}
            {pageData.length === 0 && <p className="text-muted-foreground text-xs text-center py-8">এখনো কোনো ডাটা নেই</p>}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white rounded-2xl border border-[hsl(220,14%,92%)] p-5 hover:shadow-sm transition-shadow"
        >
          <h3 className="font-semibold text-foreground text-sm mb-4">দেশভিত্তিক অনুপাত</h3>
          {countryData.length > 0 ? (
            <div className="h-52 md:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={countryData.slice(0, 6)}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="count"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    style={{ fontSize: '9px' }}
                    strokeWidth={2}
                    stroke="white"
                  >
                    {countryData.slice(0, 6).map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number, name: string) => [`${value} ভিজিট`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-muted-foreground text-xs text-center py-8">এখনো কোনো ডাটা নেই</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

/* Division color palette – matches reference image with bold, distinct colors */
const divisionColors: Record<string, string> = {
  'Barisal': 'hsl(168,55%,48%)',
  'Chittagong': 'hsl(24,78%,58%)',
  'Dhaka': 'hsl(200,65%,52%)',
  'Khulna': 'hsl(145,55%,45%)',
  'Mymensingh': 'hsl(280,45%,58%)',
  'Rajshahi': 'hsl(46,80%,55%)',
  'Rangpur': 'hsl(340,55%,55%)',
  'Sylhet': 'hsl(95,45%,50%)',
};

/* ──── Bangladesh District Map Component ──── */
const BdDistrictMap = ({
  bdCitySet,
  setTooltipContent,
  setTooltipPos,
}: {
  bdCitySet: Record<string, number>;
  setTooltipContent: (s: string) => void;
  setTooltipPos: (p: { x: number; y: number }) => void;
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<{
    name: string;
    division: string;
    count: number;
    geo: any;
  } | null>(null);

  const getDistrictFill = (districtName: string, divisionName: string, isSelected: boolean) => {
    if (isSelected) return 'hsl(200,70%,50%)';
    const n = districtName.toLowerCase();
    const count = bdCitySet[n] || 0;
    const baseColor = divisionColors[divisionName] || 'hsl(220,12%,85%)';
    if (count > 0) {
      if (count < 3) return 'hsl(145,55%,55%)';
      if (count < 10) return 'hsl(145,62%,42%)';
      if (count < 25) return 'hsl(145,68%,32%)';
      return 'hsl(145,72%,22%)';
    }
    return baseColor;
  };

  // Upazilas data per district (key districts with known upazilas)
  const districtUpazilas: Record<string, string[]> = {
    'dhaka': ['ধানমন্ডি', 'গুলশান', 'মিরপুর', 'মোহাম্মদপুর', 'উত্তরা', 'সাভার', 'দোহার', 'নবাবগঞ্জ', 'কেরানীগঞ্জ'],
    'chittagong': ['পটিয়া', 'সীতাকুণ্ড', 'মিরসরাই', 'হাটহাজারী', 'সন্দ্বীপ', 'আনোয়ারা', 'বাঁশখালী', 'চন্দনাইশ', 'রাঙ্গুনিয়া'],
    'sylhet': ['বিয়ানীবাজার', 'গোলাপগঞ্জ', 'জৈন্তাপুর', 'কানাইঘাট', 'কোম্পানীগঞ্জ', 'দক্ষিণ সুরমা', 'বালাগঞ্জ'],
    'rajshahi': ['পবা', 'বাগমারা', 'চারঘাট', 'দুর্গাপুর', 'গোদাগাড়ী', 'মোহনপুর', 'পুঠিয়া', 'তানোর'],
    'khulna': ['দাকোপ', 'ডুমুরিয়া', 'কয়রা', 'পাইকগাছা', 'ফুলতলা', 'তেরখাদা', 'দিঘলিয়া', 'বটিয়াঘাটা'],
    'barisal': ['বাকেরগঞ্জ', 'বাবুগঞ্জ', 'বানারীপাড়া', 'গৌরনদী', 'আগৈলঝাড়া', 'মুলাদী', 'মেহেন্দিগঞ্জ', 'হিজলা', 'উজিরপুর'],
    'rangpur': ['পীরগঞ্জ', 'গঙ্গাচড়া', 'তারাগঞ্জ', 'কাউনিয়া', 'বদরগঞ্জ', 'মিঠাপুকুর', 'পীরগাছা'],
    'mymensingh': ['ত্রিশাল', 'ভালুকা', 'ফুলপুর', 'হালুয়াঘাট', 'ঈশ্বরগঞ্জ', 'গফরগাঁও', 'নান্দাইল', 'ধোবাউড়া'],
    'comilla': ['দেবীদ্বার', 'বরুড়া', 'চান্দিনা', 'চৌদ্দগ্রাম', 'দাউদকান্দি', 'হোমনা', 'লাকসাম', 'মুরাদনগর', 'নাঙ্গলকোট'],
    'gazipur': ['কালীগঞ্জ', 'কালিয়াকৈর', 'কাপাসিয়া', 'শ্রীপুর', 'টঙ্গী'],
    'narayanganj': ['আড়াইহাজার', 'বন্দর', 'রূপগঞ্জ', 'সোনারগাঁও'],
    'cox\'s bazar': ['চকরিয়া', 'কুতুবদিয়া', 'মহেশখালী', 'পেকুয়া', 'রামু', 'টেকনাফ', 'উখিয়া'],
    'jessore': ['অভয়নগর', 'বাঘারপাড়া', 'চৌগাছা', 'ঝিকরগাছা', 'কেশবপুর', 'মণিরামপুর', 'শার্শা'],
    'bogra': ['আদমদিঘী', 'ধুনট', 'দুপচাঁচিয়া', 'গাবতলী', 'কাহালু', 'নন্দীগ্রাম', 'শাজাহানপুর', 'শেরপুর', 'শিবগঞ্জ', 'সোনাতলা', 'সারিয়াকান্দি'],
    'tangail': ['বাসাইল', 'ভূঞাপুর', 'দেলদুয়ার', 'ঘাটাইল', 'গোপালপুর', 'কালিহাতী', 'মধুপুর', 'মির্জাপুর', 'নাগরপুর', 'সখিপুর', 'ধনবাড়ী'],
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-0">
        {/* Left: Main BD Map */}
        <div className={`transition-all duration-300 ${selectedDistrict ? 'w-[58%]' : 'w-full'} flex justify-center`}>
          <ComposableMap
            projectionConfig={{ scale: 4800, center: [90.35, 23.7] }}
            style={{ width: '100%', height: 'auto', maxHeight: '440px' }}
            width={500}
            height={600}
          >
            <Geographies geography={bdDistrictGeoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const districtName = geo.properties?.NAME_2 || '';
                  const divisionName = geo.properties?.NAME_1 || '';
                  const count = bdCitySet[districtName.toLowerCase()] || 0;
                  const isSelected = selectedDistrict?.name === districtName;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getDistrictFill(districtName, divisionName, isSelected)}
                      stroke="hsl(220,20%,40%)"
                      strokeWidth={isSelected ? 1.2 : 0.5}
                      style={{
                        default: { outline: 'none', transition: 'fill 0.25s ease' },
                        hover: { outline: 'none', fill: 'hsl(200,65%,55%)', cursor: 'pointer', strokeWidth: 0.8, stroke: 'hsl(220,20%,30%)' },
                        pressed: { outline: 'none' },
                      }}
                      onClick={() => setSelectedDistrict({ name: districtName, division: divisionName, count, geo })}
                      onMouseEnter={() => setTooltipContent(`${districtName} (${divisionName}): ${count} ভিজিট`)}
                      onMouseLeave={() => setTooltipContent('')}
                      onMouseMove={e => {
                        const rect = (e.target as SVGElement).closest('svg')?.getBoundingClientRect();
                        if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top - 40 });
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Right: Selected District Detail */}
        <AnimatePresence>
          {selectedDistrict && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '42%' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-l border-[hsl(220,14%,90%)]"
            >
              <div className="p-3 h-full flex flex-col">
                {/* District Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{selectedDistrict.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{selectedDistrict.division} বিভাগ</p>
                  </div>
                  <button
                    onClick={() => setSelectedDistrict(null)}
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <X className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>

                {/* Zoomed District Map */}
                <div className="bg-[hsl(220,14%,97%)] rounded-xl border border-[hsl(220,14%,90%)] overflow-hidden mb-3">
                  <ComposableMap
                    projectionConfig={{
                      scale: 28000,
                      center: selectedDistrict.geo?.geometry
                        ? getGeoCentroid(selectedDistrict.geo.geometry)
                        : [90.35, 23.7],
                    }}
                    style={{ width: '100%', height: 'auto' }}
                    width={300}
                    height={260}
                  >
                    <Geographies geography={bdDistrictGeoUrl}>
                      {({ geographies }) =>
                        geographies
                          .filter(geo => geo.properties?.NAME_2 === selectedDistrict.name)
                          .map(geo => (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={divisionColors[selectedDistrict.division] || 'hsl(200,60%,55%)'}
                              stroke="hsl(220,20%,35%)"
                              strokeWidth={1}
                              style={{
                                default: { outline: 'none' },
                                hover: { outline: 'none' },
                                pressed: { outline: 'none' },
                              }}
                            />
                          ))
                      }
                    </Geographies>
                  </ComposableMap>
                </div>

                {/* District Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-primary/5 rounded-lg p-2.5 text-center">
                    <p className="text-lg font-bold text-primary">{selectedDistrict.count}</p>
                    <p className="text-[9px] text-muted-foreground font-medium">মোট ভিজিটর</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2.5 text-center">
                    <p className="text-lg font-bold text-blue-600">
                      {districtUpazilas[selectedDistrict.name.toLowerCase()]?.length || '—'}
                    </p>
                    <p className="text-[9px] text-muted-foreground font-medium">উপজেলা</p>
                  </div>
                </div>

                {/* Upazilas List */}
                <div className="flex-1 overflow-y-auto">
                  <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wider">উপজেলাসমূহ</p>
                  {districtUpazilas[selectedDistrict.name.toLowerCase()] ? (
                    <div className="space-y-1">
                      {districtUpazilas[selectedDistrict.name.toLowerCase()]!.map((upazila, i) => (
                        <motion.div
                          key={upazila}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-[hsl(220,14%,92%)] hover:border-primary/30 transition-colors text-xs"
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: divisionColors[selectedDistrict.division] || 'hsl(200,60%,55%)' }} />
                          <span className="text-foreground font-medium">{upazila}</span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-muted-foreground text-center py-4">উপজেলার তথ্য শীঘ্রই আসছে</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Division Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-2 px-4 pb-2 text-[10px] text-muted-foreground">
        {Object.entries(divisionColors).map(([division, color]) => (
          <span key={division} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block border border-black/10" style={{ background: color }} />
            {division}
          </span>
        ))}
      </div>
    </div>
  );
};

/* Helper: compute centroid of a GeoJSON geometry */
function getGeoCentroid(geometry: any): [number, number] {
  try {
    const coords: number[][] = [];
    const extract = (c: any) => {
      if (typeof c[0] === 'number') coords.push(c);
      else c.forEach(extract);
    };
    extract(geometry.coordinates);
    if (coords.length === 0) return [90.35, 23.7];
    const lng = coords.reduce((s, c) => s + c[0], 0) / coords.length;
    const lat = coords.reduce((s, c) => s + c[1], 0) / coords.length;
    return [lng, lat];
  } catch {
    return [90.35, 23.7];
  }
}

export default Dashboard;
