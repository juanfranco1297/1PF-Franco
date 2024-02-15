import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { InicioComponent } from './pages/inicio/inicio/inicio.component';

export const dashboardRoutes: Routes = [
    {
        path:'',
        component: InicioComponent,
    },
    {
        path: 'users', 
        component: UsersComponent, 
    },
    {
        path: 'courses',
        component: CoursesComponent
    }
];
