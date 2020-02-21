import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WinnersPageRoutingModule } from './winners-routing.module';

import { WinnersPage } from './winners.page';
import { FeaturecModule } from '../components/featurec.module';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, WinnersPageRoutingModule, FeaturecModule],
  declarations: [WinnersPage]
})
export class WinnersPageModule {}
