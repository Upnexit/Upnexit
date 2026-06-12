import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, RefreshCw, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Keyword { id: string; keyword: string; active: boolean; }
interface RankPoint { keyword_id: string; position: number | null; checked_at: string; found_url: string | null; }

const SeoRankings = () => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [history, setHistory] = useState<RankPoint[]>([]);
  const [newKw, setNewKw] = useState('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  const load = async () => {
    setLoading(true);
    const [{ data: kw }, { data: hist }] = await Promise.all([
      supabase.from('seo_keywords').select('*').order('created_at'),
      supabase.from('seo_rank_history').select('keyword_id, position, checked_at, found_url').order('checked_at', { ascending: false }).limit(500),
    ]);
    setKeywords(kw ?? []);
    setHistory(hist ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addKeyword = async () => {
    const k = newKw.trim();
    if (!k) return;
    const { error } = await supabase.from('seo_keywords').insert({ keyword: k });
    if (error) return toast.error(error.message);
    setNewKw('');
    toast.success('Keyword added');
    load();
  };

  const removeKeyword = async (id: string) => {
    const { error } = await supabase.from('seo_keywords').delete().eq('id', id);
    if (error) return toast.error(error.message);
    load();
  };

  const runNow = async () => {
    setRunning(true);
    toast.info('Running rank check… this may take a minute');
    const { error } = await supabase.functions.invoke('seo-rank-check', { body: { source: 'manual' } });
    setRunning(false);
    if (error) return toast.error(error.message);
    toast.success('Rank check complete');
    load();
  };

  const getStats = (kid: string) => {
    const points = history.filter(h => h.keyword_id === kid).slice().reverse();
    if (!points.length) return { latest: null as number | null, prev: null as number | null, points };
    const latest = points[points.length - 1].position;
    const prev = points.length > 1 ? points[points.length - 2].position : null;
    return { latest, prev, points };
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="SEO Rank Tracker"
        subtitle="Weekly position monitoring on DuckDuckGo for upnexit.pro.bd"
        actions={
          <Button onClick={runNow} disabled={running}>
            {running ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Run check now
          </Button>
        }
      />

      <Card className="p-4">
        <div className="flex gap-2">
          <Input value={newKw} onChange={e => setNewKw(e.target.value)} placeholder="Add keyword (e.g. upnex it bd)" onKeyDown={e => e.key === 'Enter' && addKeyword()} />
          <Button onClick={addKeyword}><Plus className="h-4 w-4 mr-1" />Add</Button>
        </div>
      </Card>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin" /></div>
      ) : (
        <div className="grid gap-3">
          {keywords.map(k => {
            const { latest, prev, points } = getStats(k.id);
            const delta = latest != null && prev != null ? prev - latest : null;
            return (
              <Card key={k.id} className="p-4 flex flex-wrap items-center gap-4 justify-between">
                <div className="flex-1 min-w-[200px]">
                  <div className="font-semibold">{k.keyword}</div>
                  <div className="text-xs text-muted-foreground">{points.length} data points</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{latest ?? '—'}</div>
                    <div className="text-[10px] uppercase text-muted-foreground">Current</div>
                  </div>
                  {delta !== null && (
                    <Badge variant={delta > 0 ? 'default' : delta < 0 ? 'destructive' : 'secondary'} className="gap-1">
                      {delta > 0 ? <TrendingUp className="h-3 w-3" /> : delta < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                      {delta > 0 ? `+${delta}` : delta}
                    </Badge>
                  )}
                  <Sparkline points={points.map(p => p.position)} />
                  <Button size="icon" variant="ghost" onClick={() => removeKeyword(k.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Sparkline = ({ points }: { points: (number | null)[] }) => {
  const valid = points.filter((p): p is number => p != null);
  if (valid.length < 2) return <div className="w-24 h-8 text-xs text-muted-foreground flex items-center">No trend</div>;
  const max = Math.max(...valid);
  const min = Math.min(...valid);
  const range = max - min || 1;
  const w = 96, h = 32;
  const step = w / (points.length - 1);
  const path = points.map((p, i) => {
    const x = i * step;
    const y = p == null ? h : h - ((max - p) / range) * h; // lower position = higher = better
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg width={w} height={h} className="text-primary">
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

export default SeoRankings;