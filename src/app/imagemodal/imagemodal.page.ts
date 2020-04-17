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
import { Subscription, timer } from 'rxjs';

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
  @ViewChild("myslides", { static: false }) slides: IonSlides;
  items;
  slideOptions;
  timeLeft = 3600000;
  timerS: Subscription;
  public displayvote: boolean = false;
  public displaysupervote: boolean = false;
  public displayboostpost: boolean = false;
  index;
  heartBtn: string = "start";
  minutes: number;
  seconds: number;
  findresult;
  localVotedData;
  ischanged:boolean = false;
  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController,
    private navParams: NavParams,
    private sharedService: SharedService,
    private alertController: AlertController
  ) {
    console.log("Type " + this.navParams.get("type"));
    this.items = this.navParams.get("data");
    this.index = this.navParams.get("index");
    this.slideOptions = {
      initialSlide: this.navParams.get("index"),
      speed: 400,
    };
  }

  ngOnInit() {
    // this.sharedService.clearVoteData();
    this.sharedService.getVoteData().then(
      (res: any) => {
this.localVotedData = res;
        console.log(this.items[this.navParams.get("index")].name);
         this.findresult =  res.find((x) => x.id === this.items[this.navParams.get("index")].name)
        console.log(this.findresult);
        if (this.findresult) {
          if (
            this.timeLeft - (new Date().getTime() - this.findresult.time) <=
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
    } 
      },
      (err) => {
        console.log(err);
      }
    );
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
      id: data.name,
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
      this.sharedService.presentToast("Your can revote after 1 hour", 3000);
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
 
  ionViewDidEnter() {}

  voted() {
    var dT = new Date().getTime() - this.findresult.time;
    console.log(dT);
    var timeleft = this.timeLeft - dT;
    console.log(timeleft);
    var seconds = Math.floor(((timeleft - timeleft / 60000) / 1000) % 60);
    var minutes = Math.floor(timeleft / 60000);
    console.log("Minutes" + Math.floor(timeleft / 60000));
    console.log("Seconds " + Math.floor((seconds / 1000) % 60));
    this.sharedService.presentToast(
      "You can revote after " + minutes + "m and " + seconds + "s",
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
  isChanged(data){
    if(this.timerS){
      this.timerS.unsubscribe();
    }
this.slides.getActiveIndex().then((res:any)=>{
 this.findresult = this.localVotedData.find(
   (x) => x.id === this.items[res].name
 );
 console.log(this.findresult);
  if (this.findresult) {
    if (this.timeLeft - (new Date().getTime() - this.findresult.time) <= 0) {
      this.isvoted = false;
      console.log("Time over");
    } else if (
      this.timeLeft - (new Date().getTime() - this.findresult.time) <=
      10000
    ) {
      console.log("Wihtin 10 seconds");
      this.timerS = timer(0, 1000).subscribe((res: any) => {
        var dt =
          this.timeLeft - (new Date().getTime() - this.findresult.time) - res;
        if (dt == 0) {
          this.isvoted = false;
          this.sharedService.presentToast("You can now revote", 3000);
          this.timerS.unsubscribe();
        }
      });
    } else {
      this.isvoted = true;
    }
  }else {
    this.isvoted = false;
  }
})


  }
  ionViewWillLeave() {}
}
