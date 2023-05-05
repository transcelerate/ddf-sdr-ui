import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { MsalGuard } from '@azure/msal-angular'; // Import MsalInterceptor
import { AuthGuardService } from './auth-guard.service';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/login/login.module').then((x) => x.LoginModule),
        canActivate: [],
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./features/dashboard/dashbord.module').then(
            (x) => x.DashboardModule
          ),
        canActivate: environment.bypassAuth ? [] : [MsalGuard],
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./features/search-study/search-study.module').then(
            (x) => x.SearchStudyModule
          ),
        canActivate: environment.bypassAuth ? [] : [MsalGuard],
      },
      {
        path: 'comparison',
        loadChildren: () =>
          import('./features/study-compare/study-compare.module').then(
            (x) => x.StudyCompareModule
          ),
        canActivate: environment.bypassAuth ? [] : [MsalGuard],
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./features/admin/admin.module').then((x) => x.AdminModule),
        canActivate: environment.bypassAuth ? [] : [MsalGuard],
        canLoad: environment.bypassAuth ? [] : [AuthGuardService],
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports.module').then(
            (x) => x.ReportsModule
          ),
        canActivate: environment.bypassAuth ? [] : [MsalGuard],
        canLoad: environment.bypassAuth ? [] : [AuthGuardService],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
