"use client";

import { useEffect, useState } from "react";
import { Copy, ExternalLink, RefreshCw, BarChart3, Link as LinkIcon, Hash, Target, Globe, MousePointer2 } from "lucide-react";

type ReportRow = {
  campaign_id: string;
  total_clicks: number;
  total_conversions: number;
  total_revenue: number;
};

export default function Home() {
  const [source, setSource] = useState<string>("");
  const [campaignId, setCampaignId] = useState<string>("");
  const [adId, setAdId] = useState<string>("");
  const [landingPage, setLandingPage] = useState<string>("");
  const [trackingLink, setTrackingLink] = useState<string>("");

  const [reportSource, setReportSource] = useState<string>("");
  const [reports, setReports] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const API = process.env.NEXT_PUBLIC_API_BASE as string;

  const generateLink = () => {
    if (!landingPage) return;
    const url = `${API}/click?lp=${encodeURIComponent(landingPage)}&source=${source}&campaign_id=${campaignId}&ad_id=${adId}`;
    setTrackingLink(url);
  };

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/report${reportSource ? `?source=${reportSource}` : ""}`);
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReport(); }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      <main className="p-6 max-w-6xl mx-auto space-y-8">
        
        <header className="py-6">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">AD TRACKER</h1>
          <p className="text-slate-500 font-medium">Generate deep-links and monitor real-time ROI.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMN 1: CONFIGURATION */}
          <section className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <LinkIcon className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-lg">Link Configuration</h2>
              </div>

              <div className="space-y-4">
                {/* Landing Page */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                    <Globe className="w-3 h-3" /> Landing Page URL
                  </label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="https://your-store.com/product"
                    value={landingPage}
                    onChange={(e) => setLandingPage(e.target.value)}
                  />
                </div>

                {/* Source & Campaign ID */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                      <MousePointer2 className="w-3 h-3" /> Source
                    </label>
                    <input
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                      placeholder="facebook"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                      <Target className="w-3 h-3" /> Campaign ID
                    </label>
                    <input
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                      placeholder="black-friday-24"
                      value={campaignId}
                      onChange={(e) => setCampaignId(e.target.value)}
                    />
                  </div>
                </div>

                {/* Ad ID - RESTORED */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                    <Hash className="w-3 h-3" /> Ad ID
                  </label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                    placeholder="ad-unit-001"
                    value={adId}
                    onChange={(e) => setAdId(e.target.value)}
                  />
                </div>

                <button
                  onClick={generateLink}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Generate Tracking URL
                </button>
              </div>
            </div>

            {/* GENERATED LINK DISPLAY - ENHANCED */}
            {trackingLink && (
              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-400 text-xs font-black uppercase tracking-widest">Tracking Link Ready</span>
                  <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-[10px] font-bold">LIVE</span>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
                  <p className="text-slate-300 text-sm break-all font-mono leading-relaxed">
                    {trackingLink}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(trackingLink);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center justify-center gap-2 bg-white text-slate-900 px-4 py-3 rounded-xl font-bold hover:bg-slate-100 transition cursor-pointer"
                  >
                    <Copy className="w-4 h-4" /> Copy Link
                  </button>
                  <a
                    href={trackingLink}
                    target="_blank"
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-500 transition cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" /> Open Link
                  </a>
                </div>
              </div>
            )}
          </section>

          {/* COLUMN 2: REPORTS */}
          <section className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-lg text-slate-800">Performance Report</h2>
              </div>
              
              <div className="flex gap-2">
                <input
                  className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
                  placeholder="Filter by source..."
                  value={reportSource}
                  onChange={(e) => setReportSource(e.target.value)}
                />
                <button
                  onClick={fetchReport}
                  disabled={loading}
                  className="flex items-center gap-2 bg-slate-900 text-white p-2.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                > Fetch Report
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[11px] font-black uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-4">Campaign ID</th>
                    <th className="px-6 py-4 text-right">Clicks</th>
                    <th className="px-6 py-4 text-right">Convs</th>
                    <th className="px-6 py-4 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {reports.length > 0 ? reports.map((r, i) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4 font-bold text-slate-700">{r.campaign_id}</td>
                      <td className="px-6 py-4 text-right tabular-nums text-slate-600 font-medium">{r.total_clicks.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right tabular-nums text-slate-600 font-medium">{r.total_conversions.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right tabular-nums font-black text-emerald-600">
                        ${r.total_revenue.toLocaleString()}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                        No campaign data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Copy Success Toast */}
        {copied && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold animate-in fade-in slide-in-from-bottom-5">
            Link copied to clipboard!
          </div>
        )}
      </main>
    </div>
  );
}