import { Link } from "react-router";
import ReservationStepper from "../components/ReservationStepper";

export default function Landing() {
  return (
    <section className="h-[calc(100vh-80px)] w-full overflow-hidden bg-slate-100 transition-colors dark:bg-slate-950">
      <div className="mx-auto flex h-full w-full max-w-[1700px] flex-col px-2 py-2 md:px-4 md:py-4">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-3 text-white dark:border-slate-700 dark:from-slate-900 dark:to-slate-800 sm:px-5">
            <span className="inline-flex items-center gap-3 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/30">
              <span>Cruz del Eje</span>
              <span className="h-4 w-px bg-white/40" aria-hidden="true" />
              <span>Reserva SPA</span>
            </span>
            <Link
              to="/login"
              className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              Ir al portal paciente
            </Link>
          </div>

          <div
            id="dashboard-reserva"
            className="h-[calc(100%-58px)] w-full overflow-hidden bg-slate-100 px-2 py-2 dark:bg-slate-950 sm:px-3 sm:py-3"
          >
            <ReservationStepper />
          </div>
        </div>
      </div>
    </section>
  );
}
