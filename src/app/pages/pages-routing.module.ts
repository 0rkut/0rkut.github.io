import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppWrapperComponent } from '../components/layout/app-wrapper/app-wrapper.component';

const routes: Routes = [
  {
    path: '',
    data: { showLeft: 'false' },
    component: AppWrapperComponent,
    loadChildren: () =>
      import('./public/public-pages.module').then((m) => m.PublicPagesModule),
  },
  {
    path: '',
    component: AppWrapperComponent,
    loadChildren: () =>
      import('./private/private-pages.module').then(
        (m) => m.PrivatePagesModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
