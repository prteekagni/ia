import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { NgOtpInputModule } from "ng-otp-input";
import { NgxMaskIonicModule } from "ngx-mask-ionic";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    NgxMaskIonicModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
