import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppWrapperComponent } from '../components/layout/app-wrapper/app-wrapper.component';

const routes: Routes = [
  {path: '', component: AppWrapperComponent, loadChildren: () => import('./public/public-pages.module').then(m => m.PublicPagesModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
