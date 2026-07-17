'use client';
import React, { useState } from 'react';
import { Clock, CheckCircle2, CornerUpLeft, MoreHorizontal, Forward, Trash2, Mail } from 'lucide-react';
import clsx from 'clsx';

export default function SplitPaneInbox({ emails, onEmailAction }: { emails: any[], onEmailAction: (id: string, action: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(emails.length > 0 ? emails[0].id : null);
  const [isReplying, setIsReplying] = useState(false);

  const selectedEmail = emails.find(e => e.id === selectedId) || emails[0];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex h-[700px] overflow-hidden">
      
      {/* Left Pane: Email List */}
      <div className="w-[350px] border-r border-gray-200 flex flex-col bg-gray-50/30">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="font-bold text-gray-900">Focused Inbox</h2>
          <p className="text-xs text-gray-500">Drag emails to sidebar to assign.</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {emails.map((email) => (
            <div 
              key={email.id} 
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", email.id);
              }}
              onClick={() => {
                setSelectedId(email.id);
                setIsReplying(false);
              }}
              className={clsx(
                "p-4 border-b border-gray-100 cursor-pointer transition-colors group cursor-grab active:cursor-grabbing",
                selectedId === email.id ? "bg-blue-50 border-l-4 border-l-blue-600" : "hover:bg-gray-50 border-l-4 border-l-transparent"
              )}
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className={clsx("text-sm font-semibold truncate pr-2", selectedId === email.id ? "text-blue-900" : "text-gray-900")}>
                  {email.sender_name}
                </span>
                <span className="text-[10px] text-gray-400 whitespace-nowrap">
                  {email.date_raw ? email.date_raw.substring(0, 16) : 'Now'}
                </span>
              </div>
              <div className={clsx("text-xs font-medium mb-1 truncate", selectedId === email.id ? "text-blue-800" : "text-gray-700")}>
                {email.subject}
              </div>
              <div className="text-xs text-gray-500 line-clamp-2">
                {email.snippet}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane: Reading/Composer View */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedEmail ? (
          <>
            {/* Action Bar */}
            <div className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsReplying(!isReplying)}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors" title="Reply"
                >
                  <CornerUpLeft size={18} />
                </button>
                <div className="w-px h-6 bg-gray-200 mx-1"></div>
                <button 
                  onClick={() => onEmailAction(selectedEmail.id, 'done')}
                  className="p-2 text-gray-500 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors" title="Mark Done"
                >
                  <CheckCircle2 size={18} />
                </button>
                <button 
                  onClick={() => onEmailAction(selectedEmail.id, 'snooze')}
                  className="p-2 text-gray-500 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors" title="Snooze"
                >
                  <Clock size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors" title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
              <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-md transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Email Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{selectedEmail.subject}</h1>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    {selectedEmail.sender_name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{selectedEmail.sender_name}</div>
                    <div className="text-xs text-gray-500">&lt;{selectedEmail.sender_email}&gt;</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {selectedEmail.date_raw}
                </div>
              </div>
              
              <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
                {selectedEmail.body}
              </div>
              
              {/* Inline Composer */}
              {isReplying && (
                <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs text-gray-500 font-medium flex items-center gap-2">
                    <CornerUpLeft size={14} /> Replying to {selectedEmail.sender_name}
                  </div>
                  <textarea 
                    className="w-full p-4 h-32 resize-none focus:outline-none text-sm"
                    placeholder="Write your reply..."
                    autoFocus
                  ></textarea>
                  <div className="bg-white px-4 py-3 border-t border-gray-100 flex justify-between items-center">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                      <Mail size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        setIsReplying(false);
                        onEmailAction(selectedEmail.id, 'sent');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <Forward size={14} /> Send Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 flex-col gap-4">
            <Mail size={48} className="text-gray-200" />
            <p>Select an email to read</p>
          </div>
        )}
      </div>
    </div>
  );
}
