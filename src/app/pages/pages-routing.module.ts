import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public-pages.module').then((m) => m.PublicPagesModule),
  },
  {
    path: '',
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
