import React, { useState, useMemo } from 'react';
import { useApp, getReportStatusThai } from '../../context/AppContext';
import { CDD_DIVISIONS, NAN_DISTRICTS } from '../../data/initialData';
import { ReportRegistryItem, ReportStatus, DivisionId } from '../../types';
import { 
  FileCheck2, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Bell, 
  Send, 
  FileText, 
  Building2, 
  Calendar,
  X,
  UploadCloud,
  CheckSquare
} from 'lucide-react';

export const ReportRegistry: React.FC = () => {
  const { 
    reports, 
    addReport, 
    updateReportStatus, 
    currentUser, 
    showToast,
    fiscalYear,
    selectedDivisionId,
    selectedDistrictId,
    searchQuery,
    setGoogleDriveModalOpen
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<ReportStatus | 'ALL'>('ALL');
  const [selectedReport, setSelectedReport] = useState<ReportRegistryItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);

  // Submit report form
  const [submitForm, setSubmitForm] = useState({
    driveFileUrl: '',
    remarks: ''
  });

  // New report form
  const [newReportForm, setNewReportForm] = useState<{
    code: string;
    title: string;
    divisionId: DivisionId;
    districtId: string;
    responsibleOfficer: string;
    compilerName: string;
    reviewerName: string;
    periodType: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'ADHOC' | 'KPI';
    periodLabel: string;
    dueDate: string;
    driveFileUrl: string;
    remarks: string;
    status: ReportStatus;
  }>({
    code: `รป-น่าน-${Date.now().toString().slice(-4)}`,
    title: '',
    divisionId: 'STRATEGY',
    districtId: 'ALL',
    responsibleOfficer: currentUser.name,
    compilerName: `${currentUser.name} (${currentUser.title})`,
    reviewerName: 'ผู้อำนวยการกลุ่มงาน',
    periodType: 'MONTHLY',
    periodLabel: 'ประจำเดือนปัจจุบัน',
    dueDate: '2026-10-31',
    driveFileUrl: '',
    remarks: '',
    status: 'IN_PROGRESS'
  });

  // Dynamic filter
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      if (selectedDivisionId !== 'ALL' && r.divisionId !== selectedDivisionId) return false;
      if (selectedDistrictId !== 'ALL' && r.districtId !== selectedDistrictId && r.districtId !== 'ALL') return false;
      if (filterStatus !== 'ALL' && r.status !== filterStatus) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesCode = r.code.toLowerCase().includes(q);
        const matchesOfficer = r.responsibleOfficer.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCode && !matchesOfficer) return false;
      }
      return true;
    });
  }, [reports, selectedDivisionId, selectedDistrictId, filterStatus, searchQuery]);

  // Urgency Breakdown
  const overdueCount = reports.filter(r => r.status === 'DELAYED').length;
  const verifiedCount = reports.filter(r => r.status === 'VERIFIED').length;
  const submittedCount = reports.filter(r => r.status === 'SUBMITTED' || r.status === 'AWAITING_REVIEW').length;
  const inProgressCount = reports.filter(r => r.status === 'IN_PROGRESS' || r.status === 'NOT_STARTED').length;

  const handleOpenSubmitModal = (report: ReportRegistryItem) => {
    setSelectedReport(report);
    setSubmitForm({
      driveFileUrl: report.driveFileUrl || '',
      remarks: report.remarks || ''
    });
    setIsSubmitModalOpen(true);
  };

  const handleSaveSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;
    if (!submitForm.driveFileUrl.trim()) {
      showToast('กรุณาระบุลิงก์ไฟล์รายงานหรือโฟลเดอร์ Google Drive', 'error');
      return;
    }

    updateReportStatus(selectedReport.id, 'SUBMITTED', submitForm.driveFileUrl, submitForm.remarks);
    setIsSubmitModalOpen(false);
  };

  const handleVerifyReport = (reportId: string) => {
    if (currentUser.role !== 'EXECUTIVE' && currentUser.role !== 'DIVISION_HEAD' && currentUser.role !== 'ADMIN') {
      showToast('เฉพาะหัวหน้ากลุ่มงาน ผู้บริหาร หรือ Admin เท่านั้นที่มีสิทธิ์ตรวจรับรองรายงาน', 'error');
      return;
    }
    updateReportStatus(reportId, 'VERIFIED');
    showToast('ตรวจสอบและรับรองความถูกต้องของรายงานเรียบร้อยแล้ว');
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReportForm.title.trim()) {
      showToast('กรุณากรอกชื่อรายงาน', 'error');
      return;
    }

    addReport({
      ...newReportForm,
      isDemo: true
    });
    setIsNewReportModalOpen(false);
  };

  const renderStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'NOT_STARTED':
        return <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-600">ยังไม่เริ่ม</span>;
      case 'IN_PROGRESS':
        return <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-blue-50 text-blue-700 border border-blue-200">กำลังจัดทำ</span>;
      case 'SUBMITTED':
        return <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-purple-50 text-purple-700 border border-purple-200">ส่งแล้ว</span>;
      case 'AWAITING_REVIEW':
        return <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">รอตรวจสอบ</span>;
      case 'RETURNED':
        return <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-orange-50 text-orange-700 border border-orange-200">ส่งกลับแก้ไข</span>;
      case 'VERIFIED':
        return <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-emerald-100 text-emerald-800 font-semibold">ตรวจสอบแล้ว</span>;
      case 'DELAYED':
        return <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-red-100 text-red-800 font-semibold flex items-center gap-1">
          <AlertTriangle className="w-2.5 h-2.5" /> ล่าช้า
        </span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h1 className="text-lg font-bold font-prompt text-blue-950">
              ระบบรายงานผลและทะเบียนส่งงาน (Reporting Registry & Deadline Monitor)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 pl-10">
            ทะเบียนกำกับรอบรายงานประจำเดือน ไตรมาส ประจำปี แจ้งเตือนล่วงหน้า 3 วัน และติดตามงานค้างส่ง
          </p>
        </div>

        <button
          onClick={() => setIsNewReportModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-950 hover:bg-blue-900 rounded-lg transition-colors shadow-xs cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>เพิ่มรอบรายงานใหม่</span>
        </button>
      </div>

      {/* 4 Cards: Dashboard of Submissions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>รายงานทั้งหมด</span>
            <FileText className="w-4 h-4 text-blue-900" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {reports.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">ทะเบียนรายงานประจำปี</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>เกินกำหนดส่ง (Overdue)</span>
            <Clock className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-red-700 tabular-nums">
            {overdueCount}
          </div>
          <div className="text-[11px] text-red-700 mt-1">ต้องเร่งรัดติดตามด่วน</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>ส่งแล้ว / รอตรวจสอบ</span>
            <Send className="w-4 h-4 text-purple-700" />
          </div>
          <div className="text-2xl font-bold font-mono text-purple-800 tabular-nums">
            {submittedCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">รอการรับรองจากผู้ตรวจสอบ</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>ตรวจสอบและรับรองแล้ว</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-800 tabular-nums">
            {verifiedCount}
          </div>
          <div className="text-[11px] text-emerald-700 mt-1">ผ่านเกณฑ์สมบูรณ์ครบถ้วน</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilterStatus('ALL')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium cursor-pointer ${
            filterStatus === 'ALL'
              ? 'bg-blue-950 text-white font-semibold'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          ทุกสถานะ ({reports.length})
        </button>
        {(['DELAYED', 'IN_PROGRESS', 'SUBMITTED', 'VERIFIED'] as ReportStatus[]).map(st => {
          const count = reports.filter(r => r.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium cursor-pointer ${
                filterStatus === st
                  ? 'bg-blue-950 text-white font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {getReportStatusThai(st)} ({count})
            </button>
          );
        })}
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-800">
            รายการทะเบียนรายงาน ({filteredReports.length} รายการ)
          </span>
          <span className="text-[11px] text-blue-900 font-medium flex items-center gap-1">
            <Bell className="w-3.5 h-3.5" />
            <span>ระบบแจ้งเตือนอัตโนมัติล่วงหน้า 3 วันและป้องกันการส่งซ้ำ</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">รหัส / ชื่อรายงาน</th>
                <th className="py-3 px-3">รอบระยะเวลา</th>
                <th className="py-3 px-3">กลุ่มงาน / อำเภอ</th>
                <th className="py-3 px-3">ผู้จัดทำ / ผู้ตรวจ</th>
                <th className="py-3 px-3">กำหนดส่ง</th>
                <th className="py-3 px-3 text-center">สถานะ</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map(item => {
                const div = CDD_DIVISIONS.find(d => d.id === item.divisionId);
                const isOverdue = item.status === 'DELAYED';

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/40 transition-colors group"
                  >
                    <td className="py-3 px-4 max-w-sm">
                      <div className="font-semibold text-slate-900 group-hover:text-blue-950">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                        <span className="text-blue-900">{item.code}</span>
                        {item.remarks && (
                          <span className="truncate text-amber-800">· {item.remarks}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                      {item.periodLabel}
                    </td>
                    <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                      {div?.shortName || item.divisionId}
                    </td>
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      <div>{item.compilerName}</div>
                      <div className="text-[10px] text-slate-400">ตรวจ: {item.reviewerName}</div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono">
                      <span className={isOverdue ? 'font-bold text-red-700' : 'text-slate-700'}>
                        {item.dueDate}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      {renderStatusBadge(item.status)}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {item.driveFileUrl && (
                          <a
                            href={item.driveFileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded"
                            title="เปิดไฟล์ Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() => handleOpenSubmitModal(item)}
                          className="px-2.5 py-1 bg-blue-950 text-white rounded text-[11px] font-medium hover:bg-blue-900 transition-colors"
                        >
                          {item.driveFileUrl ? 'อัปเดตไฟล์' : 'แนบส่งงาน'}
                        </button>

                        {item.status === 'SUBMITTED' && (
                          <button
                            onClick={() => handleVerifyReport(item.id)}
                            className="px-2 py-1 bg-emerald-700 text-white rounded text-[11px] font-medium hover:bg-emerald-800 transition-colors"
                            title="ตรวจรับรองรายงาน"
                          >
                            รับรอง
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Report Modal */}
      {isSubmitModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-blue-900" />
                <span>แนบส่งรายงานและเอกสารหลักฐาน</span>
              </h3>
              <button onClick={() => setIsSubmitModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-blue-900">{selectedReport.code}</span>
              <p className="font-semibold text-slate-900 text-xs">{selectedReport.title}</p>
              <p className="text-slate-500 text-[11px]">กำหนดส่ง: {selectedReport.dueDate} · รอบ: {selectedReport.periodLabel}</p>
            </div>

            <form onSubmit={handleSaveSubmission} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  ลิงก์ไฟล์รายงานหรือโฟลเดอร์ใน Google Drive *
                </label>
                <input
                  type="url"
                  value={submitForm.driveFileUrl}
                  onChange={e => setSubmitForm({ ...submitForm, driveFileUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setGoogleDriveModalOpen(true)}
                  className="text-[11px] text-blue-700 hover:underline mt-1 block"
                >
                  💡 คลิกเพื่อดูคู่มือและตรวจสอบลิงก์ Google Drive
                </button>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">หมายเหตุ / ข้อมูลเพิ่มเติม</label>
                <textarea
                  value={submitForm.remarks}
                  onChange={e => setSubmitForm({ ...submitForm, remarks: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  placeholder="ระบุความคืบหน้า หรือข้อมูลที่รอเพิ่มเติม..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-medium text-white bg-blue-950 hover:bg-blue-900 rounded-lg"
                >
                  ยืนยันส่งรายงาน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Report Modal */}
      {isNewReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                สร้างทะเบียนรอบส่งรายงานใหม่
              </h3>
              <button onClick={() => setIsNewReportModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">กลุ่มงานรับผิดชอบ *</label>
                  <select
                    value={newReportForm.divisionId}
                    onChange={e => setNewReportForm({ ...newReportForm, divisionId: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {CDD_DIVISIONS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">ประเภทรายงาน</label>
                  <select
                    value={newReportForm.periodType}
                    onChange={e => setNewReportForm({ ...newReportForm, periodType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="MONTHLY">รายงานประจำเดือน</option>
                    <option value="QUARTERLY">รายงานประจำไตรมาส</option>
                    <option value="ANNUAL">รายงานประจำปี</option>
                    <option value="KPI">รายงานตามตัวชี้วัด</option>
                    <option value="ADHOC">รายงานเฉพาะกิจ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">ชื่อรายงาน *</label>
                <input
                  type="text"
                  value={newReportForm.title}
                  onChange={e => setNewReportForm({ ...newReportForm, title: e.target.value })}
                  placeholder="เช่น รายงานความก้าวหน้าโครงการ OTOP ประจำเดือนเมษายน 2568"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">รอบระยะเวลา</label>
                  <input
                    type="text"
                    value={newReportForm.periodLabel}
                    onChange={e => setNewReportForm({ ...newReportForm, periodLabel: e.target.value })}
                    placeholder="เช่น ประจำเดือนเมษายน 2568"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">วันครบกำหนดส่ง *</label>
                  <input
                    type="date"
                    value={newReportForm.dueDate}
                    onChange={e => setNewReportForm({ ...newReportForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">ผู้จัดทำ</label>
                  <input
                    type="text"
                    value={newReportForm.compilerName}
                    onChange={e => setNewReportForm({ ...newReportForm, compilerName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">ผู้ตรวจสอบ</label>
                  <input
                    type="text"
                    value={newReportForm.reviewerName}
                    onChange={e => setNewReportForm({ ...newReportForm, reviewerName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewReportModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-medium text-white bg-blue-950 hover:bg-blue-900 rounded-lg"
                >
                  บันทึกทะเบียนรายงาน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
