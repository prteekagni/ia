import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CdescriptionPageRoutingModule } from './cdescription-routing.module';

import { CdescriptionPage } from './cdescription.page';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { TabviewgalleryComponent } from '../components/tabviewgallery/tabviewgallery.component';
import { SuperTabsModule } from "@ionic-super-tabs/angular";
import { FeaturecModule } from '../components/featurec.module';
import { ImpageuploadPage } from '../impageupload/impageupload.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CdescriptionPageRoutingModule,
    SuperTabsModule,
    FeaturecModule,
    
  ],
  declarations: [CdescriptionPage]
})
export class CdescriptionPageModule {}
