import { Component, OnInit, Input } from "@angular/core";
import { PopoverController, ModalController } from "@ionic/angular";
import { GalleryComponent } from "../components/gallery/gallery.component";
import { ImagefeedbackComponent } from "../components/imagefeedback/imagefeedback.component";

@Component({
  selector: "app-imagemodal",
  templateUrl: "./imagemodal.page.html",
  styleUrls: ["./imagemodal.page.scss"]
})
export class ImagemodalPage implements OnInit {
  popup;
  @Input() iswinner;
  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ImagefeedbackComponent,
      event: ev
    });
    this.popup = popover;
    return await popover.present();
  }

  dismiss() {
    this.popup.dismiss();
  }

  closeImageModal(event) {
    this.modalController.dismiss();
  }
}
