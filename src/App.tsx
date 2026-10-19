import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoBanner } from './components/common/DemoBanner';
import { Header } from './components/layout/Header';
import { FilterBar } from './components/layout/FilterBar';
import { GoogleDriveModal } from './components/common/GoogleDriveModal';
import { ExecutiveDashboard } from './components/dashboard/ExecutiveDashboard';
import { CentralDatabase } from './components/database/CentralDatabase';
import { ProjectManagement } from './components/projects/ProjectManagement';
import { BudgetTracking } from './components/budget/BudgetTracking';
import { ReportRegistry } from './components/reports/ReportRegistry';
import { KnowledgeRepository } from './components/km/KnowledgeRepository';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, toast, clearToast } = useApp();

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      
      {/* 1. Official Demo & Transparency Banner */}
      <DemoBanner />

      {/* 2. Top Bar Navigation (Strict 3-zone contract) */}
      <Header />

      {/* 3. Global Filter Bar (Fiscal Year, Divisions, Nan 15 Districts, Search) */}
      <FilterBar />

      {/* 4. Main Viewport Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'DASHBOARD' && <ExecutiveDashboard />}
        {activeTab === 'DATABASE' && <CentralDatabase />}
        {activeTab === 'PROJECTS' && <ProjectManagement />}
        {activeTab === 'BUDGET' && <BudgetTracking />}
        {activeTab === 'REPORTS' && <ReportRegistry />}
        {activeTab === 'KM' && <KnowledgeRepository />}
      </main>

      {/* 5. Official Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-slate-800">
              CDD Nan One Platform — ระบบบริหารจัดการงานพัฒนาชุมชนจังหวัดน่านแบบบูรณาการ
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              สำนักงานพัฒนาชุมชนจังหวัดน่าน ศาลากลางจังหวัดน่าน ชั้น 2 ถนนสุริยพงษ์ ตำบลในเวียง อำเภอเมืองน่าน จังหวัดน่าน 55000
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>โทรศัพท์: 0-5471-6395</span>
            <span>·</span>
            <span>cddnan@cdd.go.th</span>
          </div>
        </div>
      </footer>

      {/* 6. Google Drive Helper Modal */}
      <GoogleDriveModal />

      {/* 7. Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xl text-xs font-medium bg-slate-900 text-white animate-in slide-in-from-bottom-5 duration-200">
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
          {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
          <span>{toast.message}</span>
          <button
            onClick={clearToast}
            className="ml-2 text-slate-400 hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
