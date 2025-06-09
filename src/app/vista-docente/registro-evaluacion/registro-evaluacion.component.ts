import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface AsignacionDocente {
  asignacion_id: number;
  materia: string;
  curso: string;
  nivel: string;
  gestion: string;
}

@Component({
  selector: 'app-registro-evaluacion',
  templateUrl: './registro-evaluacion.component.html',
  styleUrls: ['./registro-evaluacion.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegistroEvaluacionComponent implements OnInit {
  formulario!: FormGroup;
  primariaAsignaciones: AsignacionDocente[] = [];
  secundariaAsignaciones: AsignacionDocente[] = [];
  response: any = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      asignacion_id: ['', Validators.required],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
    });

    this.obtenerAsignaciones();
  }

  obtenerAsignaciones() {
    this.usuarioService.getAsignacionesDocente().subscribe(
      res => {
        const asignaciones: AsignacionDocente[] = res.asignaciones;
        this.primariaAsignaciones = asignaciones.filter((a: AsignacionDocente) => a.nivel === 'Primaria');
        this.secundariaAsignaciones = asignaciones.filter((a: AsignacionDocente) => a.nivel === 'Secundaria');
      },
      err => {
        console.error('Error al obtener asignaciones', err);
      }
    );
  }

  registrarEvaluacion() {
    if (this.formulario.valid) {
      this.usuarioService.registrarEvaluacion(this.formulario.value).subscribe(
        res => {
          this.response = res;
          alert('✅ Evaluación registrada exitosamente');
          this.formulario.reset();
        },
        err => {
          alert('❌ Error al registrar la evaluación');
          console.error(err);
        }
      );
    }
  }
}
