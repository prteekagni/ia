import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpageuploadPageRoutingModule } from './impageupload-routing.module';

import { ImpageuploadPage } from './impageupload.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImpageuploadPageRoutingModule,
    ImageCropperModule
  ],
  declarations: [ImpageuploadPage]
})
export class ImpageuploadPageModule {}
