import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertsService } from '../../../../core/services/alerts.service';
import { User } from './models';
import { environment } from '../../../../../environments/environment';
import { catchError, merge, mergeMap, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private alerts: AlertsService, private httpClient: HttpClient) {}
   
  getUsers() {
    // let headers = new HttpHeaders();
    // headers = headers.append('HOLAMUNDO', localStorage.getItem('token') || '');
    return this.httpClient
      .get<User[]>(`${environment.apiURL}/users?_sort=id`, {
        // headers: headers,
      })
      .pipe(
        catchError((error) => {
          this.alerts.showError('Error al cargar los usuarios');
          return of([]);
        })
      );
  }

  addUser(payload: User){
    return this.httpClient
      .post<User>(`${environment.apiURL}/users`,{
        ...payload,
        id: new Date().getTime().toString(),
        token: 'asas'
      })
      .pipe(mergeMap(() => this.getUsers()))
  }

  getUserById(id: number){
    return this.httpClient
      .get<User[]>(`${environment.apiURL}/users?id=${id}`)
      .pipe(
        catchError((error) => {
          this.alerts.showError('Error al cargar el usuario');
          return of([]);
        })
      );
  }

  editUser(payload: User){
    return this.httpClient
      .put<User>(`${environment.apiURL}/users/${payload.id}`,{
        ...payload,
      })
      .pipe(mergeMap(() => this.getUsers()))
  }

  deleteUser(id: number){
    return this.httpClient
      .delete<User>(`${environment.apiURL}/users/${id}`)
      .pipe(mergeMap(() => this.getUsers()))
  }

}
