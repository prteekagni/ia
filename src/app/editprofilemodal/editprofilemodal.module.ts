import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditprofilemodalPageRoutingModule } from './editprofilemodal-routing.module';

import { EditprofilemodalPage } from './editprofilemodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditprofilemodalPageRoutingModule
  ],
  declarations: [EditprofilemodalPage],
  entryComponents:[]
})
export class EditprofilemodalPageModule {}
