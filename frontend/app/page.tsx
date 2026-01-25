"use client";

import { useEffect, useState } from "react";

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

  const API = process.env.NEXT_PUBLIC_API_BASE as string;

  // Generate tracking URL
  const generateLink = () => {
    if (!landingPage) return;

    const url = `${API}/click?lp=${encodeURIComponent(
      landingPage
    )}&source=${source}&campaign_id=${campaignId}&ad_id=${adId}`;

    setTrackingLink(url);
  };

  // Fetch report data
  const fetchReport = async () => {
    const res = await fetch(
      `${API}/report${reportSource ? `?source=${reportSource}` : ""}`
    );
    const data = await res.json();
    setReports(data);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold">Ad Tracking Dashboard</h1>

      {/* Tracking Link Generator */}
      <section className="border p-4 rounded space-y-4">
        <h2 className="font-semibold">Tracking Link Generator</h2>

        <input
          className="border p-2 w-full"
          placeholder="Source (facebook, google)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Campaign ID"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Ad ID"
          value={adId}
          onChange={(e) => setAdId(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Landing Page URL"
          value={landingPage}
          onChange={(e) => setLandingPage(e.target.value)}
        />

        <button
          onClick={generateLink}
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          Generate Tracking Link
        </button>

        {trackingLink && (
          <div className="bg-gray-100 p-2 break-all text-black">
            {trackingLink}
          </div>
        )}
      </section>

      {/* Reports */}
      <section className="border p-4 rounded space-y-4">
        <h2 className="font-semibold">Reports</h2>

        <input
          className="border p-2 w-full"
          placeholder="Filter by source (optional)"
          value={reportSource}
          onChange={(e) => setReportSource(e.target.value)}
        />

        <button
          onClick={fetchReport}
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          Fetch Report
        </button>

        <table className="w-full border mt-4">
          <thead>
            <tr className="border">
              <th className="border p-2">Campaign ID</th>
              <th className="border p-2">Clicks</th>
              <th className="border p-2">Conversions</th>
              <th className="border p-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className="border">
                <td className="border p-2">{r.campaign_id}</td>
                <td className="border p-2">{r.total_clicks}</td>
                <td className="border p-2">{r.total_conversions}</td>
                <td className="border p-2">{r.total_revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
