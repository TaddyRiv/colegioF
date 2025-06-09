import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registro-estudiante',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent {
  formulario: FormGroup;
  crearTutor = false;
  tutorCI = '';
  tutorEncontrado: any = null;
  registroExitoso: any = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      ci: ['', Validators.required],
      celular: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tutor_ci: [''],
      nombre_tutor: [''],
      celular_tutor: [''],
      email_tutor: ['']
    });
  }

  toggleTutorCheckbox(event: any) {
    this.crearTutor = event.target.checked;
    this.alternarModoTutor();
  }

  alternarModoTutor() {
    this.tutorEncontrado = null;
    this.tutorCI = '';
    this.formulario.patchValue({
      tutor_ci: '',
      nombre_tutor: '',
      celular_tutor: '',
      email_tutor: ''
    });
  }

  actualizarCI(event: Event) {
    const input = event.target as HTMLInputElement;
    this.tutorCI = input.value;
  }

  buscarTutor() {
  this.usuarioService.buscarTutorPorCI(this.tutorCI).subscribe(
    (tutores) => {
      if (tutores.length > 0) {
        this.tutorEncontrado = tutores[0];
        this.formulario.patchValue({ tutor_ci: this.tutorEncontrado.ci });
      } else {
        alert("Tutor no encontrado.");
        this.tutorEncontrado = null;
      }
    },
    () => {
      alert("Error al buscar el tutor.");
      this.tutorEncontrado = null;
    }
  );
}


  registrarEstudiante() {
  const rawPayload = this.formulario.value;
  const payload: any = {
    nombre: rawPayload.nombre,
    ci: rawPayload.ci,
    email: rawPayload.email,
    celular: rawPayload.celular,
    tutor_ci: rawPayload.tutor_ci,
    crear_tutor: this.crearTutor
  };

  // Si va a crear tutor, se añaden esos campos
  if (this.crearTutor) {
    payload.nombre_tutor = rawPayload.nombre_tutor;
    payload.email_tutor = rawPayload.email_tutor;
    payload.celular_tutor = rawPayload.celular_tutor;
  }

  // Validación extra
  if (!this.crearTutor && !payload.tutor_ci) {
    alert("Debes seleccionar un tutor existente o crear uno nuevo.");
    return;
  }

  this.usuarioService.registrarEstudiante(payload).subscribe(
    (res) => {
      this.registroExitoso = res;
      this.formulario.reset();
      this.tutorEncontrado = null;
      this.crearTutor = false;
      this.tutorCI = '';
    },
    (err) => {
      console.error(err);
      alert("Error al registrar: " + (err.error?.detail || err.message));
    }
  );
}


}
