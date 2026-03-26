import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users, MessageSquare, Eye, Globe, TrendingUp, BarChart3, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { motion } from 'framer-motion';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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

const PIE_COLORS = ['hsl(145,63%,38%)', 'hsl(200,70%,50%)', 'hsl(46,92%,55%)', 'hsl(340,60%,55%)', 'hsl(270,50%,55%)', 'hsl(20,75%,55%)'];

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

  const pageData = useMemo(() => {
    const counts: Record<string, number> = {};
    pageViews.forEach(v => { const p = v.page_path || '/'; counts[p] = (counts[p] || 0) + 1; });
    return Object.entries(counts).map(([page, count]) => ({ page, count })).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [pageViews]);

  const cards = [
    { label: 'আজকের ভিজিটর', value: todayViews, icon: Eye, accent: 'hsl(145,63%,38%)', bg: 'hsl(145,50%,96%)' },
    { label: 'মোট ভিজিটর', value: uniqueVisitors, icon: TrendingUp, accent: 'hsl(200,70%,50%)', bg: 'hsl(200,60%,96%)' },
    { label: 'টিম সদস্য', value: teamCount ?? 0, icon: Users, accent: 'hsl(46,92%,50%)', bg: 'hsl(46,80%,95%)' },
    { label: 'অপঠিত মেসেজ', value: unreadCount ?? 0, icon: MessageSquare, accent: 'hsl(0,70%,58%)', bg: 'hsl(0,60%,96%)' },
  ];

  const getColor = (count: number) => {
    if (count === 0) return 'hsl(220,15%,94%)';
    if (count < 5) return 'hsl(145,45%,82%)';
    if (count < 20) return 'hsl(145,55%,62%)';
    if (count < 50) return 'hsl(145,60%,45%)';
    return 'hsl(145,65%,32%)';
  };

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

      {/* World Map + Country Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-[hsl(220,14%,92%)] overflow-hidden hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center justify-between p-5 pb-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Globe className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-sm">বিশ্ব ট্রাফিক ম্যাপ</h2>
                <p className="text-[10px] text-muted-foreground">দেশ অনুযায়ী ভিজিটর বিতরণ</p>
              </div>
            </div>
          </div>
          <div className="relative p-3 md:p-4">
            <ComposableMap
              projectionConfig={{ scale: 147, center: [0, 20] }}
              style={{ width: '100%', height: 'auto' }}
            >
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      const count = countryNumericSet[geo.id] || 0;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getColor(count)}
                          stroke="hsl(220,14%,86%)"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none', transition: 'fill 0.2s' },
                            hover: { outline: 'none', fill: count > 0 ? 'hsl(145,63%,38%)' : 'hsl(220,14%,88%)', cursor: 'pointer', strokeWidth: 0.8, stroke: 'hsl(220,14%,75%)' },
                            pressed: { outline: 'none' },
                          }}
                          onMouseEnter={() => setTooltipContent(`${geo.properties.name || 'Unknown'}: ${count} ভিজিট`)}
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
              { color: 'hsl(220,15%,94%)', label: '0' },
              { color: 'hsl(145,45%,82%)', label: '1-4' },
              { color: 'hsl(145,55%,62%)', label: '5-19' },
              { color: 'hsl(145,60%,45%)', label: '20-49' },
              { color: 'hsl(145,65%,32%)', label: '50+' },
            ].map((l, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded inline-block border border-[hsl(220,14%,90%)]" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Country List */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl border border-[hsl(220,14%,92%)] p-5 hover:shadow-sm transition-shadow"
        >
          <h3 className="font-semibold text-foreground text-sm mb-4">দেশভিত্তিক ট্রাফিক</h3>
          {countryData.length === 0 ? (
            <p className="text-muted-foreground text-xs text-center py-8">এখনো কোনো ডাটা নেই</p>
          ) : (
            <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
              {countryData.slice(0, 15).map((c, i) => {
                const maxCount = countryData[0]?.count || 1;
                const pct = Math.round((c.count / maxCount) * 100);
                return (
                  <div key={c.code} className="space-y-1.5">
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
                  </div>
                );
              })}
            </div>
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

export default Dashboard;
