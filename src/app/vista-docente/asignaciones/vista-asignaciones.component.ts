import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista-asignaciones',
  templateUrl: './vista-asignaciones.component.html',
  styleUrls: ['./vista-asignaciones.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class VistaAsignacionesComponent implements OnInit {
  formulario!: FormGroup;

  materias: { id: number; nombre: string }[] = [];
  primariaCursos: { id: number; nombre: string }[] = [];
  secundariaCursos: { id: number; nombre: string }[] = [];
  response: { creadas: string[]; existentes: string[] } | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      materia: ['', Validators.required],
      cursos: ['', Validators.required],
    });

    this.obtenerMaterias();
    this.obtenerCursos();
  }

  // Obtener las materias del docente
  obtenerMaterias() {
    this.usuarioService.getMateriasDocente().subscribe(
      (response) => {
        this.materias = response.materias;
      },
      (error) => {
        console.error('Error al obtener materias:', error);
      }
    );
  }

  // Obtener los cursos disponibles y separarlos por nivel
  obtenerCursos() {
    this.usuarioService.getCursos().subscribe(
      (response) => {
        // Suponiendo que cada curso tiene un campo 'nivel'
        this.primariaCursos = response.filter((c: any) => c.nivel === 'Primaria');
        this.secundariaCursos = response.filter((c: any) => c.nivel === 'Secundaria');
      },
      (error) => {
        console.error('Error al obtener cursos:', error);
      }
    );
  }

  // Función llamada al cambiar la materia seleccionada
  onMateriaChange() {
    console.log('Materia seleccionada:', this.formulario.value.materia);
  }

  // Registrar asignaciones
  registrarAsignaciones() {
    if (this.formulario.valid) {
      const { materia, cursos } = this.formulario.value;

      this.usuarioService.registrarAsignacionesDocente(materia, cursos).subscribe(
        (res) => {
          this.response = res;
        },
        (err) => {
          alert('Error al registrar las asignaciones');
          console.error(err);
        }
      );
    }
  }
}
