import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagemodalPage } from 'src/app/imagemodal/imagemodal.page';
import { myEnterAnimation } from 'src/app/animations/enter';
import { myLeaveAnimation } from 'src/app/animations/leave';

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const images = [
  "bandit",
  "batmobile",
  "blues-brothers",
  "bueller",
  "delorean",
  "eleanor",
  "general-lee",
  "ghostbusters",
  "knight-rider",
  "mirth-mobile"
];
let rotateImg = 0;
@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"]
})
export class GalleryComponent implements OnInit {
  items: any[] = [];
  @Input() iswinner;
  @Input () imageUrl;

  boost:boolean = true;
  // gallery: string = "standard";
  // @ViewChild(IonInfiniteScroll, { static: true })
  // infiniteScroll: IonInfiniteScroll;

  constructor(private modalController: ModalController) {

    for (let i = 0; i < 25; i++) {
      this.items.push({
        name: i + " - " + images[rotateImg],
        imgSrc: this.getImgSrc(),
        avatarSrc: this.getImgSrc(),
        imgHeight: Math.floor(Math.random() * 50 + 150),
        content: lorem.substring(0, Math.random() * (lorem.length - 100) + 100)
      });

      rotateImg++;
      if (rotateImg === images.length) {
        rotateImg = 0;
      }
    }
  }
  getImgSrc() {
    const src =
      "https://dummyimage.com/600x400/${Math.round( Math.random() * 99999)}/fff.png";
    rotateImg++;
    if (rotateImg === images.length) {
      rotateImg = 0;
    }
    return src;
  }
  loadData(event) {
    setTimeout(() => {
      for (let i = 0; i < 25; i++) {
        this.items.push({
          name: i + " - " + images[rotateImg],
          imgSrc: this.getImgSrc(),
          avatarSrc: this.getImgSrc(),
          imgHeight: Math.floor(Math.random() * 50 + 150),
          content: lorem.substring(
            0,
            Math.random() * (lorem.length - 100) + 100
          )
        });

        rotateImg++;
        if (rotateImg === images.length) {
          rotateImg = 0;
        }
      }
      console.log("Done");
      event.target.complete();
      if (this.items.length == 75) {
        event.target.disabled = true;
      }
    }, 500);
  }
  async openimageModal() {
    if(!this.iswinner){
 const modal = await this.modalController.create({
   component: ImagemodalPage,
   backdropDismiss: true,
   cssClass: "image-modal",
   componentProps: {
     type: "alluploads",
   },


   enterAnimation: myEnterAnimation,
   leaveAnimation: myLeaveAnimation,
 });
    return await modal.present();
  }
    else {

    
    const modal = await this.modalController.create({
      componentProps: {
        iswinner: "true"
      },
      component: ImagemodalPage,
      backdropDismiss: true,
      cssClass: "winner-modal",
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });
    return await modal.present();
  }
  }
  ngOnInit() {
    console.log(this.iswinner);
    
  }
}

