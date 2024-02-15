import { Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { authRoutes } from './layouts/auth/auth.routes';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';
import { dashboardRoutes } from './layouts/dashboard/dashboard.routes';

export const routes: Routes = [
    {
        path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [authGuard],
        children: dashboardRoutes
    },
    {
        path:'',
        redirectTo:'/dashboard',
        pathMatch: 'full'
    },
    {
        path:'auth', 
        children: authRoutes
    }
];
