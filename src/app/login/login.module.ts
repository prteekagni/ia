import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxMaskIonicModule } from "ngx-mask-ionic";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    NgxMaskIonicModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
