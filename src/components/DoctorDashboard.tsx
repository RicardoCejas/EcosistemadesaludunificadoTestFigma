import { useMemo, useState } from "react";
import { Calendar as CalendarIcon, Clock, Search, FileText, Plus, Users, Activity } from "lucide-react";
import { professionals } from "../data/mockData";

const mockPatients = [
  "Ana Garcia",
  "Luis Martinez",
  "Sofia Lopez",
  "Carlos Gomez",
  "Maria Silva",
  "Valentina Ruiz",
  "Joaquin Pereyra",
  "Lucia Fernandez",
];

export default function DoctorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const doctor = useMemo(() => professionals.find((person: any) => person.especialidad === "Cardiologia") || professionals[0], []);

  const agendaHoy = useMemo(() => {
    const slots = doctor?.disponibilidad?.[0]?.horarios || ["09:00", "09:30", "10:00", "10:30", "11:00"];
    return slots.slice(0, 6).map((time: string, index: number) => ({
      time,
      patient: mockPatients[index % mockPatients.length],
      motivo: index % 2 === 0 ? "Control Medico" : "Primera Consulta",
      estado: index % 3 === 0 ? "confirmado" : index % 3 === 1 ? "pendiente" : "en sala",
    }));
  }, [doctor]);

  const filteredPatients = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      return mockPatients.slice(0, 5);
    }
    return mockPatients.filter((name) => name.toLowerCase().includes(query));
  }, [searchQuery]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Panel Medico</h2>
          <p className="mt-1 text-gray-500">
            {doctor.nombre} - {doctor.especialidad} - {doctor.centro_asociado}
          </p>
        </div>
        <button className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
          <Plus className="mr-2 h-4 w-4" /> Emitir Receta
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5 text-blue-600" /> Agenda del Dia
            </h3>
            <span className="text-sm text-gray-500">{doctor.disponibilidad?.[0]?.etiqueta || "Hoy"}</span>
          </div>
          <div className="divide-y divide-gray-100">
            {agendaHoy.map((turno) => (
              <div key={`${turno.time}-${turno.patient}`} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="min-w-[84px] rounded-xl bg-blue-50 px-3 py-2 text-center">
                    <Clock className="mx-auto mb-1 h-4 w-4 text-blue-600" />
                    <p className="text-sm font-bold text-blue-900">{turno.time}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{turno.patient}</p>
                    <p className="text-sm text-gray-500">{turno.motivo}</p>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                  {turno.estado}
                </span>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 flex items-center">
              <Search className="mr-2 h-4 w-4 text-blue-600" /> Buscador de Pacientes
            </h3>
            <div className="relative mt-4">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Nombre o DNI"
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-9 pr-3 text-sm"
              />
            </div>
            <div className="mt-4 space-y-2">
              {filteredPatients.length === 0 ? (
                <p className="text-sm text-gray-500">Sin coincidencias.</p>
              ) : (
                filteredPatients.map((patient) => (
                  <button
                    type="button"
                    key={patient}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {patient}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
            <h3 className="text-base font-bold text-blue-900 flex items-center">
              <FileText className="mr-2 h-4 w-4" /> Modulo de Receta
            </h3>
            <p className="mt-2 text-sm text-blue-800">
              Emite nuevas recetas digitales con firma y trazabilidad para farmacia.
            </p>
            <button className="mt-4 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-500">
              Nueva Receta
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <Users className="h-5 w-5 text-emerald-600" />
              <p className="mt-2 text-xl font-bold text-gray-900">{mockPatients.length}</p>
              <p className="text-xs text-gray-500">Pacientes activos</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <Activity className="h-5 w-5 text-amber-600" />
              <p className="mt-2 text-xl font-bold text-gray-900">{agendaHoy.length}</p>
              <p className="text-xs text-gray-500">Turnos de hoy</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
