import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';

import { AddmodalPage } from 'src/app/addmodal/addmodal.page';
import { EditprofilemodalPage } from 'src/app/editprofilemodal/editprofilemodal.page';
import { ImagemodalPage } from 'src/app/imagemodal/imagemodal.page';
import { myEnterAnimation } from 'src/app/animations/enter';
import { myLeaveAnimation } from 'src/app/animations/leave';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  segmentModel = "Contests";
  items;
  // @ViewChild("slides") slides: IonSlides
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.items = [
      { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
      { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
      { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
      { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
      { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
      { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
      { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
    ];
  }

  buttonClick() {}
  async onClick() {
    const modal = await this.modalController.create({
      component: EditprofilemodalPage,
      backdropDismiss: true,
    });
    return await modal.present();
  }
  segmentChanged(ev) {
    console.log(ev);
    
    // this.slides.slideNext();
  }
  async openimageModal() {
    const modal = await this.modalController.create({
      component: ImagemodalPage,
      backdropDismiss: true,
      cssClass: "image-modal",
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {
        type: "userupload",
      },
    });
    return await modal.present();
  }
}
