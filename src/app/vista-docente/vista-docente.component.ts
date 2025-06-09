import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ← necesario para router-outlet

@Component({
  selector: 'app-vista-docente',
  templateUrl: './vista-docente.component.html',
  styleUrls: ['./vista-docente.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule], // ← agregar RouterModule
})
export class VistaDocenteComponent {
  logout() {
    alert('Cerrar sesión.');
  }
}
