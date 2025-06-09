import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-registro-docente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './registro-docente.component.html',
  styleUrls: ['./registro-docente.component.css']
})
export class RegistroDocenteComponent {
  form: any = {
    nombre: '',
    ci: '',
    celular: '',
    email: ''
  };

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  registrarDocente() {
  if (!this.form.nombre || !this.form.ci || !this.form.email || !this.form.celular) {
    alert('Por favor llena todos los campos');
    return;
  }

  this.usuarioService.registrarDocente(this.form).subscribe({
    next: () => {
      alert('Docente registrado exitosamente');
      this.router.navigate(['/login']);
    },
    error: err => {
      console.error(err);
      alert('Error al registrar docente');
    }
    });
  }

}
