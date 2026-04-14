import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Sun,
  Contrast,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Ruler,
  Download,
  FileText,
} from "lucide-react";
import { patientImagingStudies } from "../data/mockData";

export default function DicomVisor() {
  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);

  const selectedStudy = patientImagingStudies.find((study) => study.id === selectedStudyId) || null;

  const toolbarControls = [
    { id: "contrast", label: "Contraste +/-", icon: Contrast },
    { id: "brightness", label: "Brillo +/-", icon: Sun },
    { id: "zoom-in", label: "Zoom +", icon: ZoomIn },
    { id: "zoom-out", label: "Zoom -", icon: ZoomOut },
    { id: "rotate", label: "Rotar", icon: RotateCw },
    { id: "measure", label: "Medir Distancia", icon: Ruler },
  ];

  return (
    <div className="space-y-8 text-gray-900 dark:text-slate-100">
      <AnimatePresence mode="wait">
        {!selectedStudy ? (
          <motion.div
            key="studies-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Mis Imagenes (DICOM/TAC/Resonancias)</h2>
              <p className="mt-1 text-gray-500 dark:text-slate-300">Gestion de estudios de alta complejidad e informes asociados.</p>
            </div>

            <section className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100">Estudios Disponibles</h3>
                <span className="text-xs rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-blue-700">{patientImagingStudies.length} estudios</span>
              </div>

              <div className="space-y-3">
                {patientImagingStudies.map((study) => (
                  <div key={study.id} className="rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-slate-100">{study.tipo}</p>
                        <p className="text-sm text-gray-600 dark:text-slate-300">Centro: {study.centro}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">Fecha: {study.fecha}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedStudyId(study.id)}
                          className="rounded-lg border border-blue-300 dark:border-blue-500 px-3 py-1.5 text-sm font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                        >
                          Ver en Visor Web
                        </button>
                        <button className="rounded-lg border border-gray-300 dark:border-slate-600 px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800">
                          Descargar Informe PDF
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="dicom-viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Visor DICOM Simulado</h2>
                <p className="mt-1 text-gray-500 dark:text-slate-300">Visualizacion web de estudio medico para demo.</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudyId(null)}
                className="inline-flex items-center rounded-lg border border-gray-300 dark:border-slate-600 px-3 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-900"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Volver al Listado
              </button>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase text-gray-500 dark:text-slate-400">Paciente</p>
                <p className="font-semibold text-gray-900 dark:text-slate-100">{selectedStudy.paciente}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-gray-500 dark:text-slate-400">Estudio</p>
                <p className="font-semibold text-gray-900 dark:text-slate-100">{selectedStudy.tipo}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-gray-500 dark:text-slate-400">Fecha</p>
                <p className="font-semibold text-gray-900 dark:text-slate-100">{selectedStudy.fecha}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-gray-500 dark:text-slate-400">Centro</p>
                <p className="font-semibold text-gray-900 dark:text-slate-100">{selectedStudy.centro}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
              <aside className="rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3">
                <p className="mb-3 text-xs font-semibold uppercase text-gray-500 dark:text-slate-400">Herramientas</p>
                <div className="space-y-2">
                  {toolbarControls.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      className="w-full rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-left text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      <span className="inline-flex items-center">
                        <tool.icon className="mr-2 h-4 w-4" />
                        {tool.label}
                      </span>
                    </button>
                  ))}
                </div>
              </aside>

              <div className="rounded-xl border border-gray-200 bg-black p-3">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
                  <span>{selectedStudy.modalidad} - {selectedStudy.descripcion}</span>
                  <span>Serie 03 | IMG 012</span>
                </div>
                <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-lg bg-slate-900">
                  <img
                    src={selectedStudy.imageUrl}
                    alt={selectedStudy.tipo}
                    className="max-h-[460px] w-full max-w-4xl object-contain grayscale"
                  />
                  <div className="absolute left-3 top-3 rounded bg-black/60 px-2 py-1 text-[11px] text-slate-200">Paciente: Juan Perez</div>
                  <div className="absolute right-3 top-3 rounded bg-black/60 px-2 py-1 text-[11px] text-slate-200">WL: 350 | WW: 800</div>
                </div>
                <div className="mt-3 flex items-center justify-end gap-2">
                  <button className="inline-flex items-center rounded-lg border border-blue-300 dark:border-blue-500 px-3 py-1.5 text-sm font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40">
                    <FileText className="mr-1.5 h-4 w-4" /> Descargar Informe PDF
                  </button>
                  <button className="inline-flex items-center rounded-lg border border-gray-300 dark:border-slate-600 px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800">
                    <Download className="mr-1.5 h-4 w-4" /> Descargar DICOM
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
