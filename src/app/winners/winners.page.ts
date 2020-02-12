import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';

@Component({
  selector: "app-winners",
  templateUrl: "./winners.page.html",
  styleUrls: ["./winners.page.scss"]
})
export class WinnersPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  async goToWinnerImage() {
    const modal = await this.modalController.create({
      component: ImagemodalPage,
      backdropDismiss: true,
      cssClass: "my-modal"
    });
    return await modal.present();
  }
}
