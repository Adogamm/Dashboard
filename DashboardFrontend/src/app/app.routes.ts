import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login-component/login-component';
import { DashboardComponent } from './pages/dashboard-component/dashboard-component';
import { authGuardGuard } from './auth/auth-guard-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuardGuard]},
    { path: '**', redirectTo: 'login' }
];
