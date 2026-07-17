'use client';
import React, { useState } from 'react';
import { Search, Bell, Settings, Lock, ChevronDown, UserCircle } from 'lucide-react';

export default function Header() {
  const [role, setRole] = useState('Admin (Partner)');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search clients, AMCs, or trade requests..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          FINRA Archive Active
        </div>
      </div>

      <div className="flex items-center gap-6">
        
        {/* Role Switcher */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            <UserCircle size={16} className="text-gray-500" />
            {role}
            <ChevronDown size={14} className="text-gray-500" />
          </button>
          
          {isOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
              {['Admin (Partner)', 'Sales RM', 'AMC Contact'].map(r => (
                <button 
                  key={r}
                  onClick={() => { setRole(r); setIsOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  View as: {r}
                </button>
              ))}
            </div>
          )}
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
