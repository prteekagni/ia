import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnteriesPageRoutingModule } from './enteries-routing.module';

import { EnteriesPage } from './enteries.page';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { ImagemodalPageModule } from '../imagemodal/imagemodal.module';
import { TabviewgalleryComponent } from '../components/tabviewgallery/tabviewgallery.component';
import { GalleryComponent } from '../components/gallery/gallery.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnteriesPageRoutingModule,

  ],
  declarations: [
    EnteriesPage ,
    TabviewgalleryComponent,
    GalleryComponent
  ]
})
export class EnteriesPageModule {}
