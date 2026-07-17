'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MetricsCard from '@/components/MetricsCard';
import SplitPaneInbox from '@/components/SplitPaneInbox';
import { Mailbox, Activity, Users, ShieldAlert, CheckCircle, TrendingUp, DollarSign, Calendar, Target, Briefcase, FileText } from 'lucide-react';

export default function Home() {
  const [emails, setEmails] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState('Admin (Partner)');

  useEffect(() => {
    fetch('/gmail_data.json')
      .then(res => res.json())
      .then(json => setEmails(json.emails));
  }, []);

  const handleDropToTeamMember = (emailId: string, memberName: string) => {
    setToastMessage(`Email securely delegated to ${memberName}. Logged in CRM.`);
    setEmails(prev => prev.filter(e => e.id !== emailId));
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleEmailAction = (emailId: string, action: string) => {
    let msg = '';
    if (action === 'done') msg = 'Archived to Wealthbox CRM.';
    if (action === 'snooze') msg = 'Follow-up task created in CRM.';
    if (action === 'sent') msg = 'Reply sent and logged for compliance.';
    
    setToastMessage(msg);
    if (action === 'done' || action === 'snooze') {
      setEmails(prev => prev.filter(e => e.id !== emailId));
    }
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ---------------------------------------------------------------------------
  // DYNAMIC DASHBOARD LOGIC
  // ---------------------------------------------------------------------------
  
  const getFilteredEmails = () => {
    if (currentRole === 'Admin (Partner)') return emails;
    if (currentRole === 'Sales RM') return emails.filter(e => e.wealth_category === 'Client / General' || e.wealth_category === 'Corporate Action');
    if (currentRole === 'AMC Contact') return emails.filter(e => e.wealth_category === 'AMC Update');
    return emails;
  };

  const displayEmails = getFilteredEmails();

  const renderMetrics = () => {
    if (currentRole === 'Admin (Partner)') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard title="Firm AUM Pipeline" value="$45.2M" icon={DollarSign} color="green" trend="+1.2M vs Last Week" trendUp={true} />
          <MetricsCard title="Trade Requests" value={emails.filter(e => e.wealth_category === 'Corporate Action').length} icon={ShieldAlert} color="red" trend="Action Required" trendUp={false} />
          <MetricsCard title="Total Client Comms" value="1,284" icon={Mailbox} color="blue" trend="Logged in SEC Archive" />
          <MetricsCard title="Active RMs" value="12" icon={Users} color="purple" trend="Avg response: 1.2 hrs" />
        </div>
      );
    }

    if (currentRole === 'Sales RM') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard title="Meetings Booked" value="8" icon={Calendar} color="blue" trend="This Week" trendUp={true} />
          <MetricsCard title="Lead Conversion" value="24%" icon={TrendingUp} color="green" trend="+2% vs Last Month" trendUp={true} />
          <MetricsCard title="Pending KYC" value="3" icon={Activity} color="orange" trend="Action Required" trendUp={false} />
          <MetricsCard title="Client Follow-ups" value={displayEmails.length} icon={Target} color="red" trend="Due Today" />
        </div>
      );
    }

    if (currentRole === 'AMC Contact') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard title="Wholesaler Meetings" value="4" icon={Users} color="purple" trend="Next 7 Days" trendUp={true} />
          <MetricsCard title="New Fund Updates" value={displayEmails.length} icon={FileText} color="blue" trend="Unread Fact Sheets" />
          <MetricsCard title="Approved AMCs" value="14" icon={Briefcase} color="green" trend="Platform Partners" />
          <MetricsCard title="Compliance Flags" value="0" icon={ShieldAlert} color="green" trend="All communications clean" trendUp={true} />
        </div>
      );
    }
  };

  const renderHeader = () => {
    if (currentRole === 'Admin (Partner)') {
      return (
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Overview</h1>
          <p className="text-sm text-gray-500">Firm-wide communications and pipeline health.</p>
        </div>
      );
    }
    if (currentRole === 'Sales RM') {
      return (
        <div>
          <h1 className="text-2xl font-bold text-gray-900">RM Sales Dashboard</h1>
          <p className="text-sm text-gray-500">Your daily triage, client pipeline, and tasks.</p>
        </div>
      );
    }
    if (currentRole === 'AMC Contact') {
      return (
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AMC & Partner Hub</h1>
          <p className="text-sm text-gray-500">Wholesaler engagement, fact sheets, and product updates.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] text-gray-900 font-sans">
      <Sidebar onDropToTeamMember={handleDropToTeamMember} />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden relative">
        <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
        
        {toastMessage && (
          <div className="absolute top-6 right-8 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-4">
            <CheckCircle size={18} className="text-green-400" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            <div className="flex justify-between items-end">
              {renderHeader()}
            </div>

            {renderMetrics()}

            {/* Split Pane Inbox */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {currentRole === 'Admin (Partner)' ? 'Firm Triage Queue' : 
                 currentRole === 'Sales RM' ? 'Client Priority Inbox' : 
                 'Fund Updates & Fact Sheets'}
              </h2>
              {displayEmails.length > 0 ? (
                <SplitPaneInbox emails={displayEmails} onEmailAction={handleEmailAction} />
              ) : (
                <div className="h-[700px] bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center flex-col gap-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Inbox Zero</h2>
                  <p className="text-gray-500">All requests in this view have been resolved.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
