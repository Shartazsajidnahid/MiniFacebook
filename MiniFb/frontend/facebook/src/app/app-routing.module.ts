import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { SignupComponent } from './signup/signup.component';
// import { RegisterComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '' ,component:SignupComponent},
  {path: 'login', component:LoginComponent},
  {path: 'homepage', component:HomepageComponent, canActivate:[AuthGuard]},
  {path: 'post', component:PostComponent},
 {path: 'signup', component:SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
