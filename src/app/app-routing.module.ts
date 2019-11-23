import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { DualLoginGuard } from './guards/dual-login-guard.service';

const routes: Routes = [
  { path: 'auth', loadChildren: './authentication/authentication.module#AuthenticationModule', canActivate:[DualLoginGuard] },
  { path: 'cake', loadChildren: './cake/cake.module#CakeModule', canActivate:[AuthGuard] },
  { path: '**', redirectTo: 'cake' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
