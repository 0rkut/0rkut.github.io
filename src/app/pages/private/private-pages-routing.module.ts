import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@guards/auth/auth.guard';
import { AccountPageComponent } from './account-page/account-page.component';
import { CommunityAddPageComponent } from './community/community-add-page/community-add-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'account', component: AccountPageComponent },
      { path: 'community/add', component: CommunityAddPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivatePagesRoutingModule {}
