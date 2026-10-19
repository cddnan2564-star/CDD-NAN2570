import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CDD_DIVISIONS, NAN_DISTRICTS } from '../../data/initialData';
import { BudgetLedgerItem, BudgetTransferLog, DivisionId } from '../../types';
import { 
  Coins, 
  Plus, 
  Download, 
  Filter, 
  History, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRightLeft, 
  FileText, 
  Building2, 
  Calendar, 
  Eye, 
  Search,
  Printer,
  ShieldAlert,
  X
} from 'lucide-react';

export const BudgetTracking: React.FC = () => {
  const { 
    budgetLedgers, 
    addBudgetLedger, 
    updateBudgetLedger, 
    addBudgetTransfer, 
    projects,
    currentUser, 
    showToast,
    fiscalYear,
    selectedDivisionId,
    selectedDistrictId,
    searchQuery
  } = useApp();

  const [selectedLedger, setSelectedLedger] = useState<BudgetLedgerItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Transfer Form State
  const [transferForm, setTransferForm] = useState<{
    type: 'ADJUSTMENT' | 'TRANSFER_IN' | 'TRANSFER_OUT';
    amount: number;
    reason: string;
    authorizedBy: string;
    refDocument: string;
  }>({
    type: 'ADJUSTMENT',
    amount: 10000,
    reason: '',
    authorizedBy: currentUser.title,
    refDocument: ''
  });

  // Filter ledgers
  const filteredLedgers = useMemo(() => {
    return budgetLedgers.filter(b => {
      if (fiscalYear !== 'ALL' && b.fiscalYear !== fiscalYear) return false;
      if (selectedDivisionId !== 'ALL' && b.divisionId !== selectedDivisionId) return false;
      if (selectedDistrictId !== 'ALL' && b.districtId !== selectedDistrictId && b.districtId !== 'ALL') return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = b.projectName.toLowerCase().includes(q);
        const matchesCode = b.projectCode?.toLowerCase().includes(q);
        const matchesDoc = b.docRefNo.toLowerCase().includes(q);
        const matchesSource = b.budgetSource.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesDoc && !matchesSource) return false;
      }
      return true;
    });
  }, [budgetLedgers, fiscalYear, selectedDivisionId, selectedDistrictId, searchQuery]);

  // Aggregate Calculations
  const grandTotals = useMemo(() => {
    let allocated = 0;
    let committed = 0;
    let disbursed = 0;
    let planned = 0;

    filteredLedgers.forEach(b => {
      allocated += b.allocatedAmount;
      committed += b.committedAmount;
      disbursed += b.disbursedAmount;
      planned += (b.plannedQuarterly.q1 + b.plannedQuarterly.q2 + b.plannedQuarterly.q3 + b.plannedQuarterly.q4);
    });

    const remaining = allocated - disbursed;
    const disbursePct = allocated > 0 ? (disbursed / allocated) * 100 : 0;
    const commitPct = allocated > 0 ? (committed / allocated) * 100 : 0;
    const progressVsPlan = planned > 0 ? (disbursed / planned) * 100 : 0;

    return { allocated, committed, disbursed, remaining, disbursePct, commitPct, progressVsPlan };
  }, [filteredLedgers]);

  // Handle Transfer Submit
  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLedger) return;
    if (transferForm.amount <= 0) {
      showToast('กรุณาระบุจำนวนเงินที่ถูกต้อง', 'error');
      return;
    }
    if (!transferForm.reason.trim()) {
      showToast('กรุณาระบุเหตุผลและความจำเป็นในการโอนเปลี่ยนแปลง', 'error');
      return;
    }

    addBudgetTransfer(selectedLedger.id, transferForm);
    setIsTransferModalOpen(false);

    // Refresh selected view
    const updated = budgetLedgers.find(b => b.id === selectedLedger.id);
    if (updated) setSelectedLedger(updated);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'ปีงบประมาณ',
      'รหัส/ชื่อโครงการ',
      'กลุ่มงาน',
      'แหล่งงบประมาณ',
      'หมวดรายจ่าย',
      'งบจัดสรร (บาท)',
      'งบผูกพัน (บาท)',
      'เบิกจ่ายสะสม (บาท)',
      'งบคงเหลือ (บาท)',
      'ร้อยละการเบิกจ่าย (%)',
      'เอกสารอ้างอิง',
      'ผู้ตรวจสอบ'
    ];

    const rows = filteredLedgers.map(b => {
      const remaining = b.allocatedAmount - b.disbursedAmount;
      const pct = b.allocatedAmount > 0 ? ((b.disbursedAmount / b.allocatedAmount) * 100).toFixed(2) : '0';
      return [
        b.fiscalYear,
        `"${(b.projectCode ? b.projectCode + ' ' : '') + b.projectName.replace(/"/g, '""')}"`,
        b.divisionId,
        `"${b.budgetSource}"`,
        `"${b.expenseCategory}"`,
        b.allocatedAmount,
        b.committedAmount,
        b.disbursedAmount,
        remaining,
        pct,
        `"${b.docRefNo}"`,
        `"${b.verifiedBy}"`
      ];
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CDD_Nan_Budget_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('ส่งออกทะเบียนงบประมาณ CSV เรียบร้อยแล้ว');
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
            <h1 className="text-lg font-bold font-prompt text-blue-950">
              ระบบติดตามงบประมาณ (Provincial Budget Ledger)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 pl-10">
            ทะเบียนคุมงบประมาณ การจัดสรร การผูกพัน การเบิกจ่าย และประวัติการโอนเปลี่ยนแปลงงบประมาณ
          </p>
        </div>

        <div className="flex items-center gap-2 pl-10 sm:pl-0 shrink-0">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ส่งออก CSV</span>
          </button>
        </div>
      </div>

      {/* Official System Disclaimer Notice */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-300/80 rounded-xl flex items-start gap-3 text-xs text-amber-950">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold">ข้อชี้แจงระบบการเงินและข้อมูลอ้างอิง:</span>
          <p className="text-slate-700 text-[11px] leading-relaxed">
            ข้อมูลในระบบนี้มาจากการบันทึกและตรวจสอบภายในของสำนักงานพัฒนาชุมชนจังหวัดน่าน เพื่อใช้เป็นฐานข้อมูลการบริหารงานและเร่งรัดติดตามผลการปฏิบัติราชการ <em>(มิได้เป็นการเชื่อมโยงโดยตรงกับระบบการบริหารการเงินการคลังภาครัฐแบบอิเล็กทรอนิกส์ใหม่ GFMIS)</em> การอ้างอิงทางกฎหมายให้ยึดตามเอกสารทางราชการและใบเสร็จรับเงินฉบับจริง
          </p>
        </div>
      </div>

      {/* 4 Cards: Financial Math Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 block">งบประมาณจัดสรรทั้งหมด</span>
          <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            ฿{grandTotals.allocated.toLocaleString('th-TH')}
          </span>
          <div className="text-[11px] text-slate-500 mt-1">
            แผนทั้ง 4 ไตรมาส
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 block">ยอดผูกพันงบประมาณ (PO/สัญญา)</span>
          <span className="text-2xl font-bold font-mono text-amber-900 tabular-nums">
            ฿{grandTotals.committed.toLocaleString('th-TH')}
          </span>
          <div className="text-[11px] text-amber-800 mt-1">
            คิดเป็น {grandTotals.commitPct.toFixed(1)}% ของงบจัดสรร
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 block">ผลการเบิกจ่ายสะสม (Disbursed)</span>
          <span className="text-2xl font-bold font-mono text-emerald-800 tabular-nums">
            ฿{grandTotals.disbursed.toLocaleString('th-TH')}
          </span>
          <div className="text-[11px] text-emerald-800 mt-1">
            เบิกจ่ายแล้ว {grandTotals.disbursePct.toFixed(1)}% (เทียบแผน {grandTotals.progressVsPlan.toFixed(1)}%)
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 block">งบประมาณคงเหลือ (Remaining)</span>
          <span className="text-2xl font-bold font-mono text-blue-950 tabular-nums">
            ฿{grandTotals.remaining.toLocaleString('th-TH')}
          </span>
          <div className="text-[11px] text-slate-500 mt-1">
            สูตร: จัดสรร - ยอดเบิกจ่ายสะสม
          </div>
        </div>
      </div>

      {/* Main Budget Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-800">
            ทะเบียนงบประมาณรายโครงการ ({filteredLedgers.length} รายการ)
          </span>
          <span className="text-[11px] text-slate-500">
            * ยอดผูกพันแยกต่างหากจากยอดเบิกจ่าย ไม่นำมารวมกันโดยอัตโนมัติ
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">โครงการ / แหล่งงบประมาณ</th>
                <th className="py-3 px-3">กลุ่มงาน</th>
                <th className="py-3 px-3 text-right">งบจัดสรร</th>
                <th className="py-3 px-3 text-right">ยอดผูกพัน</th>
                <th className="py-3 px-3 text-right">เบิกจ่ายสะสม</th>
                <th className="py-3 px-3 text-right">งบคงเหลือ</th>
                <th className="py-3 px-3 text-right">% เบิกจ่าย</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLedgers.map(item => {
                const remaining = item.allocatedAmount - item.disbursedAmount;
                const disbursePct = item.allocatedAmount > 0 
                  ? ((item.disbursedAmount / item.allocatedAmount) * 100).toFixed(1) 
                  : '0.0';
                const div = CDD_DIVISIONS.find(d => d.id === item.divisionId);

                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedLedger(item)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4 max-w-xs sm:max-w-md">
                      <div className="font-semibold text-slate-900 group-hover:text-blue-950">
                        {item.projectName}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-blue-900">{item.projectCode || '-'}</span>
                        <span>·</span>
                        <span>{item.budgetSource}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                      {div?.shortName || item.divisionId}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-800 whitespace-nowrap">
                      ฿{item.allocatedAmount.toLocaleString('th-TH')}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-amber-800 whitespace-nowrap">
                      ฿{item.committedAmount.toLocaleString('th-TH')}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-emerald-800 whitespace-nowrap">
                      ฿{item.disbursedAmount.toLocaleString('th-TH')}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-slate-900 whitespace-nowrap">
                      ฿{remaining.toLocaleString('th-TH')}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums whitespace-nowrap">
                      <span className={`font-semibold ${Number(disbursePct) >= 70 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {disbursePct}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLedger(item);
                        }}
                        className="p-1 text-slate-500 hover:text-blue-900 hover:bg-slate-100 rounded"
                        title="ดูรายละเอียดและประวัติโอน"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Ledger Details & Budget Transfer History Modal */}
      {selectedLedger && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-blue-900" />
                <h3 className="font-semibold text-slate-900 text-base">
                  รายละเอียดทะเบียนคุมงบประมาณ
                </h3>
              </div>
              <button
                onClick={() => setSelectedLedger(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs">
              <div>
                <span className="font-mono text-blue-800 text-[11px] font-semibold">{selectedLedger.projectCode || 'รหัสภายใน'}</span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">{selectedLedger.projectName}</h2>
                <p className="text-slate-500 mt-1">แหล่งงบ: {selectedLedger.budgetSource} · หมวด: {selectedLedger.expenseCategory}</p>
              </div>

              {/* Formula & Financial Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <div>
                  <span className="text-slate-500 block text-[11px]">งบจัดสรร</span>
                  <span className="font-bold font-mono text-slate-900 text-sm">
                    ฿{selectedLedger.allocatedAmount.toLocaleString('th-TH')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">ยอดผูกพัน (PO)</span>
                  <span className="font-bold font-mono text-amber-800 text-sm">
                    ฿{selectedLedger.committedAmount.toLocaleString('th-TH')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">เบิกจ่ายสะสม</span>
                  <span className="font-bold font-mono text-emerald-800 text-sm">
                    ฿{selectedLedger.disbursedAmount.toLocaleString('th-TH')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">งบคงเหลือจริง</span>
                  <span className="font-bold font-mono text-blue-950 text-sm">
                    ฿{(selectedLedger.allocatedAmount - selectedLedger.disbursedAmount).toLocaleString('th-TH')}
                  </span>
                </div>
              </div>

              {/* Quarterly Plan Breakdown */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">แผนการเบิกจ่ายรายไตรมาส (พ.ศ. {selectedLedger.fiscalYear})</h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">ไตรมาส 1 (ต.ค.-ธ.ค.)</span>
                    <span className="font-mono font-semibold text-slate-800">
                      ฿{selectedLedger.plannedQuarterly.q1.toLocaleString('th-TH')}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">ไตรมาส 2 (ม.ค.-มี.ค.)</span>
                    <span className="font-mono font-semibold text-slate-800">
                      ฿{selectedLedger.plannedQuarterly.q2.toLocaleString('th-TH')}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">ไตรมาส 3 (เม.ย.-มิ.ย.)</span>
                    <span className="font-mono font-semibold text-slate-800">
                      ฿{selectedLedger.plannedQuarterly.q3.toLocaleString('th-TH')}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">ไตรมาส 4 (ก.ค.-ก.ย.)</span>
                    <span className="font-mono font-semibold text-slate-800">
                      ฿{selectedLedger.plannedQuarterly.q4.toLocaleString('th-TH')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Official References */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 text-[11px] text-slate-600">
                <div>เลขที่เอกสารอ้างอิง: <strong className="text-slate-800">{selectedLedger.docRefNo}</strong></div>
                <div>วันที่เอกสาร: <strong>{selectedLedger.docDate}</strong> · ผู้บันทึก: <strong>{selectedLedger.recordedBy}</strong> · ผู้ตรวจสอบ: <strong>{selectedLedger.verifiedBy}</strong></div>
              </div>

              {/* Transfer History / Budget Adjustments */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <History className="w-4 h-4 text-slate-500" />
                    <span>ประวัติการโอนเปลี่ยนแปลงงบประมาณ ({selectedLedger.transferHistory.length} รายการ)</span>
                  </h4>
                  <button
                    onClick={() => setIsTransferModalOpen(true)}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-xs font-medium flex items-center gap-1"
                  >
                    <ArrowRightLeft className="w-3 h-3" />
                    <span>บันทึกโอนเปลี่ยนแปลง</span>
                  </button>
                </div>

                {selectedLedger.transferHistory.length === 0 ? (
                  <p className="text-slate-400 italic py-2">ยังไม่มีประวัติการโอนเปลี่ยนแปลงงบประมาณ</p>
                ) : (
                  <div className="space-y-2">
                    {selectedLedger.transferHistory.map(tr => (
                      <div key={tr.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] space-y-1">
                        <div className="flex justify-between font-semibold">
                          <span className={tr.type === 'TRANSFER_IN' ? 'text-emerald-700' : tr.type === 'TRANSFER_OUT' ? 'text-red-700' : 'text-blue-900'}>
                            {tr.type === 'TRANSFER_IN' ? 'โอนเพิ่ม (+)' : tr.type === 'TRANSFER_OUT' ? 'โอนลด (-)' : 'ปรับแผนรายการ'} ฿{tr.amount.toLocaleString('th-TH')}
                          </span>
                          <span className="text-slate-500 font-mono">{tr.date}</span>
                        </div>
                        <p className="text-slate-700">{tr.reason}</p>
                        <div className="text-slate-500 text-[10px]">
                          ผู้อนุมัติ: {tr.authorizedBy} · อ้างอิง: {tr.refDocument}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedLedger(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Budget Transfer Form Modal */}
      {isTransferModalOpen && selectedLedger && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-5 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-amber-700" />
              <span>บันทึกการโอนเปลี่ยนแปลงงบประมาณ</span>
            </h3>

            <p className="text-slate-600">
              โครงการ: <strong>{selectedLedger.projectName}</strong>
            </p>

            <form onSubmit={handleTransferSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">ประเภทรายการ</label>
                <select
                  value={transferForm.type}
                  onChange={e => setTransferForm({ ...transferForm, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="ADJUSTMENT">ปรับแผนรายการภายในโครงการ (วงเงินรวมเท่าเดิม)</option>
                  <option value="TRANSFER_IN">โอนเพิ่มงบประมาณ (+)</option>
                  <option value="TRANSFER_OUT">โอนลดย้ายไปโครงการอื่น (-)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">จำนวนเงิน (บาท) *</label>
                <input
                  type="number"
                  value={transferForm.amount}
                  onChange={e => setTransferForm({ ...transferForm, amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">เหตุผลและความจำเป็น *</label>
                <textarea
                  value={transferForm.reason}
                  onChange={e => setTransferForm({ ...transferForm, reason: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  placeholder="ระบุเหตุผล เช่น เกลี่ยค่าใช้จ่ายจากกิจกรรมที่ 1 ไปกิจกรรมที่ 2..."
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">เลขที่หนังสืออนุมัติ/คำสั่ง *</label>
                <input
                  type="text"
                  value={transferForm.refDocument}
                  onChange={e => setTransferForm({ ...transferForm, refDocument: e.target.value })}
                  placeholder="เช่น บันทึกข้อความ ที่ นน 0019/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">ผู้มีอำนาจอนุมัติ</label>
                <input
                  type="text"
                  value={transferForm.authorizedBy}
                  onChange={e => setTransferForm({ ...transferForm, authorizedBy: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-lg"
                >
                  บันทึกรายการโอน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
