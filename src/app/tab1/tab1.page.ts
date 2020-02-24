import { Component, ViewChild } from '@angular/core';
import { PopoverController ,IonSlides, ModalController } from '@ionic/angular';
import { AddmodalPage } from '../addmodal/addmodal.page';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  @ViewChild("slider", { static: true }) slider: IonSlides;
  segment = 0;
  items: any = [];
  constructor(private popoverController: PopoverController , private modalController: ModalController) {
    this.items = [
      { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
      { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
      { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
      { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
      { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
      { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
      { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" }
    ];
    console.log(this.items);
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: "",
      event: ev,
      translucent: true
    });

    return await popover.present();
  }
  // async segmentChanged() {
  //   await this.slider.slideTo(this.segment);
  // }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.slider.slideTo(this.segment);
  }
  async openAddModalPage(){
   const modal = await this.modalController.create({
     component: AddmodalPage,
     backdropDismiss: true
   });
   return await modal.present();
  }
}
