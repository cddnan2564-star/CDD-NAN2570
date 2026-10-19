import React, { useState, useMemo } from 'react';
import { useApp, getStatusThai } from '../../context/AppContext';
import { CDD_DIVISIONS, NAN_DISTRICTS } from '../../data/initialData';
import { ProjectItem, ProjectStatus, ActivityMilestone, DivisionId } from '../../types';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  ChevronRight, 
  FileText, 
  Calendar, 
  User, 
  Coins, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  Send,
  XCircle,
  FileCheck,
  CheckSquare,
  AlertTriangle,
  History,
  X
} from 'lucide-react';

export const ProjectManagement: React.FC = () => {
  const { 
    projects, 
    addProject, 
    updateProject, 
    changeProjectStatus, 
    updateActivity, 
    addActivity,
    currentUser, 
    fiscalYear, 
    selectedDivisionId, 
    selectedDistrictId, 
    searchQuery,
    showToast,
    setGoogleDriveModalOpen
  } = useApp();

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'ALL'>('ALL');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isStatusActionModalOpen, setIsStatusActionModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<ProjectStatus | null>(null);
  const [statusActionNote, setStatusActionNote] = useState('');

  // Activity Edit/Log State
  const [editingActivity, setEditingActivity] = useState<ActivityMilestone | null>(null);

  // New Project Form
  const [newProjectForm, setNewProjectForm] = useState({
    code: `นน-${Date.now().toString().slice(-4)}`,
    name: '',
    fiscalYear: typeof fiscalYear === 'number' ? fiscalYear : 2568,
    divisionId: 'STRATEGY' as DivisionId,
    districtId: 'ALL',
    budgetSource: 'งบกรมการพัฒนาชุมชน',
    budgetCategory: 'งบดำเนินงาน',
    proposedBudget: 100000,
    approvedBudget: 100000,
    rationale: '',
    objectives: [''],
    targetGroups: '',
    targetArea: 'จังหวัดน่าน',
    expectedOutcomes: [''],
    mainOfficer: currentUser.name,
    coordinator: '',
    googleDriveUrl: '',
    status: 'DRAFT' as ProjectStatus,
    isAtRisk: false,
    riskNotes: '',
    activities: [
      {
        id: 'act-1',
        title: 'กิจกรรมที่ 1: เตรียมการและประสานงานพื้นที่',
        plannedStartDate: '2568-01-01',
        plannedEndDate: '2568-01-15',
        targetParticipants: 30,
        targetUnit: 'คน',
        status: 'PENDING' as const,
        location: 'สำนักงานพัฒนาชุมชน'
      }
    ],
    isDemo: true
  });

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (fiscalYear !== 'ALL' && p.fiscalYear !== fiscalYear) return false;
      if (selectedDivisionId !== 'ALL' && p.divisionId !== selectedDivisionId) return false;
      if (selectedDistrictId !== 'ALL' && p.districtId !== selectedDistrictId && p.districtId !== 'ALL') return false;
      if (filterStatus !== 'ALL' && p.status !== filterStatus) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCode = p.code.toLowerCase().includes(q);
        const matchesOfficer = p.mainOfficer.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesOfficer) return false;
      }
      return true;
    });
  }, [projects, fiscalYear, selectedDivisionId, selectedDistrictId, filterStatus, searchQuery]);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.name.trim()) {
      showToast('กรุณากรอกชื่อโครงการ', 'error');
      return;
    }

    addProject({
      ...newProjectForm,
      objectives: newProjectForm.objectives.filter(o => o.trim() !== ''),
      expectedOutcomes: newProjectForm.expectedOutcomes.filter(o => o.trim() !== '')
    });

    setIsNewProjectModalOpen(false);
  };

  const handleOpenStatusModal = (status: ProjectStatus) => {
    setTargetStatus(status);
    setStatusActionNote('');
    setIsStatusActionModalOpen(true);
  };

  const handleExecuteStatusChange = () => {
    if (!selectedProject || !targetStatus) return;
    const success = changeProjectStatus(selectedProject.id, targetStatus, statusActionNote);
    if (success) {
      // update local selected project
      const updated = projects.find(p => p.id === selectedProject.id);
      if (updated) setSelectedProject({ ...updated, status: targetStatus });
      setIsStatusActionModalOpen(false);
    }
  };

  const handleSaveActivityUpdates = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !editingActivity) return;

    updateActivity(selectedProject.id, editingActivity.id, editingActivity);
    
    // Update local selectedProject view
    const updatedActivities = selectedProject.activities.map(a => 
      a.id === editingActivity.id ? editingActivity : a
    );
    setSelectedProject({ ...selectedProject, activities: updatedActivities });
    setEditingActivity(null);
  };

  // Status badge styling helper
  const renderStatusBadge = (status: ProjectStatus) => {
    const text = getStatusThai(status);
    switch (status) {
      case 'DRAFT':
        return <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-700">ฉบับร่าง</span>;
      case 'SUBMITTED':
        return <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-blue-50 text-blue-700 border border-blue-200">เสนอพิจารณา</span>;
      case 'REVISED':
        return <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-orange-50 text-orange-700 border border-orange-200">ส่งกลับแก้ไข</span>;
      case 'APPROVED':
        return <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">อนุมัติแล้ว</span>;
      case 'IN_PROGRESS':
        return <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-amber-50 text-amber-800 border border-amber-200">กำลังดำเนินการ</span>;
      case 'AWAITING_REPORT':
        return <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-purple-50 text-purple-700 border border-purple-200">รอรายงานผล</span>;
      case 'REPORT_VERIFYING':
        return <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">รอตรวจรายงาน</span>;
      case 'COMPLETED':
        return <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-green-100 text-green-800 font-semibold">เสร็จสิ้น</span>;
      case 'CANCELLED':
        return <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-red-50 text-red-700">ยกเลิก</span>;
      default:
        return <span>{text}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
            <h1 className="text-lg font-bold font-prompt text-blue-950">
              ระบบบริหารโครงการครบวงจร (End-to-End Project Lifecycle)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 pl-10">
            ติดตามโครงการพัฒนาชุมชนตั้งแต่เสนอขออนุมัติ แผนกิจกรรม รายงานผล จนถึงปิดโครงการและบันทึกประวัติการตรวจสอบ
          </p>
        </div>

        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-950 hover:bg-blue-900 rounded-lg transition-colors shadow-xs cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>บันทึกเสนอโครงการใหม่</span>
        </button>
      </div>

      {/* Status Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilterStatus('ALL')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium cursor-pointer ${
            filterStatus === 'ALL'
              ? 'bg-blue-950 text-white font-semibold'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          สถานะทั้งหมด ({projects.length})
        </button>
        {(['APPROVED', 'IN_PROGRESS', 'AWAITING_REPORT', 'COMPLETED', 'SUBMITTED', 'DRAFT'] as ProjectStatus[]).map(st => {
          const count = projects.filter(p => p.status === st).length;
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
              {getStatusThai(st)} ({count})
            </button>
          );
        })}
      </div>

      {/* Projects List & Details Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Project Cards / List (5 Cols on Large) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredProjects.length === 0 ? (
            <div className="p-10 bg-white rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
              ไม่พบโครงการตามตัวกรองที่เลือก
            </div>
          ) : (
            filteredProjects.map(proj => {
              const isSelected = selectedProject?.id === proj.id;
              const div = CDD_DIVISIONS.find(d => d.id === proj.divisionId);
              
              // Real computed progress based on activities
              const totalActs = proj.activities.length;
              const completedActs = proj.activities.filter(a => a.status === 'DONE').length;
              const progressPct = totalActs > 0 ? Math.round((completedActs / totalActs) * 100) : 0;

              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-600 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-blue-900 font-semibold text-[11px]">
                      {proj.code}
                    </span>
                    {renderStatusBadge(proj.status)}
                  </div>

                  <h3 className="font-bold text-slate-900 mt-1 line-clamp-2 leading-tight">
                    {proj.name}
                  </h3>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{div?.shortName}</span>
                    <span className="font-mono font-semibold text-slate-800">
                      ฿{proj.approvedBudget ? proj.approvedBudget.toLocaleString('th-TH') : proj.proposedBudget.toLocaleString('th-TH')}
                    </span>
                  </div>

                  {/* Progress bar based on real activities */}
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>กิจกรรมสำเร็จ {completedActs}/{totalActs}</span>
                      <span className="font-mono font-semibold text-slate-700">{progressPct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full ${progressPct === 100 ? 'bg-emerald-600' : 'bg-blue-800'}`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {proj.isAtRisk && (
                    <div className="mt-2 text-[10px] text-red-700 bg-red-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span className="truncate">{proj.riskNotes || 'โครงการมีความเสี่ยงล่าช้า'}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Selected Project Full Details & Lifecycle Actions (7 Cols on Large) */}
        <div className="lg:col-span-7">
          {selectedProject ? (
            <div className="bg-white rounded-xl border border-slate-200/90 p-5 space-y-6 text-xs shadow-xs">
              
              {/* Header with status and quick actions */}
              <div className="space-y-2 pb-4 border-b border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-900 text-xs px-2 py-0.5 bg-blue-50 rounded">
                      {selectedProject.code}
                    </span>
                    <span className="text-slate-500">ปีงบประมาณ พ.ศ. {selectedProject.fiscalYear}</span>
                  </div>
                  {renderStatusBadge(selectedProject.status)}
                </div>

                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  {selectedProject.name}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-slate-600 pt-1">
                  <span>ผู้รับผิดชอบ: <strong>{selectedProject.mainOfficer}</strong></span>
                  <span>·</span>
                  <span>พื้นที่: <strong>{selectedProject.targetArea}</strong></span>
                </div>
              </div>

              {/* Workflow Actions Bar */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5 text-xs">
                    <ShieldCheck className="w-4 h-4 text-blue-900" />
                    <span>การเปลี่ยนสถานะตามขั้นตอน (Workflow Action)</span>
                  </span>
                  <span className="text-[10px] text-slate-500">
                    ผู้ดำเนินการ: {currentUser.name} ({currentUser.title})
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedProject.status === 'DRAFT' && (
                    <button
                      onClick={() => handleOpenStatusModal('SUBMITTED')}
                      className="px-3 py-1.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 flex items-center gap-1 font-medium"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>เสนอพิจารณาโครงการ</span>
                    </button>
                  )}

                  {selectedProject.status === 'SUBMITTED' && (
                    <>
                      <button
                        onClick={() => handleOpenStatusModal('APPROVED')}
                        className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 flex items-center gap-1 font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>อนุมัติโครงการ (พจ.น่าน)</span>
                      </button>
                      <button
                        onClick={() => handleOpenStatusModal('REVISED')}
                        className="px-3 py-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-1 font-medium"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>ส่งกลับแก้ไข</span>
                      </button>
                    </>
                  )}

                  {selectedProject.status === 'APPROVED' && (
                    <button
                      onClick={() => handleOpenStatusModal('IN_PROGRESS')}
                      className="px-3 py-1.5 bg-blue-950 text-white rounded-lg hover:bg-blue-900 flex items-center gap-1 font-medium"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>เริ่มดำเนินกิจกรรมตามแผน</span>
                    </button>
                  )}

                  {selectedProject.status === 'IN_PROGRESS' && (
                    <button
                      onClick={() => handleOpenStatusModal('AWAITING_REPORT')}
                      className="px-3 py-1.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800 flex items-center gap-1 font-medium"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>ส่งรายงานผลดำเนินงาน</span>
                    </button>
                  )}

                  {selectedProject.status === 'AWAITING_REPORT' && (
                    <button
                      onClick={() => handleOpenStatusModal('REPORT_VERIFYING')}
                      className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 flex items-center gap-1 font-medium"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>ส่งตรวจสอบรายงานผล</span>
                    </button>
                  )}

                  {selectedProject.status === 'REPORT_VERIFYING' && (
                    <button
                      onClick={() => handleOpenStatusModal('COMPLETED')}
                      className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 flex items-center gap-1 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>รับรองรายงานและปิดโครงการ</span>
                    </button>
                  )}

                  {selectedProject.status !== 'COMPLETED' && selectedProject.status !== 'CANCELLED' && (
                    <button
                      onClick={() => handleOpenStatusModal('CANCELLED')}
                      className="px-2.5 py-1.5 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg text-xs"
                    >
                      ยกเลิกโครงการ
                    </button>
                  )}
                </div>
              </div>

              {/* Rationale & Objectives */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-900 text-xs mb-1">หลักการและเหตุผล</h4>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {selectedProject.rationale || '-'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 text-xs mb-1">วัตถุประสงค์โครงการ</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                    {selectedProject.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[11px]">แหล่งงบประมาณ</span>
                    <span className="font-medium text-slate-800">{selectedProject.budgetSource}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">งบประมาณที่ได้รับอนุมัติ</span>
                    <span className="font-bold font-mono text-slate-900">
                      ฿{(selectedProject.approvedBudget || selectedProject.proposedBudget).toLocaleString('th-TH')} บาท
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">กลุ่มเป้าหมาย</span>
                    <span className="font-medium text-slate-800">{selectedProject.targetGroups}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">โฟลเดอร์ Google Drive</span>
                    {selectedProject.googleDriveUrl ? (
                      <a
                        href={selectedProject.googleDriveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700 hover:underline flex items-center gap-1 mt-0.5 truncate"
                      >
                        <span>เปิด Drive เอกสารและภาพถ่าย</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-slate-400">ยังไม่ได้ระบุลิงก์</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Activity Milestones with Status & Evidence Links */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-blue-900" />
                    <span>แผนกิจกรรมและความก้าวหน้า ({selectedProject.activities.length} กิจกรรม)</span>
                  </h4>
                </div>

                <div className="space-y-2">
                  {selectedProject.activities.map((act, index) => (
                    <div
                      key={act.id}
                      className="p-3 border border-slate-200 rounded-lg hover:border-slate-300 transition-all bg-white space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-medium text-slate-900">
                          {act.title}
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-medium shrink-0 ${
                            act.status === 'DONE'
                              ? 'bg-emerald-50 text-emerald-700'
                              : act.status === 'DELAYED'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {act.status === 'DONE' ? 'ดำเนินการแล้ว' : act.status === 'DELAYED' ? 'ล่าช้า' : 'รอดำเนินการ'}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-4 text-[11px] text-slate-500">
                        <span>กำหนดการ: {act.plannedStartDate} ถึง {act.plannedEndDate}</span>
                        <span>เป้าหมาย: {act.targetParticipants} {act.targetUnit}</span>
                        {act.actualParticipants && (
                          <span className="font-semibold text-emerald-700">ผลจริง: {act.actualParticipants} {act.targetUnit}</span>
                        )}
                      </div>

                      {act.outputsSummary && (
                        <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded">
                          ผลผลิต/ผลลัพธ์: {act.outputsSummary}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                          {act.evidenceDriveLink && (
                            <a
                              href={act.evidenceDriveLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-blue-700 hover:underline flex items-center gap-1"
                            >
                              <span>หลักฐานใน Drive</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {act.photoDriveLink && (
                            <a
                              href={act.photoDriveLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-blue-700 hover:underline flex items-center gap-1"
                            >
                              <span>ภาพถ่ายกิจกรรม</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <button
                          onClick={() => setEditingActivity(act)}
                          className="text-[11px] text-blue-900 hover:underline font-medium"
                        >
                          บันทึกผลกิจกรรม
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Timeline / Audit History */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
                  <History className="w-4 h-4 text-slate-500" />
                  <span>ประวัติการดำเนินงานและไทม์ไลน์ (Audit Trail)</span>
                </h4>
                <div className="space-y-2 border-l-2 border-slate-200 pl-4 ml-2">
                  {selectedProject.statusHistory.map((hist, i) => (
                    <div key={hist.id} className="relative space-y-0.5 text-[11px]">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-900" />
                      <div className="flex items-center justify-between text-slate-500">
                        <span className="font-semibold text-slate-800">{hist.actionBy} ({hist.role})</span>
                        <span className="font-mono">{hist.timestamp}</span>
                      </div>
                      <p className="text-slate-700">{hist.note}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
              <FolderKanban className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="font-semibold text-sm text-slate-700">เลือกโครงการจากรายการทางซ้าย</p>
              <p className="text-xs mt-1">เพื่อดูข้อมูลโครงการ แผนกิจกรรม เปลี่ยนสถานะ และบันทึกหลักฐาน</p>
            </div>
          )}
        </div>

      </div>

      {/* Activity Result Log Modal */}
      {editingActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900 text-sm">
                บันทึกผลการดำเนินกิจกรรม: {editingActivity.title}
              </h3>
              <button onClick={() => setEditingActivity(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveActivityUpdates} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">สถานะกิจกรรม</label>
                  <select
                    value={editingActivity.status}
                    onChange={e => setEditingActivity({ ...editingActivity, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="PENDING">รอดำเนินการ</option>
                    <option value="IN_PROGRESS">กำลังดำเนินการ</option>
                    <option value="DONE">ดำเนินการแล้วเสร็จ</option>
                    <option value="DELAYED">ล่าช้ากว่ากำหนด</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">จำนวนผู้เข้าร่วมจริง</label>
                  <input
                    type="number"
                    value={editingActivity.actualParticipants || ''}
                    onChange={e => setEditingActivity({ ...editingActivity, actualParticipants: Number(e.target.value) })}
                    placeholder={`เป้าหมาย: ${editingActivity.targetParticipants} ${editingActivity.targetUnit}`}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">ผลผลิตและผลลัพธ์ที่เกิดขึ้นจริง</label>
                <textarea
                  value={editingActivity.outputsSummary || ''}
                  onChange={e => setEditingActivity({ ...editingActivity, outputsSummary: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  placeholder="ระบุผลสำเร็จ ชิ้นงาน หรือประโยชน์ที่กลุ่มเป้าหมายได้รับ..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">ปัญหาและอุปสรรค</label>
                  <input
                    type="text"
                    value={editingActivity.problemsAndObstacles || ''}
                    onChange={e => setEditingActivity({ ...editingActivity, problemsAndObstacles: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">ข้อเสนอแนะ/แนวทางแก้ไข</label>
                  <input
                    type="text"
                    value={editingActivity.recommendations || ''}
                    onChange={e => setEditingActivity({ ...editingActivity, recommendations: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">ลิงก์ Google Drive หลักฐาน/ภาพถ่าย</label>
                <input
                  type="url"
                  value={editingActivity.evidenceDriveLink || ''}
                  onChange={e => setEditingActivity({ ...editingActivity, evidenceDriveLink: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingActivity(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-900 rounded-lg font-medium hover:bg-blue-800"
                >
                  บันทึกกิจกรรม
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Status Change Confirmation Modal */}
      {isStatusActionModalOpen && targetStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-5 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-900" />
              <span>ยืนยันการเปลี่ยนสถานะโครงการ</span>
            </h3>

            <p className="text-slate-600">
              ต้องการเปลี่ยนสถานะของโครงการ <strong>{selectedProject?.code}</strong> เป็น <span className="font-bold text-blue-900">"{getStatusThai(targetStatus)}"</span>
            </p>

            <div>
              <label className="block text-slate-700 font-medium mb-1">บันทึกข้อคิดเห็น / เหตุผลในการดำเนินการ</label>
              <textarea
                value={statusActionNote}
                onChange={e => setStatusActionNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                placeholder="ระบุข้อสังเกต เงื่อนไข หรือมติการพิจารณา..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsStatusActionModalOpen(false)}
                className="px-3 py-1.5 text-slate-600 hover:text-slate-800"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleExecuteStatusChange}
                className="px-4 py-1.5 font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-lg"
              >
                ยืนยันการดำเนินการ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Project Proposal Modal */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900 text-base">
                แบบเสนอโครงการพัฒนาชุมชน (Proposal)
              </h3>
              <button onClick={() => setIsNewProjectModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">กลุ่มงานรับผิดชอบ *</label>
                  <select
                    value={newProjectForm.divisionId}
                    onChange={e => setNewProjectForm({ ...newProjectForm, divisionId: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {CDD_DIVISIONS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">พื้นที่ดำเนินการ *</label>
                  <select
                    value={newProjectForm.districtId}
                    onChange={e => setNewProjectForm({ ...newProjectForm, districtId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="ALL">ภาพรวมระดับจังหวัด (15 อำเภอ)</option>
                    {NAN_DISTRICTS.map(dist => (
                      <option key={dist.id} value={dist.id}>อ.{dist.thaiName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">ชื่อโครงการ *</label>
                <input
                  type="text"
                  value={newProjectForm.name}
                  onChange={e => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
                  placeholder="เช่น โครงการพัฒนาขีดความสามารถกลุ่มแปรรูปผลผลิตทางการเกษตร..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">แหล่งงบประมาณ *</label>
                  <input
                    type="text"
                    value={newProjectForm.budgetSource}
                    onChange={e => setNewProjectForm({ ...newProjectForm, budgetSource: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">วงเงินงบประมาณที่เสนอ (บาท) *</label>
                  <input
                    type="number"
                    value={newProjectForm.proposedBudget}
                    onChange={e => setNewProjectForm({ 
                      ...newProjectForm, 
                      proposedBudget: Number(e.target.value),
                      approvedBudget: Number(e.target.value)
                    })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">หลักการและเหตุผล</label>
                <textarea
                  value={newProjectForm.rationale}
                  onChange={e => setNewProjectForm({ ...newProjectForm, rationale: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  placeholder="ระบุสภาพปัญหาและความจำเป็น..."
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">กลุ่มเป้าหมาย</label>
                <input
                  type="text"
                  value={newProjectForm.targetGroups}
                  onChange={e => setNewProjectForm({ ...newProjectForm, targetGroups: e.target.value })}
                  placeholder="เช่น กลุ่มทอผ้า 20 กลุ่ม สมาชิก 60 คน"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">ผู้รับผิดชอบหลัก</label>
                  <input
                    type="text"
                    value={newProjectForm.mainOfficer}
                    onChange={e => setNewProjectForm({ ...newProjectForm, mainOfficer: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">ลิงก์โฟลเดอร์ Google Drive</label>
                  <input
                    type="url"
                    value={newProjectForm.googleDriveUrl}
                    onChange={e => setNewProjectForm({ ...newProjectForm, googleDriveUrl: e.target.value })}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-950 hover:bg-blue-900 rounded-lg font-medium"
                >
                  บันทึกข้อเสนอโครงการ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
