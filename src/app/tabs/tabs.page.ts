import { Component } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClient } from '@angular/common/http';
import { ImpageuploadPage } from '../impageupload/impageupload.page';

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"]
})
export class TabsPage {
  imgUrl = "";
  tempUrl;
  constructor(
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    public imagePicker: ImagePicker,
    private http: HttpClient,
    private modalController: ModalController
  ) {}
  async onClick() {
    // const actionSheet = await this.actionSheetController.create({
    //   header: "Select Image",
    //   buttons: [
    //     {
    //       text: "Camera",
    //       icon: "camera",
    //       handler: () => {
    //         this.openCamera("CAMERA");
    //       }
    //     },
    //     {
    //       text: "Gallery",
    //       icon: "arrow-dropright-circle",
    //       handler: () => {
    //         this.imagePicker
    //           .getPictures({ maximumImagesCount: 1 })
    //           .then(results => {
    //             for (var i = 0; i < results.length; i++) {
    //               console.log("Image URI: " + results[i]);
    //               this.tempUrl = results[i];
    //               this.imgUrl = (<any>window).Ionic.WebView.convertFileSrc(
    //                 results[i]
    //               );
    //               this.readimage();
    //             }
    //           });
    //         err => {
    //           console.log(err);
    //         };
    //       }
    //     },
    //     {
    //       text: "Cancel",
    //       icon: "close",
    //       role: "cancel",
    //       handler: () => {
    //         console.log("Cancel clicked");
    //       }
    //     }
    //   ]
    // });
    // await actionSheet.present();

    const modal = await this.modalController.create({
      component: ImpageuploadPage,
      backdropDismiss: true,
      cssClass: "imageupload-modal "
    });
    return await modal.present();
  }
  openCamera(source) {
    var srcType = "this.camera.PictureSourceType.SAVEDPHOTOALBUM";
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true
    };

    this.camera.getPicture(options).then(imageData => {
      this.imgUrl = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      console.log(this.imgUrl);
    });
  }
  readimage() {
    (<any>window).resolveLocalFileSystemURL(this.tempUrl, res => {
      res.file(resFile => {
        var reader = new FileReader();
        reader.readAsArrayBuffer(resFile);
        reader.onloadend = (evt: any) => {
          var imgBlob = new Blob([evt.target.result], { type: "image/jpeg" });
          console.log(imgBlob);
          this.http
            .put(
              "https://testbucketforia.s3.ap-south-1.amazonaws.com/mytestimage.jpg?X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWQHHE5TFZQOXXHQ/20200219/ap-south-1/s3/aws4_request&X-Amz-Date=20200219T155221Z&X-Amz-SignedHeaders=host&X-Amz-Signature=236453639b0a0df093c6e67092d2a3e459cebb8b04d3d7840b42323081697295",
              imgBlob,
              {
                headers: {
                  "Content-Type": "image/jpeg"
                }
              }
            )
            .subscribe(
              (res: any) => {
                console.log(res);
              },
              err => {
                console.log(err);
              }
            );
        };
      });
    });
  }
}
