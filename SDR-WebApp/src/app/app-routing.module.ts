import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
       {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./features/dashboard/dashbord.module').then(
            (x) => x.DashboardModule
          ),
        canActivate: []
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./features/search-study/search-study.module').then(
            (x) => x.SearchStudyModule
          ),
        canActivate: []
      },
      {
        path: 'comparison',
        loadChildren: () =>
          import('./features/study-compare/study-compare.module').then(
            (x) => x.StudyCompareModule
          ),
        canActivate: []
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./features/admin/admin.module').then((x) => x.AdminModule),
        canActivate: [],
        canLoad: []
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports.module').then(
            (x) => x.ReportsModule
          ),
        canActivate: [],
        canLoad: []
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
