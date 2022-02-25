import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardComponent } from './components/card/card.component';
import { MatSelectModule } from '@angular/material/select';
import { ViewComponent } from './pages/view/view.component';
import { CreateComponent } from './pages/create/create.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EditComponent } from './pages/edit/edit.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SurveyService } from './services/survey.service';
import { UserService } from './services/user.service';
import { AuthGuardBackService } from './services/auth-guard-back.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    CardComponent,
    ViewComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule,
    FlexLayoutModule,
    MatSelectModule,
    CKEditorModule,
    AngularEditorModule,
    MatToolbarModule,
  ],
  providers: [
    AuthGuardService,
    SurveyService,
    UserService,
    AuthGuardBackService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
