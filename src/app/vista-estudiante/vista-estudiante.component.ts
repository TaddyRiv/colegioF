import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Importar RouterModule

@Component({
  selector: 'app-vista-estudiante',
  standalone: true,
  imports: [CommonModule, RouterModule], // Agregar RouterModule aquí
  templateUrl: './vista-estudiante.component.html',
  styleUrls: ['./vista-estudiante.component.css']
})
export class VistaEstudianteComponent {
  vista: 'notas' | 'materias' | 'asistencias' = 'notas';

  constructor(private router: Router) {}

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  notas = [
    { trabajo: 'Ensayo de Historia', nota: 88, observacion: 'Muy buen trabajo' },
    { trabajo: 'Laboratorio de Química', nota: 72, observacion: 'Mejorar presentación' },
    { trabajo: 'Proyecto de Matemáticas', nota: 95, observacion: 'Excelente explicación' }
  ];

  materias = [
    {
      nombre: 'Matemáticas',
      trabajos: [
        { nombre: 'Tarea 1', nota: 90 },
        { nombre: 'Tarea 2', nota: 85 }
      ]
    },
    {
      nombre: 'Lenguaje',
      trabajos: [
        { nombre: 'Ensayo Literario', nota: 78 }
      ]
    }
  ];

  asistencias = [
    { fecha: '2025-06-01', estado: 'Presente' },
    { fecha: '2025-06-02', estado: 'Ausente' },
    { fecha: '2025-06-03', estado: 'Presente' }
  ];
}
