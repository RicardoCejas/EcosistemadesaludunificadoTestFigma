import { MessageCircle, Settings, Send, Check, Phone, Video, MoreVertical, Battery, Wifi, Signal } from "lucide-react";

export default function ChatbotConfig() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start justify-center">
      
      {/* Panel de Configuración Web (Izquierda) */}
      <div className="flex-1 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm w-full">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-green-100 rounded-xl">
            <MessageCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Configuración de Chatbot</h2>
            <p className="text-gray-500">Integración con WhatsApp API</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Settings className="h-4 w-4 mr-2 text-gray-500" />
                Regla: Reasignación de Turno Cancelado
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                Activa
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Disparador (Trigger)</label>
                <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm bg-white p-2.5 border">
                  <option>Paciente cancela turno con &lt; 24hs de anticipación</option>
                  <option>Médico ausente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje Automático (Template)</label>
                <textarea 
                  rows={4}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm bg-white p-3 border font-mono text-sm"
                  defaultValue={`Hola {{nombre_paciente}}, se liberó un turno para {{especialidad}} mañana a las {{hora}}. ¿Deseas tomarlo?`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Botón 1 (Acción)</label>
                  <input type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm bg-white p-2 border" defaultValue="Sí, confirmar" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Botón 2 (Acción)</label>
                  <input type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm bg-white p-2 border" defaultValue="No, gracias" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mockup del Celular (Derecha) */}
      <div className="w-[340px] flex-shrink-0 mx-auto lg:mx-0">
        <div className="relative rounded-[3rem] border-8 border-gray-900 bg-white shadow-2xl overflow-hidden h-[700px]">
          {/* Notch */}
          <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl w-40 mx-auto z-20"></div>
          
          {/* Status Bar */}
          <div className="bg-[#075e54] text-white px-6 pt-2 pb-1 flex justify-between items-center text-xs font-medium z-10 relative">
            <span>09:41</span>
            <div className="flex space-x-2 items-center">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <Battery className="h-4 w-4" />
            </div>
          </div>

          {/* WhatsApp Header */}
          <div className="bg-[#075e54] text-white px-4 py-3 flex items-center justify-between shadow-md relative z-10">
            <div className="flex items-center space-x-3">
              <button className="p-1 -ml-2"><ArrowLeftIcon /></button>
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center p-1">
                <div className="bg-blue-600 rounded-full w-full h-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SU</span>
                </div>
              </div>
              <div>
                <h1 className="font-semibold text-[15px] leading-tight">Salud Unificada</h1>
                <p className="text-xs text-green-100">Cuenta de empresa</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Video className="h-5 w-5" />
              <Phone className="h-5 w-5" />
              <MoreVertical className="h-5 w-5" />
            </div>
          </div>

          {/* Chat Background */}
          <div className="bg-[#efeae2] h-full flex flex-col p-4 relative" style={{ backgroundImage: 'url("https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg")', backgroundBlendMode: 'soft-light', backgroundSize: 'cover' }}>
            
            {/* Date Badge */}
            <div className="flex justify-center mb-4 mt-2">
              <span className="bg-[#e1f3fb] text-gray-600 text-xs px-3 py-1 rounded-lg shadow-sm font-medium">
                Hoy
              </span>
            </div>

            {/* Chatbot Message Block */}
            <div className="bg-white rounded-lg rounded-tl-none p-2 shadow-sm max-w-[85%] mb-2 relative">
              <p className="text-[15px] text-gray-800 leading-snug">
                Hola Juan 👋, se liberó un turno para <strong>Cardiología</strong> mañana a las <strong>10:00 hs</strong>. 
                <br/><br/>
                ¿Deseas tomarlo?
              </p>
              <span className="text-[11px] text-gray-500 float-right mt-1 ml-2">09:42</span>
            </div>
            
            {/* Interactive WhatsApp Buttons */}
            <div className="flex flex-col gap-1 max-w-[85%]">
              <button className="bg-white text-[#00a884] font-medium py-2.5 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-sm">
                Sí, confirmar
              </button>
              <button className="bg-white text-[#00a884] font-medium py-2.5 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-sm">
                No, gracias
              </button>
            </div>

          </div>
          
          {/* Input Area */}
          <div className="absolute bottom-0 inset-x-0 bg-[#f0f2f5] p-2 flex items-center gap-2">
            <div className="flex-1 bg-white rounded-full px-4 py-2 text-gray-500 text-[15px] shadow-sm flex items-center">
              Mensaje
            </div>
            <div className="h-10 w-10 bg-[#00a884] rounded-full flex items-center justify-center shadow-sm">
              <Send className="h-5 w-5 text-white ml-1" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  );
}
