export const centers = [
  { id: "center-1", nombre: "Hospital Aurelio Crespo", descripcion: "Hospital Publico" },
  { id: "center-2", nombre: "Clinica Cruz del Eje", descripcion: "Clinica Privada" },
  { id: "center-3", nombre: "Sanatorio Santa Isabel", descripcion: "Sanatorio Integral" },
];

export const specialties = [
  "Clinica Medica",
  "Cardiologia",
  "Pediatria",
  "Traumatologia",
  "Neurologia",
  "Ginecologia",
  "Dermatologia",
  "Nutricion",
];

const fechasBase = [
  { fecha: "2026-04-17", etiqueta: "Viernes 17/04" },
  { fecha: "2026-04-20", etiqueta: "Lunes 20/04" },
  { fecha: "2026-04-21", etiqueta: "Martes 21/04" },
  { fecha: "2026-04-22", etiqueta: "Miercoles 22/04" },
];

const createAvailability = (hourGroups) =>
  fechasBase.map((day, index) => ({
    fecha: day.fecha,
    etiqueta: day.etiqueta,
    horarios: hourGroups[index] || hourGroups[0] || ["08:00", "08:30", "09:00"],
  }));

export const professionals = [
  {
    id: 1,
    nombre: "Dra. Sofia Ruiz",
    especialidad: "Cardiologia",
    matricula: "MP-4202",
    centerID: "center-1",
    centro_asociado: "Hospital Aurelio Crespo",
    disponibilidad: createAvailability([["10:00", "10:30"], ["11:00", "11:30"], ["18:00", "18:30"]]),
  },
  {
    id: 2,
    nombre: "Dr. Lucas Torres",
    especialidad: "Ginecologia",
    matricula: "MP-4701",
    centerID: "center-2",
    centro_asociado: "Clinica Cruz del Eje",
    disponibilidad: createAvailability([["09:00", "09:30"], ["12:00", "12:30"], ["16:00", "16:30"]]),
  },
  {
    id: 3,
    nombre: "Dra. Martina Flores",
    especialidad: "Clinica Medica",
    matricula: "MP-4105",
    centerID: "center-1",
    centro_asociado: "Hospital Aurelio Crespo",
    disponibilidad: createAvailability([["08:00", "08:30"], ["14:00", "14:30"], ["15:30", "16:00"]]),
  },
  {
    id: 4,
    nombre: "Dr. Julian Castro",
    especialidad: "Traumatologia",
    matricula: "MP-4410",
    centerID: "center-2",
    centro_asociado: "Clinica Cruz del Eje",
    disponibilidad: createAvailability([["09:30", "10:00"], ["11:30", "12:00"], ["17:00", "17:30"]]),
  },
  {
    id: 5,
    nombre: "Dra. Camila Peralta",
    especialidad: "Dermatologia",
    matricula: "MP-5202",
    centerID: "center-3",
    centro_asociado: "Sanatorio Santa Isabel",
    disponibilidad: createAvailability([["08:30", "09:00"], ["13:00", "13:30"], ["18:00", "18:30"]]),
  },
  {
    id: 6,
    nombre: "Dr. Tomas Aguero",
    especialidad: "Nutricion",
    matricula: "MP-5501",
    centerID: "center-3",
    centro_asociado: "Sanatorio Santa Isabel",
    disponibilidad: createAvailability([["10:30", "11:00"], ["14:00", "14:30"], ["17:00", "17:30"]]),
  },
  {
    id: 7,
    nombre: "Dra. Florencia Navarro",
    especialidad: "Neurologia",
    matricula: "MP-4602",
    centerID: "center-1",
    centro_asociado: "Hospital Aurelio Crespo",
    disponibilidad: createAvailability([["09:30", "10:00"], ["11:30", "12:00"], ["16:30", "17:00"]]),
  },
  {
    id: 8,
    nombre: "Dr. Franco Ledesma",
    especialidad: "Pediatria",
    matricula: "MP-4901",
    centerID: "center-2",
    centro_asociado: "Clinica Cruz del Eje",
    disponibilidad: createAvailability([["08:00", "08:30"], ["09:30", "10:00"], ["11:30", "12:00"]]),
  },
];

export const patientPrescriptions = [
  { id: "rx-1", medicamento: "Losartan 50mg", profesional: "Dra. Sofia Ruiz", fecha: "2026-04-10", estado: "Vigente" },
  { id: "rx-2", medicamento: "Metformina 850mg", profesional: "Dr. Tomas Aguero", fecha: "2026-03-29", estado: "Vigente" },
  { id: "rx-3", medicamento: "Levotiroxina 100mcg", profesional: "Dra. Camila Peralta", fecha: "2026-03-14", estado: "Vigente" },
];

export const patientConsultations = [
  {
    id: "consult-1",
    fecha: "2026-04-05",
    profesional: "Dra. Sofia Ruiz",
    especialidad: "Cardiologia",
    diagnosticoBreve: "Control de hipertension estable.",
  },
  {
    id: "consult-2",
    fecha: "2026-03-15",
    profesional: "Dr. Lucas Torres",
    especialidad: "Ginecologia",
    diagnosticoBreve: "Chequeo anual sin hallazgos relevantes.",
  },
  {
    id: "consult-3",
    fecha: "2026-02-20",
    profesional: "Dra. Florencia Navarro",
    especialidad: "Neurologia",
    diagnosticoBreve: "Seguimiento neurologico sin signos de alarma.",
  },
];

export const patientImagingStudies = [
  {
    id: "img-1",
    tipo: "TAC de Torax",
    modalidad: "TAC",
    fecha: "2026-03-21",
    centro: "Hospital Aurelio Crespo",
    informe: "PDF disponible",
    paciente: "Juan Perez",
    descripcion: "Tomografia computada de torax sin contraste",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "img-2",
    tipo: "Resonancia Magnetica de Craneo",
    modalidad: "RM",
    fecha: "2026-02-12",
    centro: "Clinica Cruz del Eje",
    informe: "PDF disponible",
    paciente: "Juan Perez",
    descripcion: "Resonancia magnetica cerebral en secuencia T1/T2",
    imageUrl: "https://images.unsplash.com/photo-1631563019676-dade0dbdb8fc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "img-3",
    tipo: "Ecografia Abdominal",
    modalidad: "ECO",
    fecha: "2026-01-30",
    centro: "Sanatorio Santa Isabel",
    informe: "PDF disponible",
    paciente: "Juan Perez",
    descripcion: "Ecografia abdominal de control",
    imageUrl: "https://images.unsplash.com/photo-1576671414121-aa0c81c869d4?auto=format&fit=crop&w=1200&q=80",
  },
];
