import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asistencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent {
  asistencias = [
    { fecha: '2025-06-01', estado: 'Presente' },
    { fecha: '2025-06-02', estado: 'Ausente' }
  ];
}
