import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  AppUser,
  DivisionId,
  ProjectItem,
  ProjectStatus,
  BudgetLedgerItem,
  BudgetTransferLog,
  ReportRegistryItem,
  ReportStatus,
  CentralDatasetItem,
  PolicyIndicator,
  KnowledgeItem,
  ActivityMilestone
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PROJECTS,
  INITIAL_BUDGET_LEDGER,
  INITIAL_REPORTS,
  INITIAL_DATASETS,
  INITIAL_POLICY_INDICATORS,
  INITIAL_KM_ITEMS,
  NAN_DISTRICTS,
  CDD_DIVISIONS
} from '../data/initialData';

export type ActiveTab = 'DASHBOARD' | 'DATABASE' | 'PROJECTS' | 'BUDGET' | 'REPORTS' | 'KM' | 'SETTINGS';

interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUser: AppUser;
  setCurrentUser: (user: AppUser) => void;
  users: AppUser[];
  
  // Filters
  fiscalYear: number | 'ALL';
  setFiscalYear: (fy: number | 'ALL') => void;
  selectedDivisionId: DivisionId | 'ALL';
  setSelectedDivisionId: (div: DivisionId | 'ALL') => void;
  selectedDistrictId: string | 'ALL';
  setSelectedDistrictId: (dist: string | 'ALL') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // State
  projects: ProjectItem[];
  budgetLedgers: BudgetLedgerItem[];
  reports: ReportRegistryItem[];
  datasets: CentralDatasetItem[];
  policyIndicators: PolicyIndicator[];
  knowledgeItems: KnowledgeItem[];
  
  // Actions - Projects
  addProject: (project: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt' | 'statusHistory'>) => void;
  updateProject: (project: ProjectItem) => void;
  changeProjectStatus: (projectId: string, newStatus: ProjectStatus, note: string) => boolean;
  updateActivity: (projectId: string, activityId: string, updates: Partial<ActivityMilestone>) => void;
  addActivity: (projectId: string, activity: Omit<ActivityMilestone, 'id'>) => void;
  
  // Actions - Budget
  addBudgetLedger: (item: Omit<BudgetLedgerItem, 'id' | 'lastUpdated' | 'transferHistory'>) => void;
  updateBudgetLedger: (item: BudgetLedgerItem) => void;
  addBudgetTransfer: (ledgerId: string, transfer: Omit<BudgetTransferLog, 'id' | 'date'>) => void;
  
  // Actions - Reports
  addReport: (item: Omit<ReportRegistryItem, 'id' | 'notificationHistory'>) => void;
  updateReportStatus: (reportId: string, newStatus: ReportStatus, driveUrl?: string, remarks?: string) => void;
  
  // Actions - Datasets & KM
  addDataset: (item: Omit<CentralDatasetItem, 'id'>) => void;
  updateDataset: (item: CentralDatasetItem) => void;
  deleteDataset: (id: string) => void;
  addKnowledgeItem: (item: Omit<KnowledgeItem, 'id' | 'createdAt' | 'viewCount' | 'downloadCount' | 'rating'>) => void;
  incrementKmDownload: (id: string) => void;
  updatePolicyIndicator: (item: PolicyIndicator) => void;
  
  // System utilities
  resetToDemoData: () => void;
  toast: NotificationToast | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  clearToast: () => void;
  isGoogleDriveModalOpen: boolean;
  setGoogleDriveModalOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'cdd_nan_platform_v1.0';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('DASHBOARD');
  const [currentUser, setCurrentUser] = useState<AppUser>(INITIAL_USERS[0]);
  const [users] = useState<AppUser[]>(INITIAL_USERS);

  // Filters
  const [fiscalYear, setFiscalYear] = useState<number | 'ALL'>(2568);
  const [selectedDivisionId, setSelectedDivisionId] = useState<DivisionId | 'ALL'>('ALL');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Core Data loaded from localStorage if exists
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [budgetLedgers, setBudgetLedgers] = useState<BudgetLedgerItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_budget`);
      return saved ? JSON.parse(saved) : INITIAL_BUDGET_LEDGER;
    } catch {
      return INITIAL_BUDGET_LEDGER;
    }
  });

  const [reports, setReports] = useState<ReportRegistryItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_reports`);
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  const [datasets, setDatasets] = useState<CentralDatasetItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_datasets`);
      return saved ? JSON.parse(saved) : INITIAL_DATASETS;
    } catch {
      return INITIAL_DATASETS;
    }
  });

  const [policyIndicators, setPolicyIndicators] = useState<PolicyIndicator[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_policy`);
      return saved ? JSON.parse(saved) : INITIAL_POLICY_INDICATORS;
    } catch {
      return INITIAL_POLICY_INDICATORS;
    }
  });

  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_km`);
      return saved ? JSON.parse(saved) : INITIAL_KM_ITEMS;
    } catch {
      return INITIAL_KM_ITEMS;
    }
  });

  // UI state
  const [toast, setToast] = useState<NotificationToast | null>(null);
  const [isGoogleDriveModalOpen, setGoogleDriveModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
      localStorage.setItem(`${STORAGE_KEY}_budget`, JSON.stringify(budgetLedgers));
      localStorage.setItem(`${STORAGE_KEY}_reports`, JSON.stringify(reports));
      localStorage.setItem(`${STORAGE_KEY}_datasets`, JSON.stringify(datasets));
      localStorage.setItem(`${STORAGE_KEY}_policy`, JSON.stringify(policyIndicators));
      localStorage.setItem(`${STORAGE_KEY}_km`, JSON.stringify(knowledgeItems));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [projects, budgetLedgers, reports, datasets, policyIndicators, knowledgeItems]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToast({ id: Date.now().toString(), type, message });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const clearToast = () => setToast(null);

  const resetToDemoData = () => {
    setProjects(INITIAL_PROJECTS);
    setBudgetLedgers(INITIAL_BUDGET_LEDGER);
    setReports(INITIAL_REPORTS);
    setDatasets(INITIAL_DATASETS);
    setPolicyIndicators(INITIAL_POLICY_INDICATORS);
    setKnowledgeItems(INITIAL_KM_ITEMS);
    localStorage.clear();
    showToast('คืนค่าข้อมูลตัวอย่างมาตรฐาน (Demo Data) สำเร็จแล้ว', 'info');
  };

  // Projects Actions
  const addProject = (item: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt' | 'statusHistory'>) => {
    const newId = `proj-${Date.now()}`;
    const nowStr = new Date().toISOString().slice(0, 10);
    const newProject: ProjectItem = {
      ...item,
      id: newId,
      statusHistory: [
        {
          id: `sh-${Date.now()}`,
          fromStatus: 'DRAFT',
          toStatus: item.status || 'DRAFT',
          actionBy: currentUser.name,
          role: currentUser.title,
          timestamp: `${nowStr} 09:00`,
          note: 'สร้างข้อเสนอโครงการเข้าสู่ระบบ'
        }
      ],
      createdAt: nowStr,
      updatedAt: nowStr
    };
    setProjects(prev => [newProject, ...prev]);
    showToast(`บันทึกโครงการ "${item.name}" สำเร็จแล้ว`);
  };

  const updateProject = (project: ProjectItem) => {
    const nowStr = new Date().toISOString().slice(0, 10);
    setProjects(prev => prev.map(p => (p.id === project.id ? { ...project, updatedAt: nowStr } : p)));
    showToast('ปรับปรุงข้อมูลโครงการเรียบร้อยแล้ว');
  };

  const changeProjectStatus = (projectId: string, newStatus: ProjectStatus, note: string): boolean => {
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return false;

    // Check authority based on status transition
    const requiresExecutive = newStatus === 'APPROVED' || newStatus === 'COMPLETED' || newStatus === 'CANCELLED';
    if (requiresExecutive && currentUser.role !== 'EXECUTIVE' && currentUser.role !== 'ADMIN') {
      showToast('เฉพาะพัฒนาการจังหวัดน่าน (ผู้บริหาร) หรือผู้ดูแลระบบเท่านั้นที่มีสิทธิ์อนุมัติ/ปิดโครงการ', 'error');
      return false;
    }

    const now = new Date();
    const timeStr = `${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}`;

    const newHistory: ProjectItem['statusHistory'][0] = {
      id: `sh-${Date.now()}`,
      fromStatus: proj.status,
      toStatus: newStatus,
      actionBy: currentUser.name,
      role: currentUser.title,
      timestamp: timeStr,
      note: note || `เปลี่ยนสถานะเป็น ${newStatus}`
    };

    setProjects(prev =>
      prev.map(p => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          status: newStatus,
          statusHistory: [newHistory, ...p.statusHistory],
          approvedDate: newStatus === 'APPROVED' ? now.toISOString().slice(0, 10) : p.approvedDate,
          approvedBy: newStatus === 'APPROVED' ? `${currentUser.name} (${currentUser.title})` : p.approvedBy,
          completionDate: newStatus === 'COMPLETED' ? now.toISOString().slice(0, 10) : p.completionDate,
          updatedAt: now.toISOString().slice(0, 10)
        };
      })
    );

    showToast(`อัปเดตสถานะโครงการเป็น "${getStatusThai(newStatus)}" เรียบร้อย`);
    return true;
  };

  const updateActivity = (projectId: string, activityId: string, updates: Partial<ActivityMilestone>) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id !== projectId) return p;
        const newActivities = p.activities.map(a => (a.id === activityId ? { ...a, ...updates } : a));
        return { ...p, activities: newActivities, updatedAt: new Date().toISOString().slice(0, 10) };
      })
    );
    showToast('บันทึกความก้าวหน้ากิจกรรมเรียบร้อยแล้ว');
  };

  const addActivity = (projectId: string, act: Omit<ActivityMilestone, 'id'>) => {
    const newAct: ActivityMilestone = {
      ...act,
      id: `act-${Date.now()}`
    };
    setProjects(prev =>
      prev.map(p => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          activities: [...p.activities, newAct],
          updatedAt: new Date().toISOString().slice(0, 10)
        };
      })
    );
    showToast('เพิ่มกิจกรรมโครงการเรียบร้อยแล้ว');
  };

  // Budget Actions
  const addBudgetLedger = (item: Omit<BudgetLedgerItem, 'id' | 'lastUpdated' | 'transferHistory'>) => {
    const newItem: BudgetLedgerItem = {
      ...item,
      id: `bud-${Date.now()}`,
      transferHistory: [],
      lastUpdated: new Date().toISOString().slice(0, 10)
    };
    setBudgetLedgers(prev => [newItem, ...prev]);
    showToast('บันทึกรายการงบประมาณเรียบร้อยแล้ว');
  };

  const updateBudgetLedger = (item: BudgetLedgerItem) => {
    setBudgetLedgers(prev =>
      prev.map(b => (b.id === item.id ? { ...item, lastUpdated: new Date().toISOString().slice(0, 10) } : b))
    );
    showToast('ปรับปรุงข้อมูลทะเบียนงบประมาณเรียบร้อย');
  };

  const addBudgetTransfer = (ledgerId: string, transfer: Omit<BudgetTransferLog, 'id' | 'date'>) => {
    const nowStr = new Date().toISOString().slice(0, 10);
    const newLog: BudgetTransferLog = {
      ...transfer,
      id: `bt-${Date.now()}`,
      date: nowStr
    };

    setBudgetLedgers(prev =>
      prev.map(b => {
        if (b.id !== ledgerId) return b;
        let newAllocated = b.allocatedAmount;
        if (transfer.type === 'TRANSFER_IN') {
          newAllocated += transfer.amount;
        } else if (transfer.type === 'TRANSFER_OUT') {
          newAllocated -= transfer.amount;
        }
        return {
          ...b,
          allocatedAmount: newAllocated,
          transferHistory: [newLog, ...b.transferHistory],
          lastUpdated: nowStr
        };
      })
    );
    showToast('บันทึกประวัติการโอนเปลี่ยนแปลงงบประมาณสำเร็จ');
  };

  // Reports Actions
  const addReport = (item: Omit<ReportRegistryItem, 'id' | 'notificationHistory'>) => {
    const newReport: ReportRegistryItem = {
      ...item,
      id: `rep-${Date.now()}`,
      notificationHistory: []
    };
    setReports(prev => [newReport, ...prev]);
    showToast('เพิ่มทะเบียนการส่งรายงานสำเร็จ');
  };

  const updateReportStatus = (reportId: string, newStatus: ReportStatus, driveUrl?: string, remarks?: string) => {
    const nowStr = new Date().toISOString().slice(0, 10);
    setReports(prev =>
      prev.map(r => {
        if (r.id !== reportId) return r;
        return {
          ...r,
          status: newStatus,
          submittedDate: newStatus === 'SUBMITTED' || newStatus === 'VERIFIED' ? (r.submittedDate || nowStr) : r.submittedDate,
          driveFileUrl: driveUrl !== undefined ? driveUrl : r.driveFileUrl,
          remarks: remarks !== undefined ? remarks : r.remarks
        };
      })
    );
    showToast(`อัปเดตสถานะรายงานเป็น "${getReportStatusThai(newStatus)}" สำเร็จ`);
  };

  // Datasets Actions
  const addDataset = (item: Omit<CentralDatasetItem, 'id'>) => {
    const newItem: CentralDatasetItem = {
      ...item,
      id: `ds-${Date.now()}`
    };
    setDatasets(prev => [newItem, ...prev]);
    showToast('เพิ่มชุดข้อมูลเข้าสู่ฐานข้อมูลกลางเรียบร้อย');
  };

  const updateDataset = (item: CentralDatasetItem) => {
    setDatasets(prev => prev.map(d => (d.id === item.id ? item : d)));
    showToast('บันทึกการแก้ไขชุดข้อมูลเรียบร้อย');
  };

  const deleteDataset = (id: string) => {
    setDatasets(prev => prev.filter(d => d.id !== id));
    showToast('ลบชุดข้อมูลเรียบร้อยแล้ว', 'info');
  };

  // KM Actions
  const addKnowledgeItem = (item: Omit<KnowledgeItem, 'id' | 'createdAt' | 'viewCount' | 'downloadCount' | 'rating'>) => {
    const nowStr = new Date().toISOString().slice(0, 10);
    const newItem: KnowledgeItem = {
      ...item,
      id: `km-${Date.now()}`,
      viewCount: 1,
      downloadCount: 0,
      rating: 5.0,
      createdAt: nowStr
    };
    setKnowledgeItems(prev => [newItem, ...prev]);
    showToast('เพิ่มองค์ความรู้เข้าสู่คลัง CDD Nan KM สำเร็จ');
  };

  const incrementKmDownload = (id: string) => {
    setKnowledgeItems(prev =>
      prev.map(k => (k.id === id ? { ...k, downloadCount: k.downloadCount + 1 } : k))
    );
  };

  const updatePolicyIndicator = (item: PolicyIndicator) => {
    setPolicyIndicators(prev => prev.map(p => (p.id === item.id ? item : p)));
    showToast('อัปเดตเกณฑ์ตัวชี้วัดนโยบาย 5+1 สำเร็จ');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentUser,
        setCurrentUser,
        users,
        fiscalYear,
        setFiscalYear,
        selectedDivisionId,
        setSelectedDivisionId,
        selectedDistrictId,
        setSelectedDistrictId,
        searchQuery,
        setSearchQuery,
        projects,
        budgetLedgers,
        reports,
        datasets,
        policyIndicators,
        knowledgeItems,
        addProject,
        updateProject,
        changeProjectStatus,
        updateActivity,
        addActivity,
        addBudgetLedger,
        updateBudgetLedger,
        addBudgetTransfer,
        addReport,
        updateReportStatus,
        addDataset,
        updateDataset,
        deleteDataset,
        addKnowledgeItem,
        incrementKmDownload,
        updatePolicyIndicator,
        resetToDemoData,
        toast,
        showToast,
        clearToast,
        isGoogleDriveModalOpen,
        setGoogleDriveModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export function getStatusThai(status: ProjectStatus): string {
  switch (status) {
    case 'DRAFT': return 'ฉบับร่าง';
    case 'SUBMITTED': return 'เสนอพิจารณา';
    case 'REVISED': return 'ส่งกลับแก้ไข';
    case 'APPROVED': return 'อนุมัติแล้ว';
    case 'IN_PROGRESS': return 'กำลังดำเนินการ';
    case 'AWAITING_REPORT': return 'รอรายงานผล';
    case 'REPORT_VERIFYING': return 'รอตรวจรายงาน';
    case 'COMPLETED': return 'เสร็จสิ้น';
    case 'CANCELLED': return 'ยกเลิก';
    default: return status;
  }
}

export function getReportStatusThai(status: ReportStatus): string {
  switch (status) {
    case 'NOT_STARTED': return 'ยังไม่เริ่ม';
    case 'IN_PROGRESS': return 'กำลังจัดทำ';
    case 'SUBMITTED': return 'ส่งแล้ว';
    case 'AWAITING_REVIEW': return 'รอตรวจสอบ';
    case 'RETURNED': return 'ส่งกลับแก้ไข';
    case 'VERIFIED': return 'ตรวจสอบแล้ว';
    case 'DELAYED': return 'ล่าช้า';
    default: return status;
  }
}
