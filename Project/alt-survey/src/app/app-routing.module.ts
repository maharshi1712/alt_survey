import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewComponent } from './pages/view/view.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthGuardBackService } from './services/auth-guard-back.service';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuardBackService],
    component: LoginComponent,
  },
  {
    path: 'signup',
    canActivate: [AuthGuardBackService],
    component: SignupComponent,
  },
  {
    path: 'forgot-password',
    canActivate: [AuthGuardBackService],
    component: ForgotPasswordComponent,
  },
  {
    path: ':user/home',
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
  {
    path: ':user/view/:id',
    canActivate: [AuthGuardService],
    component: ViewComponent,
  },
  {
    path: ':user/create',
    canActivate: [AuthGuardService],
    component: CreateComponent,
  },
  {
    path: ':user/edit/:id',
    canActivate: [AuthGuardService],
    component: EditComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
