// src/app/vista-tutor/tutor.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  estudiantes: any[] = [];
  estudianteSeleccionado: any = null;
  notas: any[] = [];
  materiaSeleccionada: any = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getEstudiantesPorTutor().subscribe({
      next: (res) => this.estudiantes = res,
      error: (err) => console.error('Error al obtener estudiantes', err)
    });
  }

  verNotas(est: any) {
    this.estudianteSeleccionado = est;
    this.materiaSeleccionada = null;
    this.notas = [];

    this.usuarioService.getNotasPorEstudiante(est.id).subscribe({
      next: (res) => {
        this.notas = res;
      },
      error: (err) => console.error('Error al obtener notas del estudiante', err)
    });
  }

  seleccionarMateria(materia: any) {
    this.materiaSeleccionada = materia;
  }
}
