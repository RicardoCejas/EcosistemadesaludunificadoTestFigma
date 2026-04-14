import { Shield, Activity, Users, KeyRound, Clock3, Settings } from "lucide-react";

const auditLog = [
  { id: 1, event: "Login bypass PROFESIONAL", actor: "dev.qa@local", timestamp: "14/04 09:41" },
  { id: 2, event: "Actualizacion permisos globales", actor: "admin.ops@local", timestamp: "14/04 09:18" },
  { id: 3, event: "Alta de rol CENTRO", actor: "dev.front@local", timestamp: "14/04 08:52" },
  { id: 4, event: "Cambio configuracion OAuth", actor: "dev.sec@local", timestamp: "14/04 08:31" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Panel de Control de Desarrolladores</h2>
        <p className="mt-1 text-gray-500">Auditoria del sistema y configuracion global del Ecosistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <Shield className="h-6 w-6 text-blue-600" />
          <p className="mt-2 text-2xl font-bold text-gray-900">99.98%</p>
          <p className="text-sm text-gray-500">Disponibilidad API</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <Activity className="h-6 w-6 text-emerald-600" />
          <p className="mt-2 text-2xl font-bold text-gray-900">1,284</p>
          <p className="text-sm text-gray-500">Eventos de auditoria (24h)</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <Users className="h-6 w-6 text-violet-600" />
          <p className="mt-2 text-2xl font-bold text-gray-900">48</p>
          <p className="text-sm text-gray-500">Usuarios con permisos globales</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 flex items-center mb-5">
            <Clock3 className="mr-2 h-5 w-5 text-amber-600" /> Auditoria del Sistema
          </h3>
          <div className="space-y-3">
            {auditLog.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">{entry.event}</p>
                <p className="mt-1 text-xs text-gray-500">{entry.actor} - {entry.timestamp}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 flex items-center mb-5">
            <Settings className="mr-2 h-5 w-5 text-blue-600" /> Configuracion Global
          </h3>
          <div className="space-y-3">
            <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left hover:bg-gray-50">
              <p className="text-sm font-semibold text-gray-900">Gestion de Usuarios</p>
              <p className="text-xs text-gray-500">Alta, baja y bloqueo de cuentas</p>
            </button>
            <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left hover:bg-gray-50">
              <p className="text-sm font-semibold text-gray-900">Permisos Globales</p>
              <p className="text-xs text-gray-500">Matrices RBAC por modulo</p>
            </button>
            <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left hover:bg-gray-50">
              <p className="text-sm font-semibold text-gray-900">Credenciales de Integracion</p>
              <p className="text-xs text-gray-500">Tokens y llaves de servicios externos</p>
            </button>
            <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left hover:bg-gray-50">
              <p className="text-sm font-semibold text-gray-900">Politicas de Seguridad</p>
              <p className="text-xs text-gray-500">MFA, contrasenas y retencion de logs</p>
            </button>
          </div>
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-800 inline-flex items-center">
              <KeyRound className="mr-2 h-4 w-4" /> Entorno TEST activo. Cambios no impactan produccion.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
