import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CDD_DIVISIONS, NAN_DISTRICTS } from '../../data/initialData';
import { PolicySettingsModal } from '../settings/PolicySettingsModal';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Coins, 
  FolderKanban, 
  Activity, 
  Building2, 
  MapPin, 
  Sliders, 
  FileCheck2, 
  ChevronRight,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { ProjectStatus, DivisionId } from '../../types';

export const ExecutiveDashboard: React.FC = () => {
  const { 
    projects, 
    budgetLedgers, 
    reports, 
    policyIndicators, 
    fiscalYear, 
    selectedDivisionId, 
    selectedDistrictId, 
    searchQuery,
    setActiveTab,
    setSelectedDivisionId,
    setSelectedDistrictId,
    showToast,
    currentUser
  } = useApp();

  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  // Dynamic Filtering based on selected fiscalYear, division, district, search query
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (fiscalYear !== 'ALL' && p.fiscalYear !== fiscalYear) return false;
      if (selectedDivisionId !== 'ALL' && p.divisionId !== selectedDivisionId) return false;
      if (selectedDistrictId !== 'ALL' && p.districtId !== selectedDistrictId && p.districtId !== 'ALL') return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCode = p.code.toLowerCase().includes(q);
        const matchesArea = p.targetArea.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesArea) return false;
      }
      return true;
    });
  }, [projects, fiscalYear, selectedDivisionId, selectedDistrictId, searchQuery]);

  const filteredBudget = useMemo(() => {
    return budgetLedgers.filter(b => {
      if (fiscalYear !== 'ALL' && b.fiscalYear !== fiscalYear) return false;
      if (selectedDivisionId !== 'ALL' && b.divisionId !== selectedDivisionId) return false;
      if (selectedDistrictId !== 'ALL' && b.districtId !== selectedDistrictId && b.districtId !== 'ALL') return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = b.projectName.toLowerCase().includes(q);
        const matchesCode = b.projectCode?.toLowerCase().includes(q);
        if (!matchesName && !matchesCode) return false;
      }
      return true;
    });
  }, [budgetLedgers, fiscalYear, selectedDivisionId, selectedDistrictId, searchQuery]);

  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      if (selectedDivisionId !== 'ALL' && r.divisionId !== selectedDivisionId) return false;
      if (selectedDistrictId !== 'ALL' && r.districtId !== selectedDistrictId && r.districtId !== 'ALL') return false;
      return true;
    });
  }, [reports, selectedDivisionId, selectedDistrictId]);

  // Dynamic Calculations (no hardcoded numbers)
  const totalProjects = filteredProjects.length;

  const statusCounts = useMemo(() => {
    const counts: Record<ProjectStatus, number> = {
      DRAFT: 0,
      SUBMITTED: 0,
      REVISED: 0,
      APPROVED: 0,
      IN_PROGRESS: 0,
      AWAITING_REPORT: 0,
      REPORT_VERIFYING: 0,
      COMPLETED: 0,
      CANCELLED: 0
    };
    filteredProjects.forEach(p => {
      if (counts[p.status] !== undefined) {
        counts[p.status]++;
      }
    });
    return counts;
  }, [filteredProjects]);

  // Activity stats
  const activityStats = useMemo(() => {
    let total = 0;
    let done = 0;
    let pending = 0;
    let delayed = 0;
    filteredProjects.forEach(p => {
      p.activities.forEach(a => {
        total++;
        if (a.status === 'DONE') done++;
        else if (a.status === 'DELAYED') delayed++;
        else pending++;
      });
    });
    const percentDone = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, pending, delayed, percentDone };
  }, [filteredProjects]);

  // Budget formulas:
  // Remaining = Allocated - Disbursed
  // Disbursed % = (Disbursed / Allocated) * 100
  const budgetSummary = useMemo(() => {
    let allocated = 0;
    let committed = 0;
    let disbursed = 0;

    filteredBudget.forEach(b => {
      allocated += b.allocatedAmount;
      committed += b.committedAmount;
      disbursed += b.disbursedAmount;
    });

    const remaining = allocated - disbursed;
    const disbursePercent = allocated > 0 ? ((disbursed / allocated) * 100).toFixed(1) : '0.0';
    const commitPercent = allocated > 0 ? ((committed / allocated) * 100).toFixed(1) : '0.0';

    return { allocated, committed, disbursed, remaining, disbursePercent, commitPercent };
  }, [filteredBudget]);

  // Overdue reports and at-risk projects
  const overdueReports = useMemo(() => {
    return filteredReports.filter(r => r.status === 'DELAYED');
  }, [filteredReports]);

  const atRiskProjects = useMemo(() => {
    return filteredProjects.filter(p => p.isAtRisk || p.activities.some(a => a.status === 'DELAYED'));
  }, [filteredProjects]);

  // Division performance comparison
  const divisionStats = useMemo(() => {
    return CDD_DIVISIONS.map(div => {
      const divProjects = projects.filter(p => p.divisionId === div.id);
      const divBudgets = budgetLedgers.filter(b => b.divisionId === div.id);
      const allocated = divBudgets.reduce((sum, b) => sum + b.allocatedAmount, 0);
      const disbursed = divBudgets.reduce((sum, b) => sum + b.disbursedAmount, 0);
      const percent = allocated > 0 ? ((disbursed / allocated) * 100).toFixed(1) : '0.0';
      const completed = divProjects.filter(p => p.status === 'COMPLETED').length;

      return {
        id: div.id,
        name: div.shortName,
        fullName: div.name,
        head: div.headName,
        totalProjects: divProjects.length,
        completedProjects: completed,
        allocated,
        disbursed,
        disbursePercent: Number(percent)
      };
    });
  }, [projects, budgetLedgers]);

  // Drilldown handler with permission verification
  const handleDrilldownProjects = (divisionId?: DivisionId, statusFilter?: string) => {
    if (divisionId) setSelectedDivisionId(divisionId);
    setActiveTab('PROJECTS');
    showToast(`เปิดดูรายการโครงการตามเงื่อนไขที่เลือก`, 'info');
  };

  const handleDrilldownBudget = () => {
    setActiveTab('BUDGET');
    showToast(`เปิดดูรายละเอียดทะเบียนงบประมาณ`, 'info');
  };

  const handleDrilldownReports = () => {
    setActiveTab('REPORTS');
    showToast(`เปิดดูทะเบียนส่งงานและรายงานผล`, 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Executive Welcome & Context Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-2xl p-6 shadow-sm border border-blue-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <Activity className="w-64 h-64 text-amber-400" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              Executive Cockpit · พ.ศ. {fiscalYear === 'ALL' ? 'ทุกปีงบประมาณ' : fiscalYear}
            </span>
            <span className="text-xs text-slate-300">
              ผู้ว่าราชการจังหวัด / พัฒนาการจังหวัดน่าน
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-prompt text-white tracking-tight">
            ระบบติดตามผลการดำเนินงานและงบประมาณพัฒนาชุมชนจังหวัดน่าน
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            ศูนย์รวมข้อมูลบูรณาการ 4 กลุ่มงาน 1 ฝ่าย และสำนักงานพัฒนาชุมชนอำเภอทั้ง 15 อำเภอ สนับสนุนการตัดสินใจเชิงยุทธศาสตร์ด้วยข้อมูลจริง (Data-Driven Governance)
          </p>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Projects */}
        <div
          onClick={() => handleDrilldownProjects()}
          className="bg-white rounded-xl p-4 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-medium text-slate-600">โครงการทั้งหมด</span>
            <FolderKanban className="w-4 h-4 text-blue-800 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {totalProjects}
            </span>
            <span className="text-xs text-slate-500">โครงการ</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>เสร็จสิ้น {statusCounts.COMPLETED}</span>
            <span>·</span>
            <span>กำลังทำ {statusCounts.IN_PROGRESS}</span>
            <span>·</span>
            <span className="text-blue-800 font-medium group-hover:underline flex items-center">
              ดูทั้งหมด <ChevronRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Budget Allocation & Disbursement */}
        <div
          onClick={handleDrilldownBudget}
          className="bg-white rounded-xl p-4 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-medium text-slate-600">เบิกจ่ายงบประมาณสะสม</span>
            <Coins className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {budgetSummary.disbursePercent}%
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              {(budgetSummary.disbursed / 1000000).toFixed(2)}M / {(budgetSummary.allocated / 1000000).toFixed(2)}M
            </span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>ผูกพัน {budgetSummary.commitPercent}%</span>
            <span>·</span>
            <span className="text-slate-600">คงเหลือ ฿{(budgetSummary.remaining).toLocaleString('th-TH')}</span>
          </div>
        </div>

        {/* Activities Milestone Progress */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/90">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-medium text-slate-600">ความก้าวหน้ากิจกรรม</span>
            <Activity className="w-4 h-4 text-amber-700" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {activityStats.percentDone}%
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              {activityStats.done} / {activityStats.total} กิจกรรม
            </span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-700">สำเร็จ {activityStats.done}</span>
            <span>·</span>
            <span className="text-amber-700">รอดำเนินการ {activityStats.pending}</span>
            <span>·</span>
            <span className="text-red-700">ล่าช้า {activityStats.delayed}</span>
          </div>
        </div>

        {/* Delayed & Overdue Reports Alert */}
        <div 
          onClick={handleDrilldownReports}
          className={`rounded-xl p-4 border transition-all cursor-pointer group ${
            overdueReports.length > 0 || atRiskProjects.length > 0
              ? 'bg-red-50/50 border-red-200 hover:border-red-300'
              : 'bg-white border-slate-200/90'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-medium text-slate-600">รายการที่ต้องติดตามเร่งด่วน</span>
            <AlertTriangle className={`w-4 h-4 ${overdueReports.length > 0 ? 'text-red-600' : 'text-slate-400'}`} />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-red-700 tabular-nums">
              {overdueReports.length + atRiskProjects.length}
            </span>
            <span className="text-xs text-slate-500">รายการแจ้งเตือน</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="text-red-700">รายงานค้างส่ง {overdueReports.length}</span>
            <span>·</span>
            <span className="text-amber-700">โครงการเสี่ยง {atRiskProjects.length}</span>
          </div>
        </div>

      </div>

      {/* Policy 5+1 Strategic Goals Section */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-900" />
              <h2 className="text-base font-bold font-prompt text-blue-950">
                ผลการดำเนินงานตามนโยบาย 5+1 กรมการพัฒนาชุมชน/จังหวัดน่าน
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              ติดตามตัวชี้วัดสำคัญระดับยุทธศาสตร์เพื่อการขับเคลื่อนเศรษฐกิจชุมชนและความเข้มแข็งของประชาชนน่าน
            </p>
          </div>
          <button
            onClick={() => setIsPolicyModalOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-950 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-800" />
            <span>ตั้งค่าเป้าหมายนโยบาย 5+1</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {policyIndicators.map(ind => {
            const pct = ind.targetValue > 0 ? Math.min(100, Math.round((ind.currentValue / ind.targetValue) * 100)) : 0;
            return (
              <div
                key={ind.id}
                className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-950 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                      {ind.policyNumber}
                    </span>
                    <h3 className="text-xs font-semibold text-slate-900 line-clamp-1" title={ind.title}>
                      {ind.title}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                      ind.status === 'ON_TRACK'
                        ? 'bg-emerald-50 text-emerald-700'
                        : ind.status === 'WARNING'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {pct}%
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {ind.description}
                </p>

                <div className="space-y-1">
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full ${pct >= 80 ? 'bg-emerald-600' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono tabular-nums">
                    <span>ผลงาน: {ind.currentValue.toLocaleString('th-TH')}</span>
                    <span>เป้า: {ind.targetValue.toLocaleString('th-TH')} {ind.unit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-Column Analytics Layout: Division Breakdown & Urgent Overdue Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Division Breakdown Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold font-prompt text-blue-950 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-900" />
                <span>ผลการดำเนินงานและงบประมาณเปรียบเทียบตามกลุ่มงาน</span>
              </h2>
              <p className="text-xs text-slate-500">คลิกที่แถวเพื่อกรองดูเฉพาะโครงการของกลุ่มงานนั้น</p>
            </div>
            <button
              onClick={() => handleDrilldownProjects()}
              className="text-xs text-blue-900 hover:text-blue-950 font-medium flex items-center gap-0.5"
            >
              <span>ดูตารางเต็ม</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 font-medium">
                  <th className="pb-2">กลุ่มงาน / ผู้อำนวยการ</th>
                  <th className="pb-2 text-center">โครงการ</th>
                  <th className="pb-2 text-right">งบจัดสรร</th>
                  <th className="pb-2 text-right">เบิกจ่ายสะสม</th>
                  <th className="pb-2 text-right">% เบิกจ่าย</th>
                  <th className="pb-2 text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {divisionStats.map(div => (
                  <tr
                    key={div.id}
                    onClick={() => handleDrilldownProjects(div.id)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5">
                      <div className="font-semibold text-slate-900">{div.name}</div>
                      <div className="text-[11px] text-slate-500">{div.head}</div>
                    </td>
                    <td className="py-2.5 text-center font-mono tabular-nums">
                      {div.totalProjects}
                    </td>
                    <td className="py-2.5 text-right font-mono tabular-nums text-slate-700">
                      ฿{div.allocated.toLocaleString('th-TH')}
                    </td>
                    <td className="py-2.5 text-right font-mono tabular-nums font-semibold text-slate-900">
                      ฿{div.disbursed.toLocaleString('th-TH')}
                    </td>
                    <td className="py-2.5 text-right font-mono tabular-nums">
                      <span className={`font-semibold ${div.disbursePercent >= 70 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {div.disbursePercent}%
                      </span>
                    </td>
                    <td className="py-2.5 text-center">
                      <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-700">
                        สำเร็จ {div.completedProjects}/{div.totalProjects}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Urgent Attention Items (Overdue Reports & At-Risk Projects) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold font-prompt text-blue-950 flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600" />
              <span>รายงานและโครงการที่ต้องเร่งรัด</span>
            </h2>
            <p className="text-xs text-slate-500">แจ้งเตือนงานค้างส่งและโครงการที่ติดขัด</p>
          </div>

          <div className="space-y-3">
            {overdueReports.length === 0 && atRiskProjects.length === 0 ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs text-center">
                <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                <span>ไม่มีรายงานค้างส่งหรือโครงการที่ล่าช้าในขณะนี้</span>
              </div>
            ) : (
              <>
                {overdueReports.map(rep => (
                  <div
                    key={rep.id}
                    onClick={handleDrilldownReports}
                    className="p-3 bg-red-50/60 border border-red-200 rounded-lg text-xs space-y-1 cursor-pointer hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-red-900">{rep.code}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-200 text-red-900 font-medium">
                        เลยกำหนดส่ง
                      </span>
                    </div>
                    <p className="text-slate-800 font-medium line-clamp-1">{rep.title}</p>
                    <p className="text-[11px] text-red-700">ครบกำหนด: {rep.dueDate} · {rep.remarks || 'กรุณาส่งด่วน'}</p>
                  </div>
                ))}

                {atRiskProjects.map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => handleDrilldownProjects(proj.divisionId)}
                    className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg text-xs space-y-1 cursor-pointer hover:bg-amber-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-amber-900">{proj.code}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-medium">
                        โครงการล่าช้า/เสี่ยง
                      </span>
                    </div>
                    <p className="text-slate-800 font-medium line-clamp-1">{proj.name}</p>
                    <p className="text-[11px] text-amber-800">
                      {proj.riskNotes || 'มีกิจกรรมล่าช้ากว่าแผนปฏิบัติการ'}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

      </div>

      {/* 15 Districts Performance Quick Overview */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-800" />
            <h2 className="text-sm font-bold font-prompt text-blue-950">
              สถานะการดำเนินงานเครือข่ายสำนักงานพัฒนาชุมชนอำเภอ 15 อำเภอ จังหวัดน่าน
            </h2>
          </div>
          <span className="text-xs text-slate-500">คลิกที่อำเภอเพื่อกรองดูข้อมูลเฉพาะพื้นที่</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {NAN_DISTRICTS.map(dist => {
            const isSelected = selectedDistrictId === dist.id;
            const distProjects = projects.filter(p => p.districtId === dist.id);
            return (
              <button
                key={dist.id}
                onClick={() => {
                  setSelectedDistrictId(isSelected ? 'ALL' : dist.id);
                  showToast(`กรองข้อมูลเฉพาะ อ.${dist.thaiName}`, 'info');
                }}
                className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-800'
                }`}
              >
                <div className="font-semibold truncate">อ.{dist.thaiName}</div>
                <div className={`text-[10px] ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                  {dist.subdistrictsCount} ตำบล · {dist.villagesCount} หมู่บ้าน
                </div>
                <div className={`mt-1 text-[10px] font-mono ${isSelected ? 'text-slate-200' : 'text-slate-600'}`}>
                  โครงการ: {distProjects.length} รายการ
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Policy Settings Modal */}
      <PolicySettingsModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
      />

    </div>
  );
};
