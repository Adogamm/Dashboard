import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login-component/login-component';
import { DashboardComponent } from './pages/dashboard-component/dashboard-component';
import { authGuardGuard } from './auth/auth-guard-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta por defecto
    { path: 'login', component: LoginComponent }, // Ruta de login
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuardGuard]}, // Ruta protegida con guard para el dashboard
    { path: '**', redirectTo: 'login' } // Redirige rutas desconocidas a login
];
