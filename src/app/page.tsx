'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MetricsCard from '@/components/MetricsCard';
import SplitPaneInbox from '@/components/SplitPaneInbox';
import { Mailbox, Clock, ShieldAlert, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

export default function Home() {
  const [emails, setEmails] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [inboxFilter, setInboxFilter] = useState('All');

  useEffect(() => {
    fetch('/gmail_data.json')
      .then(res => res.json())
      .then(json => setEmails(json.emails));
  }, []);

  const handleDropToTeamMember = (emailId: string, memberName: string) => {
    setToastMessage(`Email securely delegated to ${memberName}. Logged in archive.`);
    setEmails(prev => prev.filter(e => e.id !== emailId));
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleEmailAction = (emailId: string, action: string) => {
    let msg = '';
    if (action === 'done') msg = 'Archived successfully.';
    if (action === 'snooze') msg = 'Follow-up created.';
    if (action === 'sent') msg = 'Reply sent and logged for compliance.';
    
    setToastMessage(msg);
    if (action === 'done' || action === 'snooze') {
      setEmails(prev => prev.filter(e => e.id !== emailId));
    }
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ---------------------------------------------------------------------------
  // ADMIN EMAIL CRM DASHBOARD LOGIC
  // ---------------------------------------------------------------------------
  
  const getFilteredEmails = () => {
    if (inboxFilter === 'All') return emails;
    if (inboxFilter === 'Clients') return emails.filter(e => e.wealth_category === 'Client / General' || e.wealth_category === 'Corporate Action');
    if (inboxFilter === 'AMCs') return emails.filter(e => e.wealth_category === 'AMC Update');
    if (inboxFilter === 'Flagged') return emails.filter(e => e.priority === 'High');
    return emails;
  };

  const displayEmails = getFilteredEmails();

  // Mock RM Email Performance Data
  const rmPerformance = [
    { name: 'Nirmal Bansal', emailsSent: 142, avgResponse: '45m', overdue: 0 },
    { name: 'Anjali Awasthi', emailsSent: 98, avgResponse: '1.2h', overdue: 2 },
    { name: 'Girisha Arora', emailsSent: 215, avgResponse: '2.5h', overdue: 12 },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] text-gray-900 font-sans">
      <Sidebar onDropToTeamMember={handleDropToTeamMember} />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden relative">
        <Header />
        
        {toastMessage && (
          <div className="absolute top-6 right-8 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-4">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Firm Email Command Center</h1>
              <p className="text-sm text-gray-500">Oversee all RM communications, AMC updates, and compliance archiving.</p>
            </div>

            {/* Section 1: Firm-Wide Email KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricsCard title="Firm Emails Processed" value="4,284" icon={Mailbox} color="blue" trend="+12% this week" trendUp={true} />
              <MetricsCard title="Avg Firm Response Time" value="1.4 hrs" icon={Clock} color="green" trend="-15m vs Last Week" trendUp={true} />
              <MetricsCard title="AMC / Wholesaler Emails" value={emails.filter(e => e.wealth_category === 'AMC Update').length} icon={Users} color="purple" trend="Pending Review" trendUp={false} />
              <MetricsCard title="Compliance Flags" value="0" icon={ShieldAlert} color="green" trend="No promissory language detected" trendUp={true} />
            </div>

            {/* Section 2: RM Performance & Section 3: Master Inbox (Side by side) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: RM Performance Leaderboard */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="text-md font-bold text-gray-900 mb-4">RM Email Activity (Today)</h3>
                  <div className="space-y-4">
                    {rmPerformance.map(rm => (
                      <div key={rm.name} className="flex flex-col gap-2 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-sm text-gray-900">{rm.name}</span>
                          <span className="text-xs font-medium text-gray-500">{rm.emailsSent} sent</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500">Avg Reply: <span className="font-medium text-gray-900">{rm.avgResponse}</span></span>
                          {rm.overdue > 0 ? (
                            <span className="flex items-center gap-1 text-red-600 font-medium">
                              <AlertTriangle size={12} /> {rm.overdue} overdue
                            </span>
                          ) : (
                            <span className="text-green-600 font-medium">Clear</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Master Inbox */}
              <div className="lg:col-span-2 flex flex-col h-[700px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-bold text-gray-900">Firm Master Inbox</h3>
                  
                  {/* Inbox Filters */}
                  <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                    {['All', 'Clients', 'AMCs', 'Flagged'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setInboxFilter(filter)}
                        className={clsx(
                          "px-4 py-1.5 text-xs font-medium rounded-md transition-colors",
                          inboxFilter === filter ? "bg-white text-blue-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
                        )}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {displayEmails.length > 0 ? (
                  <SplitPaneInbox emails={displayEmails} onEmailAction={handleEmailAction} />
                ) : (
                  <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center flex-col gap-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Inbox Zero</h2>
                    <p className="text-gray-500">No emails match this filter.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
