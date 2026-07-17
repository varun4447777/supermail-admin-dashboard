'use client';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

export default function VolumeChart() {
  const [data, setData] = useState<{name: string, volume: number, color: string}[]>([]);

  useEffect(() => {
    fetch('/gmail_data.json')
      .then(res => res.json())
      .then(json => {
        const domains: Record<string, number> = {};
        json.emails.forEach((email: any) => {
          domains[email.domain] = (domains[email.domain] || 0) + 1;
        });

        // Get top 5 domains
        const sorted = Object.entries(domains)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, volume]) => ({
            name: name.split('.')[0].substring(0, 15),
            volume,
            color: '#2563eb' // Blue-600
          }));
        
        setData(sorted);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col h-full shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Top Inbound Domains</h2>
          <p className="text-sm text-gray-500">Email volume by sender domain</p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="volume" radius={[4, 4, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
