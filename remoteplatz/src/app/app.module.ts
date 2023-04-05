import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { SharedModule } from './Shared/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BtnstyleDirective } from './Directives/btnstyle.directive';
import { FilterPipe } from '../app/Pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltertitlePipe } from './Pipes/filtertitle.pipe';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthModule } from '@auth0/auth0-angular';

import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BtnstyleDirective,
    FilterPipe,
    FiltertitlePipe,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
