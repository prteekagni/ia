import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ForgotpasswordmodalPage } from '../forgotpasswordmodal/forgotpasswordmodal.page';
import { ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from '../api/shared/shared.service';
import { stepper } from '../animations/routeranimation';
import { DomSanitizer } from '@angular/platform-browser';



const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
  }),
};
@Component({
  selector: "app-impageupload",
  templateUrl: "./impageupload.page.html",
  styleUrls: ["./impageupload.page.scss"],
  animations: [stepper],
})
export class ImpageuploadPage implements OnInit {
  @Input()imageUrl;
  transform: ImageTransform = {};
  canvasRotation = 0;
  rotation = 0;
  imagenotcropped: boolean = false;
  isloaded;
  @ViewChild(ImageCropperComponent, { static: false })
  angularComponent: ImageCropperComponent;
  isnotloaded: boolean = false;
  constructor(
    private modalController: ModalController,
    private sharedService: SharedService,
    private navParams: NavParams
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    var imagerl = this.navParams.get("imageUrl");
    console.log(imagerl);
    // this.imageUrl = imagerl;
  }
  closeModal() {}
  goToTabBar() {}
  async bostPost() {
    const modal = await this.modalController.create({
      component: ForgotpasswordmodalPage,
      backdropDismiss: true,
      cssClass: "boostpost-modal",
      componentProps: {
        mode: "BP",
      },
    });
    return await modal.present();
  }
  imageChangedEvent: any = "";
  croppedImage: any = "";

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.dataURItoBlob(this.croppedImage);
  }
  dataURItoBlob(b64Data) {
    // convert base64 to raw binary data held in a string

    let contentType = "";
    let sliceSize = 512;

    b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, "");

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, { type: contentType });
    // console.log(blob);
    return blob;
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
    // this.cropper.imageURL = "../../assets/123.png";
  }
  loadImageFailed() {
    // show message
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  upload() {
    var imgBlob = this.dataURItoBlob(this.croppedImage);
    this.sharedService.uploadToS3(imgBlob, "url");
  }

  cropImage(event: ImageCroppedEvent) {
    this.imagenotcropped = false;
    this.croppedImage = this.angularComponent.crop().base64;
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
