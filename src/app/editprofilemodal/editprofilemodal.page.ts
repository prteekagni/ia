import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ForgotpasswordmodalPage } from '../forgotpasswordmodal/forgotpasswordmodal.page';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';

@Component({
  selector: "app-editprofilemodal",
  templateUrl: "./editprofilemodal.page.html",
  styleUrls: ["./editprofilemodal.page.scss"],
})
export class EditprofilemodalPage implements OnInit {
  modalcontro;
  tempUrl;
  imgUrl = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private imagePicker: ImagePicker,
    private crop: Crop
  ) {}

  ngOnInit() {}

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
          
        }
      });
    (err) => {
      console.log(err);
    };
  }
}
