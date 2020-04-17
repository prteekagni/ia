import { Component } from "@angular/core";
import {
  Platform,
  AlertController,
  ModalController,
  ActionSheetController,
} from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { EditprofilemodalPage } from "../editprofilemodal/editprofilemodal.page";
import { SharedService } from '../api/shared/shared.service';
import { User } from '../models/User';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { myEnterAnimation } from '../animations/enter';
import { myLeaveAnimation } from '../animations/leave';

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  unsubscribeBackEvent;
  sourceParams;
  contestID;
  editModal;
  userDetail:User;
  profileI;
  segmentModel = "Contests";
  items;
  credits;
  constructor(
    private platform: Platform,
    private router: Router,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
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

  async openEditModal() {
    this.editModal = await this.modalController.create({
      component: EditprofilemodalPage,
      backdropDismiss: true,
      componentProps: {
        contestID: this.contestID,
      },
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
    });
    return await this.editModal.present();
  }

  ionViewWillEnter() {
    this.sharedService.getUserDetail().then((res) => {
      this.userDetail = { ...res };
      console.log(this.userDetail);
      this.profileI =
        this.userDetail.profileImage || "../../assets/boostpost.png";
    },err=>{
      this.profileI = "../../assets/boostpost.png"
    });
    this.sourceParams = this.route.snapshot.queryParamMap.get("source");
    this.contestID = this.route.snapshot.queryParamMap.get("contestID");
    console.log("Source " + this.sourceParams);
    console.log("Contests " + this.contestID);

    if (this.sourceParams == "contests") {
      this.openEditModal();
    }
    this.initializeBackButtonCustomHandler();
  }
  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(
      999999,
      async () => {
        try {
          const element = await this.actionSheetController.getTop();
          if (element) {
            element.dismiss();
            return;
          }
        } catch (error) {}

        if (this.editModal) {
          this.editModal.dismiss();
          if (this.sourceParams == "contests") {
            this.router.navigate(["/cdescription", this.contestID]);
            return;
          }
        }
        this.router.navigate(["/tabs"]);
      }
    );
  }
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    if (this.editModal) {
      this.editModal.dismiss();
    }
    this.unsubscribeBackEvent.unsubscribe();
  }
  buttonClick() {}
  async onClick() {
    const modal = await this.modalController.create({
      component: EditprofilemodalPage,
      backdropDismiss: true,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
    });

    modal.onDidDismiss().then((res: any) => {
      if (res) {
        this.sharedService.getUserDetail().then((res) => {
          this.userDetail = { ...res };
          console.log(this.userDetail);
          this.profileI =
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
}
