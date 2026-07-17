import React from 'react';

const employees = [
  { initials: 'NB', name: 'Nirmal Bansal', role: 'CEO', emails: '1,245', trend: '+12%', color: 'from-purple-500 to-indigo-600' },
  { initials: 'VS', name: 'Varun Seth', role: 'CTO', emails: '850', trend: '-5%', color: 'from-blue-500 to-cyan-500' },
  { initials: 'AA', name: 'Anjali Awasthi', role: 'CRM Manager', emails: '2,104', trend: '+45%', color: 'from-orange-500 to-red-500' },
  { initials: 'GA', name: 'Girisha Arora', role: 'Relations', emails: '930', trend: '+2%', color: 'from-teal-400 to-emerald-500' },
];

export default function EmployeeActivity() {
  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Employee Inbox Volume</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase text-gray-500">
              <th className="pb-3 font-medium">Employee</th>
              <th className="pb-3 font-medium text-right">Inbound 24h</th>
              <th className="pb-3 font-medium text-right">Trend</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${emp.color} flex items-center justify-center text-xs font-bold text-white shadow-lg`}>
                      {emp.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{emp.name}</div>
                      <div className="text-xs text-gray-500">{emp.role}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-right">
                  <span className="text-sm font-bold text-white">{emp.emails}</span>
                </td>
                <td className="py-4 text-right">
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                    emp.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {emp.trend}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
