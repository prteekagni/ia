import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EnteriesPageRoutingModule } from './enteries-routing.module';
import { EnteriesPage } from './enteries.page';
import { FeaturecModule } from '../components/featurec.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnteriesPageRoutingModule,
    FeaturecModule
  ],
  declarations: [
    EnteriesPage 
  ]
})
export class EnteriesPageModule {}
