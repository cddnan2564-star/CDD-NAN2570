export type UserRole = 
  | 'EXECUTIVE'         // พัฒนาการจังหวัดน่าน
  | 'DIVISION_HEAD'     // หัวหน้ากลุ่มงาน
  | 'OFFICER'           // นักวิชาการพัฒนาชุมชน
  | 'DISTRICT_OFFICER'  // พัฒนาการอำเภอ / เจ้าหน้าที่ สพอ.
  | 'ADMIN';            // ผู้ดูแลระบบ

export interface AppUser {
  id: string;
  name: string;
  title: string;
  role: UserRole;
  divisionId?: string;
  districtId?: string;
  email: string;
}

export type DivisionId = 'STRATEGY' | 'PROMOTION' | 'INFORMATICS' | 'COORDINATION' | 'ADMIN';

export interface DivisionInfo {
  id: DivisionId;
  name: string;
  shortName: string;
  headName: string;
  headPosition: string;
  description: string;
}

export interface DistrictInfo {
  id: string;
  name: string;
  thaiName: string;
  subdistrictsCount: number;
  villagesCount: number;
  officerName: string;
  officeLocation: string;
}

export type ProjectStatus = 
  | 'DRAFT'                  // ฉบับร่าง
  | 'SUBMITTED'              // เสนอพิจารณา
  | 'REVISED'                // ส่งกลับเพื่อแก้ไข
  | 'APPROVED'               // อนุมัติแล้ว
  | 'IN_PROGRESS'            // อยู่ระหว่างดำเนินการ
  | 'AWAITING_REPORT'        // รอรายงานผล
  | 'REPORT_VERIFYING'       // อยู่ระหว่างตรวจสอบรายงานผล
  | 'COMPLETED'              // เสร็จสิ้น
  | 'CANCELLED';             // ยกเลิก

export interface StatusHistoryItem {
  id: string;
  fromStatus: ProjectStatus;
  toStatus: ProjectStatus;
  actionBy: string;
  role: string;
  timestamp: string;
  note: string;
}

export interface ActivityMilestone {
  id: string;
  title: string;
  plannedStartDate: string;
  plannedEndDate: string;
  actualDate?: string;
  targetParticipants: number;
  actualParticipants?: number;
  targetUnit: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'DELAYED';
  location: string;
  outputsSummary?: string;
  problemsAndObstacles?: string;
  recommendations?: string;
  evidenceDriveLink?: string;
  photoDriveLink?: string;
}

export interface ProjectItem {
  id: string;
  code: string;                      // เช่น นน-ยศ-68-001
  name: string;
  fiscalYear: number;                // 2568
  divisionId: DivisionId;
  districtId?: string;               // ระบุอำเภอ หรือ 'ALL' (ทุกอำเภอ/ระดับจังหวัด)
  budgetSource: string;              // งบกรมการพัฒนาชุมชน, งบพัฒนาจังหวัดน่าน, ฯลฯ
  budgetCategory: string;            // งบดำเนินงาน, งบลงทุน, งบอุดหนุน
  proposedBudget: number;            // วงเงินที่เสนอ
  approvedBudget: number;            // วงเงินที่อนุมัติ
  rationale: string;                 // หลักการและเหตุผล
  objectives: string[];              // วัตถุประสงค์
  targetGroups: string;              // กลุ่มเป้าหมาย
  targetArea: string;                // พื้นที่ดำเนินการ
  expectedOutcomes: string[];        // ผลที่คาดว่าจะได้รับ
  mainOfficer: string;               // ผู้รับผิดชอบหลัก
  coordinator: string;               // ผู้ประสานงาน
  googleDriveUrl?: string;           // ลิงก์โฟลเดอร์โครงการใน Google Drive
  status: ProjectStatus;
  statusHistory: StatusHistoryItem[];
  activities: ActivityMilestone[];
  isAtRisk?: boolean;                // โครงการที่ล่าช้าหรือมีความเสี่ยง
  riskNotes?: string;
  approvedDate?: string;
  approvedBy?: string;
  completionDate?: string;
  isDemo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetLedgerItem {
  id: string;
  fiscalYear: number;
  budgetSource: string;              // แหล่งงบประมาณ
  expenseCategory: string;          // หมวดงบประมาณ
  divisionId: DivisionId;
  districtId?: string;
  projectId?: string;
  projectCode?: string;
  projectName: string;
  allocatedAmount: number;           // งบจัดสรร
  committedAmount: number;           // งบผูกพัน
  disbursedAmount: number;           // ยอดเบิกจ่ายสะสม
  plannedQuarterly: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
  };
  docRefNo: string;                  // เลขที่เอกสารอ้างอิง
  docDate: string;                   // วันที่เอกสาร
  recordedBy: string;                // ผู้บันทึก
  verifiedBy: string;                // ผู้ตรวจสอบ
  transferHistory: BudgetTransferLog[];
  isDemo: boolean;
  lastUpdated: string;
}

export interface BudgetTransferLog {
  id: string;
  date: string;
  type: 'ADJUSTMENT' | 'TRANSFER_IN' | 'TRANSFER_OUT';
  amount: number;
  reason: string;
  authorizedBy: string;
  refDocument: string;
}

export type ReportStatus = 
  | 'NOT_STARTED'        // ยังไม่เริ่มดำเนินการ
  | 'IN_PROGRESS'        // กำลังจัดทำ
  | 'SUBMITTED'          // ส่งแล้ว
  | 'AWAITING_REVIEW'    // รอตรวจสอบ
  | 'RETURNED'           // ส่งกลับแก้ไข
  | 'VERIFIED'           // ตรวจสอบแล้ว
  | 'DELAYED';           // ล่าช้า

export interface ReportRegistryItem {
  id: string;
  code: string;
  title: string;
  divisionId: DivisionId;
  districtId?: string;
  responsibleOfficer: string;
  compilerName: string;
  reviewerName: string;
  periodType: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'ADHOC' | 'KPI';
  periodLabel: string;
  dueDate: string;
  submittedDate?: string;
  status: ReportStatus;
  driveFileUrl?: string;
  remarks?: string;
  notificationHistory: {
    timestamp: string;
    message: string;
    daysBefore: number;
  }[];
  isDemo: boolean;
}

export type KmCategory = 
  | 'HANDBOOK'        // คู่มือการปฏิบัติงาน
  | 'DIRECTIVE'       // หนังสือสั่งการและแนวทาง
  | 'PROCEDURE_FORM'  // ขั้นตอนและแบบฟอร์ม
  | 'BEST_PRACTICE'   // นวัตกรรมและแนวปฏิบัติที่เป็นเลิศ
  | 'AAR_LESSONS';    // ถอดบทเรียนจากการทำงาน

export interface KnowledgeItem {
  id: string;
  title: string;
  category: KmCategory;
  divisionId: DivisionId;
  author: string;
  authorPosition: string;
  publishYear: number;
  tags: string[];
  summary: string;
  keyTakeaways: string[];
  driveFileUrl?: string;
  viewCount: number;
  downloadCount: number;
  rating: number;
  status: 'PUBLISHED' | 'PENDING_REVIEW';
  isDemo: boolean;
  createdAt: string;
}

export interface CentralDatasetItem {
  id: string;
  divisionId: DivisionId;
  categoryName: string;
  title: string;
  code: string;
  fiscalYear: number;
  districtId?: string;
  recordCount: number;
  unit: string;
  dataOwner: string;
  sourceAgency: string;
  lastUpdated: string;
  securityLevel: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL';
  driveFileUrl?: string;
  summary: string;
  metadataAttributes: { key: string; value: string }[];
  isDemo: boolean;
}

export interface PolicyIndicator {
  id: string;
  policyNumber: string;              // "1", "2", "3", "4", "5", "+1"
  title: string;
  description: string;
  targetValue: number;
  unit: string;
  currentValue: number;
  divisionId: DivisionId;
  status: 'ON_TRACK' | 'WARNING' | 'CRITICAL';
  notes: string;
}
