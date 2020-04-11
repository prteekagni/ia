import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { FeaturecModule } from '../components/featurec.module';
import { EditprofilemodalPage } from '../editprofilemodal/editprofilemodal.page';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: Tab3Page }]),
    SuperTabsModule,
    FeaturecModule,
  ],
  declarations: [Tab3Page],
  entryComponents: [],
  // providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
})
export class Tab3PageModule {}
