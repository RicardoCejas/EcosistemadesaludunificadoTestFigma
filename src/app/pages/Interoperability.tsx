import { Activity, Download, Lock, FileText, CheckCircle2, ShieldCheck, Building2, Stethoscope, FileJson } from "lucide-react";

export default function InteroperabilityView() {
  const events = [
    { 
      date: "14 Abr 2026", 
      title: "Análisis de Laboratorio Completo", 
      center: "Laboratorio Central Córdoba",
      code: "LOINC: 24323-8",
      icon: Activity,
      color: "text-purple-600",
      bg: "bg-purple-100",
      centerIcon: Building2
    },
    { 
      date: "05 Abr 2026", 
      title: "Radiografía de Tórax Frontal", 
      center: "Hospital Aurelio Crespo",
      code: "SNOMED CT: 399208008",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100",
      centerIcon: Building2
    },
    { 
      date: "12 Mar 2026", 
      title: "Consulta Cardiológica", 
      center: "Clínica Cruz del Eje",
      code: "ICD-10: I10 (Hipertensión)",
      icon: Stethoscope,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      centerIcon: Building2
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Encabezado */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Historial Clínico Compartido</h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              Estándar HL7 / FHIR
            </span>
          </div>
          <p className="text-gray-500">Visualización de la historia clínica interoperable del paciente Juan Pérez.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="inline-flex items-center px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-medium text-sm">
            <Lock className="mr-2 h-4 w-4 text-emerald-500" />
            Datos Encriptados de Punto a Punto
          </div>
          <button className="inline-flex justify-center items-center px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm">
            <FileJson className="mr-2 h-4 w-4" />
            Exportar en Formato FHIR
          </button>
        </div>
      </div>

      {/* Línea de Tiempo */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
        
        {/* Decorative background standard logo watermark */}
        <div className="absolute -right-10 -top-10 text-gray-50 opacity-50 pointer-events-none">
          <ShieldCheck className="h-64 w-64" />
        </div>

        <div className="relative border-l-2 border-gray-100 ml-4 space-y-12 pb-4">
          {events.map((event, index) => (
            <div key={index} className="relative pl-8 sm:pl-12 group">
              {/* Timeline dot */}
              <span className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${event.bg}`}>
                <event.icon className={`h-4 w-4 ${event.color}`} />
              </span>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <div className="inline-flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 w-fit">
                    <event.centerIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">{event.center}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">{event.date}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                
                <div className="flex items-center text-sm font-mono text-blue-600 bg-blue-50 px-3 py-2 rounded-lg w-fit border border-blue-100 mt-4">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Terminología mapeada: {event.code}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
            Cargar eventos anteriores (Bus de Interoperabilidad)
          </button>
        </div>
      </div>

    </div>
  );
}
