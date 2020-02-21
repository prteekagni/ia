import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { Tab1Page } from '../tab1/tab1.page';

import { WinnersPage } from '../winners/winners.page';

import { GalleryComponent } from './gallery/gallery.component';
import { TabviewgalleryComponent } from './tabviewgallery/tabviewgallery.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // RouterModule.forChild([{ path: "", component: Tab1Page }])
  ],
  declarations: [GalleryComponent , TabviewgalleryComponent],
  exports:[GalleryComponent, TabviewgalleryComponent]
})
export class FeaturecModule {}
