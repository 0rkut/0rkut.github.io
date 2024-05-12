import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { ValidateAuthPageComponent } from './validate-auth-page/validate-auth-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'validate-auth', component: ValidateAuthPageComponent },
  { path: 'logout', component: LogoutPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule {}
