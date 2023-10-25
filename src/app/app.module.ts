import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseLoginComponent } from './expense-login/expense-login.component';
import { PostService } from './services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ExpenseHomeComponent } from './expense-home/expense-home.component';
import { RouterModule } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseHeaderComponent } from './expense-header/expense-header.component';
import { ExpenseSignupComponent } from './expense-signup/expense-signup.component';
import { ExpenseDetailedInfoComponent } from './expense-detailed-info/expense-detailed-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseLoginComponent,
    ExpenseHomeComponent,
    ExpenseHeaderComponent,
    ExpenseSignupComponent,
    ExpenseDetailedInfoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'app-expense-home', component: ExpenseHomeComponent},
      {path: 'app-expense-login', component: ExpenseLoginComponent},
      {path: 'app-expense-signup', component: ExpenseSignupComponent}
    ]),
    CanvasJSAngularChartsModule,
    NgbModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
