import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import {
  PopoverController,
  ModalController,
  NavParams,
  AlertController,
  IonSlides,
} from "@ionic/angular";
import { ImagefeedbackComponent } from "../components/imagefeedback/imagefeedback.component";
import { ForgotpasswordmodalPage } from "../forgotpasswordmodal/forgotpasswordmodal.page";
import {
  trigger,
  transition,
  query,
  style,
  animate,
  group,
  animateChild,
} from "@angular/animations";
import { SharedService } from "../api/shared/shared.service";
import { Subscription, timer } from "rxjs";
import { HttpClient } from "@angular/common/http";
declare var plugins;
@Component({
  selector: "app-imagemodal",
  templateUrl: "./imagemodal.page.html",
  styleUrls: ["./imagemodal.page.scss"],

  animations: [
    trigger("container", [
      transition(":enter", [
        style({ opacity: "0" }),
        group([
          animate("200ms ease-out", style({ opacity: "1" })),
          query("@badge, @message", [animateChild()]),
        ]),
      ]),
      transition(":leave", [
        group([
          animate("200ms ease-out", style({ opacity: "0" })),
          query("@badge, @message", [animateChild()]),
        ]),
      ]),
    ]),

    trigger("badge", [
      transition(":enter", [
        style({ transform: "translateY(100px)" }),
        animate("200ms ease-out", style({ transform: "translateY(0)" })),
      ]),
      transition(":leave", [
        animate("200ms ease-in", style({ transform: "translateY(100px)" })),
      ]),
    ]),

    trigger("message", [
      transition(":enter", [
        style({ opacity: "0" }),
        animate("5000ms 1000ms ease-out", style({ opacity: "1" })),
      ]),
      transition(":leave", [animate("500ms ease-in", style({ opacity: "0" }))]),
    ]),
  ],
})
export class ImagemodalPage implements OnInit {
  popup;
  @Input() iswinner;
  @Input() type;
  @ViewChild("inputElement", { static: false }) inputElement: ElementRef;
  isvoted: boolean = false;
  isboosted: boolean = false;
  @ViewChild("myslides", { read: IonSlides, static: false }) slides: IonSlides;
  items: any = [];
  slideOptions;
  timeLeft = 60;
  timerS: Subscription;
  public displayvote: boolean = false;
  public displaysupervote: boolean = false;
  public displayboostpost: boolean = false;
  index;
  heartBtn: string = "start";
  minutes: number;
  seconds: number;
  findresult;
  isstart: boolean = true;
  localVotedData;
  ischanged: boolean = false;
  pageInformation;
  pageSize;
  isend: boolean = false;
  totalPage;
  entryid;
  item;
  fistpageindex;
  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController,
    private navParams: NavParams,
    private sharedService: SharedService,
    private alertController: AlertController,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    // this.sharedService.clearVoteData();
    if (this.index !== 0) {
      this.isstart = true;
    }
    this.entryid = this.navParams.get("entryID");
  }

  ionViewWillEnter() {
    if (this.entryid) {
      this.httpClient
        .get("https://reqres.in/api/users/2")
        .subscribe((res: any) => {
          this.item = res.data;
        });
    } else {
      this.totalPage = this.navParams.get("data").totalPage;
      var index = this.navParams.get("index");
      this.pageSize =
        Math.ceil((index + 1) / 6) == 0 ? 1 : Math.ceil((index + 1) / 6);
      this.index = index % 6;
      var names = this.navParams.get("name");
      this.fistpageindex = this.pageSize;
      this.httpClient
        .get("https://reqres.in/api/users/?page=" + this.pageSize)
        .subscribe((res: any) => {
          this.items = res.data;
          this.totalPage = res.total_pages;
          this.pageSize = res.page;
          this.initSlides();
        });
    }
  }
  initSlides() {
    this.slides.update();
    this.slides.slideTo(this.index, 0, false);
    this.checkInLocalStorage(this.items[this.index].first_name).then((res:any)=>{
      this.isvoted = res;
    })
    this.slides.getActiveIndex().then((sres: any) => {
      if (sres == 0) {
        if (this.fistpageindex !== 1) this.appendData(this.fistpageindex);
        else this.isstart = false;
      } else if (sres == 5) {
        if (this.pageSize !== this.totalPage) {
          this.loadData(this.pageSize + 1);
        } else {
          this.isend = true;
        }
      }
      // if (
      //   sres == this.slideOptions.initialSlide &&
      //   sres == this.items.length - 1
      // ) {
      //   this.isend = true;
      // } else if (sres == 0) {
      //   this.isstart = false;
      // }
    });

    //  this.slides.isBeginning().then((beg:any)=>{
    //     if(beg){
    //       console.log("Slides intialize with first slide");
    //       if (this.fistpageindex !== 1) this.appendData(this.fistpageindex);
    //     }
    //   })
    // this.slides.isEnd().then((end:any)=>{
    //   if(end){
    //     console.log("Slides intialize with Last slide");
    //     if(this.pageSize == this.totalPage){
    //       this.loadData(this.pageSize+1);
    //     }
    //   }
    //   })

    this.slides.ionSlideNextEnd.subscribe((res: any) => {
      this.slideNext(false);
    });

    this.slides.ionSlidePrevEnd.subscribe((res: any) => {
      this.slidePrev(false);
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ImagefeedbackComponent,
      event: ev,
    });
    this.popup = popover;
    return await popover.present();
  }

  dismiss() {
    this.popup.dismiss();
  }

  closeImageModal(event) {
    this.modalController.dismiss();
  }

  async superVote() {
    const modal = await this.modalController.create({
      component: ForgotpasswordmodalPage,
      backdropDismiss: true,
      cssClass: "supervote-modal",
      componentProps: {
        mode: "SV",
      },
    });

    modal.onDidDismiss().then((data) => {
      let superVoteData = data["data"];
      if (superVoteData) {
        this.displaysupervote = true;
      }
    });
    setTimeout(() => {
      this.displaysupervote = false;
    }, 3000);
    return await modal.present();
  }
  async boostPhoto() {
    const modal = await this.modalController.create({
      component: ForgotpasswordmodalPage,
      backdropDismiss: true,
      cssClass: "boostpost-modal",
      componentProps: {
        mode: "BP",
      },
    });
    modal.onDidDismiss().then((data) => {
      let boostpost = data["data"];
      if (boostpost) {
        this.displayboostpost = true;
        this.sharedService.presentToast("Photo Boosted", 1000);
        localStorage.setItem("boostTime", JSON.stringify(new Date().getTime()));
      }
    });
    setTimeout(() => {
      this.displayboostpost = false;
    }, 3000);
    return await modal.present();
  }

  vote(data) {
    var time = new Date().getTime();
    var obj = {
      id: data.first_name,
      time: time,
    };
    this.heartBtn = this.heartBtn == "start" ? "end" : "start";
    console.log(this.heartBtn);
    this.sharedService.addVote(obj).then((res) => {
      this.localVotedData = res;
    });
    this.isvoted = !this.isvoted;
    this.displayvote = true;
    setTimeout(() => {
      this.displayvote = false;
    }, 900);
    if (this.isvoted) {
      this.sharedService.presentToast("Vote is submmited", 3000);
    }
   plugins.AdMob.interstitial.config({
     id: "ca-app-pub-3940256099942544/8691691433",
     autoShow: true,
     isTesting: true,
   });
 
  plugins.AdMob.interstitial.prepare().then((res:any)=>{
    console.log("Reponse formn prepare " + res);
    plugins.AdMob.interstitial.show().then((res:any)=>{
      console.log("Response form show " + res); 
    })
  })
  }

  shareApp() {
    this.sharedService.sharingToOther("1");
  }

  async deletePhoto() {
    const alert = await this.alertController.create({
      header: "Delete?",
      subHeader: "",
      message:
        "Do you want to delete your entry. Entry once deleted can not be restored?",
      buttons: [
        {
          text: "Delete",
          handler: () => {
            this.sharedService.presentToast("Entry Deleted.", 2000);
            this.modalController.dismiss();
          },
        },
        {
          text: "Cancel",
          handler: () => {
            console.log("Cancelled");
          },
        },
      ],
    });

    await alert.present();
  }

  isReachedEnd(data) {
    setTimeout(() => {
      for (let i = 0; i < 25; i++) {
        this.items.push(i);
        console.log(this.items[i]);
      }
    }, 500);
  }

  voted(data) {
    this.findresult = this.localVotedData.find((x) => x.id === data.first_name);
    var dT = new Date().getTime() - this.findresult.time;
    var timeleft = (this.timeLeft * 60 * 1000) - dT;
    if (timeleft >= 0) {
      var seconds = Math.floor(((timeleft - timeleft / 60000) / 1000) % 60);
      var minutes = Math.floor(timeleft / 60000);
    }
    this.sharedService.presentToast(
      "<strong>Vote can't be accepted.</strong></br>You can only vote after " +
        minutes +
        "m and " +
        seconds +
        "s",
      3000
    );
  }

  boostedPhoto() {
    var voteTime = +localStorage.getItem("boostTime");
    var dT = new Date().getTime() - voteTime;

    var timeleft = this.timeLeft - dT;

    var seconds = Math.floor(((timeleft - timeleft / 60000) / 1000) % 60);
    var minutes = Math.floor(timeleft / 60000);

    this.sharedService.presentToast(
      "You can boost after " + minutes + "m and " + seconds + "s",
      3000
    );
  }
  isChanged(data) {
    if (this.timerS) {
      this.timerS.unsubscribe();
    }
    this.slides.getActiveIndex().then((resp: any) => {
      this.sharedService.getVoteData().then(
        (res: any) => {
          this.localVotedData = res;
          if (this.localVotedData) {
            this.findresult = this.localVotedData.find(
              (x) => x.id === this.items[resp].name
            );

            if (this.findresult) {
              if (
                this.timeLeft - (new Date().getTime() - this.findresult.time) <=
                0
              ) {
                this.isvoted = false;
              } else if (
                this.timeLeft - (new Date().getTime() - this.findresult.time) <=
                10000
              ) {
                this.timerS = timer(0, 1000).subscribe((res: any) => {
                  var dt =
                    this.timeLeft -
                    (new Date().getTime() - this.findresult.time) -
                    res;
                  if (dt == 0) {
                    this.isvoted = false;
                    this.sharedService.presentToast("You can now revote", 3000);
                    this.timerS.unsubscribe();
                  }
                });
              } else {
                this.isvoted = true;
              }
            } else {
              this.isvoted = false;
            }
          } else {
            this.isvoted = true;
          }
        },
        (err) => {}
      );
    });
  }

  slideNext(data) {
    if (data) {
      this.slides.slideNext();
    } else {
      this.isstart = true;

      this.slides.getActiveIndex().then((index: number) => {
        this.checkInLocalStorage(this.items[index].first_name).then(
          (res: any) => {
            this.isvoted = res;
          }
        );
        this.slides.isEnd().then((res) => {
          if (res) {
            if (this.pageSize !== this.totalPage) {
              this.loadData(this.pageSize + 1);
            } else {
              this.isend = true;
              this.isstart = true;
            }
          }
        });
      });
    }
  }

  slidePrev(data) {
    if (data) {
      this.slides.slidePrev();
    } else {
      this.isend = false;
      this.slides.getActiveIndex().then((index: number) => {
        this.checkInLocalStorage(this.items[index].first_name).then(
          (res: any) => {
            this.isvoted = res;
          }
        );
        this.slides.isBeginning().then((res: any) => {
          if (res) {
            if (this.fistpageindex !== 1) {
              this.appendData(this.fistpageindex);
            } else {
              this.isstart = false;
            }
          }
        });
      });
    }
  }
  loadData(pageNumber) {
    if (pageNumber <= this.totalPage) {
      this.httpClient
        .get("https://reqres.in/api/users/?page=" + pageNumber)
        .subscribe((res: any) => {
          res.data.forEach((element) => {
            this.items.push(element);
          });
          this.slides.update().then((res: any) => {});
          this.totalPage = res.total_pages;
          this.pageSize = res.page;
        });
    }
  }
  appendData(pageIndex) {
    this.httpClient
      .get("https://reqres.in/api/users/?page=" + --pageIndex)
      .subscribe(
        (res: any) => {
          for (let index = res.data.length - 1; index >= 0; index--) {
            const element = res.data[index];
            this.items.unshift(element);
          }
          this.totalPage = res.total_pages;
          this.fistpageindex = res.page;
          this.slides.update();
          this.slides.slideTo(5, 0, false);
        },
        (err) => {}
      );
  }

  checkInLocalStorage(names) {
    return this.sharedService.getVoteData().then(
      (res: any) => {
        this.localVotedData = res;

        if (this.localVotedData) {
          this.findresult = this.localVotedData.find((x) => x.id === names);
        }
        if (this.findresult) {
          if (
            this.sharedService.getTimeDifference(
              this.findresult.time,
              this.timeLeft
            ) <= 0
          ) {
            this.sharedService.remoteVoteFromData(names);
            return false;
          } else if (
            this.sharedService.getTimeDifference(
              this.findresult.time,
              this.timeLeft
            ) <= 10000
          ) {
            this.timerS = timer(0, 1000).subscribe((res: any) => {
              var differenceFrom = new Date().getTime() - this.findresult.time;
              var dt = this.timeLeft - differenceFrom - res;
              if (dt <= 0) {
                this.sharedService.presentToast("You can now revote", 3000);
                this.timerS.unsubscribe();
                this.sharedService.remoteVoteFromData(this.findresult);
                return false;
              }
            });
          } else {
            return true;
          }
        } else {
          return false;
        }
      },
      (err) => {
        return false;
      }
    );
  }
}
