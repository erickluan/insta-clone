import { AuthenticationGuard } from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { AccessComponent } from './access/access.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {path: '', component: AccessComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]}
];
