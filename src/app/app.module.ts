import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistroEstudianteComponent } from './registro-estudiante/registro-estudiante.component';
import { RegistroDocenteComponent } from './registro-docente/registro-docente.component';

import { routes } from './app.routes'; // Importas tus rutas

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RegistroEstudianteComponent,  // ✅ Aquí como standalone
    RegistroDocenteComponent,     // ✅ Aquí también
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {}
