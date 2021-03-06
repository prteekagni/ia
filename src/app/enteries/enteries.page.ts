import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

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
  selector: "app-enteries",
  templateUrl: "./enteries.page.html",
  styleUrls: ["./enteries.page.scss"]
})
export class EnteriesPage implements OnInit {
  items: any[] = [];
  gallery: string = "standard";
  @ViewChild(IonInfiniteScroll,{static:true}) infiniteScroll: IonInfiniteScroll;
  constructor() {
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

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    
  }
  ngOnInit() {}
}
