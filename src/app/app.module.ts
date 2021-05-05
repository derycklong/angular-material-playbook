import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { WelcomeComponent } from './welcome/welcome.component'
import { PortfolioComponent } from './ticker/portfolio.component'
import { CreateTickerComponent } from './ticker/create-ticker/create-ticker.component';
import { DeleteTickerComponent } from './ticker/delete-ticker/delete-ticker.component';
import { ViewDetailTickerComponent } from './ticker/view-detail-ticker/view-detail-ticker.component';
import { DetailTickerComponent } from './ticker/detail-ticker/detail-ticker.component';
import { ViewTransactionComponent } from './transaction/view-transaction/view-transaction.component';
import { LoadingInterceptor } from './shared/loading-interceptor.service';
import { Error404Component } from './shared/error/error404.component';
import { CreateTransactionComponent } from './transaction/create-transaction/create-transaction.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PortfolioComponent,
    CreateTickerComponent,
    DeleteTickerComponent,
    ViewDetailTickerComponent,
    DetailTickerComponent,
    ViewTransactionComponent,
    Error404Component,
    CreateTransactionComponent
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
      { path:'viewDetail/:id', component: ViewDetailTickerComponent},
      { path:'error404',component:Error404Component},
      { path:'**', redirectTo:'welcome', pathMatch:'full'}
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
