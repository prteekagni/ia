import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ModalController,
  ActionSheetController,
  Platform,
  IonDatetime,
  NavParams,
} from "@ionic/angular";
import { ForgotpasswordmodalPage } from "../forgotpasswordmodal/forgotpasswordmodal.page";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { Crop } from "@ionic-native/crop/ngx";
import { User } from "../models/User";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { SharedService } from "../api/shared/shared.service";

@Component({
  selector: "app-editprofilemodal",
  templateUrl: "./editprofilemodal.page.html",
  styleUrls: ["./editprofilemodal.page.scss"],
})
export class EditprofilemodalPage implements OnInit {
  modalcontro;
  tempUrl;
  imgUrl = "../../assets/camera.png";
  userDetail: User;
  unsubscribeBackEvent;
  profileForm;
  contestID;
  loggedVia;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private navParams: NavParams
  ) {
    this.userDetail = new User();
    this.contestID = this.navParams.get("contestID");
    // this.sharedService.getUserDetail().then(
    //   (res: any) => {
    //     this.userDetail = { ...res };
    //     this.imgUrl = this.userDetail.profileImage || "../../assets/boostpost.png";
    //     this.createProfileUpdateForm();
    //   },
    //   (err) => console.log(err)
    // );
    this.imgUrl = this.userDetail.profileImage || "../../assets/boostpost.png";
        this.createProfileUpdateForm();
  }

  ngOnInit() { }

  createAccount() {
    this.router.navigate(["register"], { relativeTo: this.route.parent });
  }
  async forgotPassword() {
    const modal = await this.modalController.create({
      component: ForgotpasswordmodalPage,
      animated: true,
      cssClass: "my-modal",
    });
    this.modalcontro = modal;
    return await modal.present();
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  uploadProfileImage() {
    this.imagePicker
      .getPictures({ maximumImagesCount: 1, height: 300, width: 300 })
      .then((results) => {
        for (var i = 0; i < results.length; i++) {
          console.log("Image URI: " + results[i]);
          this.tempUrl = results[i];
          this.crop
            .crop(this.tempUrl, {
              quality: 100,
              targetWidth: 300,
              targetHeight: 300,
            })
            .then(
              (newImage) => console.log("new image path is: " + newImage),
              (error) => console.error("Error cropping image", error)
            );
          this.imgUrl = (<any>window).Ionic.WebView.convertFileSrc(results[i]);
          localStorage.setItem("ProfileImage", this.imgUrl);
        }
      });
    (err) => {
      console.log(err);
    };
  }
  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(
      999999,
      async () => {
        if (this.modalController) {
          this.modalController.dismiss();
        }
        if (this.contestID) {
          this.router.navigate(["/cdescription", this.contestID]);
        }
      }
    );
  }
  ionViewWillEnter() {
    this.initializeBackButtonCustomHandler();
  }
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unsubscribeBackEvent.unsubscribe();
  }

  updateProfile(data) {
    this.userDetail = { ...this.profileForm.getRawValue() };
    this.userDetail.profileImage = this.imgUrl;
    this.userDetail.loggedVia = this.loggedVia;
    this.userDetail.isprofileCompleted = true;
    console.log(this.userDetail);
    this.sharedService.saveUserDetail(this.userDetail).then(
      (res: any) => {
        console.log("User data Saved" + res);
      },
      (err) => {
        console.log("User details not saved" + err);
      }
    );
    if (this.modalController) {
      this.modalController.dismiss(true);
    }
  }

  createProfileUpdateForm() {
    this.profileForm = this.formBuilder.group({
      displayName: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      phone: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
        ]),
      ],
      gender: [""],
      city: [""],
      username: [""],
      profileImage: [""],
      credits: [0],
    });

    this.profileForm.patchValue(this.userDetail);
    if (this.userDetail.loggedVia == "phone") {
        this.loggedVia = "phone";
      this.profileForm.get("phone").disable();
    } else if (this.userDetail.loggedVia == "email") {
      this.loggedVia = "email";
      this.profileForm.get("email").disable();
    }
  }
}
