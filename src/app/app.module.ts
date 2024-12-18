import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { SecurityInterceptor } from './interceptors/security.interceptor';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NoAuthenticatedGuard } from './guards/no-authenticated.guard';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, PaymentComponent],
  providers: [  //Activo el interceptor 
    { provide : HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true,
    }  , // Activo el guardian 
    AuthenticatedGuard,
    NoAuthenticatedGuard
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}