import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';

import { AddmodalPage } from 'src/app/addmodal/addmodal.page';
import { EditprofilemodalPage } from 'src/app/editprofilemodal/editprofilemodal.page';
import { ImagemodalPage } from 'src/app/imagemodal/imagemodal.page';
import { myEnterAnimation } from 'src/app/animations/enter';
import { myLeaveAnimation } from 'src/app/animations/leave';
import { User } from 'src/app/models/User';
import { SharedService } from 'src/app/api/shared/shared.service';

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
  // @ViewChild("slides") slides: IonSlides
  constructor(
    private modalController: ModalController,
    private sharedService: SharedService
  ) {
    console.log("constructior");
     this.sharedService.getUserDetail().then((res) => {
       this.userDetail = { ...res };
       console.log(this.userDetail);
      //  this.pI = this.userDetail.profileImage || "../../assets/boostpost.png";
     });
  }

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
    // this.pI = localStorage.getItem("ProfileImage") || "../../assets/boostpost.png"
    // this.userDetail = JSON.parse(localStorage.getItem("User"));
    console.log("NgOnInit");
  }

  ionViewWillEnter() {
     console.log("NgOnInit11");
  }
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

  ngAfterViewChecked(){
  }
}
