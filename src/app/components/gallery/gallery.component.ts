import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagemodalPage } from 'src/app/imagemodal/imagemodal.page';
import { myEnterAnimation } from 'src/app/animations/enter';
import { myLeaveAnimation } from 'src/app/animations/leave';
import { fader } from 'src/app/animations/routeranimation';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
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
export class GalleryComponent implements OnInit {
  items: any[] = [];
  @Input() iswinner;
  @Input() imageUrl;
  pageSize: number = 1;
  boost: boolean = true;
  pageInformation;
  constructor(
    private modalController: ModalController,
    private httpClient: HttpClient
  ) {
    this.httpClient
      .get("https://reqres.in/api/users/?page=" + this.pageSize)
      .subscribe((res: any) => {
        console.log(res);
        this.items = res.data;
        this.pageSize = res.page;
        this.pageInformation = {
          pageNumber: res.page,
          totalPage: res.total_pages,
        };
      });
  }

  loadData(event) {
    setTimeout(() => {
      this.httpClient
        .get("https://reqres.in/api/users/?page=" + ++this.pageSize)
        .subscribe((res: any) => {
          console.log(res);
          res.data.forEach((element) => {
            this.items.push(element);
          });
          this.pageInformation = {
            pageNumber: res.page,
            totalPage: res.total_pages,
          };
        });
      // for (let i = 0; i < 25; i++) {
      //   this.items.push({
      //     name: i + " - " + images[rotateImg],
      //     imgSrc: this.getImgSrc(),
      //     avatarSrc: this.getImgSrc(),
      //     imgHeight: Math.floor(Math.random() * 50 + 150),
      //     content: lorem.substring(
      //       0,
      //       Math.random() * (lorem.length - 100) + 100
      //     ),
      //   });

      //   rotateImg++;
      //   if (rotateImg === images.length) {
      //     rotateImg = 0;
      //   }
      // }
      // console.log("Done");
      // event.target.complete();
      // if (this.items.length == 75) {
      //   event.target.disabled = true;
      // }

      if (this.pageSize == this.pageInformation.totalPage) {
        event.target.disabled = true;
      } else {
        event.target.complete();
      }
    }, 500);
  }
  async openimageModal(data) {
    if (!this.iswinner) {
      const modal = await this.modalController.create({
        component: ImagemodalPage,
        backdropDismiss: true,
        cssClass: "image-modal",
        componentProps: {
          type: "alluploads",
          data: this.pageInformation,
          index: data,
          name: this.items[data].first_name,
        },

        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation,
      });
      return await modal.present();
    } else {
      const modal = await this.modalController.create({
        componentProps: {
          iswinner: "true",
        },
        component: ImagemodalPage,
        backdropDismiss: true,
        cssClass: "winner-modal",
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation,
      });
      return await modal.present();
    }
  }
  ngOnInit() {
    console.log(this.iswinner);
  }

  onClick(){
    console.log("btn clicked");
    
  }
}

