import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { ImpageuploadPage } from '../impageupload/impageupload.page';
import { ImpageuploadPageModule } from '../impageupload/impageupload.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ImpageuploadPageModule,
  ],
  declarations: [TabsPage],
  entryComponents: [ImpageuploadPage]
})
export class TabsPageModule {}
