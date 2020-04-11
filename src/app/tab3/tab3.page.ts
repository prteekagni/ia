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
  userDetail;
  profileI;
  constructor(
    private platform: Platform,
    private router: Router,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {}

  async openEditModal() {
    this.editModal = await this.modalController.create({
      component: EditprofilemodalPage,
      backdropDismiss: true,
      componentProps: {
        contestID: this.contestID,
      },
    });
    return await this.editModal.present();
  }

  ionViewWillEnter() {
    this.sharedService.getUserDetail().then((res) => {
      this.userDetail = { ...res };
      console.log(this.userDetail);
      this.profileI = this.userDetail.profileImage || "../../assets/boostpost.png";
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
}
