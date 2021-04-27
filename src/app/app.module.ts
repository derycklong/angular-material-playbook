import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import { RouterModule } from '@angular/router'
import { WelcomeComponent } from './welcome/welcome.component'
import { PortfolioComponent } from './portfolio/portfolio.component'


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path:'welcome',component: WelcomeComponent },
      { path:'portfolio',component: PortfolioComponent },
      { path:'', redirectTo:'welcome', pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
