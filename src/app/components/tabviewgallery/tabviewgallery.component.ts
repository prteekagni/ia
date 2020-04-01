import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  selector: 'app-tabviewgallery',
  templateUrl: './tabviewgallery.component.html',
  styleUrls: ['./tabviewgallery.component.scss'],
})
export class TabviewgalleryComponent implements OnInit {
  items: any[] = [];
  @Input() iswinner:boolean;
  // gallery: string = "standard";
  // @ViewChild(IonInfiniteScroll, { static: true })
  // infiniteScroll: IonInfiniteScroll;

  constructor() { 
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

  ngOnInit() {}


}
