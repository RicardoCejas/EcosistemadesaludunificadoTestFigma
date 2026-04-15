import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock3,
  Search,
  Stethoscope,
  UserCircle2,
  UserRoundCheck,
} from "lucide-react";
import { centers, professionals, specialties } from "../data/mockData";
import { useAppContext } from "../context/AppContext";

type Center = {
  id: string;
  nombre: string;
  descripcion: string;
};

type Availability = {
  fecha: string;
  etiqueta: string;
  horarios: string[];
};

type Professional = {
  id: number;
  nombre: string;
  especialidad: string;
  matricula: string;
  centerID: string;
  centro_asociado: string;
  disponibilidad: Availability[];
};

type Suggestion = {
  key: string;
  type: "center" | "specialty" | "professional";
  label: string;
  description: string;
  centerId: string;
  specialty?: string;
  professionalId?: number;
};

const stepLabels = ["Centro", "Especialidad", "Profesional", "Turno y datos"];

export default function BookingStepper() {
  const { addAppointment } = useAppContext();
  const centerList = centers as Center[];
  const professionalsList = professionals as Professional[];
  const specialtyList = specialties as string[];

  const [step, setStep] = useState(0);
  const [selectedCenterId, setSelectedCenterId] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [patientForm, setPatientForm] = useState({ nombre: "", dni: "", email: "" });
  const [showModal, setShowModal] = useState(false);

  const selectedCenter = useMemo(
    () => centerList.find((center) => center.id === selectedCenterId) || null,
    [centerList, selectedCenterId],
  );

  const specialtiesByCenter = useMemo(() => {
    return specialtyList.map((specialty) => ({
      specialty,
      count: professionalsList.filter(
        (professional) => professional.centerID === selectedCenterId && professional.especialidad === specialty,
      ).length,
    }));
  }, [professionalsList, selectedCenterId, specialtyList]);

  const availableProfessionals = useMemo(() => {
    return professionalsList.filter(
      (professional) => professional.centerID === selectedCenterId && professional.especialidad === selectedSpecialty,
    );
  }, [professionalsList, selectedCenterId, selectedSpecialty]);

  const selectedDateData = useMemo(() => {
    if (!selectedProfessional || !selectedDate) {
      return null;
    }
    return selectedProfessional.disponibilidad.find((entry) => entry.fecha === selectedDate) || null;
  }, [selectedDate, selectedProfessional]);

  const isFormValid =
    patientForm.nombre.trim().length > 2 &&
    patientForm.dni.trim().length > 6 &&
    patientForm.email.trim().length > 5 &&
    patientForm.email.includes("@") &&
    patientForm.email.includes(".");

  const specialtySearchTargets = useMemo(() => {
    const map = new Map<string, { centerId: string; centerName: string; specialty: string }>();
    professionalsList.forEach((professional) => {
      const key = `${professional.centerID}-${professional.especialidad}`;
      if (!map.has(key)) {
        map.set(key, {
          centerId: professional.centerID,
          centerName: professional.centro_asociado,
          specialty: professional.especialidad,
        });
      }
    });
    return Array.from(map.values());
  }, [professionalsList]);

  const suggestions = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) {
      return [] as Suggestion[];
    }

    const centerSuggestions = centerList
      .filter((center) => `${center.nombre} ${center.descripcion}`.toLowerCase().includes(normalized))
      .map((center) => ({
        key: `center-${center.id}`,
        type: "center" as const,
        label: center.nombre,
        description: center.descripcion,
        centerId: center.id,
      }));

    const specialtySuggestions = specialtySearchTargets
      .filter((item) => item.specialty.toLowerCase().includes(normalized) || item.centerName.toLowerCase().includes(normalized))
      .map((item) => ({
        key: `specialty-${item.centerId}-${item.specialty}`,
        type: "specialty" as const,
        label: item.specialty,
        description: item.centerName,
        centerId: item.centerId,
        specialty: item.specialty,
      }));

    const professionalSuggestions = professionalsList
      .filter((professional) => {
        return (
          professional.nombre.toLowerCase().includes(normalized) ||
          professional.especialidad.toLowerCase().includes(normalized) ||
          professional.centro_asociado.toLowerCase().includes(normalized)
        );
      })
      .map((professional) => ({
        key: `professional-${professional.id}`,
        type: "professional" as const,
        label: professional.nombre,
        description: `${professional.especialidad} - ${professional.centro_asociado}`,
        centerId: professional.centerID,
        specialty: professional.especialidad,
        professionalId: professional.id,
      }));

    return [...professionalSuggestions, ...specialtySuggestions, ...centerSuggestions].slice(0, 9);
  }, [centerList, professionalsList, searchQuery, specialtySearchTargets]);

  const resetFromCenter = () => {
    setSelectedSpecialty("");
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTime("");
    setPatientForm({ nombre: "", dni: "", email: "" });
  };

  const selectCenter = (center: Center) => {
    setSelectedCenterId(center.id);
    resetFromCenter();
    setStep(1);
  };

  const selectSpecialty = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTime("");
    setStep(2);
  };

  const selectProfessional = (professional: Professional) => {
    setSelectedProfessional(professional);
    setSelectedDate("");
    setSelectedTime("");
    setStep(3);
  };

  const handleUniversalSelect = (suggestion: Suggestion) => {
    const matchingCenter = centerList.find((center) => center.id === suggestion.centerId);
    if (!matchingCenter) {
      return;
    }

    setSelectedCenterId(matchingCenter.id);
    setSearchQuery(suggestion.label);
    setShowSuggestions(false);

    if (suggestion.type === "center") {
      resetFromCenter();
      setStep(1);
      return;
    }

    if (suggestion.specialty) {
      setSelectedSpecialty(suggestion.specialty);
    }

    if (suggestion.type === "specialty") {
      setSelectedProfessional(null);
      setSelectedDate("");
      setSelectedTime("");
      setStep(2);
      return;
    }

    if (suggestion.professionalId) {
      const professional = professionalsList.find((person) => person.id === suggestion.professionalId) || null;
      setSelectedProfessional(professional);
      setSelectedDate("");
      setSelectedTime("");
      setStep(3);
    }
  };

  const goBack = () => {
    if (step === 3) {
      setSelectedDate("");
      setSelectedTime("");
      setStep(2);
      return;
    }

    if (step === 2) {
      setSelectedProfessional(null);
      setStep(1);
      return;
    }

    if (step === 1) {
      setSelectedCenterId("");
      resetFromCenter();
      setStep(0);
    }
  };

  const startOver = () => {
    setStep(0);
    setSelectedCenterId("");
    setSelectedSpecialty("");
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTime("");
    setPatientForm({ nombre: "", dni: "", email: "" });
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const confirmAppointment = () => {
    if (!selectedProfessional || !selectedDateData || !selectedTime || !isFormValid) {
      return;
    }
    addAppointment({
      id: `appt-${Date.now()}`,
      doctor: selectedProfessional.nombre,
      specialty: selectedProfessional.especialidad,
      date: `${selectedDateData.etiqueta} a las ${selectedTime}`,
      location: selectedProfessional.centro_asociado,
      status: "Confirmado",
    });
    setShowModal(true);
  };

  const motionProps = {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
    transition: { duration: 0.24, ease: "easeOut" as const },
  };

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col gap-2">
      <div className="w-full shrink-0 rounded-3xl border border-blue-100/80 bg-white/95 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
        <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">Dashboard de Reserva</h3>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 xl:text-base">
          Busca por profesional, especialidad o centro. El flujo avanza sin salir de esta pantalla.
        </p>

        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              window.setTimeout(() => setShowSuggestions(false), 120);
            }}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setShowSuggestions(true);
            }}
            type="text"
            className="h-12 w-full rounded-2xl border border-blue-200 bg-white py-2 pl-11 pr-3 text-sm text-slate-800 focus:border-blue-400 focus:outline-none dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 xl:text-base"
            placeholder="Buscar profesional, especialidad o centro medico..."
          />

          {showSuggestions && searchQuery.trim().length > 0 && (
            <div className="absolute z-40 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              {suggestions.length === 0 ? (
                <p className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">Sin resultados para esta busqueda.</p>
              ) : (
                suggestions.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleUniversalSelect(item)}
                    className="flex w-full items-center justify-between border-b border-slate-100 px-4 py-2 text-left hover:bg-blue-50 dark:border-slate-800 dark:hover:bg-slate-800"
                  >
                    <span className="inline-flex items-center gap-2 text-sm xl:text-base">
                      {item.type === "professional" && <UserCircle2 className="h-5 w-5 text-blue-600" />}
                      {item.type === "specialty" && <Stethoscope className="h-5 w-5 text-emerald-600" />}
                      {item.type === "center" && <Building2 className="h-5 w-5 text-indigo-600" />}
                      <span className="font-medium text-slate-800 dark:text-slate-100">{item.label}</span>
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 xl:text-sm">{item.description}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {step < 4 && (
        <div className="shrink-0 flex flex-wrap gap-2">
          {stepLabels.map((label, index) => {
            const active = step === index;
            const completed = step > index;
            return (
              <div
                key={label}
                className={`rounded-full px-3 py-1 text-xs font-semibold xl:text-sm ${
                  completed
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                    : active
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {index + 1}. {label}
              </div>
            );
          })}
        </div>
      )}

      <div className="min-h-0 w-full flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`flow-${step}`}
            {...motionProps}
            className="h-full max-h-[85vh] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="mx-auto flex h-full min-h-0 w-full max-w-[1500px] flex-col gap-2">
          {step > 0 && step < 4 && (
            <button
              type="button"
              onClick={goBack}
              className="sticky top-2 z-20 mb-1 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 xl:text-base"
            >
              <ArrowLeft className="h-4 w-4" /> Volver
            </button>
          )}

          {step === 0 && (
            <div className="h-full w-full">
              <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 xl:text-2xl">Elegi tu centro medico</h4>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 xl:text-base">Primero selecciona un centro para activar el flujo de reserva.</p>

              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
                {centerList.map((center) => (
                  <article
                    key={center.id}
                    className="group flex min-h-[150px] w-full flex-col justify-between rounded-3xl border border-blue-200 bg-gradient-to-b from-blue-50 to-white p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-700 dark:from-slate-900 dark:to-slate-900 xl:p-5"
                  >
                    <div>
                      <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm transition-transform duration-300 group-hover:scale-105 xl:h-10 xl:w-10">
                        <Building2 className="h-4 w-4 xl:h-5 xl:w-5" />
                      </div>
                      <p className="text-lg font-black leading-tight text-slate-900 dark:text-slate-100 xl:text-xl">{center.nombre}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-300 xl:text-base">{center.descripcion}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => selectCenter(center)}
                      className="mt-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors duration-300 hover:bg-blue-700 xl:px-5 xl:py-2.5 xl:text-base"
                    >
                      Seleccionar este centro
                    </button>
                  </article>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="w-full">
              <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 xl:text-2xl">Especialidades disponibles</h4>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 xl:text-base">Centro activo: {selectedCenter?.nombre}</p>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                {specialtiesByCenter.map((item) => {
                  const disabled = item.count === 0;
                  return (
                    <button
                      key={item.specialty}
                      type="button"
                      disabled={disabled}
                      onClick={() => selectSpecialty(item.specialty)}
                      className={`rounded-3xl border p-3 text-left transition-all xl:p-4 ${
                        disabled
                          ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-900/40"
                          : "border-blue-200 bg-white hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                      }`}
                    >
                      <p className="text-lg font-black leading-tight xl:text-xl">{item.specialty}</p>
                      <p className="mt-1 text-sm font-medium xl:text-sm">
                        {item.count > 0 ? `${item.count} profesional(es) disponibles` : "Sin cobertura en este centro"}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="w-full">
              <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 xl:text-2xl">Profesionales de {selectedSpecialty}</h4>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 xl:text-base">Selecciona un profesional para pasar a fecha, hora y datos.</p>

              <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                {availableProfessionals.length === 0 ? (
                  <p className="col-span-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-base text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
                    No hay profesionales para esta especialidad en el centro seleccionado.
                  </p>
                ) : (
                  availableProfessionals.map((professional) => (
                    <button
                      key={professional.id}
                      type="button"
                      onClick={() => selectProfessional(professional)}
                      className="mx-auto flex w-full max-w-[380px] flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 xl:max-w-[420px] xl:p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-black text-slate-900 dark:text-slate-100 leading-tight xl:text-xl">{professional.nombre}</p>
                          <p className="mt-1 text-sm font-semibold text-blue-700 dark:text-blue-300 xl:text-base">{professional.especialidad}</p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 xl:text-sm">{professional.centro_asociado}</p>
                        </div>
                        <span className="rounded-full border border-blue-200 bg-slate-100 px-3 py-1.5 text-sm font-black text-slate-700 dark:bg-slate-800 dark:text-slate-200 xl:px-4 xl:py-2 xl:text-base">
                          {professional.matricula}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="w-full space-y-3">
              <div>
                <h4 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 xl:text-2xl">Fecha, horario y datos</h4>
                <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300 xl:text-base">
                  {selectedProfessional?.nombre} - {selectedProfessional?.especialidad}
                </p>
              </div>

              <section className="rounded-3xl border border-slate-200 p-3 dark:border-slate-700 xl:p-3">
                <p className="mb-2 inline-flex items-center gap-2 text-base font-bold text-slate-700 dark:text-slate-200 xl:text-lg">
                  <CalendarDays className="h-5 w-5" /> Calendario interactivo
                </p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {(selectedProfessional?.disponibilidad || []).map((day) => (
                    <button
                      key={day.fecha}
                      type="button"
                      onClick={() => {
                        setSelectedDate(day.fecha);
                        setSelectedTime("");
                      }}
                      className={`min-h-10 rounded-2xl border px-3 py-2 text-sm font-bold xl:min-h-10 xl:px-3 xl:py-2 xl:text-base ${
                        selectedDate === day.fecha
                          ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      {day.etiqueta}
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 p-3 dark:border-slate-700 xl:p-3">
                <p className="mb-2 inline-flex items-center gap-2 text-base font-bold text-slate-700 dark:text-slate-200 xl:text-lg">
                  <Clock3 className="h-5 w-5" /> Horarios disponibles
                </p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-6">
                  {selectedDateData?.horarios?.length ? (
                    selectedDateData.horarios.map((hour) => (
                      <button
                        key={hour}
                        type="button"
                        onClick={() => setSelectedTime(hour)}
                        className={`min-h-10 rounded-2xl border px-3 py-2 text-sm font-bold xl:min-h-10 xl:px-3 xl:py-2 xl:text-base ${
                          selectedTime === hour
                            ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        }`}
                      >
                        {hour}
                      </button>
                    ))
                  ) : (
                    <p className="col-span-2 text-sm text-slate-500 dark:text-slate-400 md:col-span-4 xl:col-span-6 xl:text-base">
                      Selecciona una fecha para ver los horarios.
                    </p>
                  )}
                </div>
              </section>

              <AnimatePresence initial={false}>
                {selectedTime && (
                  <motion.section
                    key="patient-form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="space-y-3"
                  >
                    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-2 md:grid-cols-3">
                      <div className="space-y-1">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 xl:text-base">Nombre completo</label>
                        <input
                          type="text"
                          value={patientForm.nombre}
                          onChange={(event) => setPatientForm((current) => ({ ...current, nombre: event.target.value }))}
                          className="h-10 w-full rounded-2xl border border-slate-300 bg-white px-3 text-sm text-slate-800 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 xl:h-10 xl:px-3 xl:text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 xl:text-base">DNI</label>
                        <input
                          type="text"
                          value={patientForm.dni}
                          onChange={(event) => setPatientForm((current) => ({ ...current, dni: event.target.value }))}
                          className="h-10 w-full rounded-2xl border border-slate-300 bg-white px-3 text-sm text-slate-800 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 xl:h-10 xl:px-3 xl:text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 xl:text-base">Correo electronico</label>
                        <input
                          type="email"
                          value={patientForm.email}
                          onChange={(event) => setPatientForm((current) => ({ ...current, email: event.target.value }))}
                          className="h-10 w-full rounded-2xl border border-slate-300 bg-white px-3 text-sm text-slate-800 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 xl:h-10 xl:px-3 xl:text-sm"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400 xl:text-sm">Te enviaremos recordatorio por correo 24h antes.</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <p className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300 xl:px-4 xl:py-2 xl:text-base">
                        <UserRoundCheck className="h-4 w-4" />
                        Turno: {selectedDateData?.etiqueta} a las {selectedTime}
                      </p>

                      <button
                        type="button"
                        onClick={confirmAppointment}
                        disabled={!selectedDateData || !selectedTime || !isFormValid}
                        className="rounded-2xl bg-blue-600 px-6 py-2 text-sm font-black text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 md:self-end xl:text-lg"
                      >
                        Confirmar turno
                      </button>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>

              {!selectedTime && (
                <p className="text-sm text-slate-500 dark:text-slate-400 xl:text-base">
                  Selecciona un horario para habilitar el formulario de datos y confirmar el turno.
                </p>
              )}
            </div>
          )}

          {/* Modal de confirmación */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
              <div className="relative z-10 flex w-full max-w-2xl flex-col items-center rounded-3xl border-4 border-emerald-200 bg-white p-8 shadow-2xl dark:border-emerald-900 dark:bg-slate-900 xl:p-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="mb-3 flex items-center justify-center rounded-full bg-emerald-100 p-4 xl:p-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-600 xl:h-20 xl:w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="mb-3 text-3xl font-black text-emerald-700 dark:text-emerald-300 xl:text-4xl">¡Turno Reservado con Éxito!</h2>
                  <p className="mb-6 text-center text-lg text-slate-700 dark:text-slate-200 xl:text-2xl">
                    Se ha reservado un turno para <span className="font-bold">{patientForm.nombre}</span> con el/la <span className="font-bold">{selectedProfessional?.nombre}</span> el día <span className="font-bold">{selectedDateData?.etiqueta}</span> a las <span className="font-bold">{selectedTime} hs</span>.
                  </p>
                  <div className="mt-2 flex gap-4">
                    <button
                      className="rounded-2xl bg-emerald-600 px-6 py-3 text-lg font-black text-white hover:bg-emerald-700 xl:px-8 xl:py-4 xl:text-2xl"
                      onClick={() => {
                        setShowModal(false);
                        startOver();
                      }}
                    >
                      Finalizar
                    </button>
                    <a
                      href="/portal"
                      className="flex items-center rounded-2xl bg-blue-600 px-6 py-3 text-lg font-black text-white hover:bg-blue-700 xl:px-8 xl:py-4 xl:text-2xl"
                    >
                      Ver mis turnos
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
