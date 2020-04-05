import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ActionSheetController,
  IonSlides,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClient } from "@angular/common/http";
import { ImagePicker } from "@ionic-native/image-picker/ngx";

import { ImagemodalPage } from "../imagemodal/imagemodal.page";
import { ImpageuploadPage } from "../impageupload/impageupload.page";
import { myEnterAnimation } from "../animations/enter";
import { myLeaveAnimation } from "../animations/leave";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Crop } from '@ionic-native/crop/ngx';

declare var window;

@Component({
  selector: "app-cdescription",
  templateUrl: "./cdescription.page.html",
  styleUrls: ["./cdescription.page.scss"],
})
export class CdescriptionPage implements OnInit {
  imgUrl = "";
  tempUrl;
  segment = 0;
  items;
  gallery;
  title;
  images: any = [];
  @ViewChild("slider", { static: true }) slider: IonSlides;

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
    private crop: Crop
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
    let data = this.route.snapshot.paramMap.get("data");
    console.log(data);
  }

  async goToTabBar() {
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
              .getPictures({ maximumImagesCount: 1, height: 300, width: 300 })
              .then((results) => {
                for (var i = 0; i < results.length; i++) {
                  console.log("Image URI: " + results[i]);
                  this.tempUrl = results[i];
                  this.crop.crop(this.tempUrl, { quality: 75 , targetWidth:300 , targetHeight: 300}).then(
                    (newImage) => console.log("new image path is: " + newImage),
                    (error) => console.error("Error cropping image", error)
                  );
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
      targetWidth: 300,
      targetHeight: 300,
      allowEdit: true,
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

    this.storage.getItem("myitem").then((res) => {
      images = res;
      console.log(res);
      if (images.length > 0) {
        images.push({ imageUrl: this.imgUrl });
        console.log(images);

        this.storage.setItem("myitem", images).then(
          (res) => console.log(res),
          (error) => console.error("Error storing item", error)
        );
      } else {
        this.storage.setItem("myitem", { imageUrl: this.imgUrl }).then(
          (res) => console.log(res),
          (error) => console.error("Error storing item", error)
        );
      }
    });

    //   let resolvedImageUrl;
    //  (<any>window).resolveLocalFileSystemURL(this.tempUrl, res => {
    //       res.file(resFile => {
    // resolvedImageUrl = resFile;
    //       })
    //     })
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
    });
    return await modal.present();
  }

  dismissPopover() {
    this.popoverController.dismiss();
  }
  async openMyimageModal() {
    const modal = await this.modalController.create({
      component: ImagemodalPage,
      backdropDismiss: true,
      cssClass: "image-modal",
      componentProps: {
        type: "userupload",
      },
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
    });
    modal.present();
  }
}
