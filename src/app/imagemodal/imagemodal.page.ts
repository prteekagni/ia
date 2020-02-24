import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { ImagefeedbackComponent } from '../components/imagefeedback/imagefeedback.component';

@Component({
  selector: "app-imagemodal",
  templateUrl: "./imagemodal.page.html",
  styleUrls: ["./imagemodal.page.scss"]
})
export class ImagemodalPage implements OnInit {
  popup;
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ImagefeedbackComponent,
      event: ev,
      
    });
    this.popup = popover;
    return await popover.present();
  }

  dismiss(){
this.popup.dismiss();
  }
}
