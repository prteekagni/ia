import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditprofilemodalPageRoutingModule } from './editprofilemodal-routing.module';

import { EditprofilemodalPage } from './editprofilemodal.page';
import { NgxMaskIonicModule } from "ngx-mask-ionic";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditprofilemodalPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskIonicModule,
    
  ],
  declarations: [EditprofilemodalPage],
  entryComponents: [],
})
export class EditprofilemodalPageModule {}
