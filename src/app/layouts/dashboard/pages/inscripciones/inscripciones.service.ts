import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable, catchError, forkJoin, mergeMap, of } from 'rxjs';
import { AlertsService } from '../../../../core/services/alerts.service';
import { Inscripciones } from '../courses/models';
import { UsersService } from '../users/users.service';
import { CoursesService } from '../courses/courses.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor(private alerts: AlertsService, private httpClient: HttpClient) { }

  getInscripciones(): Observable<Inscripciones[]> {
    // let headers = new HttpHeaders();
    // headers = headers.append('HOLAMUNDO', localStorage.getItem('token') || '');
    return this.httpClient
      .get<Inscripciones[]>(`${environment.apiURL}/inscripciones?_embed=user&_embed=course`, {
        // headers: headers,
      })
      .pipe(
        catchError((error) => {
          this.alerts.showError('Error al cargar los usuarios');
          return of([]);
        })
      );
  }


  addInscripcion(payload: any){
    return this.httpClient
      .post(`${environment.apiURL}/inscripciones`,{
        ...payload,
        inscripcionId: new Date().getTime().toString(),
        fecha: new Date()
      })
      .pipe(mergeMap(() => this.getInscripciones()))
  }


}
