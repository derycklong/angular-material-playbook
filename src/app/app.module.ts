import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { WelcomeComponent } from './welcome/welcome.component'
import { PortfolioComponent } from './portfolio/portfolio.component'
import { CreatePorfolioComponent } from './portfolio/create-portfolio/create-portfolio.component';
import { DeletePortfolioComponent } from './portfolio/delete-portfolio/delete-portfolio.component';
import { ViewDetailPortfolioComponent } from './portfolio/view-detail-portfolio/view-detail-portfolio.component';
import { DetailPortfolioComponent } from './portfolio/detail-portfolio/detail-portfolio.component';
import { ViewTransactionComponent } from './transaction/view-transaction/view-transaction.component';
import { LoadingInterceptor } from './shared/loading-interceptor.service';
import { Error404Component } from './shared/error/error404.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PortfolioComponent,
    CreatePorfolioComponent,
    DeletePortfolioComponent,
    ViewDetailPortfolioComponent,
    DetailPortfolioComponent,
    ViewTransactionComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path:'',component: WelcomeComponent },
      { path:'welcome',component: WelcomeComponent },
      { path:'portfolio',component: PortfolioComponent },
      { path:'viewDetailPortfolio/:id', component: ViewDetailPortfolioComponent},
      { path:'error404',component:Error404Component},
      { path:'**', redirectTo:'welcome', pathMatch:'full'}
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
