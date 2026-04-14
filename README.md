
# Ecosistema de Salud Unificado

Aplicacion web demo de un ecosistema de salud para simulacion de flujos clinicos y operativos.

Incluye:
- Portal publico (landing + login).
- Dashboards por rol (paciente, profesional, centro y admin).
- Reserva de turnos con stepper unificado.
- Historia interoperable (recetas + consultas).
- Visor DICOM simulado.
- Modo oscuro global con persistencia.
- Navegacion responsive para desktop y mobile.

## Objetivo del proyecto

Mostrar una experiencia end-to-end de salud digital en una sola SPA:
- Turnos, historia clinica interoperable y estudios de imagen.
- Cambios de rol para demo funcional.
- UI moderna, animada y adaptable a distintas pantallas.

## Stack tecnologico

- React 18 + TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React

## Arquitectura actual

- src/app: shell de aplicacion, rutas, layouts y wrappers de paginas.
- src/components: componentes de negocio desacoplados (Navbar, Sidebar, BookingStepper, DicomVisor y dashboards).
- src/context/AppContext.tsx: estado global y persistencia (tema, rol, vista y turnos).
- src/data/mockData.js: fuente centralizada de datos mock.

## Funcionalidades principales

1. Contexto global con localStorage
- Tema light/dark persistente.
- Rol y vista demo persistentes.
- Turnos reservados persistentes y visibles en el panel de paciente.

2. Reserva de turnos unificada
- Flujo: Centro -> Especialidad/Profesional -> Fecha/Hora -> Datos -> Confirmacion.
- Al confirmar, se guarda en localStorage y se refleja en Proximos Turnos.

3. Dashboards por rol
- Paciente: panel, historial, recetas/estudios.
- Profesional: agenda y buscador de pacientes.
- Centro: metricas y gestion institucional.
- Admin: auditoria y configuracion global.

4. Interoperabilidad y DICOM
- Seccion de historia interoperable con recetas y consultas.
- Visor DICOM simulado con listado de estudios y herramientas ficticias.

5. Responsive
- Desktop: sidebar fijo + header completo.
- Mobile: drawer lateral con navegacion, cambio de vista y logout.

## Rutas principales

- /: landing
- /login: acceso al portal
- /dashboard/patient
- /dashboard/professional
- /dashboard/center
- /dashboard/admin
- /dashboard/interoperability
- /dashboard/dicom
- /dashboard/chatbot

## Como ejecutar en local

1. Instalar dependencias:

```bash
npm install
```

2. Levantar entorno de desarrollo:

```bash
npm run dev
```

3. Build de produccion:

```bash
npm run build
```

4. Preview del build:

```bash
npm run preview
```

## Estado del repositorio

- README actualizado con contexto funcional y tecnico.
- Refactor estructural aplicado para escalabilidad y mantenimiento.
- Cambios relevantes documentados en CHANGELOG.md.

## Fuente de diseno

Proyecto base inspirado en la maqueta de Figma:
https://www.figma.com/design/CsQeSx0OPWCC2yW9UIr3nb/Ecosistema-de-Salud-Unificado
  