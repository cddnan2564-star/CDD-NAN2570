import React from 'react';
import { useApp } from '../../context/AppContext';
import { NAN_DISTRICTS, CDD_DIVISIONS } from '../../data/initialData';
import { Search, Filter, Calendar, MapPin, Building2, X } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const {
    fiscalYear,
    setFiscalYear,
    selectedDivisionId,
    setSelectedDivisionId,
    selectedDistrictId,
    setSelectedDistrictId,
    searchQuery,
    setSearchQuery
  } = useApp();

  const hasActiveFilters = fiscalYear !== 'ALL' || selectedDivisionId !== 'ALL' || selectedDistrictId !== 'ALL' || searchQuery.length > 0;

  const resetFilters = () => {
    setFiscalYear(2568);
    setSelectedDivisionId('ALL');
    setSelectedDistrictId('ALL');
    setSearchQuery('');
  };

  return (
    <div className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="ค้นหาโครงการ รหัส ร่างรายงาน ข้อมูล OTOP งบประมาณ หรือองค์ความรู้..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 transition-all text-slate-800 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter selectors */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Fiscal Year */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-blue-900 shrink-0" />
            <span className="text-[11px] text-slate-500 font-medium">ปีงบ:</span>
            <select
              value={fiscalYear}
              onChange={e => setFiscalYear(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value={2568}>พ.ศ. 2568 (ปัจจุบัน)</option>
              <option value={2567}>พ.ศ. 2567</option>
              <option value={2569}>พ.ศ. 2569 (วางแผน)</option>
              <option value="ALL">ทุกปีงบประมาณ</option>
            </select>
          </div>

          {/* Division */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="text-[11px] text-slate-500 font-medium">กลุ่มงาน:</span>
            <select
              value={selectedDivisionId}
              onChange={e => setSelectedDivisionId(e.target.value as any)}
              className="bg-transparent text-xs font-medium text-slate-800 focus:outline-hidden cursor-pointer max-w-[130px] truncate"
            >
              <option value="ALL">ทุกกลุ่มงาน</option>
              {CDD_DIVISIONS.map(d => (
                <option key={d.id} value={d.id}>
                  {d.shortName}
                </option>
              ))}
            </select>
          </div>

          {/* Nan 15 Districts */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="text-[11px] text-slate-500 font-medium">อำเภอ:</span>
            <select
              value={selectedDistrictId}
              onChange={e => setSelectedDistrictId(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">15 อำเภอ (ภาพรวมจังหวัด)</option>
              {NAN_DISTRICTS.map(dist => (
                <option key={dist.id} value={dist.id}>
                  อ.{dist.thaiName}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[11px] text-slate-500 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-100 transition-colors flex items-center gap-1"
              title="ล้างตัวกรองทั้งหมด"
            >
              <X className="w-3 h-3" />
              <span>ล้างตัวกรอง</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
};
