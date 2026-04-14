import { Search, ZoomIn, Contrast, Move3d, RotateCw, Printer, Download, User, Calendar, Stethoscope, FileSignature, ShieldCheck } from "lucide-react";

export default function DicomViewer() {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
      
      {/* Top Bar - Patient Info */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex flex-wrap justify-between items-center text-slate-200 gap-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-slate-700/50 px-3 py-1.5 rounded-lg">
            <User className="h-4 w-4 text-blue-400" />
            <span className="font-semibold text-white">Juan Pérez</span>
            <span className="text-slate-400 text-sm border-l border-slate-600 pl-2 ml-2">ID: 884729</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>Fecha del estudio: 12 Abr 2026</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Stethoscope className="h-4 w-4 text-slate-400" />
            <span>Resonancia Magnética (Cerebro)</span>
          </div>
          <div className="flex items-center space-x-2 text-sm bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Ley 25.326 (Encriptado)</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300" title="Descargar DICOM">
            <Download className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300" title="Imprimir Placa">
            <Printer className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Tools */}
        <div className="w-16 bg-slate-800 border-r border-slate-700 flex flex-col items-center py-4 space-y-4">
          <ToolButton icon={ZoomIn} label="Zoom" active />
          <ToolButton icon={Contrast} label="Contraste" />
          <ToolButton icon={Move3d} label="Medición" />
          <ToolButton icon={RotateCw} label="Rotar" />
          <ToolButton icon={Search} label="Lupa" />
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-black relative flex items-center justify-center p-8 overflow-hidden group">
          
          {/* DICOM Overlays */}
          <div className="absolute top-4 left-4 text-emerald-400 font-mono text-xs z-10 pointer-events-none opacity-70">
            <p>Se: 3 / Im: 12</p>
            <p>Ax T1 FSE</p>
            <p>TR: 500.0</p>
            <p>TE: 14.0</p>
          </div>
          <div className="absolute bottom-4 right-4 text-emerald-400 font-mono text-xs z-10 pointer-events-none opacity-70 text-right">
            <p>WL: 350 WW: 800</p>
            <p>T: 5.0mm L: 2.5mm</p>
            <p>FOV: 24.0 x 24.0 cm</p>
          </div>

          <div className="absolute top-4 right-4 text-emerald-400 font-mono text-xs z-10 pointer-events-none opacity-70 text-right">
            <p>HOSPITAL AURELIO CRESPO</p>
            <p>R</p>
          </div>
          <div className="absolute bottom-4 left-4 text-emerald-400 font-mono text-xs z-10 pointer-events-none opacity-70">
            <p>L</p>
          </div>

          {/* The Medical Image */}
          <div className="relative max-h-full max-w-full">
            <img 
              src="https://images.unsplash.com/photo-1631563019676-dade0dbdb8fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtcmklMjBicmFpbiUyMHNjYW4lMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDF8fHx8MTc3NjEzOTA2MHww&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Resonancia Magnética Cerebro"
              className="object-contain max-h-full max-w-full grayscale contrast-125 brightness-90 cursor-crosshair"
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            />
            {/* Fake measurement line overlay */}
            <div className="absolute top-1/2 left-1/3 w-32 border-t-2 border-emerald-400 border-dashed transform -rotate-12 group-hover:block hidden pointer-events-none">
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-emerald-400 font-mono text-xs bg-black/50 px-1 rounded">24.5 mm</span>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Action Button for Report */}
      <button className="absolute bottom-8 right-8 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center space-x-3 transition-transform hover:scale-105 z-20">
        <FileSignature className="h-5 w-5" />
        <span>Emitir Informe Médico</span>
      </button>

    </div>
  );
}

function ToolButton({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button 
      className={`p-3 rounded-xl flex flex-col items-center justify-center space-y-1 transition-colors group relative ${active ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-slate-700 text-slate-400'}`}
      title={label}
    >
      <Icon className="h-6 w-6" />
      {/* Tooltip */}
      <div className="absolute left-full ml-4 px-2 py-1 bg-slate-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
        {label}
      </div>
    </button>
  );
}
