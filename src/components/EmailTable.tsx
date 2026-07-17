'use client';
import React, { useEffect, useState } from 'react';
import { Mail, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export default function EmailTable() {
  const [emails, setEmails] = useState<any[]>([]);

  useEffect(() => {
    fetch('/gmail_data.json')
      .then(res => res.json())
      .then(json => setEmails(json.emails));
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Unified Inbox</h2>
          <p className="text-sm text-gray-500">Recent emails across all connected accounts</p>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md transition-colors">
          View All Records
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
              <th className="px-6 py-3 w-10 text-center">Status</th>
              <th className="px-6 py-3">Sender (Account)</th>
              <th className="px-6 py-3">Subject / Thread</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3 text-right">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {emails.map((email) => (
              <tr key={email.id} className="hover:bg-blue-50/30 transition-colors cursor-pointer group">
                <td className="px-6 py-4 text-center">
                  {email.sentiment === 'Negative' ? (
                    <AlertCircle size={16} className="text-red-500 mx-auto" />
                  ) : email.priority === 'High' ? (
                    <Clock size={16} className="text-orange-500 mx-auto" />
                  ) : (
                    <CheckCircle2 size={16} className="text-green-500 mx-auto" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-1">{email.sender_name}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Mail size={10} /> {email.domain}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 max-w-md">
                  <span className="text-sm text-gray-700 line-clamp-1 group-hover:text-gray-900 transition-colors">{email.subject}</span>
                  <div className="flex gap-2 mt-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                      {email.category}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={clsx(
                    "text-xs font-bold px-2.5 py-1 rounded-md border",
                    email.priority === 'High' ? "bg-red-50 text-red-700 border-red-200" :
                    email.priority === 'Medium' ? "bg-orange-50 text-orange-700 border-orange-200" :
                    "bg-gray-50 text-gray-600 border-gray-200"
                  )}>
                    {email.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                    {email.date_raw ? email.date_raw.substring(0, 16) : 'Just now'}
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
