import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroEstudianteComponent } from './registro-estudiante/registro-estudiante.component';
import { RegistroDocenteComponent } from './registro-docente/registro-docente.component';
import { VistaDocenteComponent } from './vista-docente/vista-docente.component';
import { VistaEstudianteComponent } from './vista-estudiante/vista-estudiante.component';


import { MateriasComponent } from './vista-estudiante/materias/materias.component';
import { AsistenciasComponent } from './vista-estudiante/asistencias/asistencias.component';
import { VistaInscripcionComponent } from './vista-estudiante/inscripcion/vista-inscripcion.component';

import { VistaAsignacionesComponent } from './vista-docente/asignaciones/vista-asignaciones.component';
import { RegistroEvaluacionComponent } from './vista-docente/registro-evaluacion/registro-evaluacion.component';
import { SubidaNotasComponent } from './vista-docente/subida-notas/subida-notas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro-estudiante', component: RegistroEstudianteComponent },
  { path: 'registro-docente', component: RegistroDocenteComponent },
  {
    path: 'docente',
    component: VistaDocenteComponent,
    children: [
      { path: 'asignaciones', component: VistaAsignacionesComponent },
      { path: 'registrar-evaluacion', component: RegistroEvaluacionComponent },
      { path: 'subir-notas', component: SubidaNotasComponent },
    ]
  },
  {
    path: 'estudiante',
    component: VistaEstudianteComponent,
    children: [
      { path: 'materias', component: MateriasComponent },
      { path: 'asistencias', component: AsistenciasComponent },
      { path: 'inscripcion', component: VistaInscripcionComponent },
    ]
  }
];
