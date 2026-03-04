import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users, MessageSquare, Wrench, Eye, Globe, TrendingUp, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { motion } from 'framer-motion';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Country code to name map for tooltip
const countryNames: Record<string, string> = {
  BD: 'Bangladesh', US: 'United States', IN: 'India', GB: 'United Kingdom', CA: 'Canada',
  AU: 'Australia', DE: 'Germany', FR: 'France', JP: 'Japan', CN: 'China', BR: 'Brazil',
  SA: 'Saudi Arabia', AE: 'UAE', PK: 'Pakistan', NP: 'Nepal', MY: 'Malaysia', SG: 'Singapore',
  KR: 'South Korea', IT: 'Italy', ES: 'Spain', NL: 'Netherlands', SE: 'Sweden', QA: 'Qatar',
  KW: 'Kuwait', OM: 'Oman', BH: 'Bahrain',
};

// ISO Alpha-2 to ISO Numeric mapping for matching topojson
const alpha2ToNumeric: Record<string, string> = {
  BD: '050', US: '840', IN: '356', GB: '826', CA: '124', AU: '036', DE: '276', FR: '250',
  JP: '392', CN: '156', BR: '076', SA: '682', AE: '784', PK: '586', NP: '524', MY: '458',
  SG: '702', KR: '410', IT: '380', ES: '724', NL: '528', SE: '752', QA: '634', KW: '414',
  OM: '512', BH: '048', RU: '643', MX: '484', EG: '818', TR: '792', TH: '764', ID: '360',
  PH: '608', VN: '704', NG: '566', ZA: '710', KE: '404', GH: '288', ET: '231',
};

const COLORS = [
  'hsl(145, 63%, 32%)', 'hsl(46, 92%, 55%)', 'hsl(200, 70%, 50%)',
  'hsl(340, 65%, 55%)', 'hsl(270, 55%, 55%)', 'hsl(20, 80%, 55%)',
];

const Dashboard = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const { data: teamCount } = useQuery({
    queryKey: ['team-count'],
    queryFn: async () => {
      const { count } = await supabase.from('team_members').select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  const { data: msgCount } = useQuery({
    queryKey: ['msg-count'],
    queryFn: async () => {
      const { count } = await supabase.from('messages').select('*', { count: 'exact', head: true });
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

  const { data: serviceCount } = useQuery({
    queryKey: ['service-count'],
    queryFn: async () => {
      const { count } = await supabase.from('services').select('*', { count: 'exact', head: true });
      return count ?? 0;
    },
  });

  // Fetch page views
  const { data: pageViews = [] } = useQuery({
    queryKey: ['page-views'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_views')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);
      if (error) throw error;
      return data;
    },
  });

  // Total visitors today
  const todayViews = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return pageViews.filter(v => v.created_at?.startsWith(today)).length;
  }, [pageViews]);

  // Unique visitors (by visitor_id)
  const uniqueVisitors = useMemo(() => {
    return new Set(pageViews.map(v => v.visitor_id).filter(Boolean)).size;
  }, [pageViews]);

  // Daily chart data (last 7 days)
  const dailyChartData = useMemo(() => {
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      days[key] = 0;
    }
    pageViews.forEach(v => {
      const day = v.created_at?.split('T')[0];
      if (day && days[day] !== undefined) days[day]++;
    });
    return Object.entries(days).map(([date, views]) => ({
      date: new Date(date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' }),
      views,
    }));
  }, [pageViews]);

  // Country data
  const countryData = useMemo(() => {
    const counts: Record<string, { code: string; name: string; count: number }> = {};
    pageViews.forEach(v => {
      const code = v.country_code || 'XX';
      if (!counts[code]) {
        counts[code] = { code, name: v.country || countryNames[code] || code, count: 0 };
      }
      counts[code].count++;
    });
    return Object.values(counts).sort((a, b) => b.count - a.count);
  }, [pageViews]);

  // Set of country numeric IDs with traffic
  const countryNumericSet = useMemo(() => {
    const map: Record<string, number> = {};
    countryData.forEach(c => {
      const num = alpha2ToNumeric[c.code];
      if (num) map[num] = c.count;
    });
    return map;
  }, [countryData]);

  // Page-wise data
  const pageData = useMemo(() => {
    const counts: Record<string, number> = {};
    pageViews.forEach(v => {
      const p = v.page_path || '/';
      counts[p] = (counts[p] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [pageViews]);

  const cards = [
    { label: 'আজকের ভিজিটর', value: todayViews, icon: Eye, color: 'bg-primary/10 text-primary' },
    { label: 'মোট ভিজিটর', value: uniqueVisitors, icon: TrendingUp, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'টিম সদস্য', value: teamCount ?? 0, icon: Users, color: 'bg-secondary/10 text-secondary' },
    { label: 'অপঠিত মেসেজ', value: unreadCount ?? 0, icon: MessageSquare, color: 'bg-destructive/10 text-destructive' },
  ];

  const getColor = (count: number) => {
    if (count === 0) return 'hsl(150, 10%, 18%)';
    if (count < 5) return 'hsl(145, 63%, 28%)';
    if (count < 20) return 'hsl(145, 63%, 42%)';
    if (count < 50) return 'hsl(145, 63%, 55%)';
    return 'hsl(46, 92%, 55%)';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">ড্যাশবোর্ড</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-background rounded-2xl border border-border p-4 md:p-5 shadow-sm"
          >
            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${card.color} flex items-center justify-center mb-2 md:mb-3`}>
              <card.icon className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Traffic Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-background rounded-2xl border border-border p-4 md:p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="font-bold text-foreground text-sm md:text-base">সাপ্তাহিক ট্রাফিক</h2>
        </div>
        <div className="h-48 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyChartData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(145, 63%, 32%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(145, 63%, 32%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(150, 8%, 45%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(150, 8%, 45%)' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(140, 8%, 90%)',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [`${value} ভিজিট`, 'ট্রাফিক']}
              />
              <Area type="monotone" dataKey="views" stroke="hsl(145, 63%, 32%)" fill="url(#colorViews)" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(145, 63%, 32%)' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* World Map + Country Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-2xl border border-border shadow-sm relative overflow-hidden"
          style={{ background: 'hsl(220, 15%, 8%)' }}
        >
          <div className="flex items-center gap-2 p-4 md:p-6 pb-0">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-white text-sm md:text-base">বিশ্ব ট্রাফিক ম্যাপ</h2>
          </div>
          <div className="relative p-2 md:p-4">
            <ComposableMap
              projectionConfig={{ scale: 147, center: [0, 20] }}
              style={{ width: '100%', height: 'auto' }}
            >
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const numId = geo.id;
                      const count = countryNumericSet[numId] || 0;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getColor(count)}
                          stroke="hsl(220, 10%, 25%)"
                          strokeWidth={0.4}
                          style={{
                            default: { outline: 'none' },
                            hover: {
                              outline: 'none',
                              fill: count > 0 ? 'hsl(46, 92%, 55%)' : 'hsl(220, 10%, 30%)',
                              cursor: 'pointer',
                              strokeWidth: 0.8,
                              stroke: 'hsl(0, 0%, 50%)',
                            },
                            pressed: { outline: 'none' },
                          }}
                          onMouseEnter={() => {
                            const name = geo.properties.name || 'Unknown';
                            setTooltipContent(`${name}: ${count} ভিজিট`);
                          }}
                          onMouseLeave={() => setTooltipContent('')}
                          onMouseMove={(e) => {
                            const rect = (e.target as SVGElement).closest('svg')?.getBoundingClientRect();
                            if (rect) {
                              setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top - 40 });
                            }
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
            {tooltipContent && (
              <div
                className="absolute pointer-events-none z-50 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg whitespace-nowrap"
                style={{
                  left: tooltipPos.x,
                  top: tooltipPos.y,
                  transform: 'translateX(-50%)',
                  background: 'hsl(145, 63%, 32%)',
                  color: 'white',
                  border: '1px solid hsl(145, 63%, 45%)',
                }}
              >
                {tooltipContent}
              </div>
            )}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 px-4 md:px-6 pb-4 text-[10px] md:text-xs" style={{ color: 'hsl(220, 10%, 55%)' }}>
            {[
              { color: 'hsl(150, 10%, 18%)', label: '0' },
              { color: 'hsl(145, 63%, 28%)', label: '1-4' },
              { color: 'hsl(145, 63%, 42%)', label: '5-19' },
              { color: 'hsl(145, 63%, 55%)', label: '20-49' },
              { color: 'hsl(46, 92%, 55%)', label: '50+' },
            ].map((l, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Country List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-background rounded-2xl border border-border p-4 md:p-6 shadow-sm"
        >
          <h3 className="font-bold text-foreground text-sm md:text-base mb-4">দেশভিত্তিক ট্রাফিক</h3>
          {countryData.length === 0 ? (
            <p className="text-muted-foreground text-xs">এখনো কোনো ট্রাফিক ডাটা নেই</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {countryData.slice(0, 15).map((c, i) => {
                const maxCount = countryData[0]?.count || 1;
                const pct = Math.round((c.count / maxCount) * 100);
                return (
                  <div key={c.code} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-foreground">{c.name}</span>
                      <span className="text-muted-foreground">{c.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Page views + Pie chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-background rounded-2xl border border-border p-4 md:p-6 shadow-sm"
        >
          <h3 className="font-bold text-foreground text-sm md:text-base mb-4">জনপ্রিয় পেজ</h3>
          <div className="space-y-3">
            {pageData.map((p, i) => (
              <div key={p.page} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span className="text-sm font-medium text-foreground">{p.page}</span>
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-background px-2 py-1 rounded-lg border">{p.count}</span>
              </div>
            ))}
            {pageData.length === 0 && (
              <p className="text-muted-foreground text-xs">এখনো কোনো ডাটা নেই</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-background rounded-2xl border border-border p-4 md:p-6 shadow-sm"
        >
          <h3 className="font-bold text-foreground text-sm md:text-base mb-4">দেশভিত্তিক অনুপাত</h3>
          {countryData.length > 0 ? (
            <div className="h-48 md:h-56">
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
                    style={{ fontSize: '10px' }}
                  >
                    {countryData.slice(0, 6).map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number, name: string) => [`${value} ভিজিট`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-muted-foreground text-xs">এখনো কোনো ডাটা নেই</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
