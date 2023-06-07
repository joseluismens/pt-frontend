import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversionComponent } from './pages/conversion/conversion.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { LoginComponent } from './pages/login/login.component';
import { RoleGuard } from './guards/role_guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  

  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'conversion',
        component: ConversionComponent,
        canActivate: [RoleGuard],
        data: { role: ['user', 'admin'] },
      },
      {path:'', redirectTo:'conversion', pathMatch:'full'},
      
      {
        path: 'historial',
        component: HistorialComponent,
        canActivate: [RoleGuard],
        data: { role: ['admin'] },
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/conversion' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
