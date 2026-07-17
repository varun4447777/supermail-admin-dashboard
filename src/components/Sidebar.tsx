'use client';
import React from 'react';
import { Mail, LayoutDashboard, Users, Activity, MessageSquare, Plus, FileText, BarChart3 } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ onDropToTeamMember }: { onDropToTeamMember?: (emailId: string, memberId: string) => void }) {
  const pathname = usePathname();
  const teamMembers = [
    { id: '1', name: 'Nirmal Bansal', initials: 'NB', color: 'bg-purple-100 text-purple-700' },
    { id: '2', name: 'Anjali Awasthi', initials: 'AA', color: 'bg-orange-100 text-orange-700' },
    { id: '3', name: 'Girisha Arora', initials: 'GA', color: 'bg-teal-100 text-teal-700' },
  ];

  return (
    <aside className="w-64 bg-[#f8f9fa] border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-10">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-black text-white p-2 rounded-lg shadow-sm">
          <Mail size={18} strokeWidth={2.5} />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          Varun_Mail
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-1 pb-6">
        <NavItem href="/" icon={Mail} label="Inbox" active={pathname === '/'} badge="12" />
        <NavItem href="/" icon={MessageSquare} label="Snoozed" active={false} />
        <NavItem href="/" icon={FileText} label="Done" active={false} />
        
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-8 px-3">Insights</div>
        <NavItem href="/analytics" icon={BarChart3} label="Analytics" active={pathname === '/analytics'} />
        <NavItem href="/analytics" icon={Activity} label="Response Times" active={false} />
        
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-8 px-3 flex justify-between items-center">
          Team Assignment
          <Plus size={14} className="cursor-pointer hover:text-gray-700" />
        </div>
        <div className="px-1 space-y-1">
          {teamMembers.map(member => (
            <div 
              key={member.id}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-blue-300"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const emailId = e.dataTransfer.getData("text/plain");
                if (emailId && onDropToTeamMember) {
                  onDropToTeamMember(emailId, member.name);
                }
              }}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${member.color}`}>
                {member.initials}
              </div>
              <span className="text-sm font-medium text-gray-700">{member.name}</span>
            </div>
          ))}
        </div>
        <p className="px-3 text-xs text-gray-400 mt-2 italic">Drag emails here to assign.</p>
      </div>
    </aside>
  );
}

function NavItem({ href, icon: Icon, label, active = false, badge }: { href: string, icon: any, label: string, active?: boolean, badge?: string }) {
  return (
    <Link href={href} className={clsx(
      "flex items-center justify-between px-3 py-2 rounded-lg transition-colors group",
      active ? "bg-white border border-gray-200 text-gray-900 shadow-sm font-medium" : "text-gray-600 hover:bg-gray-100"
    )}>
      <div className="flex items-center gap-3">
        <Icon size={18} className={active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"} strokeWidth={active ? 2.5 : 2} />
        <span className="text-sm">{label}</span>
      </div>
      {badge && (
        <span className={clsx("text-[10px] font-bold px-2 py-0.5 rounded-full", active ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-500")}>
          {badge}
        </span>
      )}
    </Link>
  );
}
