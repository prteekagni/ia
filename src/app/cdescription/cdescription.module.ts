import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CdescriptionPageRoutingModule } from './cdescription-routing.module';

import { CdescriptionPage } from './cdescription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CdescriptionPageRoutingModule
  ],
  declarations: [CdescriptionPage]
})
export class CdescriptionPageModule {}
