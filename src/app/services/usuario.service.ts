import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}


  // 1. Registrar estudiante
  registrarEstudiante(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-estudiante/`, data);
  }

  // 2. Registrar docente
  registrarDocente(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-docente/`, data);
  }

  // 3. Login
  login(data: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, data);
  }
  manejarLoginExitoso(res: any) {
  localStorage.setItem('token', res.access);
  localStorage.setItem('rol', res.rol);
  localStorage.setItem('nombre', res.nombre);
  localStorage.setItem('username', res.username);


  // Si `res.estudiante` es un objeto { id: 14, ... }
  if (res.rol === 'estudiante' && res.estudiante) {
    localStorage.setItem('estudiante_id', res.estudiante.id); // <- importante
  }

  // Redireccionamiento según el rol
  if (res.rol === 'estudiante') {
    this.router.navigate(['/estudiante']);
  } else if (res.rol === 'docente') {
    this.router.navigate(['/docente']);
  }
}



  // 4. Inscribir estudiante
  inscribirEstudiante(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/inscribir/`, data);
}

  // 5. Obtener lista de estudiantes
  getEstudiantes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estudiantes/`);
  }

  // 6. Obtener lista de cursos
  getCursos(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/cursos/`);
}

  // 7. Obtener lista de gestiones
  getGestiones(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/gestiones/`);
}
  //8
buscarTutorPorCI(ci: string) {
  return this.http.get<any[]>(`${this.apiUrl}/tutores/?ci=${ci}`);
}

//9  Obtener materias del estudiante
getMateriasEstudiante(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get('http://127.0.0.1:8000/api/usuarios/materias-curso/', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

//9  Obtener evaluaciones de una materia específica
getEvaluacionesMateria(materiaId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/evaluaciones-materia/${materiaId}/`);
}
//10 get materias
getMateriasDocente(): Observable<any> {
  const token = localStorage.getItem('token'); // o desde donde guardes el token

  return this.http.get(`${this.apiUrl}/materias/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}


//11 Registrar asignaciones de materias a docentes
registrarAsignacionesDocente(materiaId: number, cursosIds: number[]): Observable<any> {
  const token = localStorage.getItem('token');

  return this.http.post(
    'http://127.0.0.1:8000/api/usuarios/asignaciones/registrar-materias/',
    {
      materia_id: materiaId,
      curso_ids: cursosIds
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

//12 Registrar evaluaciones
registrarEvaluacion(data: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.post(
    'http://127.0.0.1:8000/api/usuarios/evaluaciones/registrar/',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
//13 Obtener asignaciones del docente
getAsignacionesDocente(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get('http://127.0.0.1:8000/api/usuarios/asignaciones/mis/', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
//14 Obtener evaluaciones por asignación
getEvaluacionesPorAsignacion(asignacionId: number) {
  const headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + localStorage.getItem('token')
  );
  return this.http.get<any>(
    `${this.apiUrl}/asignaciones/${asignacionId}/evaluaciones/`,
    { headers }
  );
}

//15 Subir notas de evaluación
subirNotasEvaluacion(evaluacionId: number, notas: any[]): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.post(
    'http://127.0.0.1:8000/api/usuarios/notas/registrar/',
    {
      evaluacion_id: evaluacionId,
      notas: notas
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
//16 Obtener estudiantes por asignación
getEstudiantesPorAsignacion(asignacionId: number): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(
    `http://127.0.0.1:8000/api/usuarios/asignaciones/${asignacionId}/estudiantes/`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
//17 Registrar notas
registrarNotas(data: any) {
  const headers = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + localStorage.getItem('token')
  );
  return this.http.post<any>(`${this.apiUrl}/notas/registrar/`, data, { headers });
}

//18 Obtener notas de un estudiante
getNotasPorMateria(materiaId: number): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(
    `http://127.0.0.1:8000/api/usuarios/estudiante/materia/${materiaId}/notas/`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}


}
