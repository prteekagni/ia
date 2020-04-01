import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { SuperTabsModule } from "@ionic-super-tabs/angular";
import { FeaturecModule } from '../components/featurec.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: Tab1Page }]),
    SuperTabsModule,
    FeaturecModule,
    
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
