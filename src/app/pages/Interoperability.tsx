import { patientConsultations, patientPrescriptions } from "../../data/mockData";

export default function InteroperabilityView() {
  return (
    <div className="space-y-8 text-gray-900 dark:text-slate-100">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Historia Interoperable</h2>
        <p className="mt-1 text-gray-500 dark:text-slate-300">Recetas digitales y consultas medicas compartidas del paciente.</p>
      </div>

      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100">Recetas Digitales Vigentes</h3>
          <span className="text-xs rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-blue-700">{patientPrescriptions.length} activas</span>
        </div>
        <div className="space-y-3">
          {patientPrescriptions.map((item) => (
            <div key={item.id} className="rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-slate-100">{item.medicamento}</p>
                  <p className="text-sm text-gray-600 dark:text-slate-300">Profesional: {item.profesional}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Fecha: {item.fecha}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{item.estado}</span>
                  <button className="rounded-lg border border-blue-300 dark:border-blue-500 px-3 py-1.5 text-sm font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40">
                    Ver QR/Descargar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100">Historial de Consultas Medicas</h3>
          <span className="text-xs rounded-full bg-gray-100 dark:bg-slate-900 px-2.5 py-1 font-semibold text-gray-600 dark:text-slate-300">Interoperable</span>
        </div>
        <div className="space-y-3">
          {patientConsultations.map((item) => (
            <div key={item.id} className="rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50/70 dark:bg-slate-900/60 p-4">
              <p className="text-sm text-gray-500 dark:text-slate-400">{item.fecha}</p>
              <p className="font-semibold text-gray-900 dark:text-slate-100 mt-1">{item.especialidad}</p>
              <p className="text-sm text-gray-700 dark:text-slate-300">{item.profesional}</p>
              <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">Diagnostico: {item.diagnosticoBreve}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
