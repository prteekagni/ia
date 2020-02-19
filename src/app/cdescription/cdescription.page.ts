import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: "app-cdescription",
  templateUrl: "./cdescription.page.html",
  styleUrls: ["./cdescription.page.scss"]
})
export class CdescriptionPage implements OnInit {
  imgUrl = "";
  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    public http: HttpClient
  ) {}

  ngOnInit() {}

  async goToTabBar() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image",
      buttons: [
        {
          text: "Camera",
          icon: "camera",
          handler: () => {
            this.openCamera("CAMERA");
          }
        },
        {
          text: "Gallery",
          icon: "arrow-dropright-circle",
          handler: () => {
            this.openCamera("PHOTOLIBRARY");
          }
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }
  onClick() {
    this.router.navigate(["/enteries"]);
  }
  openCamera(source) {
    var srcType = "this.camera.PictureSourceType.SAVEDPHOTOALBUM";
    // var options = this.setOptions(srcType);
    // var func = createNewFileEntry;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        // let base64Image = "data:image/jpeg;base64," + imageData;
        this.imgUrl = (<any>window).Ionic.WebView.convertFileSrc(imageData);

      //   this.http
      //     .put(
      //       "https://testbucketforia.s3.ap-south-1.amazonaws.com/mytestimage.jpg?X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWQHHE5TFZQOXXHQ/20200218/ap-south-1/s3/aws4_request&X-Amz-Date=20200218T131507Z&X-Amz-SignedHeaders=host&X-Amz-Signature=7f54909ed7f1c423cbff1125afbf8ecf619e7d9680ae98334be0968be3313b67",
      //       this.imgUrl,
      //       { headers: { "Content-Type": "image/jpeg" } }
      //     )
      //     .subscribe(
      //       (res: any) => {
      //         console.log(res);
      //       },
      //       err => {
      //         console.log(err);
      //       }
      //     );
      //   // console.log(base64Image);
      },
      err => {
        // Handle error
      }
    );
  }
  // setOptions(srcType) {
  //   var options = {
  //     // Some common settings are 20, 50, and 100
  //     quality: 50,
  //     destinationType: Camera.DestinationType.FILE_URI,
  //     // In this app, dynamically set the picture source, Camera or photo gallery
  //     sourceType: srcType,
  //     encodingType: Camera.EncodingType.JPEG,
  //     mediaType: Camera.MediaType.PICTURE,
  //     allowEdit: true,
  //     correctOrientation: true
  //   };
  //   return options;
  // }
}
