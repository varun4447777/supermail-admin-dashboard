'use client';
import React from 'react';
import { Search, Bell, Settings, ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search firm-wide emails, AMCs, or flags..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
          <ShieldCheck size={14} />
          SEC 17a-4 Archive Synced
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
          Firm Admin
        </div>

        <button className="text-gray-500 hover:text-gray-700 relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <button className="text-gray-500 hover:text-gray-700">
          <Settings size={20} />
        </button>
        
        <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-xs">
          VS
        </div>
      </div>
    </header>
  );
}
