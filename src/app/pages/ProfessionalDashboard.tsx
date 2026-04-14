import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Users, FileText, CheckCircle2, XCircle, AlertCircle, QrCode, Plus } from "lucide-react";

export default function ProfessionalDashboard() {
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const turnosHoy = [
    { time: "09:00", patient: "Ana García", type: "Primera Consulta", status: "confirmado" },
    { time: "09:30", patient: "Luis Martínez", type: "Control Médico", status: "confirmado" },
    { time: "10:00", patient: "Sofía López", type: "Lectura Estudios", status: "pendiente" },
    { time: "10:30", patient: "Carlos Gómez", type: "Consulta Clínica", status: "cancelado" },
    { time: "11:00", patient: "María Silva", type: "Control Médico", status: "confirmado" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pendiente": return "bg-amber-50 text-amber-700 border-amber-200";
      case "cancelado": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmado": return <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-500" />;
      case "pendiente": return <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />;
      case "cancelado": return <XCircle className="h-4 w-4 mr-1 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Buen día, Dr. Smith</h2>
          <p className="text-gray-500 mt-1">Tenés 5 turnos programados para hoy, 15 de Abril.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowRecipeModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Emitir Receta
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Agenda Semanal / Hoy */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-blue-600" />
                Agenda Diaria
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Hoy</button>
                <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">Semana</button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {turnosHoy.map((turno, i) => (
                <div key={i} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-xl min-w-[80px]">
                      <Clock className="h-5 w-5 text-blue-600 mb-1" />
                      <span className="text-sm font-bold text-blue-900">{turno.time}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{turno.patient}</h4>
                      <p className="text-sm text-gray-500">{turno.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(turno.status)}`}>
                      {getStatusIcon(turno.status)}
                      {turno.status}
                    </span>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                      Ver Ficha
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats & Actions */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <Users className="h-6 w-6 text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-500">Pacientes activos</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <FileText className="h-6 w-6 text-emerald-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">Recetas emitidas</p>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-500 opacity-50 blur-2xl"></div>
            <h3 className="text-lg font-bold mb-2 relative z-10">Receta Digital Segura</h3>
            <p className="text-blue-100 text-sm mb-6 relative z-10">
              Emití recetas válidas para cualquier farmacia con firma digital y código QR.
            </p>
            <button 
              onClick={() => setShowRecipeModal(true)}
              className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors relative z-10 shadow-sm"
            >
              Crear Nueva Receta
            </button>
          </div>

        </div>
      </div>

      {/* Receta Modal (Simplified overlay) */}
      {showRecipeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setShowRecipeModal(false)}>
              <div className="absolute inset-0 bg-gray-900/75 backdrop-blur-sm"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-gray-200">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FileText className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                      Emitir Receta Digital
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                        <select className="block w-full rounded-xl border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white">
                          <option>Seleccionar paciente...</option>
                          <option>Ana García - DNI 34.567.890</option>
                          <option>Luis Martínez - DNI 28.123.456</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Medicamento / Principio Activo</label>
                        <input type="text" className="block w-full rounded-xl border-0 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3" placeholder="Ej: Amoxicilina 500mg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Indicaciones</label>
                        <textarea rows={3} className="block w-full rounded-xl border-0 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3" placeholder="Tomar cada 8 horas por 7 días..."></textarea>
                      </div>

                      {/* QR Placeholder */}
                      <div className="mt-6 bg-gray-50 rounded-xl p-4 flex items-center justify-center border border-dashed border-gray-300">
                        <div className="text-center">
                          <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500 font-medium">El código QR de validación farmacéutica <br/> se generará al firmar</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-2xl border-t border-gray-100">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2.5 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                  onClick={() => setShowRecipeModal(false)}
                >
                  Firmar y Emitir
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-4 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                  onClick={() => setShowRecipeModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
