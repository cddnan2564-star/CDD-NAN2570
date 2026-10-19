import React, { useState } from 'react';
import { X, Cloud, ExternalLink, CheckCircle2, AlertTriangle, FolderGit2, FileText, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GoogleDriveModal: React.FC = () => {
  const { isGoogleDriveModalOpen, setGoogleDriveModalOpen } = useApp();
  const [testUrl, setTestUrl] = useState('');
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    type?: 'FOLDER' | 'FILE' | 'UNKNOWN';
    message?: string;
  } | null>(null);

  if (!isGoogleDriveModalOpen) return null;

  const validateUrl = (url: string) => {
    if (!url.trim()) {
      setValidationResult(null);
      return;
    }
    const isDrive = url.includes('drive.google.com') || url.includes('docs.google.com');
    if (!isDrive) {
      setValidationResult({
        valid: false,
        message: 'ลิงก์ต้องเป็น Google Drive (drive.google.com หรือ docs.google.com)'
      });
      return;
    }

    if (url.includes('/drive/folders/')) {
      setValidationResult({
        valid: true,
        type: 'FOLDER',
        message: 'ตรวจพบเป็นโฟลเดอร์ Google Drive (Folder Link) — เหมาะสำหรับเอกสารโครงการ/ภาพถ่ายรวม'
      });
    } else if (url.includes('/file/d/') || url.includes('/document/d/') || url.includes('/spreadsheets/d/')) {
      setValidationResult({
        valid: true,
        type: 'FILE',
        message: 'ตรวจพบเป็นไฟล์เอกสาร Google Drive / Docs / Sheets — เหมาะสำหรับรายงานเดี่ยวหรือคู่มือ'
      });
    } else {
      setValidationResult({
        valid: true,
        type: 'UNKNOWN',
        message: 'ตรวจพบลิงก์ Google Drive สามารถเปิดใช้งานในระบบได้'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">การเชื่อมโยงระบบเอกสาร Google Drive</h3>
              <p className="text-xs text-slate-500">สำนักงานพัฒนาชุมชนจังหวัดน่าน</p>
            </div>
          </div>
          <button
            onClick={() => setGoogleDriveModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-sm text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">หลักการจัดเก็บเอกสารและหลักฐาน</h4>
            <p className="leading-relaxed text-xs text-slate-600">
              CDD Nan One Platform เชื่อมโยงไฟล์และหลักฐานโดยใช้สถาปัตยกรรม <strong className="text-slate-800">Cloud Link Integration</strong> เจ้าหน้าที่จัดเก็บไฟล์โครงการ ภาพถ่าย รายงาน และระเบียบใน Google Drive ของหน่วยงานหรือส่วนบุคคล แล้วนำ URL มาบันทึกในระบบ ทำให้ระบบมีความยืดหยุ่น รวดเร็ว ไม่กินพื้นที่เซิร์ฟเวอร์ และรองรับการทำงานร่วมกันแบบเรียลไทม์
            </p>
          </div>

          {/* Test Link Validator */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              ทดสอบการตรวจสอบ URL Google Drive
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="วางลิงก์ Google Drive เช่น https://drive.google.com/drive/folders/..."
                value={testUrl}
                onChange={e => {
                  setTestUrl(e.target.value);
                  validateUrl(e.target.value);
                }}
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
              />
              {testUrl && (
                <a
                  href={testUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 text-xs bg-slate-800 text-white rounded-lg hover:bg-slate-700 flex items-center gap-1 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>ทดสอบเปิด</span>
                </a>
              )}
            </div>

            {validationResult && (
              <div
                className={`p-3 rounded-md text-xs flex items-start gap-2 ${
                  validationResult.valid ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {validationResult.valid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <span>{validationResult.message}</span>
              </div>
            )}
          </div>

          {/* Standard Nan Directory Schema */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-amber-600" />
              <span>โครงสร้างโฟลเดอร์มาตรฐาน พช.น่าน (Nan CDD Drive Standard)</span>
            </h4>
            <div className="p-3 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono space-y-1">
              <div>📁 CDD-NAN_2568/</div>
              <div className="pl-4">├── 📁 01_กลุ่มงานยุทธศาสตร์/</div>
              <div className="pl-8">└── 📁 นน-ยศ-68-002_ท่องเที่ยวบ่อเกลือปัว/</div>
              <div className="pl-12">├── 📄 01_แบบเสนอโครงการและอนุมัติ.pdf</div>
              <div className="pl-12">├── 📁 02_ภาพถ่ายกิจกรรมและหลักฐาน/</div>
              <div className="pl-12">└── 📄 03_รายงานผลฉบับสมบูรณ์.pdf</div>
              <div className="pl-4">├── 📁 02_กลุ่มงานส่งเสริมฯ/</div>
              <div className="pl-4">├── 📁 03_กลุ่มงานสารสนเทศ/</div>
              <div className="pl-4">├── 📁 04_กลุ่มงานประสานฯ_กองทุนสตรี/</div>
              <div className="pl-4">└── 📁 05_สพอ_15อำเภอ/</div>
            </div>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
            <Lock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">ข้อแนะนำเรื่องสิทธิ์การเข้าถึง (Permission):</span>
              <p className="mt-0.5 text-slate-600">
                เอกสารภายในให้ตั้งค่าสิทธิ์เป็น <em>"เฉพาะผู้ใช้ในโดเมน @cdd.go.th"</em> และสำหรับเอกสารที่ต้องการเปิดเผยต่อสาธารณะ เช่น คู่มือ OTOP ให้ตั้งเป็น <em>"ทุกคนที่มีลิงก์มีสิทธิ์ดู"</em>
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={() => setGoogleDriveModalOpen(false)}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg shadow-xs hover:bg-slate-50 transition-colors"
          >
            เข้าใจแล้ว ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
