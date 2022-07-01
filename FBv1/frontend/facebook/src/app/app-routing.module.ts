import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
// import { RegisterComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '' ,component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'homepage', component:HomepageComponent},
  {path: 'post', component:PostComponent},
  // {path: 'signup', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
