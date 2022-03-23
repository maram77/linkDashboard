import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';

import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

import { MatToolbarModule} from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
/*import { HomeComponent } from './home/home.component'; */
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';


import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { RecuperateComponent } from './recuperate/recuperate.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DefaultModule } from './layouts/default/default.module';
import { RouterModule } from '@angular/router';
import { ChartsComponent } from './modules/charts/charts.component';
import { MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSortModule } from '@angular/material/sort';
import { UsersComponent } from './modules/users/users.component';











@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    RecuperateComponent,
    ResetPasswordComponent,
    ChartsComponent
   
 
   
    
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DefaultModule,
    RouterModule
   
    
   
    
    
   
    
    
    
    
    

    

   
   
   
  ], 
  exports:[
    
    
    
  ],
  
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
