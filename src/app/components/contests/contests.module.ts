import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContestsPageRoutingModule } from './contests-routing.module';

import { ContestsPage } from './contests.page';
import { FeaturecModule } from '../components/featurec.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContestsPageRoutingModule,
    FeaturecModule
  ],
  declarations: [ContestsPage],
  exports:[ContestsPage]
})
export class ContestsPageModule {}
