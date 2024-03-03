import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from './pages/users/users.component';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../auth/auth.service';
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from './pages/users/models';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../core/store/auth/selectors';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatSidenavModule, 
    MatToolbarModule,
    MatIconModule, 
    MatButtonModule, 
    UsersComponent, 
    MatIcon, 
    MatListModule, 
    MatDividerModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{
  
  authUser$: Observable<User | null>

  constructor( private authService: AuthService, private store: Store) {
    this.authUser$ = this.store.select(selectAuthUser);
  }

  
  userRoutes = [
    {
      icon:"group",
      route:"alumnos",
      name:"Alumnos"
    },
    {
      icon:"school",
      route:"courses",
      name:"Cursos"
    },
    {
      icon:"",
      route:"inscripciones",
      name:"Inscripciones"
    }
  ]
  
  adminRoutes = [
    {
      icon:"group",
      route:"users",
      name:"Usuarios"
    },
    {
      icon:"group",
      route:"alumnos",
      name:"Alumnos"
    },
    {
      icon:"school",
      route:"courses",
      name:"Cursos"
    },
    {
      icon:"",
      route:"inscripciones",
      name:"Inscripciones"
    }
  ]
  
  routes = this.adminRoutes;

  logout(){
    this.authService.logout();
  }

}
