import { useNavigate } from "react-router";
import { Lock, Mail, ArrowRight, FlaskConical, User, Stethoscope, Building2, Shield } from "lucide-react";
import { AppRole, DemoView, useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setRole, setCurrentView } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole("paciente");
    setCurrentView("paciente");
    navigate("/dashboard/patient");
  };

  const handleBypassAccess = (role: AppRole, view: DemoView, destination: string) => {
    setRole(role);
    setCurrentView(view);
    navigate(destination);
  };

  const devButtons = [
    {
      key: "paciente",
      title: "PACIENTE",
      view: "paciente",
      description: "Portal del Paciente",
      destination: "/dashboard/patient",
      icon: User,
      style: "border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100",
    },
    {
      key: "profesional",
      title: "PROFESIONAL",
      view: "medico",
      description: "Panel Medico",
      destination: "/dashboard/professional",
      icon: Stethoscope,
      style: "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
    },
    {
      key: "centro",
      title: "CENTRO",
      view: "centro",
      description: "Gestion de Institucion",
      destination: "/dashboard/center",
      icon: Building2,
      style: "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100",
    },
    {
      key: "admin",
      title: "ADMIN",
      view: "admin",
      description: "Panel de Control de Desarrolladores",
      destination: "/dashboard/admin",
      icon: Shield,
      style: "border-violet-200 bg-violet-50 text-violet-800 hover:bg-violet-100",
    },
  ] as const;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto mt-6 grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,24rem)] lg:items-start lg:justify-center">
        <div className="w-full">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100">Iniciar Sesion</h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-slate-300">Acceso exclusivo para pacientes del Ecosistema</p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white dark:bg-slate-800 py-8 px-4 shadow-sm border border-gray-100 dark:border-slate-700 sm:rounded-2xl sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-100">
                    Correo Electronico / DNI
                  </label>
                  <div className="relative mt-2 rounded-xl shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400 dark:text-slate-400" aria-hidden="true" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      defaultValue="juan.perez@email.com"
                      className="block w-full rounded-xl border-0 py-3 pl-10 text-gray-900 dark:text-slate-100 dark:bg-slate-900 ring-1 ring-inset ring-gray-300 dark:ring-slate-600 placeholder:text-gray-400 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-100">
                    Contrasena
                  </label>
                  <div className="relative mt-2 rounded-xl shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-gray-400 dark:text-slate-400" aria-hidden="true" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      defaultValue="password123"
                      className="block w-full rounded-xl border-0 py-3 pl-10 text-gray-900 dark:text-slate-100 dark:bg-slate-900 ring-1 ring-inset ring-gray-300 dark:ring-slate-600 placeholder:text-gray-400 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-blue-600"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900 dark:text-slate-200">
                      Recordarme
                    </label>
                  </div>

                  <div className="text-sm leading-6">
                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                      Olvidaste tu contrasena?
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

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
                <p className="text-center text-sm text-gray-500 dark:text-slate-400">Protegido por validacion de identidad biometrica RENAPER.</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="w-full rounded-2xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 p-6 shadow-sm lg:sticky lg:top-24">
          <div className="mb-5 flex items-start gap-3">
            <div className="rounded-lg bg-gray-900 dark:bg-slate-800 p-2 text-white">
              <FlaskConical className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Panel de Pruebas (Solo Devs)</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Bypass de autenticacion para validar vistas por rol.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {devButtons.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => handleBypassAccess(item.key as AppRole, item.view as DemoView, item.destination)}
                className={`w-full rounded-xl border px-4 py-4 text-left transition-colors ${item.style}`}
              >
                <span className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-wide">{item.title}</span>
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="mt-1 block text-sm font-medium">{item.description}</span>
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-slate-400">Solo para test interno. Omite validacion de contrasena y setea rol global.</p>
        </aside>
      </div>
    </div>
  );
}
