import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SuperTabsModule } from '@ionic-super-tabs/angular';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: Tab3Page }]),
    SuperTabsModule
  ],
  declarations: [Tab3Page, LoginComponent, ProfileComponent]
})
export class Tab3PageModule {}
