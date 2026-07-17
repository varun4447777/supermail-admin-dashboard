'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MetricsCard from '@/components/MetricsCard';
import SplitPaneInbox from '@/components/SplitPaneInbox';
import { Mailbox, Activity, Users, ShieldAlert, CheckCircle } from 'lucide-react';

export default function Home() {
  const [emails, setEmails] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/gmail_data.json')
      .then(res => res.json())
      .then(json => setEmails(json.emails));
  }, []);

  const handleDropToTeamMember = (emailId: string, memberName: string) => {
    setToastMessage(`Email successfully forwarded & assigned to ${memberName}`);
    // Simulate removing it from our triage inbox
    setEmails(prev => prev.filter(e => e.id !== emailId));
    
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleEmailAction = (emailId: string, action: string) => {
    let msg = '';
    if (action === 'done') msg = 'Email marked as Done.';
    if (action === 'snooze') msg = 'Email snoozed for later.';
    if (action === 'sent') msg = 'Reply sent successfully!';
    
    setToastMessage(msg);
    if (action === 'done' || action === 'snooze') {
      setEmails(prev => prev.filter(e => e.id !== emailId));
    }
    
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] text-gray-900 font-sans">
      <Sidebar onDropToTeamMember={handleDropToTeamMember} />
      
      {/* 64 = width of sidebar (16rem), so ml-64 */}
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden relative">
        <Header />
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-6 right-8 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-4">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricsCard 
                title="Emails Triaged" 
                value={50 - emails.length} 
                icon={CheckCircle} 
                color="green" 
                trend="Inbox Zero Goal"
                trendUp={true}
              />
              <MetricsCard 
                title="Action Required" 
                value={emails.filter(e => e.priority === 'High').length} 
                icon={ShieldAlert} 
                color="red" 
                trend="Needs Reply"
                trendUp={false}
              />
              <MetricsCard 
                title="Total Inbox Volume" 
                value={emails.length} 
                icon={Mailbox} 
                color="blue" 
              />
              <MetricsCard 
                title="Active Team" 
                value="3" 
                icon={Users} 
                color="purple" 
              />
            </div>

            {/* Split Pane Inbox (Superhuman Clone) */}
            <div>
              {emails.length > 0 ? (
                <SplitPaneInbox emails={emails} onEmailAction={handleEmailAction} />
              ) : (
                <div className="h-[700px] bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center flex-col gap-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Inbox Zero</h2>
                  <p className="text-gray-500">You're all caught up! Great job.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
