import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: "app-addmodal",
  templateUrl: "./addmodal.page.html",
  styleUrls: ["./addmodal.page.scss"]
})
export class AddmodalPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  closeImageModal() {
    this.modalController.dismiss();
  }

  watchAdsForCredit(){
    
  }
}
