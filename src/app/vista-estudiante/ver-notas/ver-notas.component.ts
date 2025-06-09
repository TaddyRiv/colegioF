import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-notas',
  templateUrl: './ver-notas.component.html',
  styleUrls: ['./ver-notas.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class VerNotasComponent implements OnInit {
  materiaId!: number;
  resultados: any[] = [];
  cargando = true;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.materiaId = Number(this.route.snapshot.paramMap.get('materiaId'));
    if (this.materiaId) {
      this.usuarioService.getNotasPorMateria(this.materiaId).subscribe({
        next: (res) => {
          this.resultados = res.resultados;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al obtener notas:', err);
          this.cargando = false;
        },
      });
    }
  }
}
