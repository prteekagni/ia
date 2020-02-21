import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpageuploadPageRoutingModule } from './impageupload-routing.module';

import { ImpageuploadPage } from './impageupload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImpageuploadPageRoutingModule
  ],
  declarations: [ImpageuploadPage]
})
export class ImpageuploadPageModule {}
