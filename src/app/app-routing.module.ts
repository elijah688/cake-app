import { AuthenticationComponent } from './authentication/authentication.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CakeListComponent } from './cake/cake-list/cake-list.component';
<<<<<<< HEAD
=======
import { CakeHubComponent } from './cake/cake-hub/cake-hub.component';
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c
import { AuthGuard } from './guards/auth-guard.service';
import { DualLoginGuard } from './guards/dual-login-guard.service';
import { CakeDesignComponent } from './cake/cake-design/cake-design.component';
import { CakeComponent } from './cake/cake/cake.component';


const routes: Routes = [
  { path: 'auth', component: AuthenticationComponent, canActivate:[DualLoginGuard] },
  { path: 'list', component: CakeListComponent, canActivate:[AuthGuard]},
  { path: 'details/:id', component: CakeComponent, canActivate:[AuthGuard]},
<<<<<<< HEAD
  { path: 'design', component: CakeDesignComponent, canActivate:[AuthGuard], 
    children:[  { path: ':id', component: CakeDesignComponent, canActivate:[AuthGuard]},
    ]
  },
=======

  // { path: 'hub', component: CakeHubComponent, canActivate:[AuthGuard],
  //   children: [
  //     { path: '', component: CakeListComponent}
  //   ] 
  // },
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
