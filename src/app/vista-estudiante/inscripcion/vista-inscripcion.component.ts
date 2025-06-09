import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-inscripcion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vista-inscripcion.component.html',
  styleUrls: ['./vista-inscripcion.component.css']
})
export class VistaInscripcionComponent implements OnInit {
  formulario!: FormGroup;
  cursos: any[] = [];
  gestionActual: any = null;
  estudianteId: number = 0;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.estudianteId = Number(localStorage.getItem('estudiante_id'));

    this.formulario = this.fb.group({
      curso: ['', Validators.required]
    });

    this.obtenerCursos();
    this.obtenerGestionActiva();
  }

  obtenerCursos() {
    this.usuarioService.getCursos().subscribe(resp => {
      this.cursos = resp;
    });
  }

  obtenerGestionActiva() {
    this.usuarioService.getGestiones().subscribe(resp => {
      const activas = resp.filter((g: any) => g.estado === true);
      if (activas.length > 0) {
        this.gestionActual = activas[0];  // Guardamos toda la gestión
        console.log('✅ Gestión activa:', this.gestionActual);
      } else {
        this.gestionActual = null;
      }
    });
  }

  inscribir() {
    if (!this.formulario.valid || !this.gestionActual || !this.gestionActual.id) {
      alert('Formulario incompleto o sin gestión activa');
      return;
    }

    const data = {
      estudiante: this.estudianteId,
      curso: this.formulario.value.curso,
      gestion: this.gestionActual.id
    };

    console.log('📤 Enviando inscripción:', data);

    this.usuarioService.inscribirEstudiante(data).subscribe({
      next: res => {
        alert('Inscripción exitosa');
        this.router.navigate(['/estudiante']);
      },
      error: err => {
        alert(err.error?.non_field_errors?.[0] || 'Error en la inscripción');
      }
    });
  }
}
