import React from 'react';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'red' | 'purple';
  trend?: string;
  trendUp?: boolean;
}

export default function MetricsCard({ title, value, icon: Icon, color, trend, trendUp }: MetricsCardProps) {
  const colorMap = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    red: 'text-red-600 bg-red-50',
    purple: 'text-purple-600 bg-purple-50',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={clsx("p-2.5 rounded-lg", colorMap[color])}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        {trend && (
          <span className={clsx(
            "text-xs font-semibold px-2 py-1 rounded-md",
            trendUp ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
          )}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm font-medium text-gray-500">{title}</div>
      </div>
    </div>
  );
}
