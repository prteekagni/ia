import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ForgotpasswordmodalPage } from '../forgotpasswordmodal/forgotpasswordmodal.page';

@Component({
  selector: "app-impageupload",
  templateUrl: "./impageupload.page.html",
  styleUrls: ["./impageupload.page.scss"]
})
export class ImpageuploadPage implements OnInit {
  items;
  constructor( private modalController: ModalController) {
    this.items = [
      { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
      { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
      { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
      { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
      { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
      { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
      { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" }
    ];
  }

  ngOnInit() {}

  closeModal() {}
  goToTabBar() {}
 async bostPost(){
  const modal = await this.modalController.create({
    component: ForgotpasswordmodalPage,
    backdropDismiss: true,
    cssClass: "boostpost-modal",
    componentProps:{
      "mode":"BP"
    }
  });
  return await modal.present();
  }
}
