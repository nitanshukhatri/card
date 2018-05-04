import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableGridComponent} from './table-grid/table-grid.component';
import {AppContentComponent} from './app-content/app-content.component';
const routes: Routes = [
  { 
    path:'table-grid',
    component:TableGridComponent
  },
  {
    path: 'content', 
    component: AppContentComponent,
  },
  {
    path: '', 
    component: AppContentComponent,
  },
  {
    path: '**', component: AppContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
