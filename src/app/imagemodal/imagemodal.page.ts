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
    constructor(
    private popoverController: PopoverController,
    private modalController: ModalController,
    private navParams: NavParams,
    private sharedService: SharedService,
    private alertController: AlertController,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    if (this.index !== 0) {
      this.isstart = true;
    }
     this.entryid = this.navParams.get("entryID");
     console.log(this.entryid);
  }

  ionViewWillEnter() {
    
    if (this.entryid) {
      console.log("From link");
      this.httpClient.get("https://reqres.in/api/users/2").subscribe((res:any)=>{
        console.log(res.data);
        this.item = res.data;
      });
    } else {
      this.totalPage = this.navParams.get("data").totalPage;
      var index = this.navParams.get("index");
      this.pageSize = Math.ceil(index / 6) == 0 ? 1 : Math.ceil(index / 6);
      this.index = index % 6;
      var names = this.navParams.get("name");
      console.log("This is pageSize " + this.pageSize);

      this.sharedService.getVoteData().then(
        (res: any) => {
          this.localVotedData = res;
          alert(JSON.stringify(this.localVotedData));
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
              this.isvoted = false;
              console.log("Time over");
              this.sharedService.remoteVoteFromData(names);
            } else if (
              this.sharedService.getTimeDifference(
                this.findresult.time,
                this.timeLeft
              ) <= 10000
            ) {
              console.log("Wihtin 10 seconds");
              this.timerS = timer(0, 1000).subscribe((res: any) => {
                var differenceFrom = new Date().getTime() - this.findresult.time;
                var dt = this.timeLeft - differenceFrom - res;
                if (dt <= 0) {
                  this.isvoted = false;
                  this.sharedService.presentToast("You can now revote", 3000);
                  this.timerS.unsubscribe();
                  this.sharedService.remoteVoteFromData(this.findresult);
                }
              });
            } else {
              this.isvoted = true;
            }
          } else {
            this.isvoted = false;
          }
        },
        (err) => {
          this.isvoted = false;
          console.log(JSON.stringify(err));
        }
      );
      this.httpClient
        .get("https://reqres.in/api/users/?page=" + this.pageSize)
        .subscribe((res: any) => {
          this.items = res.data;
          this.totalPage = res.total_pages;
          this.pageSize = res.page;
          this.slideOptions = {
            initialSlide: this.index,
            speed: 400,
            cubeEffect: {
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            },
            on: {
              beforeInit: function () {
                const swiper = this;
                swiper.classNames.push(
                  `${swiper.params.containerModifierClass}cube`
                );
                swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

                const overwriteParams = {
                  slidesPerView: 1,
                  slidesPerColumn: 1,
                  slidesPerGroup: 1,
                  watchSlidesProgress: true,
                  resistanceRatio: 0,
                  spaceBetween: 0,
                  centeredSlides: false,
                  virtualTranslate: true,
                };

                this.params = Object.assign(this.params, overwriteParams);
                this.originalParams = Object.assign(
                  this.originalParams,
                  overwriteParams
                );
              },
              setTranslate: function () {
                const swiper = this;
                const {
                  $el,
                  $wrapperEl,
                  slides,
                  width: swiperWidth,
                  height: swiperHeight,
                  rtlTranslate: rtl,
                  size: swiperSize,
                } = swiper;
                const params = swiper.params.cubeEffect;
                const isHorizontal = swiper.isHorizontal();
                const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                let wrapperRotate = 0;
                let $cubeShadowEl;
                if (params.shadow) {
                  if (isHorizontal) {
                    $cubeShadowEl = $wrapperEl.find(".swiper-cube-shadow");
                    if ($cubeShadowEl.length === 0) {
                      $cubeShadowEl = swiper.$(
                        '<div class="swiper-cube-shadow"></div>'
                      );
                      $wrapperEl.append($cubeShadowEl);
                    }
                    $cubeShadowEl.css({ height: `${swiperWidth}px` });
                  } else {
                    $cubeShadowEl = $el.find(".swiper-cube-shadow");
                    if ($cubeShadowEl.length === 0) {
                      $cubeShadowEl = swiper.$(
                        '<div class="swiper-cube-shadow"></div>'
                      );
                      $el.append($cubeShadowEl);
                    }
                  }
                }

                for (let i = 0; i < slides.length; i += 1) {
                  const $slideEl = slides.eq(i);
                  let slideIndex = i;
                  if (isVirtual) {
                    slideIndex = parseInt(
                      $slideEl.attr("data-swiper-slide-index"),
                      10
                    );
                  }
                  let slideAngle = slideIndex * 90;
                  let round = Math.floor(slideAngle / 360);
                  if (rtl) {
                    slideAngle = -slideAngle;
                    round = Math.floor(-slideAngle / 360);
                  }
                  const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
                  let tx = 0;
                  let ty = 0;
                  let tz = 0;
                  if (slideIndex % 4 === 0) {
                    tx = -round * 4 * swiperSize;
                    tz = 0;
                  } else if ((slideIndex - 1) % 4 === 0) {
                    tx = 0;
                    tz = -round * 4 * swiperSize;
                  } else if ((slideIndex - 2) % 4 === 0) {
                    tx = swiperSize + round * 4 * swiperSize;
                    tz = swiperSize;
                  } else if ((slideIndex - 3) % 4 === 0) {
                    tx = -swiperSize;
                    tz = 3 * swiperSize + swiperSize * 4 * round;
                  }
                  if (rtl) {
                    tx = -tx;
                  }

                  if (!isHorizontal) {
                    ty = tx;
                    tx = 0;
                  }

                  const transform$$1 = `rotateX(${
                    isHorizontal ? 0 : -slideAngle
                    }deg) rotateY(${
                    isHorizontal ? slideAngle : 0
                    }deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
                  if (progress <= 1 && progress > -1) {
                    wrapperRotate = slideIndex * 90 + progress * 90;
                    if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
                  }
                  $slideEl.transform(transform$$1);
                  if (params.slideShadows) {
                    // Set shadows
                    let shadowBefore = isHorizontal
                      ? $slideEl.find(".swiper-slide-shadow-left")
                      : $slideEl.find(".swiper-slide-shadow-top");
                    let shadowAfter = isHorizontal
                      ? $slideEl.find(".swiper-slide-shadow-right")
                      : $slideEl.find(".swiper-slide-shadow-bottom");
                    if (shadowBefore.length === 0) {
                      shadowBefore = swiper.$(
                        `<div class="swiper-slide-shadow-${
                        isHorizontal ? "left" : "top"
                        }"></div>`
                      );
                      $slideEl.append(shadowBefore);
                    }
                    if (shadowAfter.length === 0) {
                      shadowAfter = swiper.$(
                        `<div class="swiper-slide-shadow-${
                        isHorizontal ? "right" : "bottom"
                        }"></div>`
                      );
                      $slideEl.append(shadowAfter);
                    }
                    if (shadowBefore.length)
                      shadowBefore[0].style.opacity = Math.max(-progress, 0);
                    if (shadowAfter.length)
                      shadowAfter[0].style.opacity = Math.max(progress, 0);
                  }
                }
                $wrapperEl.css({
                  "-webkit-transform-origin": `50% 50% -${swiperSize / 2}px`,
                  "-moz-transform-origin": `50% 50% -${swiperSize / 2}px`,
                  "-ms-transform-origin": `50% 50% -${swiperSize / 2}px`,
                  "transform-origin": `50% 50% -${swiperSize / 2}px`,
                });

                if (params.shadow) {
                  if (isHorizontal) {
                    $cubeShadowEl.transform(
                      `translate3d(0px, ${
                      swiperWidth / 2 + params.shadowOffset
                      }px, ${
                      -swiperWidth / 2
                      }px) rotateX(90deg) rotateZ(0deg) scale(${
                      params.shadowScale
                      })`
                    );
                  } else {
                    const shadowAngle =
                      Math.abs(wrapperRotate) -
                      Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                    const multiplier =
                      1.5 -
                      (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2 +
                        Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2);
                    const scale1 = params.shadowScale;
                    const scale2 = params.shadowScale / multiplier;
                    const offset$$1 = params.shadowOffset;
                    $cubeShadowEl.transform(
                      `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${
                      swiperHeight / 2 + offset$$1
                      }px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`
                    );
                  }
                }

                const zFactor =
                  swiper.browser.isSafari || swiper.browser.isUiWebView
                    ? -swiperSize / 2
                    : 0;
                $wrapperEl.transform(
                  `translate3d(0px,0,${zFactor}px) rotateX(${
                  swiper.isHorizontal() ? 0 : wrapperRotate
                  }deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`
                );
              },
              setTransition: function (duration) {
                const swiper = this;
                const { $el, slides } = swiper;
                slides
                  .transition(duration)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(duration);
                if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
                  $el.find(".swiper-cube-shadow").transition(duration);
                }
              },
            },
          };
        });
           if (this.entryid !== 0) {
             this.slides.getActiveIndex().then((res: any) => {
               console.log(res);
               if (
                 res == this.slideOptions.initialSlide &&
                 res == this.items.length - 1
               ) {
                 this.isend = true;
               } else if (res == 0) {
                 this.isstart = false;
               }
             });

             this.slides.ionSlideNextEnd.subscribe((res: any) => {
               this.slideNext(false);
             });

             this.slides.ionSlidePrevEnd.subscribe((res: any) => {
               this.slidePrev(false);
             });
           }
    }
  }

  ionViewDidEnter() {
  //   if(this.entryid !==0){
  //   this.slides.getActiveIndex().then((res: any) => {
  //     console.log(res);
  //     if (
  //       res == this.slideOptions.initialSlide &&
  //       res == this.items.length - 1
  //     ) {
  //       this.isend = true;
  //     } else if (res == 0) {
  //       this.isstart = false;
  //     }
  //   });

  //   this.slides.ionSlideNextEnd.subscribe((res: any) => {
  //     this.slideNext(false);
  //   })

  //   this.slides.ionSlidePrevEnd.subscribe((res: any) => {
  //     this.slidePrev(false);
  //   });
  // }
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
      console.log("Set Timeout called");
      console.log(this.displaysupervote);
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
      console.log("Set Timeout called");
      console.log(this.displayboostpost);
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
    console.log(data);
    setTimeout(() => {
      for (let i = 0; i < 25; i++) {
        this.items.push(i);
        console.log(this.items[i]);
      }
      console.log("Done");
    }, 500);
  }

  voted(data) {
    this.findresult = this.localVotedData.find((x) => x.id === data.first_name);
    var dT = new Date().getTime() - this.findresult.time;
    console.log(dT);
    var timeleft = this.timeLeft - dT;
    if (timeleft >= 0) {
      var seconds = Math.floor(((timeleft - timeleft / 60000) / 1000) % 60);
      var minutes = Math.floor(timeleft / 60000);
    }
    console.log("Minutes" + Math.floor(timeleft / 60000));
    console.log("Seconds " + Math.floor((seconds / 1000) % 60));
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
    console.log(dT);
    var timeleft = this.timeLeft - dT;
    console.log(timeleft);
    var seconds = Math.floor(((timeleft - timeleft / 60000) / 1000) % 60);
    var minutes = Math.floor(timeleft / 60000);
    console.log("Minutes" + Math.floor(timeleft / 60000));
    console.log("Seconds " + Math.floor((seconds / 1000) % 60));
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
            console.log(this.findresult);
            if (this.findresult) {
              if (
                this.timeLeft - (new Date().getTime() - this.findresult.time) <=
                0
              ) {
                this.isvoted = false;
                console.log("Time over");
              } else if (
                this.timeLeft - (new Date().getTime() - this.findresult.time) <=
                10000
              ) {
                console.log("Wihtin 10 seconds");
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
        (err) => {
          console.log(err);
        }
      );
    });
  }


  slideNext(data) {
    if (data) {
      console.log("Slide method is called");
      this.slides.slideNext()
    } else {
      this.slides.getActiveIndex().then((index: number) => {
        console.log(this.items[index].first_name);
        this.sharedService.getVoteData().then(
          (res: any) => {
            this.localVotedData = res;
            alert(JSON.stringify(this.localVotedData));
            if (this.localVotedData) {
              this.findresult = this.localVotedData.find(
                (x) => x.id === this.items[index].first_name
              );
            }
            if (this.findresult) {
              if (
                this.sharedService.getTimeDifference(
                  this.findresult.time,
                  this.timeLeft) <=
                0
              ) {
                this.isvoted = false;
                console.log("Time over");
                this.sharedService.remoteVoteFromData(
                  this.items[index].first_name
                );

              } else if (
                this.sharedService.getTimeDifference(
                  this.findresult.time,
                  this.timeLeft
                ) <= 10000
              ) {
                console.log("Wihtin 10 seconds");
                this.timerS = timer(0, 1000).subscribe((res: any) => {
                  var dt =
                    this.timeLeft -
                    (new Date().getTime() - this.findresult.time) -
                    res;
                  if (dt == 0) {
                    this.isvoted = false;
                    this.sharedService.remoteVoteFromData(
                      this.items[index].first_name
                    );
                    this.sharedService.presentToast(
                      "You can now revote",
                      3000
                    );
                    this.timerS.unsubscribe();
                  }
                });
              } else {
                this.isvoted = true;
              }
            } else {
              this.isvoted = false;
            }
          },
          (err) => {
            this.isvoted = false;
            console.log(JSON.stringify(err));
          }
        );
      })
      this.slides.isEnd().then((res: any) => {
        if (res) {
          if (this.pageSize !== this.totalPage) {
            this.httpClient
              .get("https://reqres.in/api/users/?page=" + (this.pageSize + 1))
              .subscribe((res: any) => {
                console.log(this.items);
                res.data.forEach((element) => {
                  this.items.push(element);
                });
                this.slides.update().then((res: any) => {
                  console.log(res);
                });
                this.totalPage = res.total_pages;
                this.pageSize = res.page;
              });
          } else {
            this.isend = true;
            this.isstart = true;
          }
        } else {
          this.isstart = true;
        }
      });
    }
  }

  slidePrev(data) {
    if (data) {
      this.slides.slidePrev();
    } else {
      this.slides.getActiveIndex().then((index: number) => {
        console.log(this.items[index].first_name);
        this.sharedService.getVoteData().then(
          (res: any) => {
            this.localVotedData = res;
            alert(JSON.stringify(this.localVotedData));
            if (this.localVotedData) {
              this.findresult = this.localVotedData.find(
                (x) => x.id === this.items[index].first_name
              );
            }
            if (this.findresult) {
              if (
                this.timeLeft -
                (new Date().getTime() - this.findresult.time) <=
                0
              ) {
                this.isvoted = false;
                console.log("Time over");
              } else if (
                this.timeLeft -
                (new Date().getTime() - this.findresult.time) <=
                10000
              ) {
                console.log("Wihtin 10 seconds");
                this.timerS = timer(0, 1000).subscribe((res: any) => {
                  var dt =
                    this.timeLeft -
                    (new Date().getTime() - this.findresult.time) -
                    res;
                  if (dt == 0) {
                    this.isvoted = false;
                    this.sharedService.presentToast(
                      "You can now revote",
                      3000
                    );
                    this.timerS.unsubscribe();
                  }
                });
              } else {
                this.isvoted = true;
              }
            } else {
              this.isvoted = false;
            }
          },
          (err) => {
            this.isvoted = false;
            console.log(JSON.stringify(err));
          }
        );
      });
      this.slides.isBeginning().then((res: any) => {
        if (res) {
          if (this.pageSize == 1) {
            this.sharedService.presentToast("This is the first slide.", 2000);
            // this.isstart = false;
          } else {
            const one = new Promise<any>((resolve, reject) => {
              this.httpClient
                .get("https://reqres.in/api/users/?page=" + (this.pageSize - 1))
                .subscribe(
                  (res: any) => {
                    console.log(res);
                    console.log(this.items);
                    for (let index = res.data.length - 1; index >= 0; index--) {
                      const element = res.data[index];
                      this.items.unshift(element);
                    }
                    this.totalPage = res.total_pages;
                    this.pageSize = res.page;
                    resolve("completed");
                  },
                  (err) => {
                    reject("rejected");
                  }
                );
            });
            one.then((res: any) => {
              console.log(res);
              this.slides.slideTo(5, 0, false).then((res: any) => {
                console.log(res);
              });
            });
          }
        } else {
          if (data) this.slides.slidePrev();
          this.isstart = true;
          this.isend = false;
        }
      });
    }

  }

  isStart(data) {
    console.log("This is start");
    if (this.pageSize == 1) {
      this.isstart = false;
    }
  }
 
  isEnd(data) {
    if (this.pageSize == this.totalPage) {
      this.isend = true;
      this.isstart = true;
    }
    console.log("Slide is at the end");

    //   if (this.pageSize == this.totalPage && this.index == 5) {
    //     this.sharedService.presentToast("You have reached an end", 1500);
    //     this.isend = true;
    //   } else if (this.pageSize !== this.totalPage) {
    //     this.httpClient
    //       .get("https://reqres.in/api/users/?page=" + ++this.pageSize)
    //       .subscribe((res: any) => {
    //         console.log(this.items);
    //         res.data.forEach((element) => {
    //           this.items.push(element);
    //         });
    //         this.slides.update().then((res: any) => {
    //           console.log(res);
    //         });
    //         this.totalPage = res.total_pages;
    //         this.pageSize = res.page;
    //       });
    //   }
    // }
  }
}
