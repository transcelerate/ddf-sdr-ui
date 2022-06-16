import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular'; // Import MsalInterceptor
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [{
  path: '',
  canActivate: [],
  children: [ { 
    path: '',  
    loadChildren: () => import('./features/login/login.module').then(x => x.LoginModule),
    canActivate: [] 
  },
  { 
    path: 'home',  
    loadChildren: () => import('./features/dashboard/dashbord.module').then(x => x.DashboardModule),
    canActivate: [MsalGuard] 
  },
  { 
    path: 'search',  
    loadChildren: () => import('./features/search-study/search-study.module').then(x => x.SearchStudyModule),
    canActivate: [MsalGuard] 
  },
  { 
    path: 'admin',  
    loadChildren: () => import('./features/admin/admin.module').then(x => x.AdminModule),
    canActivate: [MsalGuard],
    canLoad:[AuthGuardService] 
  },
]
}
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
