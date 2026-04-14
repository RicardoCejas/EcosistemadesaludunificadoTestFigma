import { Calendar, Clock, FileText, Download, Activity, Heart, ChevronRight, CheckCircle2, Building2, User } from "lucide-react";

export default function PatientDashboard() {
  const turnos = [
    {
      id: 1,
      doctor: "Dra. Martina Flores",
      specialty: "Cardiología",
      date: "Mañana, 15:30 hs",
      location: "Hospital Aurelio Crespo",
      status: "Confirmado",
      image: "https://images.unsplash.com/photo-1713865467253-ce0ac8477d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwZmVtYWxlJTIwZG9jdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTM4NTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      doctor: "Dr. Carlos Menem",
      specialty: "Traumatología",
      date: "12 Abril, 09:00 hs",
      location: "Clínica Cruz del Eje",
      status: "Pendiente",
      image: "https://images.unsplash.com/photo-1763479168168-657afe79882c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMGVsZGVybHklMjBtYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTM4NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    }
  ];

  const historia = [
    { date: "5 Abr 2026", title: "Análisis de Sangre Completo", type: "Laboratorio Central", doc: "Dra. Ruiz" },
    { date: "15 Mar 2026", title: "Consulta Clínica", type: "Clínica General", doc: "Dr. López" },
    { date: "10 Ene 2026", title: "Radiografía de Tórax", type: "Imágenes Médicas", doc: "Dra. Gomez" },
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hola, Juan! 👋</h2>
          <p className="text-gray-500 mt-1">Tu salud general está en buen estado. Tenés 1 turno próximo.</p>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">Última medición de presión</p>
            <p className="text-lg font-bold text-emerald-600">120/80 mmHg</p>
          </div>
          <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-emerald-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Turnos & Estudios */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Próximos Turnos */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                Próximos Turnos
              </h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Ver calendario</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {turnos.map((turno) => (
                <div key={turno.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      turno.status === "Confirmado" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      {turno.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <img src={turno.image} alt={turno.doctor} className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div>
                      <p className="font-semibold text-gray-900">{turno.doctor}</p>
                      <p className="text-sm text-blue-600 font-medium">{turno.specialty}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {turno.date}
                    </div>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                      {turno.location}
                    </div>
                  </div>
                  <div className="mt-5 flex gap-2">
                    <button className="flex-1 py-2 text-sm font-semibold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                      Reprogramar
                    </button>
                    <button className="flex-1 py-2 text-sm font-semibold rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                      Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Descarga de Estudios */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                Estudios y Recetas
              </h3>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
              <div className="divide-y divide-gray-100">
                {[
                  { name: "Receta - Losartán 50mg", type: "PDF", date: "Hace 2 días", icon: FileText, color: "text-red-500", bg: "bg-red-50" },
                  { name: "Resonancia Magnética de Rodilla", type: "DICOM", date: "Hace 1 semana", icon: Activity, color: "text-blue-500", bg: "bg-blue-50" },
                  { name: "Resultados Laboratorio", type: "PDF", date: "Hace 1 mes", icon: FileText, color: "text-red-500", bg: "bg-red-50" },
                ].map((estudio, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${estudio.bg}`}>
                        <estudio.icon className={`h-6 w-6 ${estudio.color}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{estudio.name}</p>
                        <p className="text-sm text-gray-500">{estudio.type} • {estudio.date}</p>
                      </div>
                    </div>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors group">
                      <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* Right Column - Historia Clínica */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 flex items-center mb-6">
              <Activity className="mr-2 h-5 w-5 text-blue-600" />
              Historia Clínica Única
            </h3>
            
            <div className="relative border-l border-gray-200 ml-3 space-y-8">
              {historia.map((item, i) => (
                <div key={i} className="relative pl-6">
                  <span className="absolute -left-3 top-1 h-6 w-6 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </span>
                  <div>
                    <span className="text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-md inline-block mb-2">
                      {item.date}
                    </span>
                    <h4 className="font-semibold text-gray-900 text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{item.type}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-2 border border-gray-100">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      {item.doc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-3 text-sm font-semibold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center group">
              Ver Historial Completo
              <ChevronRight className="ml-2 h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
