import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Building2, CalendarDays, Clock3, ArrowLeft, UserCircle2, Stethoscope } from "lucide-react";
import { centers, professionals, specialties } from "../data/mockData";
import { useAppContext } from "../context/AppContext";

type Suggestion =
  | { type: "professional"; professional: any }
  | { type: "specialty"; specialty: string; professional: any };

export default function BookingStepper() {
  const { addAppointment } = useAppContext();
  const [step, setStep] = useState(0);
  const [selectedCenterId, setSelectedCenterId] = useState("");
  const [selectedCenterName, setSelectedCenterName] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState<any | null>(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [patientForm, setPatientForm] = useState({ nombre: "", dni: "", email: "" });

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [step1Mode, setStep1Mode] = useState<"especialidad" | "profesional">("especialidad");
  const [step1Query, setStep1Query] = useState("");

  const stepLabels = ["Centros", "Especialidades", "Profesionales", "Turnos", "Datos Personales"];

  const professionalsByCenter = useMemo(() => {
    if (!selectedCenterId) {
      return [];
    }
    return professionals.filter((person: any) => person.centerID === selectedCenterId);
  }, [selectedCenterId]);

  const specialtiesByCenter = useMemo(() => {
    const values = professionalsByCenter.map((person: any) => person.especialidad);
    return [...new Set(values)];
  }, [professionalsByCenter]);

  const filteredSpecialtiesInCenter = useMemo(() => {
    const query = step1Query.toLowerCase();
    return specialtiesByCenter.filter((item: string) => item.toLowerCase().includes(query));
  }, [specialtiesByCenter, step1Query]);

  const filteredProfessionalsInCenter = useMemo(() => {
    const query = step1Query.toLowerCase();
    return professionalsByCenter.filter(
      (person: any) => person.nombre.toLowerCase().includes(query) || person.especialidad.toLowerCase().includes(query),
    );
  }, [professionalsByCenter, step1Query]);

  const availableProfessionals = useMemo(() => {
    if (!selectedCenterId || !selectedSpecialty) {
      return [];
    }
    return professionals.filter(
      (person: any) => person.centerID === selectedCenterId && person.especialidad === selectedSpecialty,
    );
  }, [selectedCenterId, selectedSpecialty]);

  const selectedDateData = useMemo(() => {
    if (!selectedProfessional || !selectedDate) {
      return null;
    }
    return selectedProfessional.disponibilidad.find((entry: any) => entry.fecha === selectedDate) || null;
  }, [selectedProfessional, selectedDate]);

  const isFormValid =
    patientForm.nombre.trim().length > 0 &&
    patientForm.dni.trim().length > 0 &&
    patientForm.email.trim().length > 0 &&
    patientForm.email.includes("@") &&
    patientForm.email.includes(".");

  const suggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return [] as Suggestion[];
    }

    const professionalMatches: Suggestion[] = professionals
      .filter((person: any) => person.nombre.toLowerCase().includes(query))
      .slice(0, 6)
      .map((person: any) => ({ type: "professional", professional: person }));

    const specialtyMatches: Suggestion[] = specialties
      .filter((specialty: string) => specialty.toLowerCase().includes(query))
      .map((specialty: string) => {
        const referenceProfessional = professionals.find((person: any) => person.especialidad === specialty) || professionals[0];
        return { type: "specialty", specialty, professional: referenceProfessional } as Suggestion;
      })
      .slice(0, 6);

    return [...professionalMatches, ...specialtyMatches].slice(0, 8);
  }, [searchQuery]);

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  const startOver = () => {
    setStep(0);
    setSelectedCenterId("");
    setSelectedCenterName("");
    setSelectedSpecialty("");
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTime("");
    setPatientForm({ nombre: "", dni: "", email: "" });
    setSearchQuery("");
    setShowSuggestions(false);
    setStep1Mode("especialidad");
    setStep1Query("");
  };

  const selectCenter = (center: any) => {
    setSelectedCenterId(center.id);
    setSelectedCenterName(center.nombre);
    setSelectedSpecialty("");
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTime("");
    setStep1Mode("especialidad");
    setStep1Query("");
    goToStep(1);
  };

  const handleGlobalSelection = (item: Suggestion) => {
    if (item.type === "professional") {
      const person = item.professional;
      setSelectedCenterId(person.centerID);
      setSelectedCenterName(person.centro_asociado);
      setSelectedSpecialty(person.especialidad);
      setSelectedProfessional(person);
      setSelectedDate("");
      setSelectedTime("");
      setStep(3);
      setStep1Mode("profesional");
      setStep1Query(person.nombre);
      setSearchQuery(person.nombre);
      setShowSuggestions(false);
      return;
    }

    const referenceProfessional = item.professional;
    setSelectedCenterId(referenceProfessional.centerID);
    setSelectedCenterName(referenceProfessional.centro_asociado);
    setSelectedSpecialty(item.specialty);
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTime("");
    setStep(2);
    setStep1Mode("especialidad");
    setStep1Query(item.specialty);
    setSearchQuery(item.specialty);
    setShowSuggestions(false);
  };

  const stepMotion = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
    transition: { duration: 0.28, ease: "easeOut" as const },
  };

  return (
    <AnimatePresence mode="wait">
      {step === 0 && (
        <motion.div key="centers" {...stepMotion}>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">Encontra tu atencion</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Busca por especialidad o profesional, o selecciona un centro para iniciar.</p>

          <div className="mt-5 relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setShowSuggestions(true);
              }}
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 py-2.5 pl-9 pr-3 text-sm"
              placeholder="Buscar especialidad o profesional..."
            />

            {showSuggestions && searchQuery.trim().length > 0 && (
              <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-lg">
                {suggestions.length === 0 ? (
                  <p className="px-3 py-2 text-sm text-gray-500 dark:text-slate-400">Sin resultados para tu busqueda.</p>
                ) : (
                  suggestions.map((item, index) => (
                    <button
                      key={`${item.type}-${index}`}
                      type="button"
                      onClick={() => handleGlobalSelection(item)}
                      className="flex w-full items-center justify-between border-b border-gray-100 dark:border-slate-700 px-3 py-2 text-left text-sm last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      <span className="inline-flex items-center gap-2">
                        {item.type === "professional" ? (
                          <UserCircle2 className="h-4 w-4 text-blue-700" />
                        ) : (
                          <Stethoscope className="h-4 w-4 text-emerald-700" />
                        )}
                        <span className="text-gray-800 dark:text-slate-100">{item.type === "professional" ? item.professional.nombre : item.specialty}</span>
                      </span>
                      <span className="text-xs text-gray-500 dark:text-slate-400">{item.professional.centro_asociado}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            {centers.map((center: any) => (
              <button
                key={center.id}
                type="button"
                onClick={() => selectCenter(center)}
                className="rounded-xl border border-blue-100 dark:border-slate-700 bg-blue-50 dark:bg-slate-900 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-100 dark:hover:bg-slate-800"
              >
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-700">
                  <Building2 className="h-5 w-5" />
                </div>
                <p className="font-semibold text-blue-900 dark:text-blue-300">{center.nombre}</p>
                <p className="mt-1 text-xs text-blue-700 dark:text-slate-300">{center.descripcion}</p>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {step > 0 && (
        <motion.div key={`step-${step}`} {...stepMotion}>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">Reserva de Turno</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-300">Centro seleccionado: {selectedCenterName}</p>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {stepLabels.map((label, index) => {
                const active = step === index;
                const completed = step > index;
                return (
                  <div key={label} className="text-center min-w-[84px]">
                    <div
                      className={`mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                        completed ? "bg-emerald-500 text-white" : active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {index}
                    </div>
                    <p className={`text-[10px] leading-tight ${active ? "text-blue-700 font-semibold" : "text-gray-500"}`}>{label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="flex rounded-xl bg-gray-100 dark:bg-slate-900 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep1Mode("especialidad");
                    setStep1Query("");
                    setSelectedProfessional(null);
                  }}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                    step1Mode === "especialidad" ? "bg-white text-blue-700 shadow-sm" : "text-gray-600"
                  }`}
                >
                  Buscar por Especialidad
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep1Mode("profesional");
                    setStep1Query("");
                    setSelectedSpecialty("");
                  }}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                    step1Mode === "profesional" ? "bg-white text-blue-700 shadow-sm" : "text-gray-600"
                  }`}
                >
                  Buscar por Profesional
                </button>
              </div>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={step1Query}
                  onChange={(event) => setStep1Query(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 py-2.5 pl-9 pr-3 text-sm"
                  placeholder={
                    step1Mode === "especialidad" ? "Filtrar especialidad en este centro..." : "Filtrar profesional en este centro..."
                  }
                />
              </div>

              {step1Mode === "especialidad" ? (
                <div className="max-h-52 overflow-y-auto rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900">
                  {filteredSpecialtiesInCenter.length === 0 ? (
                    <p className="px-3 py-3 text-sm text-gray-500 dark:text-slate-400">No hay especialidades para ese filtro.</p>
                  ) : (
                    filteredSpecialtiesInCenter.map((specialty: string) => (
                      <button
                        key={specialty}
                        type="button"
                        onClick={() => {
                          setSelectedSpecialty(specialty);
                          setSelectedProfessional(null);
                          setSelectedDate("");
                          setSelectedTime("");
                        }}
                        className={`block w-full border-b border-gray-100 px-3 py-2 text-left text-sm last:border-b-0 ${
                          selectedSpecialty === specialty ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {specialty}
                      </button>
                    ))
                  )}
                </div>
              ) : (
                <div className="max-h-56 overflow-y-auto rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900">
                  {filteredProfessionalsInCenter.length === 0 ? (
                    <p className="px-3 py-3 text-sm text-gray-500 dark:text-slate-400">No hay profesionales para ese filtro.</p>
                  ) : (
                    filteredProfessionalsInCenter.map((person: any) => (
                      <button
                        key={person.id}
                        type="button"
                        onClick={() => {
                          setSelectedProfessional(person);
                          setSelectedSpecialty(person.especialidad);
                          setSelectedDate("");
                          setSelectedTime("");
                        }}
                        className={`w-full border-b border-gray-100 px-3 py-2 text-left last:border-b-0 ${
                          selectedProfessional?.id === person.id ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <p className="text-sm font-semibold leading-tight">{person.nombre}</p>
                        <p className="mt-0.5 text-xs font-medium text-blue-600/80">{person.especialidad}</p>
                      </button>
                    ))
                  )}
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Volver
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(step1Mode === "especialidad" ? 2 : 3)}
                  disabled={step1Mode === "especialidad" ? !selectedSpecialty : !selectedProfessional}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-slate-300">Profesionales para {selectedSpecialty} en {selectedCenterName}.</p>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {availableProfessionals.length === 0 ? (
                  <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3 text-sm text-amber-700">
                    No hay profesionales en este centro para esa especialidad.
                  </div>
                ) : (
                  availableProfessionals.map((person: any) => (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => {
                        setSelectedProfessional(person);
                        setSelectedDate("");
                        setSelectedTime("");
                      }}
                      className={`w-full min-h-[128px] rounded-xl border p-4 text-left transition-all ${
                        selectedProfessional?.id === person.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{person.nombre}</p>
                          <p className="mt-1 text-sm font-medium text-blue-700/80">{person.especialidad}</p>
                          <p className="mt-2 inline-flex items-center gap-1 text-xs text-gray-600">
                            <Building2 className="h-3.5 w-3.5" /> {person.centro_asociado}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">Matricula: {person.matricula}</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Volver
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  disabled={!selectedProfessional}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-slate-300">Selecciona fecha y hora para {selectedProfessional?.nombre}.</p>

              <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-4">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-200">
                  <CalendarDays className="h-4 w-4" /> Fecha
                </label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {(selectedProfessional?.disponibilidad || []).map((day: any) => (
                    <button
                      key={day.fecha}
                      type="button"
                      onClick={() => {
                        setSelectedDate(day.fecha);
                        setSelectedTime("");
                      }}
                      className={`shrink-0 rounded-lg border px-3 py-2 text-sm transition-all ${
                        selectedDate === day.fecha ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {day.etiqueta}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-4">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-200">
                  <Clock3 className="h-4 w-4" /> Hora
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                  {selectedDateData?.horarios?.length ? (
                    selectedDateData.horarios.map((slot: string) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`rounded-lg border px-2 py-1.5 text-sm transition-all ${
                          selectedTime === slot ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <p className="col-span-3 text-sm text-gray-500 dark:text-slate-400">Selecciona primero una fecha para ver horarios.</p>
                  )}
                </div>
              </div>

              {selectedDateData && selectedTime && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  Turno preseleccionado: {selectedDateData.etiqueta} a las {selectedTime}
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Volver
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(4)}
                  disabled={!selectedDateData || !selectedTime}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-slate-300">Completa tus datos para confirmar el turno.</p>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-200">Nombre Completo</label>
                <input
                  type="text"
                  value={patientForm.nombre}
                  onChange={(event) => setPatientForm({ ...patientForm, nombre: event.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-200">DNI</label>
                <input
                  type="number"
                  value={patientForm.dni}
                  onChange={(event) => setPatientForm({ ...patientForm, dni: event.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-200">Correo Electronico</label>
                <input
                  type="email"
                  value={patientForm.email}
                  onChange={(event) => setPatientForm({ ...patientForm, email: event.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 px-3 py-2 text-sm"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">Te enviaremos un recordatorio 24hs antes.</p>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Volver
                </button>
                <button
                  type="button"
                  disabled={!isFormValid}
                  onClick={() => {
                    if (!selectedProfessional || !selectedDateData || !selectedTime) {
                      return;
                    }

                    addAppointment({
                      id: `appt-${Date.now()}`,
                      doctor: selectedProfessional.nombre,
                      specialty: selectedProfessional.especialidad,
                      date: `${selectedDateData.etiqueta}, ${selectedTime} hs`,
                      location: selectedProfessional.centro_asociado,
                      status: "Confirmado",
                    });

                    setStep(5);
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Confirmar Turno
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
              <h4 className="text-lg font-semibold text-emerald-800">Turno confirmado</h4>
              <p className="mt-2 text-sm text-emerald-700">
                Turno confirmado. Dr. {selectedProfessional?.nombre} - {selectedDateData?.etiqueta} a las {selectedTime}. Se envio un
                comprobante a {patientForm.email}.
              </p>
              <button
                type="button"
                onClick={startOver}
                className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                Nueva reserva
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
