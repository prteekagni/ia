import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
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
  "mirth-mobile",
];
let rotateImg = 0;
@Component({
  selector: "app-tabviewgallery",
  templateUrl: "./tabviewgallery.component.html",
  styleUrls: ["./tabviewgallery.component.scss"],
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
export class TabviewgalleryComponent implements OnInit {
  items;
  @Input() iswinner: boolean;
  // gallery: string = "standard";
  // @ViewChild(IonInfiniteScroll, { static: true })
  // infiniteScroll: IonInfiniteScroll;

  constructor() {
    setTimeout(() => {
      this.items = [
        {
          position: 1,
          name: "Background.jpg",
          weight: 1.0079,
          symbol: "Smiling Faces",
        },
        { position: 2, name: "makeup.jpg", weight: 1.0079, symbol: "Makeup" },
        { position: 3, name: "makeup.jpg", weight: 1.0079, symbol: "Makeup" },
      ];
    }, 3000);
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
          ),
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
