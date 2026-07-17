'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import { Target, TrendingDown, TrendingUp, Zap } from 'lucide-react';

const SENTIMENT_COLORS = ['#10b981', '#9ca3af', '#ef4444']; // Pos, Neutral, Neg
const CATEGORY_COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/gmail_data.json')
      .then(res => res.json())
      .then(json => setData(json.emails));
  }, []);

  // Compute Analytics
  const highPriority = data.filter(e => e.priority === 'High').length;
  
  // Domain Aggregation
  const domainCount = data.reduce((acc, curr) => {
    const domain = curr.domain || 'unknown';
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topDomains = Object.entries(domainCount)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  // Sentiment Aggregation
  const sentimentCount = data.reduce((acc, curr) => {
    const s = curr.sentiment || 'Neutral';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const sentimentData = [
    { name: 'Positive', value: sentimentCount['Positive'] || 0 },
    { name: 'Neutral', value: sentimentCount['Neutral'] || 0 },
    { name: 'Negative', value: sentimentCount['Negative'] || 0 },
  ];

  // Category Aggregation
  const categoryCount = data.reduce((acc, curr) => {
    const c = curr.category || 'General';
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({ name, value }));

  // Mock Volume Over Time (Last 7 Days)
  const volumeData = [
    { name: 'Mon', inbound: 45, outbound: 20 },
    { name: 'Tue', inbound: 52, outbound: 25 },
    { name: 'Wed', inbound: 38, outbound: 15 },
    { name: 'Thu', inbound: 65, outbound: 30 },
    { name: 'Fri', inbound: 48, outbound: 22 },
    { name: 'Sat', inbound: 15, outbound: 5 },
    { name: 'Sun', inbound: 12, outbound: 2 },
  ];

  // Mock Busiest Hours Data
  const hourlyData = [
    { time: '6AM', count: 12 },
    { time: '9AM', count: 45 },
    { time: '12PM', count: 32 },
    { time: '3PM', count: 68 },
    { time: '6PM', count: 24 },
    { time: '9PM', count: 8 },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] text-gray-900 font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Deep Analytics</h1>
                <p className="text-sm text-gray-500">Live metrics powered by real-time MCP extraction.</p>
              </div>
              <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition-colors">
                Export PDF Report
              </button>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Avg Response Time" value="2.4 hrs" icon={Zap} trend="-15% vs last week" positive={true} />
              <StatCard title="Total Volume" value={data.length.toString()} icon={Target} trend="+5% vs last week" positive={false} />
              <StatCard title="Action Required" value={highPriority.toString()} icon={TrendingUp} trend="Stable" positive={true} />
              <StatCard title="Spam Blocked" value="124" icon={TrendingDown} trend="+22% vs last week" positive={true} />
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Volume Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Inbound vs Outbound Volume</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={volumeData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
                      <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Legend verticalAlign="top" height={36} />
                      <Area type="monotone" dataKey="inbound" stackId="1" stroke="#3b82f6" fill="#93c5fd" name="Inbound Emails" />
                      <Area type="monotone" dataKey="outbound" stackId="1" stroke="#10b981" fill="#6ee7b7" name="Outbound Emails" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sentiment Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Inbox Sentiment</h3>
                <p className="text-xs text-gray-500 mb-6">AI analysis of incoming tone.</p>
                <div className="flex-1 min-h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sentimentData} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Detailed Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Category Breakdown (New) */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email Classification</h3>
                <p className="text-xs text-gray-500 mb-6">How AI is categorizing your inbox.</p>
                <div className="flex-1 min-h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 13, fontWeight: 500}} width={80} />
                      <RechartsTooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Busiest Hours (New) */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Busiest Hours</h3>
                <p className="text-xs text-gray-500 mb-6">When you receive the most emails.</p>
                <div className="flex-1 min-h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} hide />
                      <RechartsTooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Third Row: Domains & Newsletters */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Top Senders Table */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Sender Domains</h3>
                <div className="space-y-4">
                  {topDomains.map((domain, idx) => (
                    <div key={domain.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{domain.name}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{domain.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Block List (Mock UI) */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Unread Newsletters</h3>
                <p className="text-xs text-gray-500 mb-4">You rarely open these. Consider blocking.</p>
                <div className="space-y-3">
                  {['marketing@hubspot.com', 'daily@morningbrew.com', 'alerts@github.com'].map(email => (
                    <div key={email} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <span className="text-sm text-gray-700">{email}</span>
                      <button className="text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors">
                        Block
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, positive }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-lg ${positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className={`text-xs mt-2 font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </div>
      </div>
    </div>
  );
}
