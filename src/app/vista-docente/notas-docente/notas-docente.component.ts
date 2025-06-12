import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notas-docente',
  templateUrl: './notas-docente.component.html',
  styleUrls: ['./notas-docente.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NotasDocenteComponent implements OnInit {
  resumen: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getResumenDocente().subscribe({
      next: (data) => {
        this.resumen = data;
      },
      error: (err) => {
        console.error('Error al cargar resumen de notas del docente', err);
      }
    });
  }
}
