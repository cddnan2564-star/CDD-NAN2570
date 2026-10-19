import React from 'react';
import { AlertCircle, RotateCcw, Cloud, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoBanner: React.FC = () => {
  const { resetToDemoData, setGoogleDriveModalOpen } = useApp();

  return (
    <div className="bg-amber-500/10 border-b border-amber-200/80 px-4 py-2 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-3 no-print">
      <div className="flex items-center gap-2">
        <span className="font-semibold px-2 py-0.5 rounded bg-amber-600 text-white uppercase tracking-wider text-[10px]">
          Demo / ข้อมูลจำลอง
        </span>
        <span className="text-slate-700">
          ข้อมูลโครงการ งบประมาณ และเอกสารในระบบเป็นชุดข้อมูลจำลองเพื่อการบริหารจัดการและการทดสอบระบบ พช.น่าน (มิได้เชื่อมต่อ GFMIS ทางราชการโดยตรง)
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setGoogleDriveModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-blue-900 transition-colors"
        >
          <Cloud className="w-3.5 h-3.5 text-blue-600" />
          <span>วิธีเชื่อมโยง Google Drive</span>
        </button>

        <span className="text-slate-300">|</span>

        <button
          onClick={() => {
            if (window.confirm('คุณต้องการคืนค่าข้อมูลตัวอย่างมาตรฐาน (Reset to Default Demo) ทั้งหมดใช่หรือไม่?')) {
              resetToDemoData();
            }
          }}
          className="inline-flex items-center gap-1 text-xs text-amber-800 hover:text-amber-950 font-medium underline underline-offset-2 transition-colors"
          title="คืนค่าข้อมูลตัวอย่างทั้งหมด"
        >
          <RotateCcw className="w-3 h-3" />
          <span>คืนค่าข้อมูลจำลองเริ่มต้น</span>
        </button>
      </div>
    </div>
  );
};
