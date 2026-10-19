import { 
  DistrictInfo, 
  DivisionInfo, 
  ProjectItem, 
  BudgetLedgerItem, 
  ReportRegistryItem, 
  KnowledgeItem, 
  CentralDatasetItem, 
  PolicyIndicator,
  AppUser 
} from '../types';

export const NAN_DISTRICTS: DistrictInfo[] = [
  { id: 'mueang', name: 'Mueang Nan', thaiName: 'เมืองน่าน', subdistrictsCount: 11, villagesCount: 109, officerName: 'นายสุรชัย คำหล้า', officeLocation: 'ที่ว่าการอำเภอเมืองน่าน' },
  { id: 'maecharim', name: 'Mae Charim', thaiName: 'แม่จริม', subdistrictsCount: 5, villagesCount: 38, officerName: 'นางสาวรัตนา วงศ์ใหญ่', officeLocation: 'ที่ว่าการอำเภอแม่จริม' },
  { id: 'banluang', name: 'Ban Luang', thaiName: 'บ้านหลวง', subdistrictsCount: 4, villagesCount: 26, officerName: 'นายสมพร ปัญญาแก้ว', officeLocation: 'ที่ว่าการอำเภอบ้านหลวง' },
  { id: 'nanoi', name: 'Na Noi', thaiName: 'นาน้อย', subdistrictsCount: 7, villagesCount: 68, officerName: 'นางสุภาพรรณ แก้วมณี', officeLocation: 'ที่ว่าการอำเภอนาน้อย' },
  { id: 'pua', name: 'Pua', thaiName: 'ปัว', subdistrictsCount: 12, villagesCount: 107, officerName: 'นายณรงค์ฤทธิ์ ชัยชนะ', officeLocation: 'ที่ว่าการอำเภอปัว' },
  { id: 'thawangpha', name: 'Tha Wang Pha', thaiName: 'ท่าวังผา', subdistrictsCount: 10, villagesCount: 91, officerName: 'นายประสิทธิ์ อินทร์ตา', officeLocation: 'ที่ว่าการอำเภอท่าวังผา' },
  { id: 'wiangsa', name: 'Wiang Sa', thaiName: 'เวียงสา', subdistrictsCount: 17, villagesCount: 128, officerName: 'นางกมลชนก ธิมา', officeLocation: 'ที่ว่าการอำเภอเวียงสา' },
  { id: 'thungchang', name: 'Thung Chang', thaiName: 'ทุ่งช้าง', subdistrictsCount: 7, villagesCount: 51, officerName: 'นายวีระยุทธ ยอดสาร', officeLocation: 'ที่ว่าการอำเภอทุ่งช้าง' },
  { id: 'chiangklang', name: 'Chiang Klang', thaiName: 'เชียงกลาง', subdistrictsCount: 6, villagesCount: 60, officerName: 'นางวิไลลักษณ์ เขื่อนแก้ว', officeLocation: 'ที่ว่าการอำเภอเชียงกลาง' },
  { id: 'namuen', name: 'Na Muen', thaiName: 'นาหมื่น', subdistrictsCount: 4, villagesCount: 48, officerName: 'นายธงชัย อินแปง', officeLocation: 'ที่ว่าการอำเภอนาหมื่น' },
  { id: 'santisuk', name: 'Santi Suk', thaiName: 'สันติสุข', subdistrictsCount: 3, villagesCount: 32, officerName: 'นางวรรณา บุญยืน', officeLocation: 'ที่ว่าการอำเภอสันติสุข' },
  { id: 'bokluea', name: 'Bo Kluea', thaiName: 'บ่อเกลือ', subdistrictsCount: 4, villagesCount: 39, officerName: 'นายชูชาติ สมบูรณ์', officeLocation: 'ที่ว่าการอำเภอบ่อเกลือ' },
  { id: 'songkhwae', name: 'Song Khwae', thaiName: 'สองแคว', subdistrictsCount: 3, villagesCount: 25, officerName: 'นายอนันต์ ศรีคำ', officeLocation: 'ที่ว่าการอำเภอสองแคว' },
  { id: 'phuphiang', name: 'Phu Phiang', thaiName: 'ภูเพียง', subdistrictsCount: 7, villagesCount: 61, officerName: 'นางสาวนงลักษณ์ สุขใจ', officeLocation: 'ที่ว่าการอำเภอภูเพียง' },
  { id: 'chaloemphrakiat', name: 'Chaloem Phra Kiat', thaiName: 'เฉลิมพระเกียรติ', subdistrictsCount: 2, villagesCount: 22, officerName: 'นายปรีชา มงคลนาม', officeLocation: 'ที่ว่าการอำเภอเฉลิมพระเกียรติ' },
];

export const CDD_DIVISIONS: DivisionInfo[] = [
  {
    id: 'STRATEGY',
    name: 'กลุ่มงานยุทธศาสตร์การพัฒนาชุมชน',
    shortName: 'กลุ่มงานยุทธศาสตร์',
    headName: 'นายพงษ์ศักดิ์ ธรรมจักร',
    headPosition: 'ผู้อำนวยการกลุ่มงานยุทธศาสตร์การพัฒนาชุมชน',
    description: 'รับผิดชอบแผนปฏิบัติราชการ แผนงาน/โครงการ ตัวชี้วัดภารกิจ และการบูรณาการแผนงานพัฒนาชุมชน'
  },
  {
    id: 'PROMOTION',
    name: 'กลุ่มงานส่งเสริมการพัฒนาชุมชน',
    shortName: 'กลุ่มงานส่งเสริมฯ',
    headName: 'นางกานดา สุวรรณฉัตร',
    headPosition: 'ผู้อำนวยการกลุ่มงานส่งเสริมการพัฒนาชุมชน',
    description: 'รับผิดชอบงานหนึ่งตำบล หนึ่งผลิตภัณฑ์ (OTOP) การพัฒนาเศรษฐกิจฐานราก สัมมาชีพ และชุมชนท่องเที่ยว'
  },
  {
    id: 'INFORMATICS',
    name: 'กลุ่มงานสารสนเทศการพัฒนาชุมชน',
    shortName: 'กลุ่มงานสารสนเทศ',
    headName: 'นายเกียรติศักดิ์ แก้ววิเชียร',
    headPosition: 'ผู้อำนวยการกลุ่มงานสารสนเทศการพัฒนาชุมชน',
    description: 'รับผิดชอบข้อมูลความจำเป็นพื้นฐาน (จปฐ.) ข้อมูล กชช.2ค บิ๊กดาต้าชุมชน และตำบลสารสนเทศ'
  },
  {
    id: 'COORDINATION',
    name: 'กลุ่มงานประสานและสนับสนุนการบริหารงานพัฒนาชุมชน',
    shortName: 'กลุ่มงานประสานฯ (กองทุน)',
    headName: 'นางรุ่งทิพย์ มหาวัน',
    headPosition: 'ผู้อำนวยการกลุ่มงานประสานและสนับสนุนฯ',
    description: 'รับผิดชอบกองทุนพัฒนาบทบาทสตรี กองทุนหมู่บ้านและชุมชนเมือง การติดตามหนี้สิน และพัฒนาสตรี'
  },
  {
    id: 'ADMIN',
    name: 'ฝ่ายอำนวยการและบริหารทั่วไป',
    shortName: 'ฝ่ายอำนวยการ',
    headName: 'นายสมเกียรติ ไชยวงค์',
    headPosition: 'หัวหน้าฝ่ายอำนวยการ',
    description: 'รับผิดชอบงานบริหารทั่วไป สารบรรณ การเงิน การประชุม และงานประสานงานราชการระดับจังหวัด'
  }
];

export const INITIAL_USERS: AppUser[] = [
  {
    id: 'u-exec',
    name: 'นายชำนาญ บดินทร์เดช',
    title: 'พัฒนาการจังหวัดน่าน',
    role: 'EXECUTIVE',
    email: 'cddnan.director@cdd.go.th'
  },
  {
    id: 'u-strat-head',
    name: 'นายพงษ์ศักดิ์ ธรรมจักร',
    title: 'ผอ.กลุ่มงานยุทธศาสตร์การพัฒนาชุมชน',
    role: 'DIVISION_HEAD',
    divisionId: 'STRATEGY',
    email: 'strategy.nan@cdd.go.th'
  },
  {
    id: 'u-promo-head',
    name: 'นางกานดา สุวรรณฉัตร',
    title: 'ผอ.กลุ่มงานส่งเสริมการพัฒนาชุมชน',
    role: 'DIVISION_HEAD',
    divisionId: 'PROMOTION',
    email: 'promotion.nan@cdd.go.th'
  },
  {
    id: 'u-officer-pua',
    name: 'นายณรงค์ฤทธิ์ ชัยชนะ',
    title: 'พัฒนาการอำเภอปัว (สพอ.ปัว)',
    role: 'DISTRICT_OFFICER',
    districtId: 'pua',
    email: 'cdd.pua@cdd.go.th'
  },
  {
    id: 'u-officer-strat',
    name: 'นางสาวพัชรี สุริยะ',
    title: 'นักวิชาการพัฒนาชุมชนชำนาญการ',
    role: 'OFFICER',
    divisionId: 'STRATEGY',
    email: 'patcharee.s@cdd.go.th'
  },
  {
    id: 'u-admin',
    name: 'นายวิทวัส นันทราษฎร์',
    title: 'ผู้ดูแลระบบสารสนเทศ (Admin)',
    role: 'ADMIN',
    divisionId: 'INFORMATICS',
    email: 'admin.cddnan@cdd.go.th'
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-001',
    code: 'นน-สส-68-001',
    name: 'โครงการยกระดับผลิตภัณฑ์ OTOP ผ้าทอน้ำไหลและเครื่องเงินน่านสู่ตลาดพรีเมียม Soft Power',
    fiscalYear: 2568,
    divisionId: 'PROMOTION',
    districtId: 'ALL',
    budgetSource: 'งบพัฒนาจังหวัดน่าน ประจำปีงบประมาณ พ.ศ. 2568',
    budgetCategory: 'งบดำเนินงาน',
    proposedBudget: 480000,
    approvedBudget: 450000,
    rationale: 'จังหวัดน่านมีภูมิปัญญาการทอผ้าลายน้ำไหลและเครื่องเงินโบราณที่มีเอกลักษณ์สูง แต่ผู้ประกอบการรุ่นใหม่ยังขาดทักษะด้านการตลาดดิจิทัล การสร้างแบรนด์ และบรรจุภัณฑ์ที่เป็นมิตรต่อสิ่งแวดล้อมเพื่อรองรับตลาดสากล',
    objectives: [
      'เพื่อพัฒนาทักษะผู้ผลิตและผู้ประกอบการ OTOP จำนวน 60 กลุ่มใน 15 อำเภอ',
      'เพื่อยกระดับอัตลักษณ์ลายผ้าทอน้ำไหลและเครื่องเงินน่านสู่ตลาดพรีเมียม Soft Power',
      'เพื่อสร้างยอดจำหน่ายเพิ่มขึ้นไม่น้อยกว่าร้อยละ 15 ภายในปีงบประมาณ 2568'
    ],
    targetGroups: 'กลุ่มผู้ผลิต ผู้ประกอบการ OTOP ประเภทผ้า เครื่องแต่งกาย และของใช้ของตกแต่ง 60 ราย',
    targetArea: 'พื้นที่ 15 อำเภอ จังหวัดน่าน',
    expectedOutcomes: [
      'ผลิตภัณฑ์ OTOP ได้รับการพัฒนาต้นแบบอย่างน้อย 20 ผลิตภัณฑ์',
      'ผู้ประกอบการมีช่องทางตลาดออนไลน์และแพลตฟอร์มจับคู่ธุรกิจระดับสากล',
      'รายได้ของผู้ประกอบการในชุมชนเพิ่มขึ้นอย่างยั่งยืน'
    ],
    mainOfficer: 'นางกานดา สุวรรณฉัตร (ผอ.กลุ่มงานส่งเสริมฯ)',
    coordinator: 'นางสาวชลธิชา สิทธิราช (นักวิชาการพัฒนาชุมชน)',
    googleDriveUrl: 'https://drive.google.com/drive/folders/1cdd-nan-otop-softpower-2568',
    status: 'IN_PROGRESS',
    isAtRisk: false,
    approvedDate: '2567-11-15',
    approvedBy: 'นายชำนาญ บดินทร์เดช (พัฒนาการจังหวัดน่าน)',
    statusHistory: [
      {
        id: 'sh-1',
        fromStatus: 'DRAFT',
        toStatus: 'SUBMITTED',
        actionBy: 'นางกานดา สุวรรณฉัตร',
        role: 'ผอ.กลุ่มงานส่งเสริมฯ',
        timestamp: '2567-10-20 09:30',
        note: 'เสนอข้อเสนอโครงการต่อคณะกรรมการบริหารงานพัฒนาชุมชนจังหวัดน่าน'
      },
      {
        id: 'sh-2',
        fromStatus: 'SUBMITTED',
        toStatus: 'APPROVED',
        actionBy: 'นายชำนาญ บดินทร์เดช',
        role: 'พัฒนาการจังหวัดน่าน',
        timestamp: '2567-11-15 14:00',
        note: 'อนุมัติวงเงินดำเนินงาน 450,000 บาท ตามความเห็นของฝ่ายงบประมาณ'
      },
      {
        id: 'sh-3',
        fromStatus: 'APPROVED',
        toStatus: 'IN_PROGRESS',
        actionBy: 'นางกานดา สุวรรณฉัตร',
        role: 'ผอ.กลุ่มงานส่งเสริมฯ',
        timestamp: '2567-12-01 10:00',
        note: 'เริ่มกิจกรรมประชุมชี้แจงกลุ่มเป้าหมายและจัดเวิร์กช็อปพัฒนาลายผ้า'
      }
    ],
    activities: [
      {
        id: 'act-101',
        title: 'กิจกรรมที่ 1: ประชุมเชิงปฏิบัติการถอดรหัสอัตลักษณ์ผ้าทอน่านและวิเคราะห์ตลาด Soft Power',
        plannedStartDate: '2567-12-10',
        plannedEndDate: '2567-12-12',
        actualDate: '2567-12-12',
        targetParticipants: 60,
        actualParticipants: 64,
        targetUnit: 'คน',
        status: 'DONE',
        location: 'โรงแรมเทวราช อำเภอเมืองน่าน',
        outputsSummary: 'ผู้ประกอบการ 64 คน ได้ร่วมวิเคราะห์แนวโน้มตลาดและกำหนดแนวทางการพัฒนาผลิตภัณฑ์ 20 แบบร่าง',
        evidenceDriveLink: 'https://drive.google.com/drive/folders/1nan-otop-act1-evidence',
        photoDriveLink: 'https://drive.google.com/drive/folders/1nan-otop-act1-photos'
      },
      {
        id: 'act-102',
        title: 'กิจกรรมที่ 2: การพัฒนาต้นแบบผลิตภัณฑ์ร่วมกับผู้เชี่ยวชาญการออกแบบระดับประเทศ',
        plannedStartDate: '2568-01-15',
        plannedEndDate: '2568-02-28',
        actualDate: '2568-02-25',
        targetParticipants: 20,
        actualParticipants: 20,
        targetUnit: 'กลุ่ม',
        status: 'DONE',
        location: 'ศูนย์เรียนรู้ภูมิปัญญาผ้าทอน้ำไหล ตำบลศิลาแลง อำเภอปัว',
        outputsSummary: 'พัฒนาชิ้นงานต้นแบบผ้าทอน้ำไหลประยุกต์และเครื่องเงิน 20 รายการสำเร็จพร้อมบรรจุภัณฑ์',
        evidenceDriveLink: 'https://drive.google.com/drive/folders/1nan-otop-act2-evidence'
      },
      {
        id: 'act-103',
        title: 'กิจกรรมที่ 3: งานแสดงและจับคู่เจรจาธุรกิจ OTOP Nan Premium Soft Power',
        plannedStartDate: '2568-04-10',
        plannedEndDate: '2568-04-14',
        targetParticipants: 200,
        targetUnit: 'คน',
        status: 'IN_PROGRESS',
        location: 'ข่วงเมืองน่าน หน้าวัดภูมินทร์ อำเภอเมืองน่าน'
      },
      {
        id: 'act-104',
        title: 'กิจกรรมที่ 4: สรุปผลและถอดบทเรียนความสำเร็จและจัดทำแคตตาล็อกดิจิทัล',
        plannedStartDate: '2568-05-20',
        plannedEndDate: '2568-06-15',
        targetParticipants: 60,
        targetUnit: 'คน',
        status: 'PENDING',
        location: 'สำนักงานพัฒนาชุมชนจังหวัดน่าน'
      }
    ],
    isDemo: true,
    createdAt: '2567-10-15',
    updatedAt: '2568-03-01'
  },
  {
    id: 'proj-002',
    code: 'นน-ยศ-68-002',
    name: 'โครงการขับเคลื่อนหมู่บ้านท่องเที่ยวเชิงสร้างสรรค์ OTOP นวัตวิถี บ่อเกลือ-ปัว',
    fiscalYear: 2568,
    divisionId: 'STRATEGY',
    districtId: 'bokluea',
    budgetSource: 'งบกรมการพัฒนาชุมชน ประจำปี 2568',
    budgetCategory: 'งบดำเนินงาน',
    proposedBudget: 320000,
    approvedBudget: 300000,
    rationale: 'พื้นที่อำเภอบ่อเกลือและปัวเป็นหมุดหมายการท่องเที่ยวสำคัญ จำเป็นต้องเสริมความเข้มแข็งของชุมชนในการบริหารจัดการท่องเที่ยวโดยชุมชน (CBT) ที่สร้างรายได้กระจายสู่ทุกครัวเรือน',
    objectives: [
      'เพื่อพัฒนายกระดับโปรแกรมท่องเที่ยวชุมชน 4 หมู่บ้าน',
      'เพื่อฝึกอบรมนักเล่าเรื่องชุมชนและมัคคุเทศก์ท้องถิ่น 40 คน',
      'เพื่อจัดทำระบบเส้นทางเชื่อมโยงการท่องเที่ยวเชิงนิเวศและวัฒนธรรม'
    ],
    targetGroups: 'ผู้นำชุมชน คณะกรรมการท่องเที่ยวชุมชน และผู้ประกอบการโฮมสเตย์ 40 คน',
    targetArea: 'ตำบลบ่อเกลือใต้ ตำบลดงพญา อำเภอบ่อเกลือ และตำบลศิลาเพชร อำเภอปัว',
    expectedOutcomes: [
      'เกิดเส้นทางท่องเที่ยวเชื่อมโยง 2 เส้นทางหลัก',
      'เกิดเมนูอาหารท้องถิ่นอัตลักษณ์น่านที่ได้มาตรฐานสุขอนามัย 8 เมนู',
      'ชุมชนมีรายได้หมุนเวียนจากการท่องเที่ยวเพิ่มขึ้นร้อยละ 20'
    ],
    mainOfficer: 'นายพงษ์ศักดิ์ ธรรมจักร (ผอ.กลุ่มงานยุทธศาสตร์ฯ)',
    coordinator: 'นายชูชาติ สมบูรณ์ (สพอ.บ่อเกลือ)',
    googleDriveUrl: 'https://drive.google.com/drive/folders/1cdd-nan-cbt-bokluea-pua-2568',
    status: 'IN_PROGRESS',
    isAtRisk: true,
    riskNotes: 'ล่าช้ากว่าแผน 2 สัปดาห์ เนื่องจากมีช่วงปรับปรุงถนนขึ้นบ่อเกลือ ทำให้การจัดเวทีในพื้นที่ต้องเลื่อนกำหนด',
    approvedDate: '2567-11-20',
    approvedBy: 'นายชำนาญ บดินทร์เดช (พัฒนาการจังหวัดน่าน)',
    statusHistory: [
      {
        id: 'sh-201',
        fromStatus: 'DRAFT',
        toStatus: 'SUBMITTED',
        actionBy: 'นายพงษ์ศักดิ์ ธรรมจักร',
        role: 'ผอ.กลุ่มงานยุทธศาสตร์ฯ',
        timestamp: '2567-11-01 10:00',
        note: 'เสนอขออนุมัติโครงการ'
      },
      {
        id: 'sh-202',
        fromStatus: 'SUBMITTED',
        toStatus: 'APPROVED',
        actionBy: 'นายชำนาญ บดินทร์เดช',
        role: 'พัฒนาการจังหวัดน่าน',
        timestamp: '2567-11-20 15:30',
        note: 'อนุมัติโครงการ กำชับให้ประสาน อปท. ในพื้นที่อย่างใกล้ชิด'
      },
      {
        id: 'sh-203',
        fromStatus: 'APPROVED',
        toStatus: 'IN_PROGRESS',
        actionBy: 'นายพงษ์ศักดิ์ ธรรมจักร',
        role: 'ผอ.กลุ่มงานยุทธศาสตร์ฯ',
        timestamp: '2567-12-15 09:00',
        note: 'เริ่มกิจกรรมในพื้นที่'
      }
    ],
    activities: [
      {
        id: 'act-201',
        title: 'กิจกรรมที่ 1: ประเมินศักยภาพชุมชนและออกแบบโปรแกรมท่องเที่ยวเชิงสร้างสรรค์',
        plannedStartDate: '2567-12-20',
        plannedEndDate: '2567-12-25',
        actualDate: '2567-12-24',
        targetParticipants: 40,
        actualParticipants: 42,
        targetUnit: 'คน',
        status: 'DONE',
        location: 'ศูนย์วัฒนธรรมบ่อเกลือโบราณ',
        evidenceDriveLink: 'https://drive.google.com/drive/folders/1nan-cbt-act1-evidence'
      },
      {
        id: 'act-202',
        title: 'กิจกรรมที่ 2: อบรมพัฒนาทักษะนักเล่าเรื่องชุมชน (Local Storyteller) และการตลาดดิจิทัล',
        plannedStartDate: '2568-01-20',
        plannedEndDate: '2568-01-22',
        actualDate: '2568-02-10',
        targetParticipants: 40,
        actualParticipants: 38,
        targetUnit: 'คน',
        status: 'DONE',
        location: 'ศาลาประชาคมบ้านบ่อหลวง',
        problemsAndObstacles: 'สภาพอากาศหนาวจัดและถนนซ่อมแซมทำให้กลุ่มเป้าหมายเดินทางล่าช้ากว่ากำหนด',
        recommendations: 'ปรับเพิ่มช่องทางการติดตามผ่านระบบออนไลน์และส่งเอกสารคู่มือเพิ่มเติม'
      },
      {
        id: 'act-203',
        title: 'กิจกรรมที่ 3: จัดทำป้ายสื่อความหมายและพัฒนาจุดเช็คอินวัฒนธรรมเกลือสินเธาว์ภูเขา',
        plannedStartDate: '2568-02-15',
        plannedEndDate: '2568-03-10',
        targetParticipants: 4,
        targetUnit: 'จุด',
        status: 'DELAYED',
        location: 'พื้นที่ 4 ชุมชนเป้าหมาย',
        problemsAndObstacles: 'ผู้รับจ้างผลิตป้ายยังจัดหาไม้สักตามมาตรฐานท้องถิ่นไม่ครบถ้วน',
        recommendations: 'เร่งรัดผู้รับจ้างและกำหนดส่งมอบภายใน 25 มีนาคม 2568'
      }
    ],
    isDemo: true,
    createdAt: '2567-11-01',
    updatedAt: '2568-03-05'
  },
  {
    id: 'proj-003',
    code: 'นน-ปส-68-003',
    name: 'โครงการบริหารจัดการหนี้และฟื้นฟูอาชีพสมาชิกกองทุนพัฒนาบทบาทสตรี จังหวัดน่าน',
    fiscalYear: 2568,
    divisionId: 'COORDINATION',
    districtId: 'ALL',
    budgetSource: 'งบกองทุนพัฒนาบทบาทสตรี ประจำปี 2568',
    budgetCategory: 'งบดำเนินงาน',
    proposedBudget: 250000,
    approvedBudget: 250000,
    rationale: 'เพื่อลดสัดส่วนหนี้ค้างชำระ (NPL) ของกองทุนพัฒนาบทบาทสตรี และพัฒนาอาชีพสร้างรายได้ให้สมาชิกสามารถชำระคืนเงินกู้ได้อย่างต่อเนื่องและยั่งยืน',
    objectives: [
      'เพื่อเจรจาปรับโครงสร้างหนี้และวางแผนการชำระหนี้ของลูกหนี้ 150 กลุ่ม',
      'เพื่อฝึกอบรมทักษะอาชีพเสริมระยะสั้นและบริหารการเงินครัวเรือน'
    ],
    targetGroups: 'สมาชิกกองทุนพัฒนาบทบาทสตรีที่มีหนี้ค้างชำระใน 15 อำเภอ',
    targetArea: '15 อำเภอ จังหวัดน่าน',
    expectedOutcomes: [
      'ลดอัตราหนี้ค้างชำระของกองทุนสตรีลงเหลือต่ำกว่าร้อยละ 5 ภายในสิ้นปีงบประมาณ',
      'สมาชิกร้อยละ 85 สามารถชำระหนี้คืนได้ตามแผนปรับโครงสร้างหนี้'
    ],
    mainOfficer: 'นางรุ่งทิพย์ มหาวัน (ผอ.กลุ่มงานประสานฯ)',
    coordinator: 'นางสาวสุดารัตน์ คำแสน (นักวิชาการพัฒนาชุมชน)',
    googleDriveUrl: 'https://drive.google.com/drive/folders/1cdd-nan-womenfund-debt-2568',
    status: 'IN_PROGRESS',
    isAtRisk: false,
    approvedDate: '2567-10-30',
    approvedBy: 'นายชำนาญ บดินทร์เดช (พัฒนาการจังหวัดน่าน)',
    statusHistory: [
      {
        id: 'sh-301',
        fromStatus: 'DRAFT',
        toStatus: 'SUBMITTED',
        actionBy: 'นางรุ่งทิพย์ มหาวัน',
        role: 'ผอ.กลุ่มงานประสานฯ',
        timestamp: '2567-10-18 11:00',
        note: 'เสนอโครงการตามมติคณะอนุกรรมการกองทุนสตรีจังหวัดน่าน'
      },
      {
        id: 'sh-302',
        fromStatus: 'SUBMITTED',
        toStatus: 'APPROVED',
        actionBy: 'นายชำนาญ บดินทร์เดช',
        role: 'พัฒนาการจังหวัดน่าน',
        timestamp: '2567-10-30 14:15',
        note: 'อนุมัติโครงการ'
      },
      {
        id: 'sh-303',
        fromStatus: 'APPROVED',
        toStatus: 'IN_PROGRESS',
        actionBy: 'นางรุ่งทิพย์ มหาวัน',
        role: 'ผอ.กลุ่มงานประสานฯ',
        timestamp: '2567-11-10 09:00',
        note: 'เริ่มลงพื้นที่ไกล่เกลี่ยและจัดทำบันทึกข้อตกลง'
      }
    ],
    activities: [
      {
        id: 'act-301',
        title: 'กิจกรรมที่ 1: คลินิกไกล่เกลี่ยและปรับโครงสร้างหนี้สัญจร 4 โซน (เหนือ กลาง ใต้ สูง)',
        plannedStartDate: '2567-11-15',
        plannedEndDate: '2567-12-20',
        actualDate: '2567-12-18',
        targetParticipants: 150,
        actualParticipants: 162,
        targetUnit: 'กลุ่ม',
        status: 'DONE',
        location: 'หอประชุมอำเภอเวียงสา ท่าวังผา เชียงกลาง และปัว',
        outputsSummary: 'มีลูกหนี้เข้าร่วมปรับโครงสร้างหนี้ 142 กลุ่ม ยอดหนี้ปรับโครงสร้างกว่า 4.2 ล้านบาท'
      },
      {
        id: 'act-302',
        title: 'กิจกรรมที่ 2: อบรมการทำบัญชีครัวเรือนและการบริหารต้นทุนสินค้าเกษตรแปรรูป',
        plannedStartDate: '2568-01-10',
        plannedEndDate: '2568-02-15',
        actualDate: '2568-02-12',
        targetParticipants: 120,
        actualParticipants: 118,
        targetUnit: 'คน',
        status: 'DONE',
        location: 'ศูนย์เรียนรู้กองทุนสตรีตำบลไชยสถาน อำเภอเมืองน่าน'
      },
      {
        id: 'act-303',
        title: 'กิจกรรมที่ 3: ติดตามประเมินผลการชำระหนี้รายเดือนและถอดบทเรียนกลุ่มตัวอย่าง',
        plannedStartDate: '2568-03-01',
        plannedEndDate: '2568-08-30',
        targetParticipants: 15,
        targetUnit: 'อำเภอ',
        status: 'IN_PROGRESS',
        location: 'สำนักงานพัฒนาชุมชนอำเภอทั้ง 15 อำเภอ'
      }
    ],
    isDemo: true,
    createdAt: '2567-10-18',
    updatedAt: '2568-03-08'
  },
  {
    id: 'proj-004',
    code: 'นน-สน-68-004',
    name: 'โครงการจัดทำ Big Data สารสนเทศการพัฒนาชุมชน และยกระดับตำบลสารสนเทศคุณภาพชีวิต',
    fiscalYear: 2568,
    divisionId: 'INFORMATICS',
    districtId: 'ALL',
    budgetSource: 'งบกรมการพัฒนาชุมชน ประจำปี 2568',
    budgetCategory: 'งบดำเนินงาน',
    proposedBudget: 210000,
    approvedBudget: 200000,
    rationale: 'เพื่อบูรณาการข้อมูล จปฐ. และ กชช.2ค รายครัวเรือนใน 15 อำเภอ เข้าสู่ระบบสารสนเทศกลางสำหรับแก้ไขปัญหาความยากจนแบบชี้เป้า (TPMAP/ThaiQM)',
    objectives: [
      'เพื่อตรวจสอบและรับรองความถูกต้องของข้อมูล จปฐ. ประจำปี 2568 ทั้ง 15 อำเภอ',
      'เพื่อคัดเลือกและยกระดับตำบลสารสนเทศต้นแบบเพื่อการพัฒนาคุณภาพชีวิต 15 ตำบล'
    ],
    targetGroups: 'อาสาสมัครจัดเก็บข้อมูล จปฐ. และเจ้าหน้าที่ผู้รับผิดชอบงานสารสนเทศ 180 คน',
    targetArea: 'ทุกตำบลในจังหวัดน่าน (99 ตำบล)',
    expectedOutcomes: [
      'จัดเก็บข้อมูล จปฐ. ครอบคลุมครัวเรือนเป้าหมายร้อยละ 100 ภายในกำหนดเวลา',
      'ได้ Dashboard วิเคราะห์สถานะความยากจนรายอำเภอเพื่อสนับสนุนผู้ว่าราชการจังหวัด'
    ],
    mainOfficer: 'นายเกียรติศักดิ์ แก้ววิเชียร (ผอ.กลุ่มงานสารสนเทศฯ)',
    coordinator: 'นายพิษณุ สุขเกษม (นักวิชาการคอมพิวเตอร์)',
    googleDriveUrl: 'https://drive.google.com/drive/folders/1cdd-nan-bigdata-jpthor-2568',
    status: 'AWAITING_REPORT',
    isAtRisk: false,
    approvedDate: '2567-10-25',
    approvedBy: 'นายชำนาญ บดินทร์เดช (พัฒนาการจังหวัดน่าน)',
    statusHistory: [
      {
        id: 'sh-401',
        fromStatus: 'DRAFT',
        toStatus: 'SUBMITTED',
        actionBy: 'นายเกียรติศักดิ์ แก้ววิเชียร',
        role: 'ผอ.กลุ่มงานสารสนเทศฯ',
        timestamp: '2567-10-15 14:00',
        note: 'เสนอโครงการ'
      },
      {
        id: 'sh-402',
        fromStatus: 'SUBMITTED',
        toStatus: 'APPROVED',
        actionBy: 'นายชำนาญ บดินทร์เดช',
        role: 'พัฒนาการจังหวัดน่าน',
        timestamp: '2567-10-25 10:30',
        note: 'อนุมัติโครงการ'
      },
      {
        id: 'sh-403',
        fromStatus: 'APPROVED',
        toStatus: 'IN_PROGRESS',
        actionBy: 'นายเกียรติศักดิ์ แก้ววิเชียร',
        role: 'ผอ.กลุ่มงานสารสนเทศฯ',
        timestamp: '2567-11-01 09:30',
        note: 'ดำเนินการกิจกรรมจัดเก็บและประมวลผลข้อมูล'
      },
      {
        id: 'sh-404',
        fromStatus: 'IN_PROGRESS',
        toStatus: 'AWAITING_REPORT',
        actionBy: 'นายเกียรติศักดิ์ แก้ววิเชียร',
        role: 'ผอ.กลุ่มงานสารสนเทศฯ',
        timestamp: '2568-03-01 16:00',
        note: 'กิจกรรมเสร็จสิ้นครบทุกอำเภอ อยู่ระหว่างรวบรวมเล่มรายงานผลฉบับสมบูรณ์'
      }
    ],
    activities: [
      {
        id: 'act-401',
        title: 'กิจกรรมที่ 1: ชี้แจงและซักซ้อมการจัดเก็บข้อมูล จปฐ. ผ่านระบบ Smart Survey แก่อาสาสมัคร',
        plannedStartDate: '2567-11-05',
        plannedEndDate: '2567-11-15',
        actualDate: '2567-11-14',
        targetParticipants: 180,
        actualParticipants: 185,
        targetUnit: 'คน',
        status: 'DONE',
        location: 'ห้องประชุมพระเจ้าสุริยพงษ์ผริตเดช ศาลากลางจังหวัดน่าน'
      },
      {
        id: 'act-402',
        title: 'กิจกรรมที่ 2: รณรงค์และติดตามการจัดเก็บข้อมูล จปฐ. รายตำบล 99 ตำบล',
        plannedStartDate: '2567-12-01',
        plannedEndDate: '2568-01-31',
        actualDate: '2568-01-30',
        targetParticipants: 99,
        actualParticipants: 99,
        targetUnit: 'ตำบล',
        status: 'DONE',
        location: '99 ตำบลในจังหวัดน่าน'
      },
      {
        id: 'act-403',
        title: 'กิจกรรมที่ 3: ตรวจสอบความถูกต้อง (Data Quality Audit) และประมวลผล Big Data',
        plannedStartDate: '2568-02-01',
        plannedEndDate: '2568-02-28',
        actualDate: '2568-02-27',
        targetParticipants: 15,
        actualParticipants: 15,
        targetUnit: 'อำเภอ',
        status: 'DONE',
        location: 'สำนักงานพัฒนาชุมชนจังหวัดน่าน'
      }
    ],
    isDemo: true,
    createdAt: '2567-10-15',
    updatedAt: '2568-03-01'
  },
  {
    id: 'proj-005',
    code: 'นน-บห-68-005',
    name: 'โครงการพัฒนาขีดสมรรถนะบุคลากร พช.น่าน สู่การเป็นนักจัดการงานพัฒนาเชิงพื้นที่มืออาชีพ',
    fiscalYear: 2568,
    divisionId: 'ADMIN',
    districtId: 'ALL',
    budgetSource: 'งบกรมการพัฒนาชุมชน ประจำปี 2568',
    budgetCategory: 'งบดำเนินงาน',
    proposedBudget: 150000,
    approvedBudget: 150000,
    rationale: 'เพื่อเสริมสร้างทักษะดิจิทัล การวิเคราะห์ข้อมูลเชิงพื้นที่ และการสื่อสารการประชาสัมพันธ์งานพัฒนาชุมชนแก่นักวิชาการและพัฒนากร 15 อำเภอ',
    objectives: [
      'เพื่อพัฒนาศักยภาพข้าราชการและลูกจ้างในสังกัด พช.น่าน 85 คน',
      'เพื่อสร้างเครือข่ายครู ก ด้านการเขียนเรื่องเล่าความสำเร็จงานพัฒนาชุมชน'
    ],
    targetGroups: 'บุคลากรสังกัด สพจ.น่าน และ สพอ.ทั้ง 15 อำเภอ 85 คน',
    targetArea: 'จังหวัดน่าน',
    expectedOutcomes: [
      'บุคลากรมีทักษะการใช้ระบบ CDD Nan One Platform และเครื่องมือดิจิทัล',
      'มีผลงานเรื่องเล่าความสำเร็จเผยแพร่อย่างน้อย 30 เรื่อง'
    ],
    mainOfficer: 'นายสมเกียรติ ไชยวงค์ (หัวหน้าฝ่ายอำนวยการ)',
    coordinator: 'นางสาวพิมพ์ใจ มณีวรรณ (เจ้าพนักงานธุรการชำนาญงาน)',
    googleDriveUrl: 'https://drive.google.com/drive/folders/1cdd-nan-hrd-competency-2568',
    status: 'COMPLETED',
    isAtRisk: false,
    approvedDate: '2567-10-20',
    approvedBy: 'นายชำนาญ บดินทร์เดช (พัฒนาการจังหวัดน่าน)',
    completionDate: '2568-01-25',
    statusHistory: [
      {
        id: 'sh-501',
        fromStatus: 'DRAFT',
        toStatus: 'SUBMITTED',
        actionBy: 'นายสมเกียรติ ไชยวงค์',
        role: 'หัวหน้าฝ่ายอำนวยการ',
        timestamp: '2567-10-10 09:00',
        note: 'เสนอแผนพัฒนาบุคลากรประจำปี'
      },
      {
        id: 'sh-502',
        fromStatus: 'SUBMITTED',
        toStatus: 'APPROVED',
        actionBy: 'นายชำนาญ บดินทร์เดช',
        role: 'พัฒนาการจังหวัดน่าน',
        timestamp: '2567-10-20 11:00',
        note: 'อนุมัติโครงการตามแผน'
      },
      {
        id: 'sh-503',
        fromStatus: 'APPROVED',
        toStatus: 'IN_PROGRESS',
        actionBy: 'นายสมเกียรติ ไชยวงค์',
        role: 'หัวหน้าฝ่ายอำนวยการ',
        timestamp: '2567-11-01 08:30',
        note: 'เตรียมการฝึกอบรม'
      },
      {
        id: 'sh-504',
        fromStatus: 'IN_PROGRESS',
        toStatus: 'REPORT_VERIFYING',
        actionBy: 'นายสมเกียรติ ไชยวงค์',
        role: 'หัวหน้าฝ่ายอำนวยการ',
        timestamp: '2568-01-15 16:30',
        note: 'ส่งรายงานผลการฝึกอบรมฉบับสมบูรณ์'
      },
      {
        id: 'sh-505',
        fromStatus: 'REPORT_VERIFYING',
        toStatus: 'COMPLETED',
        actionBy: 'นายชำนาญ บดินทร์เดช',
        role: 'พัฒนาการจังหวัดน่าน',
        timestamp: '2568-01-25 15:00',
        note: 'รับรองรายงานผลและอนุมัติปิดโครงการ'
      }
    ],
    activities: [
      {
        id: 'act-501',
        title: 'กิจกรรมที่ 1: อบรมเชิงปฏิบัติการทักษะดิจิทัลและการจัดการข้อมูล CDD Nan One Platform',
        plannedStartDate: '2567-11-20',
        plannedEndDate: '2567-11-22',
        actualDate: '2567-11-22',
        targetParticipants: 85,
        actualParticipants: 85,
        targetUnit: 'คน',
        status: 'DONE',
        location: 'ศูนย์ประชุมและแสดงนิทรรศการ โรงแรมดิอิมเพรส น่าน'
      },
      {
        id: 'act-502',
        title: 'กิจกรรมที่ 2: การพัฒนาทักษะการเขียน Storytelling และสื่อสารนวัตกรรมชุมชน',
        plannedStartDate: '2567-12-18',
        plannedEndDate: '2567-12-19',
        actualDate: '2567-12-19',
        targetParticipants: 85,
        actualParticipants: 87,
        targetUnit: 'คน',
        status: 'DONE',
        location: 'ห้องประชุมสำนักงานพัฒนาชุมชนจังหวัดน่าน'
      }
    ],
    isDemo: true,
    createdAt: '2567-10-10',
    updatedAt: '2568-01-25'
  },
  {
    id: 'proj-006',
    code: 'นน-สส-68-006',
    name: 'โครงการส่งเสริมและพัฒนากาแฟดอยสวนยาหลวงและเกษตรปลอดภัยสู่มาตรฐาน GAP/Organic',
    fiscalYear: 2568,
    divisionId: 'PROMOTION',
    districtId: 'thawangpha',
    budgetSource: 'งบกลุ่มจังหวัดภาคเหนือตอนบน 2',
    budgetCategory: 'งบดำเนินงาน',
    proposedBudget: 350000,
    approvedBudget: 0,
    rationale: 'สนับสนุนเกษตรกรผู้ปลูกกาแฟอะราบิกาและพืชเศรษฐกิจบนพื้นที่สูงให้ได้มาตรฐานเกษตรอินทรีย์ เพิ่มมูลค่าผลผลิตและลดการเผาในพื้นที่เกษตร',
    objectives: [
      'เพื่อยกระดับแปลงปลูกกาแฟ 40 แปลงสู่มาตรฐานเกษตรอินทรีย์',
      'เพื่อแปรรูปเมล็ดกาแฟ Specialty Coffee และเชื่อมโยงตลาดร้านกาแฟท่องเที่ยว'
    ],
    targetGroups: 'วิสาหกิจชุมชนกลุ่มผู้ปลูกกาแฟสวนยาหลวง อำเภอท่าวังผา 40 ราย',
    targetArea: 'ตำบลผาทอง อำเภอท่าวังผา จังหวัดน่าน',
    expectedOutcomes: [
      'กลุ่มได้รับใบรับรองมาตรฐานเกษตรปลอดภัยอย่างน้อย 30 แปลง',
      'ราคารับซื้อเมล็ดกาแฟกะลาเพิ่มขึ้นเฉลี่ยกิโลกรัมละ 35 บาท'
    ],
    mainOfficer: 'นายประสิทธิ์ อินทร์ตา (สพอ.ท่าวังผา)',
    coordinator: 'นางสาวมณีรัตน์ วงศ์วรรณ (นักวิชาการพัฒนาชุมชน)',
    googleDriveUrl: 'https://drive.google.com/drive/folders/1cdd-nan-coffee-thawangpha-2568',
    status: 'SUBMITTED',
    isAtRisk: false,
    statusHistory: [
      {
        id: 'sh-601',
        fromStatus: 'DRAFT',
        toStatus: 'SUBMITTED',
        actionBy: 'นายประสิทธิ์ อินทร์ตา',
        role: 'สพอ.ท่าวังผา',
        timestamp: '2568-02-15 10:30',
        note: 'จัดทำข้อเสนอโครงการและส่งให้กลุ่มงานยุทธศาสตร์ตรวจสอบ'
      }
    ],
    activities: [
      {
        id: 'act-601',
        title: 'กิจกรรมที่ 1: ฝึกอบรมมาตรฐานการผลิตกาแฟอินทรีย์และการจัดการธาตุอาหารในดิน',
        plannedStartDate: '2568-04-05',
        plannedEndDate: '2568-04-07',
        targetParticipants: 40,
        targetUnit: 'คน',
        status: 'PENDING',
        location: 'ศูนย์เรียนรู้กาแฟสวนยาหลวง ต.ผาทอง'
      }
    ],
    isDemo: true,
    createdAt: '2568-02-10',
    updatedAt: '2568-02-15'
  }
];

export const INITIAL_BUDGET_LEDGER: BudgetLedgerItem[] = [
  {
    id: 'bud-001',
    fiscalYear: 2568,
    budgetSource: 'งบพัฒนาจังหวัดน่าน',
    expenseCategory: 'งบดำเนินงาน',
    divisionId: 'PROMOTION',
    districtId: 'ALL',
    projectId: 'proj-001',
    projectCode: 'นน-สส-68-001',
    projectName: 'โครงการยกระดับผลิตภัณฑ์ OTOP ผ้าทอน้ำไหลและเครื่องเงินน่านสู่ตลาดพรีเมียม Soft Power',
    allocatedAmount: 450000,
    committedAmount: 380000,
    disbursedAmount: 260000,
    plannedQuarterly: { q1: 150000, q2: 150000, q3: 100000, q4: 50000 },
    docRefNo: 'กค.0409.3/ว.188 ลงวันที่ 15 พ.ย. 67',
    docDate: '2567-11-15',
    recordedBy: 'นางกานดา สุวรรณฉัตร',
    verifiedBy: 'นายสมเกียรติ ไชยวงค์',
    transferHistory: [],
    isDemo: true,
    lastUpdated: '2568-03-01'
  },
  {
    id: 'bud-002',
    fiscalYear: 2568,
    budgetSource: 'งบกรมการพัฒนาชุมชน',
    expenseCategory: 'งบดำเนินงาน',
    divisionId: 'STRATEGY',
    districtId: 'bokluea',
    projectId: 'proj-002',
    projectCode: 'นน-ยศ-68-002',
    projectName: 'โครงการขับเคลื่อนหมู่บ้านท่องเที่ยวเชิงสร้างสรรค์ OTOP นวัตวิถี บ่อเกลือ-ปัว',
    allocatedAmount: 300000,
    committedAmount: 240000,
    disbursedAmount: 180000,
    plannedQuarterly: { q1: 100000, q2: 120000, q3: 80000, q4: 0 },
    docRefNo: 'มท.0506/ว.451 ลงวันที่ 20 พ.ย. 67',
    docDate: '2567-11-20',
    recordedBy: 'นายพงษ์ศักดิ์ ธรรมจักร',
    verifiedBy: 'นายสมเกียรติ ไชยวงค์',
    transferHistory: [],
    isDemo: true,
    lastUpdated: '2568-03-05'
  },
  {
    id: 'bud-003',
    fiscalYear: 2568,
    budgetSource: 'งบกองทุนพัฒนาบทบาทสตรี',
    expenseCategory: 'งบดำเนินงาน',
    divisionId: 'COORDINATION',
    districtId: 'ALL',
    projectId: 'proj-003',
    projectCode: 'นน-ปส-68-003',
    projectName: 'โครงการบริหารจัดการหนี้และฟื้นฟูอาชีพสมาชิกกองทุนพัฒนาบทบาทสตรี จังหวัดน่าน',
    allocatedAmount: 250000,
    committedAmount: 220000,
    disbursedAmount: 195000,
    plannedQuarterly: { q1: 120000, q2: 80000, q3: 30000, q4: 20000 },
    docRefNo: 'กพส.นน 001/2568 ลงวันที่ 30 ต.ค. 67',
    docDate: '2567-10-30',
    recordedBy: 'นางรุ่งทิพย์ มหาวัน',
    verifiedBy: 'นายสมเกียรติ ไชยวงค์',
    transferHistory: [
      {
        id: 'bt-1',
        date: '2567-12-05',
        type: 'ADJUSTMENT',
        amount: 20000,
        reason: 'ปรับเพิ่มค่าตอบแทนวิทยากรด้านบัญชีครัวเรือน โดยเกลี่ยจากค่าพาหนะ',
        authorizedBy: 'พัฒนาการจังหวัดน่าน',
        refDocument: 'บันทึกข้อความ ที่ นน 0019/314'
      }
    ],
    isDemo: true,
    lastUpdated: '2568-03-08'
  },
  {
    id: 'bud-004',
    fiscalYear: 2568,
    budgetSource: 'งบกรมการพัฒนาชุมชน',
    expenseCategory: 'งบดำเนินงาน',
    divisionId: 'INFORMATICS',
    districtId: 'ALL',
    projectId: 'proj-004',
    projectCode: 'นน-สน-68-004',
    projectName: 'โครงการจัดทำ Big Data สารสนเทศการพัฒนาชุมชน และยกระดับตำบลสารสนเทศคุณภาพชีวิต',
    allocatedAmount: 200000,
    committedAmount: 200000,
    disbursedAmount: 185000,
    plannedQuarterly: { q1: 90000, q2: 90000, q3: 20000, q4: 0 },
    docRefNo: 'มท.0508/ว.622 ลงวันที่ 25 ต.ค. 67',
    docDate: '2567-10-25',
    recordedBy: 'นายเกียรติศักดิ์ แก้ววิเชียร',
    verifiedBy: 'นายสมเกียรติ ไชยวงค์',
    transferHistory: [],
    isDemo: true,
    lastUpdated: '2568-03-01'
  },
  {
    id: 'bud-005',
    fiscalYear: 2568,
    budgetSource: 'งบกรมการพัฒนาชุมชน',
    expenseCategory: 'งบดำเนินงาน',
    divisionId: 'ADMIN',
    districtId: 'ALL',
    projectId: 'proj-005',
    projectCode: 'นน-บห-68-005',
    projectName: 'โครงการพัฒนาขีดสมรรถนะบุคลากร พช.น่าน สู่การเป็นนักจัดการงานพัฒนาเชิงพื้นที่มืออาชีพ',
    allocatedAmount: 150000,
    committedAmount: 150000,
    disbursedAmount: 148500,
    plannedQuarterly: { q1: 150000, q2: 0, q3: 0, q4: 0 },
    docRefNo: 'มท.0502/ว.201 ลงวันที่ 20 ต.ค. 67',
    docDate: '2567-10-20',
    recordedBy: 'นายสมเกียรติ ไชยวงค์',
    verifiedBy: 'นายชำนาญ บดินทร์เดช',
    transferHistory: [],
    isDemo: true,
    lastUpdated: '2568-01-25'
  },
  {
    id: 'bud-006',
    fiscalYear: 2568,
    budgetSource: 'งบอุดหนุนและพัฒนาชุมชนทั่วไป',
    expenseCategory: 'งบอุดหนุน',
    divisionId: 'STRATEGY',
    districtId: 'pua',
    projectName: 'เงินอุดหนุนพัฒนาผู้นำอาสาพัฒนาชุมชน (ผู้นำ อช.) อำเภอปัว',
    allocatedAmount: 120000,
    committedAmount: 90000,
    disbursedAmount: 60000,
    plannedQuarterly: { q1: 30000, q2: 30000, q3: 30000, q4: 30000 },
    docRefNo: 'นน.0019/ว.55 ลงวันที่ 1 ธ.ค. 67',
    docDate: '2567-12-01',
    recordedBy: 'นายณรงค์ฤทธิ์ ชัยชนะ',
    verifiedBy: 'นายพงษ์ศักดิ์ ธรรมจักร',
    transferHistory: [],
    isDemo: true,
    lastUpdated: '2568-02-28'
  }
];

export const INITIAL_REPORTS: ReportRegistryItem[] = [
  {
    id: 'rep-001',
    code: 'รป-สต-68-03',
    title: 'รายงานผลการบริหารจัดการหนี้กองทุนพัฒนาบทบาทสตรี ประจำเดือนมีนาคม 2568',
    divisionId: 'COORDINATION',
    districtId: 'ALL',
    responsibleOfficer: 'นางสาวสุดารัตน์ คำแสน',
    compilerName: 'นางสาวสุดารัตน์ คำแสน (นักวิชาการ พช.)',
    reviewerName: 'นางรุ่งทิพย์ มหาวัน (ผอ.กลุ่มงานประสานฯ)',
    periodType: 'MONTHLY',
    periodLabel: 'ประจำเดือนมีนาคม 2568',
    dueDate: '2026-10-18', // upcoming in 2 days from today in simulation
    status: 'IN_PROGRESS',
    driveFileUrl: 'https://drive.google.com/drive/folders/1rep-womenfund-mar-2568',
    remarks: 'รอข้อมูลยอดชำระคืนจาก สพอ.ทุ่งช้าง และ สพอ.บ่อเกลือ',
    notificationHistory: [
      {
        timestamp: '2026-10-15 08:30',
        message: 'แจ้งเตือนอัตโนมัติ: รายงานครบกำหนดในอีก 3 วัน (18 ต.ค. 2569)',
        daysBefore: 3
      }
    ],
    isDemo: true
  },
  {
    id: 'rep-002',
    code: 'รป-ยศ-68-Q2',
    title: 'รายงานผลการดำเนินงานตามแผนปฏิบัติราชการและตัวชี้วัด ไตรมาสที่ 2/2568',
    divisionId: 'STRATEGY',
    districtId: 'ALL',
    responsibleOfficer: 'นางสาวพัชรี สุริยะ',
    compilerName: 'นางสาวพัชรี สุริยะ (นักวิชาการ พช.)',
    reviewerName: 'นายพงษ์ศักดิ์ ธรรมจักร (ผอ.กลุ่มงานยุทธศาสตร์ฯ)',
    periodType: 'QUARTERLY',
    periodLabel: 'ไตรมาสที่ 2 (ม.ค. - มี.ค. 2568)',
    dueDate: '2026-10-10', // overdue by 6 days in simulation
    status: 'DELAYED',
    driveFileUrl: 'https://drive.google.com/drive/folders/1rep-q2-strategy-2568',
    remarks: 'เลยกำหนดส่ง 6 วัน อยู่ระหว่างรวบรวมข้อมูลโครงการ OTOP และบ่อเกลือ',
    notificationHistory: [
      {
        timestamp: '2026-10-07 08:30',
        message: 'แจ้งเตือน: รายงานครบกำหนดในอีก 3 วัน',
        daysBefore: 3
      },
      {
        timestamp: '2026-10-11 08:30',
        message: 'แจ้งเตือนเร่งรัด: รายงานเกินกำหนดส่งแล้ว 1 วัน กรุณาจัดส่งด่วน',
        daysBefore: -1
      }
    ],
    isDemo: true
  },
  {
    id: 'rep-003',
    code: 'รป-สน-68-01',
    title: 'รายงานการตรวจสอบคุณภาพและรับรองข้อมูล จปฐ. ระดับจังหวัด ประจำปี 2568',
    divisionId: 'INFORMATICS',
    districtId: 'ALL',
    responsibleOfficer: 'นายพิษณุ สุขเกษม',
    compilerName: 'นายพิษณุ สุขเกษม (นักวิชาการคอมพิวเตอร์)',
    reviewerName: 'นายเกียรติศักดิ์ แก้ววิเชียร (ผอ.กลุ่มงานสารสนเทศฯ)',
    periodType: 'ANNUAL',
    periodLabel: 'ประจำปีงบประมาณ 2568',
    dueDate: '2026-09-30',
    submittedDate: '2026-09-28',
    status: 'VERIFIED',
    driveFileUrl: 'https://drive.google.com/file/d/1nan-jpthor-annual-audit-2568/view',
    remarks: 'ผ่านการตรวจสอบและรับรองจากคณะทำงานระดับจังหวัดเรียบร้อยแล้ว',
    notificationHistory: [],
    isDemo: true
  },
  {
    id: 'rep-004',
    code: 'รป-สส-68-02',
    title: 'รายงานยอดจำหน่ายผลิตภัณฑ์ OTOP จังหวัดน่าน ประจำเดือนกุมภาพันธ์ 2568',
    divisionId: 'PROMOTION',
    districtId: 'ALL',
    responsibleOfficer: 'นางสาวชลธิชา สิทธิราช',
    compilerName: 'นางสาวชลธิชา สิทธิราช',
    reviewerName: 'นางกานดา สุวรรณฉัตร (ผอ.กลุ่มงานส่งเสริมฯ)',
    periodType: 'MONTHLY',
    periodLabel: 'ประจำเดือนกุมภาพันธ์ 2568',
    dueDate: '2026-03-05',
    submittedDate: '2026-03-04',
    status: 'VERIFIED',
    driveFileUrl: 'https://drive.google.com/file/d/1nan-otop-feb-sales/view',
    notificationHistory: [],
    isDemo: true
  },
  {
    id: 'rep-005',
    code: 'รป-ปัว-68-01',
    title: 'รายงานความก้าวหน้าโครงการสัมมาชีพชุมชนและการรวมกลุ่มอาชีพ สพอ.ปัว',
    divisionId: 'PROMOTION',
    districtId: 'pua',
    responsibleOfficer: 'นายณรงค์ฤทธิ์ ชัยชนะ',
    compilerName: 'นายณรงค์ฤทธิ์ ชัยชนะ (สพอ.ปัว)',
    reviewerName: 'นางกานดา สุวรรณฉัตร (ผอ.กลุ่มงานส่งเสริมฯ)',
    periodType: 'MONTHLY',
    periodLabel: 'ประจำเดือนมีนาคม 2568',
    dueDate: '2026-10-25',
    status: 'SUBMITTED',
    driveFileUrl: 'https://drive.google.com/drive/folders/1pua-sammacheep-mar-2568',
    remarks: 'ส่งเอกสารแล้ว รอการตรวจสอบความถูกต้องของภาพถ่ายกิจกรรม',
    notificationHistory: [],
    isDemo: true
  }
];

export const INITIAL_DATASETS: CentralDatasetItem[] = [
  {
    id: 'ds-001',
    divisionId: 'STRATEGY',
    categoryName: 'แผนปฏิบัติราชการและตัวชี้วัด',
    title: 'ทะเบียนแผนงานโครงการตามแผนปฏิบัติราชการประจำปี พ.ศ. 2568 สำนักงานพัฒนาชุมชนจังหวัดน่าน',
    code: 'DS-STR-01',
    fiscalYear: 2568,
    recordCount: 38,
    unit: 'โครงการ',
    dataOwner: 'กลุ่มงานยุทธศาสตร์การพัฒนาชุมชน',
    sourceAgency: 'สพจ.น่าน และ สพอ. 15 อำเภอ',
    lastUpdated: '2568-03-01',
    securityLevel: 'INTERNAL',
    driveFileUrl: 'https://drive.google.com/drive/folders/1nan-strategy-plan-2568',
    summary: 'รวบรวมแผนงาน โครงการ กิจกรรม วัตถุประสงค์ วงเงินงบประมาณ และผู้รับผิดชอบโครงการประจำปี 2568',
    metadataAttributes: [
      { key: 'งบประมาณรวมทั้งสิ้น', value: '18,450,000 บาท' },
      { key: 'จำนวนตัวชี้วัดตามคำรับรอง', value: '14 ตัวชี้วัด' },
      { key: 'รอบการประเมิน', value: 'รายไตรมาส' }
    ],
    isDemo: true
  },
  {
    id: 'ds-002',
    divisionId: 'PROMOTION',
    categoryName: 'ผู้ผลิต ผู้ประกอบการ OTOP',
    title: 'ทำเนียบผู้ผลิต ผู้ประกอบการ OTOP และผลิตภัณฑ์ OTOP จังหวัดน่าน (1-5 ดาว)',
    code: 'DS-PRO-01',
    fiscalYear: 2568,
    recordCount: 942,
    unit: 'ผลิตภัณฑ์',
    dataOwner: 'กลุ่มงานส่งเสริมการพัฒนาชุมชน',
    sourceAgency: 'กรมการพัฒนาชุมชน และ สพจ.น่าน',
    lastUpdated: '2568-02-28',
    securityLevel: 'PUBLIC',
    driveFileUrl: 'https://drive.google.com/drive/folders/1nan-otop-directory-2568',
    summary: 'ฐานข้อมูลผู้ประกอบการ OTOP 5 ประเภท (อาหาร, เครื่องดื่ม, ผ้า/เครื่องแต่งกาย, ของใช้/ตกแต่ง/ที่ระลึก, สมุนไพรที่ไม่ใช่อาหาร) รายชื่อผู้ติดต่อ เบอร์โทร และพิกัดร้านค้า',
    metadataAttributes: [
      { key: 'OTOP 5 ดาว', value: '48 ผลิตภัณฑ์' },
      { key: 'OTOP 4 ดาว', value: '112 ผลิตภัณฑ์' },
      { key: 'OTOP 3 ดาว', value: '235 ผลิตภัณฑ์' },
      { key: 'ผู้ประกอบการรุ่นใหม่ (Young OTOP)', value: '35 ราย' }
    ],
    isDemo: true
  },
  {
    id: 'ds-003',
    divisionId: 'PROMOTION',
    categoryName: 'สัมมาชีพชุมชนและเศรษฐกิจฐานราก',
    title: 'ฐานข้อมูลหมู่บ้านสัมมาชีพชุมชนและกลุ่มอาชีพแปรรูปเกษตร จังหวัดน่าน',
    code: 'DS-PRO-02',
    fiscalYear: 2568,
    recordCount: 154,
    unit: 'กลุ่ม',
    dataOwner: 'กลุ่มงานส่งเสริมการพัฒนาชุมชน',
    sourceAgency: 'สพอ.ทั้ง 15 อำเภอ',
    lastUpdated: '2568-01-20',
    securityLevel: 'INTERNAL',
    driveFileUrl: 'https://drive.google.com/drive/folders/1nan-sammacheep-2568',
    summary: 'ข้อมูลกลุ่มอาชีพสัมมาชีพที่ผ่านการฝึกอบรมการผลิต การแปรรูป และการตลาด มีการเชื่อมโยงเครือข่ายบริษัท ประชารัฐรักสามัคคีน่าน (วิสาหกิจเพื่อสังคม) จำกัด',
    metadataAttributes: [
      { key: 'สมาชิกในกลุ่มรวม', value: '3,240 คน' },
      { key: 'กลุ่มอาชีพหลัก', value: 'กาแฟ, ผ้าทอ, ไกสาหร่ายน้ำจืด, เครื่องจักสาน' }
    ],
    isDemo: true
  },
  {
    id: 'ds-004',
    divisionId: 'INFORMATICS',
    categoryName: 'ข้อมูลความจำเป็นพื้นฐาน (จปฐ.)',
    title: 'ฐานข้อมูลความจำเป็นพื้นฐาน (จปฐ.) ระดับครัวเรือน จังหวัดน่าน ประจำปี 2568',
    code: 'DS-INF-01',
    fiscalYear: 2568,
    recordCount: 124850,
    unit: 'ครัวเรือน',
    dataOwner: 'กลุ่มงานสารสนเทศการพัฒนาชุมชน',
    sourceAgency: 'ระบบ Smart Survey กรมการพัฒนาชุมชน',
    lastUpdated: '2568-03-01',
    securityLevel: 'CONFIDENTIAL',
    driveFileUrl: 'https://drive.google.com/drive/folders/1nan-jpthor-database-2568',
    summary: 'ข้อมูลคุณภาพชีวิต 5 หมวด 31 ตัวชี้วัด สำรวจครอบคลุม 15 อำเภอ 99 ตำบล 894 หมู่บ้าน',
    metadataAttributes: [
      { key: 'ครัวเรือนยากจนตกเกณฑ์รายได้', value: '1,428 ครัวเรือน' },
      { key: 'ส่งต่อแก้ไขผ่าน TPMAP', value: '1,428 ครัวเรือน (100%)' },
      { key: 'สถานะการรับรองข้อมูล', value: 'ผ่านการรับรองระดับจังหวัดแล้ว' }
    ],
    isDemo: true
  },
  {
    id: 'ds-005',
    divisionId: 'COORDINATION',
    categoryName: 'กองทุนพัฒนาบทบาทสตรี',
    title: 'ทะเบียนลูกหนี้และสถานะการชำระเงินกู้กองทุนพัฒนาบทบาทสตรี จังหวัดน่าน',
    code: 'DS-COO-01',
    fiscalYear: 2568,
    recordCount: 685,
    unit: 'สัญญาเงินกู้',
    dataOwner: 'กลุ่มงานประสานและสนับสนุนการบริหารงานพัฒนาชุมชน',
    sourceAgency: 'สำนักงานกองทุนพัฒนาบทบาทสตรีจังหวัดน่าน',
    lastUpdated: '2568-03-08',
    securityLevel: 'CONFIDENTIAL',
    driveFileUrl: 'https://drive.google.com/drive/folders/1nan-womenfund-ledger-2568',
    summary: 'ทะเบียนสัญญาเงินกู้โครงการอาชีพของกลุ่มสตรี ยอดเงินกู้สะสม ยอดชำระคืน ยอดหนี้คงเหลือ และสถานะหนี้ค้างชำระ',
    metadataAttributes: [
      { key: 'วงเงินกู้คงค้างรวม', value: '28,450,000 บาท' },
      { key: 'อัตราหนี้ค้างชำระ (NPL)', value: '4.82% (เป้าหมายไม่เกิน 5%)' },
      { key: 'กลุ่มที่ทำแผนปรับโครงสร้างหนี้', value: '142 กลุ่ม' }
    ],
    isDemo: true
  },
  {
    id: 'ds-006',
    divisionId: 'ADMIN',
    categoryName: 'ข้อมูลบริหารทั่วไปและบุคลากร',
    title: 'ทำเนียบบุคลากรและเครือข่ายผู้นำพัฒนาชุมชน จังหวัดน่าน 15 อำเภอ',
    code: 'DS-ADM-01',
    fiscalYear: 2568,
    recordCount: 198,
    unit: 'คน',
    dataOwner: 'ฝ่ายอำนวยการและบริหารทั่วไป',
    sourceAgency: 'สพจ.น่าน',
    lastUpdated: '2568-01-15',
    securityLevel: 'INTERNAL',
    driveFileUrl: 'https://drive.google.com/drive/folders/1nan-cdd-staff-directory',
    summary: 'รายชื่อข้าราชการ ลูกจ้าง พัฒนากรประจำตำบล ประธาน กพต. ผู้นำ อช. และคณะกรรมการพัฒนาสตรีอำเภอ (กพส.อ.)',
    metadataAttributes: [
      { key: 'ข้าราชการและพนักงานราชการ', value: '92 คน' },
      { key: 'ผู้นำ อช.', value: '198 คน' },
      { key: 'คณะกรรมการ กพต.', value: '99 คณะ' }
    ],
    isDemo: true
  }
];

export const INITIAL_POLICY_INDICATORS: PolicyIndicator[] = [
  {
    id: 'pol-1',
    policyNumber: '1',
    title: 'การส่งเสริมและยกระดับผลิตภัณฑ์ OTOP และ Soft Power เมืองน่าน',
    description: 'พัฒนาผลิตภัณฑ์ OTOP สู่มาตรฐานสากล สร้างมูลค่าเพิ่ม และขยายช่องทางการตลาดสมัยใหม่',
    targetValue: 1200000000,
    unit: 'บาท/ปี (ยอดจำหน่าย OTOP สะสม)',
    currentValue: 845200000,
    divisionId: 'PROMOTION',
    status: 'ON_TRACK',
    notes: 'ยอดจำหน่ายสะสม 5 เดือนแรกคิดเป็นร้อยละ 70.4 ของเป้าหมายทั้งปี'
  },
  {
    id: 'pol-2',
    policyNumber: '2',
    title: 'การขับเคลื่อนเศรษฐกิจฐานรากและสัมมาชีพชุมชนเข้มแข็ง',
    description: 'ส่งเสริมการสร้างอาชีพ เพิ่มรายได้ ลดรายจ่ายครัวเรือน และเชื่อมโยงตลาดประชารัฐ',
    targetValue: 154,
    unit: 'หมู่บ้านสัมมาชีพต้นแบบ',
    currentValue: 138,
    divisionId: 'PROMOTION',
    status: 'ON_TRACK',
    notes: 'ดำเนินการแล้วเสร็จ 138 หมู่บ้าน คิดเป็นร้อยละ 89.6'
  },
  {
    id: 'pol-3',
    policyNumber: '3',
    title: 'การบริหารจัดการและลดหนี้ค้างชำระกองทุนพัฒนาบทบาทสตรี',
    description: 'ควบคุมหนี้ค้างชำระ (NPL) กองทุนพัฒนาบทบาทสตรีไม่ให้เกินเกณฑ์ร้อยละ 5',
    targetValue: 5.0,
    unit: '% หนี้ค้างชำระ (ยิ่งน้อยยิ่งดี)',
    currentValue: 4.82,
    divisionId: 'COORDINATION',
    status: 'ON_TRACK',
    notes: 'อยู่ในเกณฑ์เป้าหมาย ผ่านการไกล่เกลี่ยและฟื้นฟูอาชีพลูกหนี้ใน 4 โซน'
  },
  {
    id: 'pol-4',
    policyNumber: '4',
    title: 'การพัฒนาหมู่บ้านท่องเที่ยวชุมชนเชิงสร้างสรรค์ (CBT น่าน)',
    description: 'ยกระดับมาตรฐานชุมชนท่องเที่ยว นวัตวิถี อัตลักษณ์ท้องถิ่น และการกระจายรายได้',
    targetValue: 24,
    unit: 'หมู่บ้านท่องเที่ยวที่ผ่านเกณฑ์',
    currentValue: 19,
    divisionId: 'STRATEGY',
    status: 'WARNING',
    notes: 'พื้นที่บ่อเกลือและปัวบางจุดอยู่ระหว่างปรับปรุงป้ายสื่อความหมายและภูมิทัศน์'
  },
  {
    id: 'pol-5',
    policyNumber: '5',
    title: 'ฐานข้อมูล Big Data และแก้ไขปัญหาความยากจนรายครัวเรือน (TPMAP/ThaiQM)',
    description: 'บูรณาการข้อมูล จปฐ. 100% และติดตามให้ความช่วยเหลือครัวเรือนเป้าหมายครบถ้วน',
    targetValue: 100,
    unit: '% การรับรองและการช่วยเหลือ',
    currentValue: 97.4,
    divisionId: 'INFORMATICS',
    status: 'ON_TRACK',
    notes: 'บันทึกข้อมูล จปฐ. ครบ 100% รอการตรวจสอบเชิงลึกใน 2 อำเภอ'
  },
  {
    id: 'pol-6',
    policyNumber: '+1',
    title: 'การเป็นองค์กรดิจิทัล CDD Nan One และบูรณาการ 15 อำเภอ',
    description: 'การนำระบบ CDD Nan One Platform มาใช้ในการบริหารจัดการ การส่งงาน และการจัดเก็บองค์ความรู้',
    targetValue: 15,
    unit: 'สำนักงานพัฒนาชุมชนอำเภอ',
    currentValue: 15,
    divisionId: 'ADMIN',
    status: 'ON_TRACK',
    notes: 'ทั้ง 15 อำเภอเชื่อมโยงและเข้าใช้งานระบบครบถ้วน 100%'
  }
];

export const INITIAL_KM_ITEMS: KnowledgeItem[] = [
  {
    id: 'km-001',
    title: 'คู่มือแนวทางการบริหารจัดการหนี้และการดำเนินคดีกองทุนพัฒนาบทบาทสตรี ฉบับปรับปรุง 2568',
    category: 'HANDBOOK',
    divisionId: 'COORDINATION',
    author: 'กลุ่มงานประสานและสนับสนุนการบริหารงานพัฒนาชุมชน',
    authorPosition: 'สพจ.น่าน',
    publishYear: 2568,
    tags: ['กองทุนสตรี', 'การบริหารหนี้', 'คลินิกไกล่เกลี่ย', 'แบบฟอร์มปรับโครงสร้างหนี้'],
    summary: 'รวบรวมขั้นตอน แนวทางปฏิบัติ กฎหมาย ระเบียบ ข้อบังคับ และตัวอย่างหนังสือทวงถามหนี้ แบบฟอร์มทำบันทึกข้อตกลงประนอมหนี้ เพื่อให้พัฒนากรและเจ้าหน้าที่กองทุนสตรี 15 อำเภอนำไปใช้เป็นมาตรฐานเดียวกัน',
    keyTakeaways: [
      'ขั้นตอนการแจ้งเตือนลูกหนี้ก่อนครบกำหนดชำระ 30 วัน',
      'หลักเกณฑ์การลดเบี้ยปรับและการขยายระยะเวลาชำระหนี้',
      'แนวทางการฟื้นฟูอาชีพลูกหนี้ควบคู่กับการประนอมหนี้'
    ],
    driveFileUrl: 'https://drive.google.com/file/d/1cdd-nan-km-womenfund-guide/view',
    viewCount: 342,
    downloadCount: 128,
    rating: 4.9,
    status: 'PUBLISHED',
    isDemo: true,
    createdAt: '2568-01-10'
  },
  {
    id: 'km-002',
    title: 'ถอดบทเรียน (AAR): โมเดลการพัฒนาผ้าทอน้ำไหลไทลื้อบ้านหนองบัว สู่ตลาดสากล Soft Power',
    category: 'BEST_PRACTICE',
    divisionId: 'PROMOTION',
    author: 'นางกานดา สุวรรณฉัตร และ สพอ.ท่าวังผา',
    authorPosition: 'กลุ่มงานส่งเสริมการพัฒนาชุมชน',
    publishYear: 2568,
    tags: ['OTOP', 'ผ้าทอน้ำไหล', 'Soft Power', 'ไทลื้อ', 'นวัตกรรมเส้นใยธรรมชาติ'],
    summary: 'กรณีศึกษาความสำเร็จของกลุ่มทอผ้าบ้านหนองบัว อ.ท่าวังผา ในการยกระดับลายผ้าโบราณด้วยสีย้อมธรรมชาติ การออกแบบเสื้อผ้าร่วมสมัย และการใช้ Storytelling เชื่อมโยงวัฒนธรรมประเพณีไทลื้อ จนได้รับรางวัลระดับชาติ',
    keyTakeaways: [
      'การดึงคนรุ่นใหม่ (ลูกหลานช่างทอ) กลับมาต่อยอดด้านการตลาดออนไลน์',
      'การควบคุมมาตรฐานสีย้อมธรรมชาติเพื่อตอบโจทย์ตลาดส่งออก BCG Model',
      'การรวมกลุ่มแบบคลัสเตอร์ช่วยลดต้นทุนเส้นใยและเพิ่มอำนาจต่อรอง'
    ],
    driveFileUrl: 'https://drive.google.com/file/d/1cdd-nan-km-weaving-aar/view',
    viewCount: 520,
    downloadCount: 215,
    rating: 5.0,
    status: 'PUBLISHED',
    isDemo: true,
    createdAt: '2568-02-05'
  },
  {
    id: 'km-003',
    title: 'แนวปฏิบัติที่ดี: การบริหารจัดการท่องเที่ยวโดยชุมชน (CBT) ปัว-บ่อเกลือ แบบกระจายรายได้',
    category: 'BEST_PRACTICE',
    divisionId: 'STRATEGY',
    author: 'นายณรงค์ฤทธิ์ ชัยชนะ (สพอ.ปัว)',
    authorPosition: 'สำนักงานพัฒนาชุมชนอำเภอปัว',
    publishYear: 2567,
    tags: ['การท่องเที่ยวโดยชุมชน', 'CBT', 'ปัว', 'บ่อเกลือ', 'กระจายรายได้'],
    summary: 'แนวทางการจัดระบบหมุนเวียนคิวที่พักโฮมสเตย์ มัคคุเทศก์น้อย และร้านค้าชุมชน เพื่อให้ทุกครัวเรือนได้รับผลประโยชน์จากการท่องเที่ยวอย่างเป็นธรรม ไม่เกิดความเหลื่อมล้ำ',
    keyTakeaways: [
      'ธรรมนูญท่องเที่ยวชุมชนที่ตกลงร่วมกันในเวทีประชาคม',
      'การจัดตั้งกองทุนสวัสดิการชุมชนจากการท่องเที่ยว (หัก 5% เข้ากองทุน)',
      'การอนุรักษ์สิ่งแวดล้อมและการจัดการขยะนักท่องเที่ยว'
    ],
    driveFileUrl: 'https://drive.google.com/file/d/1cdd-nan-km-cbt-guideline/view',
    viewCount: 289,
    downloadCount: 94,
    rating: 4.8,
    status: 'PUBLISHED',
    isDemo: true,
    createdAt: '2567-11-20'
  },
  {
    id: 'km-004',
    title: 'คู่มือเทคนิคการตรวจสอบความครบถ้วนและคุณภาพข้อมูล จปฐ. ด้วย Smart Survey',
    category: 'HANDBOOK',
    divisionId: 'INFORMATICS',
    author: 'กลุ่มงานสารสนเทศการพัฒนาชุมชน',
    authorPosition: 'สพจ.น่าน',
    publishYear: 2568,
    tags: ['จปฐ.', 'Smart Survey', 'Big Data', 'การตรวจสอบข้อมูล'],
    summary: 'คู่มือแนะนำจุดผิดพลาดที่พบบ่อยในการจัดเก็บข้อมูล จปฐ. 31 ตัวชี้วัด และเทคนิคการตรวจสอบข้อมูลผิดปกติ (Anomaly Detection) ก่อนส่งรับรองระดับอำเภอ',
    keyTakeaways: [
      'เช็คลิสต์ 7 จุดเสี่ยงที่มักกรอกข้อมูลผิดพลาด เช่น รายได้เฉลี่ยและการถือครองที่ดิน',
      'ขั้นตอนการใช้งานโปรแกรมตรวจสอบความสอดคล้องของข้อมูล',
      'วิธีประสานงานแก้ไขข้อมูลกับผู้จัดเก็บในพื้นที่'
    ],
    driveFileUrl: 'https://drive.google.com/file/d/1cdd-nan-km-jpthor-audit-tips/view',
    viewCount: 410,
    downloadCount: 162,
    rating: 4.9,
    status: 'PUBLISHED',
    isDemo: true,
    createdAt: '2568-01-20'
  },
  {
    id: 'km-005',
    title: 'แบบฟอร์มและขั้นตอนการขอรับเงินอุดหนุนโครงการพัฒนาชุมชน ประจำปี 2568',
    category: 'PROCEDURE_FORM',
    divisionId: 'STRATEGY',
    author: 'ฝ่ายอำนวยการและกลุ่มงานยุทธศาสตร์',
    authorPosition: 'สพจ.น่าน',
    publishYear: 2568,
    tags: ['แบบฟอร์ม', 'เงินอุดหนุน', 'ระเบียบการเงิน', 'โครงการ พช.'],
    summary: 'ชุดเอกสารและแบบฟอร์มมาตรฐานสำหรับการเสนอขอรับเงินอุดหนุน แบบประมาณการค่าใช้จ่าย และแบบรายงานผลการเบิกจ่ายเงินตามระเบียบกระทรวงการคลัง',
    keyTakeaways: [
      'แบบฟอร์มไฟล์ Word และ Google Docs ที่สามารถดาวน์โหลดไปใช้งานได้ทันที',
      'เกณฑ์การคิดค่าอาหาร ค่าเบี้ยเลี้ยง และค่าเดินทางตามระเบียบใหม่ล่าสุด'
    ],
    driveFileUrl: 'https://drive.google.com/drive/folders/1cdd-nan-forms-template-2568',
    viewCount: 650,
    downloadCount: 380,
    rating: 4.9,
    status: 'PUBLISHED',
    isDemo: true,
    createdAt: '2567-12-01'
  }
];
