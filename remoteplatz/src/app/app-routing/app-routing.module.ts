import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from '../about/about.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jobs/:id', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  {path:'register', component:RegisterComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
