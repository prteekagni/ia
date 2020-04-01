import { Component, OnInit, Input } from "@angular/core";
import { PopoverController, ModalController, NavParams } from "@ionic/angular";
import { GalleryComponent } from "../components/gallery/gallery.component";
import { ImagefeedbackComponent } from "../components/imagefeedback/imagefeedback.component";
import { ForgotpasswordmodalPage } from '../forgotpasswordmodal/forgotpasswordmodal.page';

@Component({
  selector: "app-imagemodal",
  templateUrl: "./imagemodal.page.html",
  styleUrls: ["./imagemodal.page.scss"]
})
export class ImagemodalPage implements OnInit {
  popup;
  @Input() iswinner;
  @Input() type;
  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController,
    private navParams : NavParams
  ) {
    console.log("Type " + this.navParams.get("type"));
    
  }

  ngOnInit() {}
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

  async superVote() {
    const modal = await this.modalController.create({
      component: ForgotpasswordmodalPage,
      backdropDismiss: true,
      cssClass: "supervote-modal",
      componentProps: {
        mode: "SV"
      }
    });
    return await modal.present();
  }
}
