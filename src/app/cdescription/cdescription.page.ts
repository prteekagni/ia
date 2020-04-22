import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ActionSheetController,
  IonSlides,
  ModalController,
  PopoverController,
  Platform,
  AlertController,
  NavController,
} from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClient } from "@angular/common/http";
import { ImagePicker } from "@ionic-native/image-picker/ngx";

import { ImagemodalPage } from "../imagemodal/imagemodal.page";
import { ImpageuploadPage } from "../impageupload/impageupload.page";
import { myEnterAnimation } from "../animations/enter";
import { myLeaveAnimation } from "../animations/leave";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Crop } from "@ionic-native/crop/ngx";
import { Subscription } from "rxjs";
import { async } from "@angular/core/testing";
import { SharedService } from "../api/shared/shared.service";
import { User } from "../models/User";
import { fader } from "../animations/routeranimation";
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from "@angular/animations";

declare var window;

@Component({
  selector: "app-cdescription",
  templateUrl: "./cdescription.page.html",
  styleUrls: ["./cdescription.page.scss"],
  animations: [
    trigger("items", [
      transition(":enter", [
        style({ transform: "scale(0.5)", opacity: 0 }), // initial
        animate(
          "2s cubic-bezier(.8, -0.6, 0.2, 1.5)",
          keyframes([
            style({
              transform: "rotateX(-100deg)",
              "transform-origin": "top",
              opacity: 0,
            }),
            style({
              transform: "rotateX(0deg)",
              "transform-origin": "top",
              opacity: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class CdescriptionPage implements OnInit {
  imgUrl = "";
  tempUrl;
  segment = 0;
  items;
  gallery;
  title;
  images: any = [];
  imagemodal;
  userDetail: User;
  isdata;
  @ViewChild("slider", { static: true }) slider: IonSlides;
  tabvisible = true;
  public unsubscribeBackEvent: Subscription;

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    public http: HttpClient,
    public imagePicker: ImagePicker,
    private storage: NativeStorage,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private crop: Crop,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private sharedService: SharedService,
    private navCtrl: NavController
  ) {
    this.items = [
      { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
      { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
      { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
      { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
      { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
      { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
      { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
    ];
  }

  ngOnInit() {
    // this.route.paramMap()
    let contestID = this.route.snapshot.paramMap.get("id");
    let entryID = +this.route.snapshot.queryParamMap.get("entryId");
    if (entryID != 0) {
      this.openimageModal();
    }
    console.log("Contests ID is " + contestID);
    console.log("Entry ID is " + entryID);
  }

  ionViewWillEnter() {
    this.initializeBackButtonCustomHandler();
  }

  async goToTabBar() {
    this.sharedService.getUserDetail().then(async (res: User) => {
      console.log("Profile status" + res.isprofileCompleted);
      if (res.isprofileCompleted == true) {
        const actionSheet = await this.actionSheetController.create({
          header: "Select Image",
          buttons: [
            {
              text: "Camera",
              icon: "camera",
              handler: () => {
                this.openCamera("CAMERA");
              },
            },
            {
              text: "Gallery",
              icon: "arrow-dropright-circle",
              handler: () => {
                this.imagePicker
                  .getPictures({
                    maximumImagesCount: 1,
                    quality: 100,
                  })
                  .then((results) => {
                    for (var i = 0; i < results.length; i++) {
                      console.log("Image URI: " + results[i]);
                      this.tempUrl = results[i];
                      // this.crop
                      //   .crop(this.tempUrl, {
                      //     quality: 100,
                      //     targetWidth: 300,
                      //     targetHeight: 300,
                      //   })
                      //   .then(
                      //     (newImage) =>{
                      //       console.log("new image path is: " + newImage)
                      //     this.imgUrl = (<any>(
                      //       window
                      //     )).Ionic.WebView.convertFileSrc(newImage);
                      //     },
                      //     (error) =>
                      //       console.error("Error cropping image", error)
                      //   );
                      this.imgUrl = (<any>window).Ionic.WebView.convertFileSrc(
                        results[i]
                      );
                      console.log(this.imgUrl);

                      this.readimage();
                    }
                  });
                (err) => {
                  console.log(err);
                };
              },
            },
            {
              text: "Cancel",
              icon: "close",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              },
            },
          ],
        });
        await actionSheet.present();
      } else {
        this.presentAlertConfirm();
      }
    });
  }
  onClick() {
    this.router.navigate(["/enteries"]);
  }
  openCamera(source) {
    var srcType = "this.camera.PictureSourceType.SAVEDPHOTOALBUM";
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imgUrl = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      console.log(this.imgUrl);
      this.readimage();
    });
  }

  uploadImageToS3() {
    this.http
      .put(
        "https://testbucketforia.s3.ap-south-1.amazonaws.com/mytestimage.jpg?X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWQHHE5TFZQOXXHQ/20200219/ap-south-1/s3/aws4_request&X-Amz-Date=20200219T114842Z&X-Amz-SignedHeaders=host&X-Amz-Signature=fd9f14bc13a12f9e896812ee2badf2b31986412fcf31b47d329dd22d7769e365",
        "",
        {
          headers: {
            "Content-Type": "image/jpeg",
          },
        }
      )
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async readimage() {
    let images = [];

    // this.storage.getItem("myitem").then((res) => {
    //   images = res;
    //   console.log(res);
    //   if (images.length > 0) {
    //     images.push({ imageUrl: this.imgUrl });
    //     console.log(images);

    //     this.storage.setItem("myitem", images).then(
    //       (res) => console.log(res),
    //       (error) => console.error("Error storing item", error)
    //     );
    //   } else {
    //     this.storage.setItem("myitem", { imageUrl: this.imgUrl }).then(
    //       (res) => console.log(res),
    //       (error) => console.error("Error storing item", error)
    //     );
    //   }
    // });
    const modal = await this.modalController.create({
      component: ImpageuploadPage,
      backdropDismiss: true,
      cssClass: "imageupload-modal",
      componentProps: {
        imageUrl: this.imgUrl,
      },
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
    });
    return modal.present();
    // (<any>window).resolveLocalFileSystemURL(this.tempUrl, res => {
    //   res.file(resFile => {
    //     var reader = new FileReader();
    //     reader.readAsArrayBuffer(resFile);
    //     reader.onloadend = (evt: any) => {
    //       var imgBlob = new Blob([evt.target.result], { type: "image/jpeg" });
    //       console.log(imgBlob);
    //       this.http
    //         .put(
    //           "https://testbucketforia.s3.ap-south-1.amazonaws.com/mytestimage.jpg?X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWQHHE5TFZQOXXHQ/20200219/ap-south-1/s3/aws4_request&X-Amz-Date=20200219T155221Z&X-Amz-SignedHeaders=host&X-Amz-Signature=236453639b0a0df093c6e67092d2a3e459cebb8b04d3d7840b42323081697295",
    //           imgBlob,
    //           {
    //             headers: {
    //               "Content-Type": "image/jpeg"
    //             }
    //           }
    //         )
    //         .subscribe(
    //           (res: any) => {
    //             console.log(res);
    //           },
    //           err => {
    //             console.log(err);
    //           }
    //         );
    //     };
    //   });
    // });
  }
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
  async openimageModal() {
    const modal = await this.modalController.create({
      component: ImagemodalPage,
      backdropDismiss: true,
      cssClass: "image-modal",
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {
        type: "alluploads",
      },
    });
    return await modal.present();
  }

  dismissPopover() {
    this.popoverController.dismiss();
  }
  async openMyimageModal() {
    this.imagemodal = await this.modalController.create({
      component: ImagemodalPage,
      backdropDismiss: true,
      cssClass: "userupload-modal",
      componentProps: {
        type: "userupload",
      },
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
    });
    this.imagemodal.present();
  }
  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(
      999999,
      async () => {
        try {
          const element = await this.actionSheetCtrl.getTop();

          if (element) {
            element.dismiss();
            return;
          }
        } catch (error) {}

        try {
          const element = await this.modalController.getTop();
          if (element) {
            element.dismiss();
            return;
          }
        } catch (error) {}
        // this.navCtrl.navigateRoot("/tabs/tab1");
        this.router.navigate(["/tabs/tab1"]);
      }
    );
  }
  async ionViewWillLeave() {
    // Unregister the custom back button action for this page
    if (this.imagemodal) {
      this.imagemodal.dismiss();
    }
    try {
      const element = await this.alertController.getTop();
      if (element) {
        element.dismiss();
        return;
      }
    } catch (error) {}

    this.unsubscribeBackEvent.unsubscribe();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Complete Profile!",
      message: "It is required to deliver you the prizes if you won.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Complete Profile",
          handler: () => {
            this.router.navigate(["/tabs/tab3"], {
              queryParams: {
                source: "contests",
                contestID: "1",
              },
            });
            console.log("Confirm Okay");
          },
        },
      ],
    });

    await alert.present();
  }

  on1Click(data) {
    if (data.detail.index == 2) {
      console.log(data.detail.index);
      this.items = [
        { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
        { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
      ];
    } else if (data.detail.index == 1) {
      this.tabvisible = true;
    }
  }
}
