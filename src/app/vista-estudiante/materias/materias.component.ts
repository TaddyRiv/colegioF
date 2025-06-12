import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MateriasComponent implements OnInit {
  materias: any[] = [];
  materiaSeleccionada: number | null = null;
  resultados: any[] = [];
  predicciones: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerMateriasEstudiante();
    this.obtenerPredicciones();
  }

  obtenerMateriasEstudiante() {
    this.usuarioService.getMateriasEstudiante().subscribe(
      res => {
        this.materias = res.materias || [];
      },
      err => {
        console.error('Error al obtener materias', err);
      }
    );
  }

  verNotas(materia: any) {
    if (!materia.materia_id) {
      console.error("materia_id está undefined", materia);
      return;
    }

    this.materiaSeleccionada = materia.materia_id;

    this.usuarioService.getNotasPorMateria(materia.materia_id).subscribe({
      next: (res) => {
        this.resultados = res.resultados;
      },
      error: (err) => {
        console.error("Error al obtener notas", err);
      }
    });
  }

  obtenerPredicciones() {
    this.usuarioService.getPrediccionesEstudiante().subscribe({
      next: (data) => {
        this.predicciones = data;
      },
      error: (err) => {
        console.error('Error al obtener predicciones:', err);
      }
    });
  }
}
