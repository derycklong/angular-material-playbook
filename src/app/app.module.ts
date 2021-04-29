import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { WelcomeComponent } from './welcome/welcome.component'
import { PortfolioComponent } from './portfolio/portfolio.component'
import { CreatePorfolioComponent } from './portfolio/create-portfolio/create-portfolio.component';
import { DeletePortfolioComponent } from './portfolio/delete-portfolio/delete-portfolio.component';




@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PortfolioComponent,
    CreatePorfolioComponent,
    DeletePortfolioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
