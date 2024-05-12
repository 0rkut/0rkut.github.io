import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@guards/auth/auth.guard';
import { AccountPageComponent } from './account-page/account-page.component';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { PeoplePageComponent } from './people-page/people-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'feed', component: FeedPageComponent },
      { path: 'account', component: AccountPageComponent },
      { path: 'people', component: PeoplePageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivatePagesRoutingModule {}
