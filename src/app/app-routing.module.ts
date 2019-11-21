import { AuthenticationComponent } from './authentication/authentication.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CakeListComponent } from './cake/cake-list/cake-list.component';
import { AuthGuard } from './guards/auth-guard.service';
import { DualLoginGuard } from './guards/dual-login-guard.service';
import { CakeDesignComponent } from './cake/cake-design/cake-design.component';
import { CakeComponent } from './cake/cake/cake.component';


const routes: Routes = [
  { path: 'auth', component: AuthenticationComponent, canActivate:[DualLoginGuard] },
  { path: 'list', component: CakeListComponent, canActivate:[AuthGuard]},
  { path: 'details/:id', component: CakeComponent, canActivate:[AuthGuard]},
  { path: 'design', component: CakeDesignComponent, canActivate:[AuthGuard], 
    children:[  { path: ':id', component: CakeDesignComponent, canActivate:[AuthGuard]},
    ]
  },
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
