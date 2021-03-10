import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
    },
    {
        path: 'dashboard',
        loadChildren: async () => (await import('./dashboard/dashboard.module')).DashboardModule,
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
