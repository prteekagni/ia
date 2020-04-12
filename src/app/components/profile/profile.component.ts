import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ModalController, IonSlides } from "@ionic/angular";

import { AddmodalPage } from "src/app/addmodal/addmodal.page";
import { EditprofilemodalPage } from "src/app/editprofilemodal/editprofilemodal.page";
import { ImagemodalPage } from "src/app/imagemodal/imagemodal.page";
import { myEnterAnimation } from "src/app/animations/enter";
import { myLeaveAnimation } from "src/app/animations/leave";
import { User } from "src/app/models/User";
import { SharedService } from "src/app/api/shared/shared.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  segmentModel = "Contests";
  items;

  userDetail: User;
  @Input() pI;
  credits;
  // @ViewChild("slides") slides: IonSlides
  constructor(
    private modalController: ModalController,
    private sharedService: SharedService
  ) {
    console.log("constructior");
  }

  ngOnInit() {
  
  }

  ionViewWillEnter() {}
  buttonClick() {}
  async onClick() {
    const modal = await this.modalController.create({
      component: EditprofilemodalPage,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((res: any) => {
      if (res) {
        this.sharedService.getUserDetail().then((res) => {
          this.userDetail = { ...res };
          console.log(this.userDetail);
          this.pI =
            this.userDetail.profileImage || "../../assets/boostpost.png";
        });
      }
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

  ngAfterViewChecked() {}
}
