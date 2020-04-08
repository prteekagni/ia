import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { TabviewgalleryComponent } from './tabviewgallery/tabviewgallery.component';
import { ImagefeedbackComponent } from './imagefeedback/imagefeedback.component';
import { ContestsComponent } from './contests/contests.component';
import { ProfileComponent } from './profile/profile.component';
import { SuperTabsModule } from "@ionic-super-tabs/angular";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    SuperTabsModule
    // RouterModule.forChild([{ path: "", component: Tab1Page }])
  ],
  declarations: [
    GalleryComponent,
    TabviewgalleryComponent,
    ImagefeedbackComponent , 
    ContestsComponent ,
    ProfileComponent
  ],
  exports: [GalleryComponent, TabviewgalleryComponent, ImagefeedbackComponent , ContestsComponent ,ProfileComponent]
})
export class FeaturecModule {}
