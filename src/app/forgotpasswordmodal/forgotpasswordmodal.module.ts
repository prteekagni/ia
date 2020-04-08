import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotpasswordmodalPageRoutingModule } from './forgotpasswordmodal-routing.module';

import { ForgotpasswordmodalPage } from './forgotpasswordmodal.page';
import { OtpcomponentComponent } from './otpcomponent/otpcomponent.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotpasswordmodalPageRoutingModule
  ],
  declarations: [ForgotpasswordmodalPage , OtpcomponentComponent]
})
export class ForgotpasswordmodalPageModule {}
