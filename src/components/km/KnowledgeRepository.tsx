import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CDD_DIVISIONS } from '../../data/initialData';
import { KnowledgeItem, KmCategory, DivisionId } from '../../types';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Download, 
  ExternalLink, 
  Star, 
  Tag, 
  Eye, 
  Share2, 
  FileText, 
  Sparkles, 
  ThumbsUp,
  X,
  Building2,
  Calendar
} from 'lucide-react';

export const KnowledgeRepository: React.FC = () => {
  const { 
    knowledgeItems, 
    addKnowledgeItem, 
    incrementKmDownload, 
    currentUser, 
    showToast,
    searchQuery,
    selectedDivisionId,
    setGoogleDriveModalOpen
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<KmCategory | 'ALL'>('ALL');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New KM item form
  const [newKmForm, setNewKmForm] = useState<{
    title: string;
    category: KmCategory;
    divisionId: DivisionId;
    author: string;
    authorPosition: string;
    publishYear: number;
    tags: string;
    summary: string;
    keyTakeaways: string[];
    driveFileUrl: string;
  }>({
    title: '',
    category: 'BEST_PRACTICE',
    divisionId: 'PROMOTION',
    author: currentUser.name,
    authorPosition: currentUser.title,
    publishYear: 2568,
    tags: 'น่าน, พัฒนาชุมชน',
    summary: '',
    keyTakeaways: [''],
    driveFileUrl: ''
  });

  const categoryNames: Record<KmCategory, string> = {
    HANDBOOK: 'คู่มือการปฏิบัติงาน',
    DIRECTIVE: 'หนังสือสั่งการ/แนวทาง',
    PROCEDURE_FORM: 'ขั้นตอนและแบบฟอร์ม',
    BEST_PRACTICE: 'นวัตกรรม & Best Practices',
    AAR_LESSONS: 'ถอดบทเรียนการทำงาน (AAR)'
  };

  const filteredItems = useMemo(() => {
    return knowledgeItems.filter(item => {
      if (selectedDivisionId !== 'ALL' && item.divisionId !== selectedDivisionId) return false;
      if (activeCategory !== 'ALL' && item.category !== activeCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesAuthor = item.author.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesAuthor && !matchesSummary && !matchesTags) return false;
      }
      return true;
    });
  }, [knowledgeItems, selectedDivisionId, activeCategory, searchQuery]);

  const handleCreateKm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKmForm.title.trim()) {
      showToast('กรุณากรอกชื่อองค์ความรู้', 'error');
      return;
    }

    const tagsArray = newKmForm.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    addKnowledgeItem({
      ...newKmForm,
      tags: tagsArray,
      keyTakeaways: newKmForm.keyTakeaways.filter(k => k.trim() !== ''),
      status: 'PUBLISHED',
      isDemo: true
    });

    setIsAddModalOpen(false);
  };

  const handleDownload = (item: KnowledgeItem) => {
    incrementKmDownload(item.id);
    if (item.driveFileUrl) {
      window.open(item.driveFileUrl, '_blank', 'noreferrer');
    } else {
      showToast('เปิดองค์ความรู้ในระบบ', 'info');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h1 className="text-lg font-bold font-prompt text-blue-950">
              คลังองค์ความรู้ CDD Nan KM (Knowledge Management Hub)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 pl-10">
            รวบรวมคู่มือปฏิบัติงาน นวัตกรรมชุมชน Best Practices และบทเรียนความสำเร็จ พช. 15 อำเภอ
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-950 hover:bg-blue-900 rounded-lg transition-colors shadow-xs cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>แบ่งปันองค์ความรู้ใหม่</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveCategory('ALL')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium cursor-pointer ${
            activeCategory === 'ALL'
              ? 'bg-blue-950 text-white font-semibold'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          ทั้งหมด ({knowledgeItems.length})
        </button>
        {(['BEST_PRACTICE', 'HANDBOOK', 'PROCEDURE_FORM', 'DIRECTIVE', 'AAR_LESSONS'] as KmCategory[]).map(cat => {
          const count = knowledgeItems.filter(k => k.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-950 text-white font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {categoryNames[cat]} ({count})
            </button>
          );
        })}
      </div>

      {/* Knowledge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => {
          const div = CDD_DIVISIONS.find(d => d.id === item.divisionId);

          return (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-xl border border-slate-200/90 p-5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-blue-900">
                    {categoryNames[item.category]}
                  </span>
                  <span className="text-slate-400 font-mono">
                    พ.ศ. {item.publishYear}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-950 line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="truncate max-w-[150px]">
                  {item.author}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3 text-slate-400" />
                    <span className="font-mono tabular-nums">{item.downloadCount}</span>
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating.toFixed(1)}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reader / Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2 text-xs text-blue-900 font-semibold">
                <BookOpen className="w-4 h-4" />
                <span>{categoryNames[selectedItem.category]} · พ.ศ. {selectedItem.publishYear}</span>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  {selectedItem.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-slate-500 mt-1.5 text-[11px]">
                  <span>ผู้สร้างองค์ความรู้: <strong className="text-slate-800">{selectedItem.author}</strong></span>
                  <span>·</span>
                  <span>ตำแหน่ง: {selectedItem.authorPosition}</span>
                  <span>·</span>
                  <span>ดาวน์โหลด: <strong className="font-mono">{selectedItem.downloadCount} ครั้ง</strong></span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-1 text-xs">บทคัดย่อและสาระสำคัญ</h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {selectedItem.summary}
                </p>
              </div>

              {selectedItem.keyTakeaways && selectedItem.keyTakeaways.length > 0 && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>บทเรียนสำคัญและแนวทางนำไปปรับใช้ (Key Takeaways)</span>
                  </h4>
                  <ul className="space-y-1.5 border border-amber-200 bg-amber-50/40 rounded-xl p-3.5 text-slate-800">
                    {selectedItem.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-700 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags list */}
              <div>
                <span className="text-slate-500 block mb-1">หมวดหมู่และคำค้น:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.tags.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {selectedItem.driveFileUrl && (
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-blue-950 block">เอกสารฉบับสมบูรณ์ใน Google Drive</span>
                    <span className="text-blue-800 text-[11px] truncate max-w-sm block">{selectedItem.driveFileUrl}</span>
                  </div>
                  <button
                    onClick={() => handleDownload(selectedItem)}
                    className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>เปิด / ดาวน์โหลดเอกสาร</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add KM Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                แบ่งปันองค์ความรู้และบทเรียนใหม่สู่ CDD Nan KM
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateKm} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">ประเภทองค์ความรู้ *</label>
                  <select
                    value={newKmForm.category}
                    onChange={e => setNewKmForm({ ...newKmForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="BEST_PRACTICE">นวัตกรรมและ Best Practice</option>
                    <option value="HANDBOOK">คู่มือการปฏิบัติงาน</option>
                    <option value="PROCEDURE_FORM">ขั้นตอนและแบบฟอร์ม</option>
                    <option value="DIRECTIVE">หนังสือสั่งการและแนวทาง</option>
                    <option value="AAR_LESSONS">ถอดบทเรียนจากการทำงาน (AAR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">กลุ่มงานเจ้าของเรื่อง</label>
                  <select
                    value={newKmForm.divisionId}
                    onChange={e => setNewKmForm({ ...newKmForm, divisionId: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {CDD_DIVISIONS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">ชื่อองค์ความรู้ / เรื่องเล่าความสำเร็จ *</label>
                <input
                  type="text"
                  value={newKmForm.title}
                  onChange={e => setNewKmForm({ ...newKmForm, title: e.target.value })}
                  placeholder="เช่น ถอดบทเรียนการขับเคลื่อนผ้าทอน้ำไหลสู่ตลาดพรีเมียม..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">ผู้จัดทำ / เจ้าของผลงาน</label>
                  <input
                    type="text"
                    value={newKmForm.author}
                    onChange={e => setNewKmForm({ ...newKmForm, author: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">ปีที่เผยแพร่ (พ.ศ.)</label>
                  <input
                    type="number"
                    value={newKmForm.publishYear}
                    onChange={e => setNewKmForm({ ...newKmForm, publishYear: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">บทคัดย่อและสาระสำคัญ *</label>
                <textarea
                  value={newKmForm.summary}
                  onChange={e => setNewKmForm({ ...newKmForm, summary: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  placeholder="สรุปแนวคิด กระบวนการดำเนินงาน และผลลัพธ์ที่เป็นรูปธรรม..."
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">คำค้น / แท็ก (คั่นด้วยจุลภาค)</label>
                <input
                  type="text"
                  value={newKmForm.tags}
                  onChange={e => setNewKmForm({ ...newKmForm, tags: e.target.value })}
                  placeholder="เช่น OTOP, ผ้าทอน้ำไหล, Soft Power, กองทุนสตรี"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">ลิงก์เอกสาร Google Drive</label>
                <input
                  type="url"
                  value={newKmForm.driveFileUrl}
                  onChange={e => setNewKmForm({ ...newKmForm, driveFileUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-medium text-white bg-blue-950 hover:bg-blue-900 rounded-lg"
                >
                  บันทึกองค์ความรู้
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
