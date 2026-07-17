import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'Security',
    color: 'border-l-red-500',
    badge: 'bg-red-500/20 text-red-400',
    date: '10 mins ago',
    title: 'Unusual Login Attempt',
    desc: 'Multiple failed logins detected on a.awasthi@iventures.in from an unknown IP address.',
    employee: 'Anjali Awasthi'
  },
  {
    id: 2,
    type: 'High Volume',
    color: 'border-l-orange-500',
    badge: 'bg-orange-500/20 text-orange-400',
    date: '1 hour ago',
    title: 'Spam Spike Detected',
    desc: 'Over 500 promotional emails hit the support@iventures.in inbox within 15 minutes.',
    employee: 'Support Team'
  },
  {
    id: 3,
    type: 'Compliance',
    color: 'border-l-purple-500',
    badge: 'bg-purple-500/20 text-purple-400',
    date: '2 hours ago',
    title: 'External Sharing Rule',
    desc: 'A sensitive document was shared with an external domain outside of the whitelist.',
    employee: 'Nirmal Bansal'
  }
];

export default function AlertFeed() {
  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-white">System Alerts</h2>
          <AlertTriangle size={20} className="text-orange-400" />
        </div>
        <button className="text-xs font-medium text-purple-400 hover:text-purple-300">View All</button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-4 rounded-xl bg-white/5 border border-white/5 border-l-4 ${alert.color} hover:bg-white/10 transition-colors cursor-pointer group`}>
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded-md ${alert.badge}`}>
                {alert.type}
              </span>
              <span className="text-xs text-gray-500">{alert.date}</span>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">{alert.title}</h3>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">{alert.desc}</p>
            
            <div className="flex justify-between items-center pt-3 border-t border-white/5">
              <span className="text-xs text-gray-500 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white">
                  {alert.employee.charAt(0)}
                </div>
                {alert.employee}
              </span>
              <span className="text-xs text-purple-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Details <ArrowRight size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
