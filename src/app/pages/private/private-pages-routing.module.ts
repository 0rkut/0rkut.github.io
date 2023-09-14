import { Location } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PrivateLayoutComponent } from '@components/layout/private-layout/private-layout.component';
import { UserService } from '@services/user/user.service';
import { map } from 'rxjs';
import { AccountPageComponent } from './account-page/account-page.component';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { ValidateAuthPageComponent } from './validate-auth-page/validate-auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [
      () => {
        const router = inject(Router);
        const location = inject(Location);
        const userService = inject(UserService);
        const redirectUrl = location.path();
        return userService.user$.pipe(
          map(
            (user) =>
              !!user ||
              router.createUrlTree(['/login'], {
                queryParams: { redirectUrl },
              }),
          ),
        );
      },
    ],
    children: [
      { path: '', component: FeedPageComponent },
      { path: 'account', component: AccountPageComponent },
      { path: 'validate-auth', component: ValidateAuthPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivatePagesRoutingModule {}
