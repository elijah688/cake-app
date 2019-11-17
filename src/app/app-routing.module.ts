import { AuthenticationComponent } from './authentication/authentication.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CakeListComponent } from './cake/cake-list/cake-list.component';
import { CakeDesignComponent } from './cake/cake-design/cake-design.component';
import { CakeHubComponent } from './cake/cake-hub/cake-hub.component';


const routes: Routes = [
  { path: 'auth', component: AuthenticationComponent },
  { path: 'hub', component: CakeHubComponent,
    children: [
      { path: '', component: CakeListComponent}
    ] 
  },
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
