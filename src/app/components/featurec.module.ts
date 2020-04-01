import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { TabviewgalleryComponent } from './tabviewgallery/tabviewgallery.component';
import { ImagefeedbackComponent } from './imagefeedback/imagefeedback.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule
    // RouterModule.forChild([{ path: "", component: Tab1Page }])
  ],
  declarations: [
    GalleryComponent,
    TabviewgalleryComponent,
    ImagefeedbackComponent
  ],
  exports: [GalleryComponent, TabviewgalleryComponent, ImagefeedbackComponent]
})
export class FeaturecModule {}
