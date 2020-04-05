import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagemodalPageRoutingModule } from './imagemodal-routing.module';

import { ImagemodalPage } from './imagemodal.page';
import { FeaturecModule } from '../components/featurec.module';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { ImagefeedbackComponent } from '../components/imagefeedback/imagefeedback.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagemodalPageRoutingModule,
    FeaturecModule,
    
  ],
  declarations: [ImagemodalPage],
  entryComponents:[ImagefeedbackComponent]
})
export class ImagemodalPageModule {}
