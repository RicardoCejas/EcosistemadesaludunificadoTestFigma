import { Building2, Users, CalendarClock, Activity, ArrowRight } from "lucide-react";

export default function CenterDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gestion de Institucion</h2>
        <p className="mt-1 text-gray-500">Vista de prueba para administracion operativa del centro.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <Users className="h-6 w-6 text-blue-600" />
          <p className="mt-2 text-2xl font-bold text-gray-900">86</p>
          <p className="text-sm text-gray-500">Pacientes del dia</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <CalendarClock className="h-6 w-6 text-emerald-600" />
          <p className="mt-2 text-2xl font-bold text-gray-900">42</p>
          <p className="text-sm text-gray-500">Turnos confirmados</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <Activity className="h-6 w-6 text-amber-600" />
          <p className="mt-2 text-2xl font-bold text-gray-900">7</p>
          <p className="text-sm text-gray-500">Alertas operativas</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" /> Operaciones del Centro
            </h3>
            <p className="mt-1 text-sm text-gray-500">Modulo de prueba para flujos de institucion.</p>
          </div>
          <button className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">
            Ir a modulo
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
