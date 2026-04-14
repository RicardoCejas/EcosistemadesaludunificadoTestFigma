import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Stethoscope, Building, Lock, Mail, ArrowRight } from "lucide-react";

type Role = "paciente" | "profesional" | "admin";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("paciente");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "paciente") {
      navigate("/dashboard/patient");
    } else if (role === "profesional") {
      navigate("/dashboard/professional");
    } else {
      navigate("/dashboard/admin"); 
    }
  };

  const roles = [
    { id: "paciente", label: "Paciente", icon: User },
    { id: "profesional", label: "Profesional", icon: Stethoscope },
    { id: "admin", label: "Centro", icon: Building },
  ] as const;

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Accedé al Ecosistema de Salud Unificado
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Seleccioná tu perfil
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((r) => {
                const isSelected = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <r.icon className={`h-6 w-6 mb-2 ${isSelected ? "text-blue-600" : ""}`} />
                    <span className="text-xs font-medium">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Correo Electrónico / DNI
              </label>
              <div className="relative mt-2 rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue={role === "profesional" ? "dr.smith@hospital.com" : "juan.perez@email.com"}
                  className="block w-full rounded-xl border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Contraseña
              </label>
              <div className="relative mt-2 rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  defaultValue="password123"
                  className="block w-full rounded-xl border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                  Recordarme
                </label>
              </div>

              <div className="text-sm leading-6">
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center rounded-xl bg-blue-600 px-3 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Ingresar al Sistema <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500">
              Protegido por validación de identidad biométrica RENAPER.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
