import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnteriesPageRoutingModule } from './enteries-routing.module';

import { EnteriesPage } from './enteries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnteriesPageRoutingModule
  ],
  declarations: [EnteriesPage]
})
export class EnteriesPageModule {}
