import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subida-notas',
  templateUrl: './subida-notas.component.html',
  styleUrls: ['./subida-notas.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class SubidaNotasComponent implements OnInit {
  formulario!: FormGroup;

  asignaciones: any[] = [];
  evaluaciones: any[] = [];
  estudiantes: any[] = [];
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      asignacion_id: [''],
      evaluacion_id: ['']
    });

    this.obtenerAsignaciones();
  }

  obtenerAsignaciones() {
    this.usuarioService.getAsignacionesDocente().subscribe(
      res => {
        this.asignaciones = res.asignaciones;
      },
      err => {
        console.error('Error al obtener asignaciones', err);
      }
    );
  }

  onAsignacionSeleccionada() {
    const asignacionId = this.formulario.get('asignacion_id')?.value;

    if (asignacionId) {
      this.usuarioService.getEvaluacionesPorAsignacion(asignacionId).subscribe(
        res => {
          this.evaluaciones = res.evaluaciones;
          this.estudiantes = [];
          this.formulario.patchValue({ evaluacion_id: null });
        },
        err => {
          console.error('Error al obtener evaluaciones', err);
        }
      );
    }
  }

  onEvaluacionSeleccionada() {
  const asignacionId = this.formulario.get('asignacion_id')?.value;
  console.log('Asignación seleccionada:', asignacionId); // 👈

  if (asignacionId) {
    this.usuarioService.getEstudiantesPorAsignacion(asignacionId).subscribe(
      res => {
        console.log('Estudiantes recibidos:', res); // 👈
        this.estudiantes = res.estudiantes.map((est: any) => ({
          ...est,
          nota: null
        }));
      },
      err => {
        console.error('Error al obtener estudiantes', err);
      }
    );
  }
}

  enviarNotas() {
  const evaluacionId = this.formulario.get('evaluacion_id')?.value;

  if (!evaluacionId) {
    alert('Debe seleccionar una evaluación');
    return;
  }

  const notas = this.estudiantes.map(est => ({
    estudiante_id: est.estudiante_id,
    nota: est.nota
  }));

  this.usuarioService.subirNotasEvaluacion(evaluacionId, notas).subscribe(
    res => {
      this.mensaje = res.mensaje || '✅ Notas registradas correctamente.';
      this.estudiantes = []; // limpiar tabla
      this.formulario.patchValue({ evaluacion_id: null }); // reiniciar evaluación seleccionada
    },
    err => {
      if (err.error?.non_field_errors?.[0]) {
        alert('⚠️ ' + err.error.non_field_errors[0]);
      } else if (err.error?.mensaje) {
        alert('⚠️ ' + err.error.mensaje);
      } else {
        alert('❌ Error al registrar notas');
        console.error(err);
      }
    }
  );
}

}
