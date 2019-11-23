import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CakeDesignComponent } from './cake-design/cake-design.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { CakeListComponent } from './cake-list/cake-list.component';
import { CakeComponent } from './cake/cake.component';


const routes: Routes = [
  { path: 'list', component: CakeListComponent, },
  { path: 'design', component: CakeDesignComponent, children:[
    { path: ':id', component: CakeDesignComponent},
  ]},
  { path: ':id', component: CakeComponent},
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CakeRoutingModule { }
