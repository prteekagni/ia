import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-winners",
  templateUrl: "./winners.page.html",
  styleUrls: ["./winners.page.scss"]
})
export class WinnersPage implements OnInit {
  constructor(private modalController: ModalController , private route: ActivatedRoute) {

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    
  }
  async goToWinnerImage() {
    const modal = await this.modalController.create({
      componentProps: {
        iswinner: "true"
      },
      component: ImagemodalPage,
      backdropDismiss: true,
      cssClass: "winner-modal"
    });
    return await modal.present();
  }
}
