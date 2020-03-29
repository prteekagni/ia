import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { EditProfileComponent } from './editprofile.component';
import { EditProfilePageRoutingModule } from './editprofile.routing';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EditProfilePageRoutingModule],
  declarations: [EditProfileComponent]
})
export class EditProfilePageModule {}
