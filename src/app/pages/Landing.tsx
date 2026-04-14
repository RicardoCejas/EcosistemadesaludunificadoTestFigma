import { useState } from "react";
import { Search, MapPin, Building2, UserCircle2, ArrowRight, Stethoscope, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function Landing() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<"especialidad" | "profesional" | "centro" | "obra social">("especialidad");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate navigation to search results
    navigate("/login");
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="figma:asset/mock-hospital.jpg" // Placeholder if they had one, I'll use unsplash url here
            alt=""
            className="w-full h-full object-cover opacity-10"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzc2MTM4NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pb-32 lg:flex lg:px-8 lg:pt-40 items-center">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <div className="mt-10 sm:mt-16 lg:mt-0">
              <span className="inline-flex space-x-6 items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold leading-6 text-emerald-300 ring-1 ring-inset ring-emerald-500/20">
                <span>Cruz del Eje</span>
                <span className="h-4 w-px bg-emerald-500/20" aria-hidden="true" />
                <span>Salud Integrada</span>
              </span>
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Tu salud, conectada en un solo lugar
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Accedé a tu historia clínica unificada, sacá turnos con especialistas y gestioná tus estudios de manera simple, rápida y segura.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/login"
                className="rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 transition-all"
              >
                Soy Paciente
              </Link>
              <Link to="/login" className="text-sm font-semibold leading-6 text-white hover:text-blue-200 flex items-center gap-2">
                Acceso Profesional <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/20">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Encontrá tu atención</h3>
                
                <div className="flex flex-wrap bg-gray-100 p-1 rounded-xl mb-6 gap-1">
                  {(["especialidad", "profesional", "centro", "obra social"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSearchType(type)}
                      className={`flex-1 min-w-[100px] capitalize py-2.5 text-sm font-medium rounded-lg transition-all ${
                        searchType === type 
                          ? "bg-white text-blue-600 shadow-sm" 
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      {searchType === 'especialidad' && <Stethoscope className="h-5 w-5 text-gray-400" />}
                      {searchType === 'profesional' && <UserCircle2 className="h-5 w-5 text-gray-400" />}
                      {searchType === 'centro' && <Building2 className="h-5 w-5 text-gray-400" />}
                      {searchType === 'obra social' && <ShieldCheck className="h-5 w-5 text-gray-400" />}
                    </div>
                    <input
                      type="text"
                      className="block w-full rounded-xl border-0 py-3.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white"
                      placeholder={`Buscar por ${searchType}...`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-xl bg-blue-600 px-3 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Buscar Disponibilidad
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-24 sm:py-32 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Centros de Salud en Cruz del Eje
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Ubicá rápidamente el centro médico o laboratorio más cercano a tu domicilio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white h-[500px] relative">
              {/* Using a visual map placeholder with OpenStreetMap */}
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://www.openstreetmap.org/export/embed.html?bbox=-64.8493,-30.7554,-64.77,-30.70&amp;layer=mapnik&amp;marker=-30.727,-64.805"
                title="Mapa Cruz del Eje"
                className="absolute inset-0 z-0"
              />
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur p-3 rounded-lg shadow-md border border-gray-100 flex items-center space-x-2">
                 <MapPin className="text-red-500 h-5 w-5" />
                 <span className="text-sm font-medium text-gray-800">Hospital Aurelio Crespo</span>
              </div>
            </div>
            
            <div className="lg:col-span-4 space-y-4">
              {[
                { name: 'Hospital Aurelio Crespo', type: 'Hospital Público', distance: '1.2 km' },
                { name: 'Clínica Cruz del Eje', type: 'Clínica Privada', distance: '2.5 km' },
                { name: 'Laboratorio Central', type: 'Análisis Clínicos', distance: '0.8 km' }
              ].map((center, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{center.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{center.type}</p>
                    </div>
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {center.distance}
                    </span>
                  </div>
                </div>
              ))}
              <button className="w-full mt-4 py-3 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200">
                Ver todos los centros
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
