import { Injectable } from '@angular/core';
import { AlertsService } from '../../../../core/services/alerts.service';
import { HttpClient } from '@angular/common/http';
import { Courses } from './models';
import { environment } from '../../../../../environments/environment';
import { catchError, of } from 'rxjs';
import { User } from '../users/models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private alerts: AlertsService, private httpClient: HttpClient) {}

  getCourses() {
    return this.httpClient
      .get<Courses[]>(`${environment.apiURL}/courses`)
      .pipe(
        catchError((error) => {
          this.alerts.showError('Error al cargar los cursos');
          return of([]);
        })
      )
  }
  getProfesores() {
    return this.httpClient
      .get<User[]>(`${environment.apiURL}/users?role=PROFESOR`)
      .pipe(
        catchError((error) => {
          this.alerts.showError('Error al cargar los usuarios');
          return of([]);
        })
      )
  }

}
