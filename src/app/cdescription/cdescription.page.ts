import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ActionSheetController, IonSlides, ModalController, PopoverController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClient } from "@angular/common/http";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { Base64 } from "@ionic-native/base64/ngx";
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
declare var window;

@Component({
  selector: "app-cdescription",
  templateUrl: "./cdescription.page.html",
  styleUrls: ["./cdescription.page.scss"]
})
export class CdescriptionPage implements OnInit {
  imgUrl = "";
  tempUrl;
  segment = 0;
  items;
  gallery;
  title;
  @ViewChild("slider", { static: true }) slider: IonSlides;
  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    public http: HttpClient,
    public imagePicker: ImagePicker,
    private base64: Base64,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private route:ActivatedRoute
  ) {
    this.items = [
      { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
      { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
      { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
      { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
      { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
      { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
      { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" }
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
          }
        },
        {
          text: "Gallery",
          icon: "arrow-dropright-circle",
          handler: () => {
            this.imagePicker
              .getPictures({ maximumImagesCount: 1 })
              .then(results => {
                for (var i = 0; i < results.length; i++) {
                  console.log("Image URI: " + results[i]);
                  this.tempUrl = results[i];
                  this.imgUrl = (<any>window).Ionic.WebView.convertFileSrc(
                    results[i]
                  );
                  this.readimage();
                }
              });
            err => {
              console.log(err);
            };
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

  uploadImageToS3() {
    this.http
      .put(
        "https://testbucketforia.s3.ap-south-1.amazonaws.com/mytestimage.jpg?X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWQHHE5TFZQOXXHQ/20200219/ap-south-1/s3/aws4_request&X-Amz-Date=20200219T114842Z&X-Amz-SignedHeaders=host&X-Amz-Signature=fd9f14bc13a12f9e896812ee2badf2b31986412fcf31b47d329dd22d7769e365",
        "",
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
      cssClass: "image-modal"
    });
    return await modal.present();
  }

  dismissPopover() {
    this.popoverController.dismiss();
  }
}
