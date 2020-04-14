import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { PopoverController, ModalController, NavParams, AlertController, IonSlides } from "@ionic/angular";
import { GalleryComponent } from "../components/gallery/gallery.component";
import { ImagefeedbackComponent } from "../components/imagefeedback/imagefeedback.component";
import { ForgotpasswordmodalPage } from '../forgotpasswordmodal/forgotpasswordmodal.page';
import { trigger, transition, query, style, stagger, animate, keyframes, group, animateChild } from '@angular/animations';
import { SharedService } from '../api/shared/shared.service';

@Component({
  selector: "app-imagemodal",
  templateUrl: "./imagemodal.page.html",
  styleUrls: ["./imagemodal.page.scss"],

  animations: [
    trigger("container", [
      transition(":enter", [
        style({ opacity: "0" }),
        group([
          animate("200ms ease-out", style({ opacity: "1" })),
          query("@badge, @message", [animateChild()]),
        ]),
      ]),
      transition(":leave", [
        group([
          animate("200ms ease-out", style({ opacity: "0" })),
          query("@badge, @message", [animateChild()]),
        ]),
      ]),
    ]),

    trigger("badge", [
      transition(":enter", [
        style({ transform: "translateY(100px)" }),
        animate("200ms ease-out", style({ transform: "translateY(0)" })),
      ]),
      transition(":leave", [
        animate("200ms ease-in", style({ transform: "translateY(100px)" })),
      ]),
    ]),

    trigger("message", [
      transition(":enter", [
        style({ opacity: "0" }),
        animate("5000ms 1000ms ease-out", style({ opacity: "1" })),
      ]),
      transition(":leave", [animate("500ms ease-in", style({ opacity: "0" }))]),
    ]),
  ],
})
export class ImagemodalPage implements OnInit {
  popup;
  @Input() iswinner;
  @Input() type;
  @ViewChild("inputElement", { static: false }) inputElement: ElementRef;
  isvoted:boolean = false;
  // @ViewChild("swiper", { read: IonSlides , static:false }) swiper: IonSlides;
  items;
  public displayvote: boolean = false;
  public displaysupervote: boolean = false;
  public displayboostpost: boolean = false;

  heartBtn: string = "start";
  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController,
    private navParams: NavParams,
    private sharedService: SharedService,
    private alertController: AlertController
  ) {
    console.log("Type " + this.navParams.get("type"));
    this.items = [1];
  }

  ngOnInit() {
    // console.log("This is the end of slides");
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ImagefeedbackComponent,
      event: ev,
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
        mode: "SV",
      },
    });

    modal.onDidDismiss().then((data) => {
      let superVoteData = data["data"];
      if (superVoteData) {
        this.displaysupervote = true;
      }
    });
    setTimeout(() => {
      this.displaysupervote = false;
      console.log("Set Timeout called");
      console.log(this.displaysupervote);
    }, 3000);
    return await modal.present();
  }
  async boostPhoto() {
    const modal = await this.modalController.create({
      component: ForgotpasswordmodalPage,
      backdropDismiss: true,
      cssClass: "boostpost-modal",
      componentProps: {
        mode: "BP",
      },
    });
    modal.onDidDismiss().then((data) => {
      let boostpost = data["data"];
      if (boostpost) {
        this.displayboostpost = true;
        this.sharedService.presentToast("Photo Boosted", 1000);
      }
    });
    setTimeout(() => {
      this.displayboostpost = false;
      console.log("Set Timeout called");
      console.log(this.displayboostpost);
    }, 3000);
    return await modal.present();
  }

  vote() {
    this.heartBtn = this.heartBtn == "start" ? "end" : "start";
    console.log(this.heartBtn);
    this.isvoted  = !this.isvoted
    this.displayvote = true;
    setTimeout(() => {
      this.displayvote = false;
    }, 900);
    if(this.isvoted){
    this.sharedService.presentToast("Your can revote after 3 hours", 3000);

    }
  }

  shareApp() {
    this.sharedService.sharingToOther("1");
  }

  async deletePhoto() {
    const alert = await this.alertController.create({
      header: "Delete?",
      subHeader: "",
      message:
        "Do you want to delete your entry. Entry once deleted can not be restored?",
      buttons: [
        {
          text: "Delete",
          handler: () => {
            this.sharedService.presentToast("Entry Deleted.", 2000);
            this.modalController.dismiss();
          },
        },
        {
          text: "Cancel",
          handler: () => {
            console.log("Cancelled");
          },
        },
      ],
    });

    await alert.present();
  }

  isReachedEnd(data) {
    console.log(data);
    setTimeout(() => {
      for (let i = 0; i < 25; i++) {
        this.items.push(i);
        console.log(this.items[i]);
      }
      console.log("Done");
    }, 500);
  }
}
