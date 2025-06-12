import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-trabajos-docente',
  templateUrl: './trabajos-docente.component.html',
  styleUrls: ['./trabajos-docente.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class TrabajosDocenteComponent implements OnInit {
  trabajos: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getEvaluacionesDocente().subscribe({
      next: (data) => {
        this.trabajos = data;
      },
      error: (err) => {
        console.error('Error al cargar evaluaciones del docente', err);
      }
    });
  }
}
