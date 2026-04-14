import { Users, TrendingDown, DollarSign, AlertCircle, Calendar, Clock, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Cardiología", turnos: 145 },
  { name: "Traumatología", turnos: 98 },
  { name: "Clínica Médica", turnos: 210 },
  { name: "Pediatría", turnos: 175 },
  { name: "Oftalmología", turnos: 64 }
];

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

export default function AdminDashboard() {
  const waitingList = [
    { name: "Carlos Romero", specialty: "Cardiología", risk: "Alto", waitTime: "12 días" },
    { name: "Lucía Fernández", specialty: "Traumatología", risk: "Medio", waitTime: "5 días" },
    { name: "Miguel Ángel", specialty: "Oftalmología", risk: "Bajo", waitTime: "2 días" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard de Gestión ("El Cerebro")</h2>
        <p className="text-gray-500 mt-1">Métricas en tiempo real del Centro Médico.</p>
      </div>

      {/* 3 Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center">
          <div className="p-4 bg-blue-50 rounded-xl mr-4">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pacientes Totales</p>
            <p className="text-3xl font-bold text-gray-900">12,450</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center">
          <div className="p-4 bg-red-50 rounded-xl mr-4">
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tasa de Ausentismo</p>
            <p className="text-3xl font-bold text-gray-900 text-red-600">12%</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center">
          <div className="p-4 bg-emerald-50 rounded-xl mr-4">
            <DollarSign className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Ingresos Estimados (Mes)</p>
            <p className="text-3xl font-bold text-gray-900">$4.2M</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico de Barras Central */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-blue-600" />
            Turnos por Especialidad (Últimos 30 días)
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f3f4f6'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="turnos" radius={[6, 6, 0, 0]}>
                  {data.map((entry) => (
                    <Cell key={`bar-cell-${entry.name}`} fill={COLORS[data.indexOf(entry) % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lista de Espera Inteligente */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
              Lista de Espera Inteligente
            </h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Pacientes prioritarios si un turno es cancelado.
          </p>

          <div className="space-y-4 flex-1">
            {waitingList.map((patient) => (
              <div key={patient.name} className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-blue-50 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-gray-900">{patient.name}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    patient.risk === 'Alto' ? 'bg-red-100 text-red-700' : 
                    patient.risk === 'Medio' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    Riesgo {patient.risk}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" /> Espera: {patient.waitTime} • {patient.specialty}
                </div>
                <button className="w-full text-sm font-semibold text-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Asignar turno liberado <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
