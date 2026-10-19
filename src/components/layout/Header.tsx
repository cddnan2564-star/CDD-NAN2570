import React, { useState } from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { User, ChevronDown, Check, SlidersHorizontal, Printer } from 'lucide-react';
import emblemImage from '../../assets/images/cdd_nan_emblem_1792138103062.jpg';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, setCurrentUser, users } = useApp();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'DASHBOARD', label: 'ภาพรวมบริหาร' },
    { id: 'DATABASE', label: 'ฐานข้อมูลกลาง' },
    { id: 'PROJECTS', label: 'บริหารโครงการ' },
    { id: 'BUDGET', label: 'ติดตามงบประมาณ' },
    { id: 'REPORTS', label: 'ทะเบียนส่งงาน' },
    { id: 'KM', label: 'คลังความรู้ KM' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8 h-16">
        
        {/* Zone 1: Single text brand wordmark with emblem */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src={emblemImage}
            alt="ตราสัญลักษณ์ พช.น่าน"
            className="w-10 h-10 rounded-full border border-amber-300 shadow-xs object-cover"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={() => setActiveTab('DASHBOARD')}
            className="text-left group cursor-pointer"
          >
            <span className="text-lg font-bold tracking-tight text-blue-950 font-prompt block whitespace-nowrap leading-tight">
              CDD Nan One Platform
            </span>
            <span className="text-[11px] font-medium text-amber-700 block whitespace-nowrap leading-none">
              สำนักงานพัฒนาชุมชนจังหวัดน่าน
            </span>
          </button>
        </div>

        {/* Zone 2: 5–6 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 text-sm font-medium border-b-2 ${
                  isActive
                    ? 'text-blue-900 border-amber-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action / Role Switcher Profile */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => window.print()}
            className="no-print hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="พิมพ์รายงานหน้านี้"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>พิมพ์</span>
          </button>

          {/* Role selector dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-blue-900 text-amber-300 flex items-center justify-center font-bold text-[10px]">
                {currentUser.role === 'EXECUTIVE' ? 'ผบ' : currentUser.role === 'ADMIN' ? 'AD' : 'พช'}
              </div>
              <div className="text-left hidden md:block max-w-[130px] truncate">
                <div className="truncate font-semibold text-slate-900 leading-tight">{currentUser.name}</div>
                <div className="truncate text-[10px] text-amber-700 leading-none">{currentUser.title}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">สลับบทบาทผู้ใช้งาน (RBAC Simulation)</p>
                  <p className="text-[11px] text-slate-500">ทดสอบมุมมองและสิทธิ์การเข้าถึงข้อมูลตามหน้าที่</p>
                </div>
                <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                  {users.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        setCurrentUser(u);
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors"
                    >
                      <div>
                        <div className="font-medium text-slate-800">{u.name}</div>
                        <div className="text-[10px] text-slate-500">{u.title}</div>
                      </div>
                      {currentUser.id === u.id && (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
