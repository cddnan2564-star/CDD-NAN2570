import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CDD_DIVISIONS, NAN_DISTRICTS } from '../../data/initialData';
import { CentralDatasetItem, DivisionId } from '../../types';
import { 
  Database, 
  Plus, 
  Search, 
  Download, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Filter, 
  Lock, 
  Eye, 
  FolderPlus, 
  FileText, 
  Building2,
  Calendar,
  CheckCircle,
  X
} from 'lucide-react';

export const CentralDatabase: React.FC = () => {
  const { 
    datasets, 
    addDataset, 
    updateDataset, 
    deleteDataset, 
    currentUser, 
    showToast,
    fiscalYear,
    selectedDivisionId,
    searchQuery,
    setGoogleDriveModalOpen
  } = useApp();

  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('ALL');
  const [selectedDataset, setSelectedDataset] = useState<CentralDatasetItem | null>(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CentralDatasetItem | null>(null);

  // Form State
  const [formState, setFormState] = useState<{
    divisionId: DivisionId;
    categoryName: string;
    title: string;
    code: string;
    fiscalYear: number;
    recordCount: number;
    unit: string;
    dataOwner: string;
    sourceAgency: string;
    securityLevel: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL';
    driveFileUrl: string;
    summary: string;
  }>({
    divisionId: 'STRATEGY',
    categoryName: 'แผนปฏิบัติราชการและตัวชี้วัด',
    title: '',
    code: '',
    fiscalYear: 2568,
    recordCount: 1,
    unit: 'รายการ',
    dataOwner: '',
    sourceAgency: '',
    securityLevel: 'INTERNAL',
    driveFileUrl: '',
    summary: ''
  });

  // Filter datasets
  const filteredDatasets = useMemo(() => {
    return datasets.filter(d => {
      if (fiscalYear !== 'ALL' && d.fiscalYear !== fiscalYear) return false;
      if (selectedDivisionId !== 'ALL' && d.divisionId !== selectedDivisionId) return false;
      if (activeCategoryTab !== 'ALL' && d.categoryName !== activeCategoryTab) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = d.title.toLowerCase().includes(q);
        const matchesCode = d.code.toLowerCase().includes(q);
        const matchesOwner = d.dataOwner.toLowerCase().includes(q);
        const matchesCategory = d.categoryName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCode && !matchesOwner && !matchesCategory) return false;
      }
      return true;
    });
  }, [datasets, fiscalYear, selectedDivisionId, activeCategoryTab, searchQuery]);

  // Unique categories list for segmented tab filter
  const categoryList = useMemo(() => {
    const set = new Set<string>();
    datasets.forEach(d => set.add(d.categoryName));
    return Array.from(set);
  }, [datasets]);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormState({
      divisionId: 'STRATEGY',
      categoryName: 'แผนปฏิบัติราชการและตัวชี้วัด',
      title: '',
      code: `DS-${Date.now().toString().slice(-4)}`,
      fiscalYear: typeof fiscalYear === 'number' ? fiscalYear : 2568,
      recordCount: 1,
      unit: 'รายการ',
      dataOwner: currentUser.name,
      sourceAgency: 'สำนักงานพัฒนาชุมชนจังหวัดน่าน',
      securityLevel: 'INTERNAL',
      driveFileUrl: '',
      summary: ''
    });
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (item: CentralDatasetItem) => {
    setEditingItem(item);
    setFormState({
      divisionId: item.divisionId,
      categoryName: item.categoryName,
      title: item.title,
      code: item.code,
      fiscalYear: item.fiscalYear,
      recordCount: item.recordCount,
      unit: item.unit,
      dataOwner: item.dataOwner,
      sourceAgency: item.sourceAgency,
      securityLevel: item.securityLevel,
      driveFileUrl: item.driveFileUrl || '',
      summary: item.summary
    });
    setIsAddEditModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) {
      showToast('กรุณากรอกชื่อชุดข้อมูล', 'error');
      return;
    }

    if (editingItem) {
      updateDataset({
        ...editingItem,
        ...formState,
        lastUpdated: new Date().toISOString().slice(0, 10)
      });
    } else {
      addDataset({
        ...formState,
        lastUpdated: new Date().toISOString().slice(0, 10),
        metadataAttributes: [],
        isDemo: true
      });
    }
    setIsAddEditModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบชุดข้อมูล "${title}"?`)) {
      deleteDataset(id);
      if (selectedDataset?.id === id) setSelectedDataset(null);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['รหัสชุดข้อมูล', 'ชื่อชุดข้อมูล', 'กลุ่มงาน', 'หมวดหมู่', 'ปีงบประมาณ', 'จำนวนระเบียน', 'หน่วย', 'เจ้าของข้อมูล', 'ระดับชั้นความลับ', 'ลิงก์ Google Drive'];
    const rows = filteredDatasets.map(d => [
      d.code,
      `"${d.title.replace(/"/g, '""')}"`,
      d.divisionId,
      `"${d.categoryName}"`,
      d.fiscalYear,
      d.recordCount,
      d.unit,
      `"${d.dataOwner}"`,
      d.securityLevel,
      d.driveFileUrl || ''
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CDD_Nan_Datasets_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('ส่งออกข้อมูล CSV สำเร็จแล้ว');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <h1 className="text-lg font-bold font-prompt text-blue-950">
              ฐานข้อมูลกลางงานพัฒนาชุมชนจังหวัดน่าน (Central CDD Data Hub)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 pl-10">
            ระบบจัดเก็บและแลกเปลี่ยนชุดข้อมูลงานยุทธศาสตร์ OTOP สัมมาชีพ จปฐ. และกองทุนสตรี 15 อำเภอ
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

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-950 hover:bg-blue-900 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>เพิ่มชุดข้อมูลใหม่</span>
          </button>
        </div>
      </div>

      {/* Category Segmented Filter Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveCategoryTab('ALL')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium cursor-pointer ${
            activeCategoryTab === 'ALL'
              ? 'bg-blue-950 text-white font-semibold shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          ทั้งหมด ({datasets.length})
        </button>
        {categoryList.map(cat => {
          const count = datasets.filter(d => d.categoryName === cat).length;
          const isActive = activeCategoryTab === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategoryTab(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium cursor-pointer ${
                isActive
                  ? 'bg-blue-950 text-white font-semibold shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Datasets Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>พบ {filteredDatasets.length} ชุดข้อมูล</span>
          <span className="text-[11px] text-amber-700 font-medium">
            * ข้อมูลทุกชุดมีการระบุเจ้าของข้อมูล วันที่ปรับปรุง และระดับชั้นความลับ
          </span>
        </div>

        {filteredDatasets.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Database className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-sm text-slate-700">ไม่พบชุดข้อมูลตามเงื่อนไขที่เลือก</p>
            <p className="text-xs mt-1">ลองเปลี่ยนคำค้นหา หรือกดปุ่ม "เพิ่มชุดข้อมูลใหม่"</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">รหัส / ชื่อชุดข้อมูล</th>
                  <th className="py-3 px-3">หมวดหมู่</th>
                  <th className="py-3 px-3">กลุ่มงานรับผิดชอบ</th>
                  <th className="py-3 px-3 text-right">จำนวนระเบียน</th>
                  <th className="py-3 px-3">ระดับสิทธิ์</th>
                  <th className="py-3 px-3">ปรับปรุงล่าสุด</th>
                  <th className="py-3 px-4 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDatasets.map(item => {
                  const div = CDD_DIVISIONS.find(d => d.id === item.divisionId);
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/40 transition-colors group"
                    >
                      <td className="py-3 px-4 max-w-sm">
                        <div className="font-semibold text-slate-900 group-hover:text-blue-950 flex items-center gap-1.5">
                          <span>{item.title}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {item.code} · ปี {item.fiscalYear} · {item.dataOwner}
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700">
                          {item.categoryName}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                        {div?.shortName || item.divisionId}
                      </td>
                      <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-slate-900 whitespace-nowrap">
                        {item.recordCount.toLocaleString('th-TH')} {item.unit}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            item.securityLevel === 'PUBLIC'
                              ? 'bg-emerald-50 text-emerald-700'
                              : item.securityLevel === 'INTERNAL'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {item.securityLevel === 'PUBLIC' ? 'สาธารณะ' : item.securityLevel === 'INTERNAL' ? 'ภายใน พช.' : 'ลับเฉพาะ'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                        {item.lastUpdated}
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setSelectedDataset(item)}
                            className="p-1 text-slate-500 hover:text-blue-900 hover:bg-slate-100 rounded transition-colors"
                            title="ดูรายละเอียดชุดข้อมูล"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          
                          {item.driveFileUrl && (
                            <a
                              href={item.driveFileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                              title="เปิดลิงก์ Google Drive"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}

                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                            title="แก้ไขชุดข้อมูล"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            className="p-1 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                            title="ลบชุดข้อมูล"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dataset Detail Modal */}
      {selectedDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-900" />
                <h3 className="font-semibold text-slate-900 text-base">รายละเอียดชุดข้อมูล</h3>
              </div>
              <button
                onClick={() => setSelectedDataset(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <span className="font-mono text-blue-800 text-[11px] font-semibold">{selectedDataset.code}</span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">{selectedDataset.title}</h2>
                <p className="text-slate-600 mt-2 leading-relaxed">{selectedDataset.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
                <div>
                  <span className="text-slate-500 block text-[11px]">หมวดหมู่ข้อมูล</span>
                  <span className="font-medium text-slate-900">{selectedDataset.categoryName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">ปีงบประมาณ</span>
                  <span className="font-medium text-slate-900">พ.ศ. {selectedDataset.fiscalYear}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">จำนวนระเบียน</span>
                  <span className="font-bold font-mono text-slate-900">{selectedDataset.recordCount.toLocaleString('th-TH')} {selectedDataset.unit}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">ระดับชั้นความลับ</span>
                  <span className="font-medium text-slate-900">{selectedDataset.securityLevel}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">เจ้าของข้อมูล</span>
                  <span className="font-medium text-slate-900">{selectedDataset.dataOwner}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">หน่วยงานต้นทาง</span>
                  <span className="font-medium text-slate-900">{selectedDataset.sourceAgency}</span>
                </div>
              </div>

              {selectedDataset.metadataAttributes && selectedDataset.metadataAttributes.length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">ตัวชี้วัดและคุณลักษณะสำคัญ (Metadata)</h4>
                  <div className="space-y-1.5 border border-slate-100 rounded-lg p-3 bg-white">
                    {selectedDataset.metadataAttributes.map((attr, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-slate-50 last:border-0">
                        <span className="text-slate-600">{attr.key}:</span>
                        <span className="font-semibold text-slate-900">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedDataset.driveFileUrl && (
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-blue-950 block">เอกสาร/ฐานข้อมูล Google Drive</span>
                    <span className="text-blue-800 text-[11px] truncate max-w-md block">{selectedDataset.driveFileUrl}</span>
                  </div>
                  <a
                    href={selectedDataset.driveFileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs hover:bg-blue-800 flex items-center gap-1 shrink-0"
                  >
                    <span>เปิดดูใน Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedDataset(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Dataset Modal */}
      {isAddEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-900" />
                <h3 className="font-semibold text-slate-900 text-base">
                  {editingItem ? 'แก้ไขชุดข้อมูล' : 'เพิ่มชุดข้อมูลใหม่'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">กลุ่มงานรับผิดชอบ *</label>
                  <select
                    value={formState.divisionId}
                    onChange={e => setFormState({ ...formState, divisionId: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {CDD_DIVISIONS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">หมวดหมู่ข้อมูล *</label>
                  <input
                    type="text"
                    value={formState.categoryName}
                    onChange={e => setFormState({ ...formState, categoryName: e.target.value })}
                    placeholder="เช่น ข้อมูล OTOP, ข้อมูล จปฐ., แผนปฏิบัติราชการ"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">ชื่อชุดข้อมูล *</label>
                <input
                  type="text"
                  value={formState.title}
                  onChange={e => setFormState({ ...formState, title: e.target.value })}
                  placeholder="เช่น ทำเนียบผู้ประกอบการ OTOP 5 ดาว จังหวัดน่าน"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">รหัสชุดข้อมูล</label>
                  <input
                    type="text"
                    value={formState.code}
                    onChange={e => setFormState({ ...formState, code: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">จำนวนระเบียน (Records)</label>
                  <input
                    type="number"
                    value={formState.recordCount}
                    onChange={e => setFormState({ ...formState, recordCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">หน่วยนับ</label>
                  <input
                    type="text"
                    value={formState.unit}
                    onChange={e => setFormState({ ...formState, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">เจ้าของข้อมูล (Data Owner)</label>
                  <input
                    type="text"
                    value={formState.dataOwner}
                    onChange={e => setFormState({ ...formState, dataOwner: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">ระดับสิทธิ์การเข้าถึง</label>
                  <select
                    value={formState.securityLevel}
                    onChange={e => setFormState({ ...formState, securityLevel: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="PUBLIC">สาธารณะ (เปิดเผยทั่วไป)</option>
                    <option value="INTERNAL">ภายใน พช. (เฉพาะเจ้าหน้าที่)</option>
                    <option value="CONFIDENTIAL">ลับเฉพาะ (ผู้บริหาร/ผู้ได้รับอนุญาต)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  ลิงก์ไฟล์หรือโฟลเดอร์ Google Drive
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formState.driveFileUrl}
                    onChange={e => setFormState({ ...formState, driveFileUrl: e.target.value })}
                    placeholder="https://drive.google.com/..."
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setGoogleDriveModalOpen(true)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs"
                  >
                    แนะนำลิงก์
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">คำอธิบายชุดข้อมูล (Summary)</label>
                <textarea
                  value={formState.summary}
                  onChange={e => setFormState({ ...formState, summary: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  placeholder="ระบุวัตถุประสงค์ ขอบเขต และรายละเอียดของชุดข้อมูล..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddEditModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-800"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-blue-950 hover:bg-blue-900 rounded-lg shadow-xs"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
