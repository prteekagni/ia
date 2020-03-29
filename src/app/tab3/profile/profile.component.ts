import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from '../editprofile/editprofile.component';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  constructor(private modalController : ModalController) {}

  ngOnInit() {}

  buttonClick() {}
  async onClick() {
    const modal = await this.modalController.create({
      component: EditProfileComponent,
      backdropDismiss: true
    });
    return await modal.present();
  }
}
