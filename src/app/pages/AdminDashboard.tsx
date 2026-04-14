import { useMemo } from "react";
import { Users, TrendingDown, Calendar, Clock, Building2, Stethoscope, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { centers, professionals, specialties } from "../../data/mockData";

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#1d4ed8", "#1e40af"];

export default function AdminDashboard() {
  const chartData = useMemo(() => {
    return specialties.slice(0, 6).map((specialty: string, index: number) => ({
      name: specialty,
      turnos: professionals.filter((person: any) => person.especialidad === specialty).length * (38 + index * 7),
    }));
  }, []);

  const profesionalesActivos = useMemo(() => professionals.slice(0, 8), []);

  const ausentismo = 11.2;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Vista Centro de Salud</h2>
        <p className="mt-1 text-gray-500">Metricas globales de la institucion y gestion de agendas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center">
          <div className="p-4 bg-blue-50 rounded-xl mr-4">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Profesionales Activos</p>
            <p className="text-3xl font-bold text-gray-900">{professionals.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center">
          <div className="p-4 bg-red-50 rounded-xl mr-4">
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tasa de Ausentismo</p>
            <p className="text-3xl font-bold text-red-600">{ausentismo}%</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center">
          <div className="p-4 bg-emerald-50 rounded-xl mr-4">
            <Building2 className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Centros Vinculados</p>
            <p className="text-3xl font-bold text-gray-900">{centers.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-blue-600" /> Volumen de Turnos Semanales
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 24, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} interval={0} angle={-12} textAnchor="end" />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip cursor={{ fill: "#f3f4f6" }} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }} />
                <Bar dataKey="turnos" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`bar-cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center">
            <Stethoscope className="mr-2 h-5 w-5 text-emerald-600" /> Profesionales Activos
          </h3>
          <div className="space-y-3">
            {profesionalesActivos.map((person: any) => (
              <div key={person.id} className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                <p className="text-sm font-semibold text-gray-900">{person.nombre}</p>
                <p className="text-xs text-blue-700">{person.especialidad}</p>
                <p className="text-xs text-gray-500">{person.centro_asociado}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-amber-600" /> Administracion de Agendas del Centro
            </h3>
            <p className="mt-1 text-sm text-gray-500">Coordina disponibilidad, cupos y turnos por institucion.</p>
          </div>
          <button className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">
            Gestionar Agendas
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
