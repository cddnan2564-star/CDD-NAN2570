import React, { useState } from 'react';
import { X, Save, Sliders, CheckCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PolicyIndicator } from '../../types';

interface PolicySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PolicySettingsModal: React.FC<PolicySettingsModalProps> = ({ isOpen, onClose }) => {
  const { policyIndicators, updatePolicyIndicator, showToast, currentUser } = useApp();
  const [editingItem, setEditingItem] = useState<PolicyIndicator | null>(null);

  if (!isOpen) return null;

  const isAuthorized = currentUser.role === 'ADMIN' || currentUser.role === 'EXECUTIVE';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    updatePolicyIndicator(editingItem);
    setEditingItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">ตั้งค่าตัวชี้วัดนโยบาย 5+1 กรมการพัฒนาชุมชน/จังหวัดน่าน</h3>
              <p className="text-xs text-slate-500">ปรับปรุงเกณฑ์เป้าหมาย ผลการดำเนินงาน และคำอธิบายตัวชี้วัด</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!isAuthorized && (
            <div className="p-3 bg-amber-50 text-amber-800 rounded-lg text-xs flex items-center gap-2 border border-amber-200">
              <Info className="w-4 h-4 shrink-0" />
              <span>โหมดดูข้อมูล: เฉพาะพัฒนาการจังหวัดน่านหรือผู้ดูแลระบบ (Admin) เท่านั้นที่สามารถบันทึกแก้ไขเป้าหมายได้</span>
            </div>
          )}

          {editingItem ? (
            <form onSubmit={handleSave} className="space-y-4 p-4 border border-blue-200 bg-blue-50/30 rounded-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-blue-950 text-sm">
                  แก้ไขตัวชี้วัด: ข้อ {editingItem.policyNumber} - {editingItem.title}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  ยกเลิก
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ชื่อตัวชี้วัด</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">คำอธิบายภารกิจ</label>
                <textarea
                  value={editingItem.description}
                  onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">เป้าหมาย (Target)</label>
                  <input
                    type="number"
                    step="any"
                    value={editingItem.targetValue}
                    onChange={e => setEditingItem({ ...editingItem, targetValue: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono tabular-nums"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">ผลปัจจุบัน (Current)</label>
                  <input
                    type="number"
                    step="any"
                    value={editingItem.currentValue}
                    onChange={e => setEditingItem({ ...editingItem, currentValue: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono tabular-nums"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">หน่วยนับ</label>
                  <input
                    type="text"
                    value={editingItem.unit}
                    onChange={e => setEditingItem({ ...editingItem, unit: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">สถานะ</label>
                  <select
                    value={editingItem.status}
                    onChange={e => setEditingItem({ ...editingItem, status: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="ON_TRACK">เป็นไปตามเป้าหมาย (On Track)</option>
                    <option value="WARNING">เฝ้าระวัง (Warning)</option>
                    <option value="CRITICAL">ล่าช้า/วิกฤต (Critical)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">หมายเหตุผลการดำเนินงาน</label>
                  <input
                    type="text"
                    value={editingItem.notes}
                    onChange={e => setEditingItem({ ...editingItem, notes: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={!isAuthorized}
                  className="px-4 py-1.5 text-xs font-medium bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>บันทึกตัวชี้วัด</span>
                </button>
              </div>
            </form>
          ) : null}

          {/* Indicators list */}
          <div className="space-y-3">
            {policyIndicators.map(ind => {
              const pct = ind.targetValue > 0 ? Math.min(100, Math.round((ind.currentValue / ind.targetValue) * 100)) : 0;
              return (
                <div
                  key={ind.id}
                  className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-all bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-900 text-amber-300 font-bold flex items-center justify-center text-xs shrink-0">
                        {ind.policyNumber}
                      </span>
                      <h4 className="font-semibold text-slate-900 text-sm">{ind.title}</h4>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                          ind.status === 'ON_TRACK'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : ind.status === 'WARNING'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {ind.status === 'ON_TRACK' ? 'ตามเป้าหมาย' : ind.status === 'WARNING' ? 'เฝ้าระวัง' : 'วิกฤต'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 pl-9">{ind.description}</p>
                    <p className="text-[11px] text-slate-600 pl-9">
                      ผลงาน: <strong className="font-mono text-slate-900">{ind.currentValue.toLocaleString('th-TH')}</strong> / เป้าหมาย: <span className="font-mono">{ind.targetValue.toLocaleString('th-TH')}</span> {ind.unit}
                    </p>
                    {ind.notes && (
                      <p className="text-[11px] text-amber-800 pl-9 italic">💡 {ind.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <div className="text-right">
                      <div className="text-base font-bold font-mono text-blue-950 tabular-nums">{pct}%</div>
                      <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${pct >= 80 ? 'bg-emerald-600' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    {isAuthorized && (
                      <button
                        onClick={() => setEditingItem(ind)}
                        className="px-3 py-1.5 text-xs text-blue-900 font-medium hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors"
                      >
                        แก้ไข
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
