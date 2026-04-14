import { useState } from "react";
import { Calendar, Clock, FileText, Download, Activity, Heart, ChevronRight, Building2, Plus, ArrowLeft } from "lucide-react";
import BookingStepper from "./BookingStepper";
import { useAppContext } from "../context/AppContext";

export default function PatientDashboard() {
  const [showUnifiedReservation, setShowUnifiedReservation] = useState(false);
  const { appointments } = useAppContext();

  const defaultTurnosProximos = [
    {
      id: "default-1",
      doctor: "Dra. Martina Flores",
      specialty: "Cardiología",
      date: "18 Abr 2026, 15:30 hs",
      location: "Hospital Aurelio Crespo",
      status: "Confirmado",
    },
    {
      id: "default-2",
      doctor: "Dr. Julián Castro",
      specialty: "Traumatología",
      date: "22 Abr 2026, 09:00 hs",
      location: "Clínica Cruz del Eje",
      status: "Pendiente",
    },
  ];

  const turnosProximos = [...appointments, ...defaultTurnosProximos];

  const turnosPasados = [
    { id: 101, date: "02 Abr 2026, 11:00 hs", specialty: "Clínica Médica", professional: "Dr. Lucas Torres", status: "Realizado" },
    { id: 102, date: "26 Mar 2026, 10:30 hs", specialty: "Dermatología", professional: "Dra. Camila Peralta", status: "Realizado" },
    { id: 103, date: "14 Mar 2026, 16:00 hs", specialty: "Ginecología", professional: "Dra. Julieta Acosta", status: "Realizado" },
    { id: 104, date: "06 Mar 2026, 08:30 hs", specialty: "Oftalmología", professional: "Dr. Franco Ledesma", status: "Realizado" },
    { id: 105, date: "22 Feb 2026, 09:00 hs", specialty: "Neurología", professional: "Dra. Florencia Navarro", status: "Realizado" },
    { id: 106, date: "10 Feb 2026, 12:00 hs", specialty: "Nutrición", professional: "Dr. Tomás Agüero", status: "Realizado" },
  ];

  const historia = [
    { date: "5 Abr 2026", title: "Análisis de Sangre Completo", type: "Laboratorio Central", doc: "Dra. Ruiz" },
    { date: "15 Mar 2026", title: "Consulta Clínica", type: "Clínica General", doc: "Dr. López" },
    { date: "10 Ene 2026", title: "Radiografía de Tórax", type: "Imágenes Médicas", doc: "Dra. Gómez" },
  ];

  return (
    <div className="space-y-8 text-gray-900 dark:text-slate-100">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hola, Juan! 👋</h2>
          <p className="text-gray-500 dark:text-slate-300 mt-1">Tu salud general está en buen estado. Tenés {turnosProximos.length} turnos próximos.</p>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500 dark:text-slate-300">Última medición de presión</p>
            <p className="text-lg font-bold text-emerald-600">120/80 mmHg</p>
          </div>
          <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-emerald-500" />
          </div>
        </div>
      </div>

      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100">Acceso Rápido a Reserva</h3>
            <p className="text-sm text-gray-500 dark:text-slate-300 mt-1">Solicitá un nuevo turno con el mismo motor de reservas del inicio.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowUnifiedReservation(true)}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" /> Solicitar Nuevo Turno
          </button>
        </div>
      </section>

      {showUnifiedReservation ? (
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100">Reserva de Turno</h3>
              <p className="text-sm text-gray-500 dark:text-slate-300">Motor unificado del sitio</p>
            </div>
            <button
              type="button"
              onClick={() => setShowUnifiedReservation(false)}
              className="inline-flex items-center rounded-lg border border-gray-300 dark:border-slate-600 px-3 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-900"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Volver al Panel
            </button>
          </div>
          <BookingStepper />
        </section>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <section className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  Bloque A - Próximos Turnos
                </h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Ver calendario</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {turnosProximos.map((turno) => (
                  <div key={turno.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          turno.status === "Confirmado" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {turno.status}
                      </span>
                    </div>
                    <div className="mb-4">
                      <p className="font-semibold text-gray-900 dark:text-slate-100">{turno.doctor}</p>
                      <p className="text-sm text-blue-600 font-medium">{turno.specialty}</p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-slate-300">
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
                      <button className="flex-1 py-2 text-sm font-semibold rounded-xl border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                        Reprogramar
                      </button>
                      <button className="flex-1 py-2 text-sm font-semibold rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-500" />
                  Bloque B - Historial de Turnos
                </h3>
                <span className="text-xs rounded-full bg-gray-100 dark:bg-slate-900 px-2.5 py-1 font-semibold text-gray-600 dark:text-slate-300">Eventos Realizados</span>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-100 dark:border-slate-700 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
                  <div className="col-span-3">Fecha</div>
                  <div className="col-span-3">Especialidad</div>
                  <div className="col-span-3">Profesional</div>
                  <div className="col-span-1 text-center">Estado</div>
                  <div className="col-span-2 text-right">Acción</div>
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-700">
                  {turnosPasados.map((turno) => (
                    <div key={turno.id} className="grid grid-cols-12 gap-2 px-4 py-3 text-sm text-gray-600 dark:text-slate-300 bg-gray-50/70 dark:bg-slate-900/60">
                      <div className="col-span-3">{turno.date}</div>
                      <div className="col-span-3 text-gray-700 dark:text-slate-200 font-medium">{turno.specialty}</div>
                      <div className="col-span-3">{turno.professional}</div>
                      <div className="col-span-1 text-center">
                        <span className="inline-flex rounded-full bg-gray-200 dark:bg-slate-700 px-2 py-0.5 text-[11px] font-semibold text-gray-700 dark:text-slate-200">{turno.status}</span>
                      </div>
                      <div className="col-span-2 text-right">
                        <button className="text-xs font-semibold text-gray-700 dark:text-slate-200 hover:text-gray-900 rounded-lg border border-gray-300 dark:border-slate-600 px-2.5 py-1 hover:bg-white dark:hover:bg-slate-800">
                          Ver Resumen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-blue-600" />
                  Estudios y Recetas
                </h3>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-2">
                <div className="divide-y divide-gray-100 dark:divide-slate-700">
                  {[
                    { name: "Receta - Losartán 50mg", type: "PDF", date: "Hace 2 días", icon: FileText, color: "text-red-500", bg: "bg-red-50" },
                    { name: "Resonancia Magnética de Rodilla", type: "DICOM", date: "Hace 1 semana", icon: Activity, color: "text-blue-500", bg: "bg-blue-50" },
                    { name: "Resultados Laboratorio", type: "PDF", date: "Hace 1 mes", icon: FileText, color: "text-red-500", bg: "bg-red-50" },
                  ].map((estudio, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors first:rounded-t-xl last:rounded-b-xl">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${estudio.bg}`}>
                          <estudio.icon className={`h-6 w-6 ${estudio.color}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-slate-100">{estudio.name}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-300">{estudio.type} • {estudio.date}</p>
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

          <div className="xl:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-6">Historia Clínica Única</h3>

              <div className="space-y-6">
                {historia.map((item, i) => (
                  <div key={i} className="border-b border-gray-100 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
                    <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">{item.date}</span>
                    <h4 className="mt-1 font-semibold text-gray-900 dark:text-slate-100 text-base">{item.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-slate-300 mt-1">{item.type}</p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Profesional: {item.doc}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 py-3 text-sm font-semibold rounded-xl border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-center group">
                Ver Historial Completo
                <ChevronRight className="ml-2 h-4 w-4 text-gray-400 dark:text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
