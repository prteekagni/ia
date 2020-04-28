import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Subscription, interval, timer, Observable } from "rxjs";
import { SharedService } from "../api/shared/shared.service";
import { fader } from "../animations/routeranimation";
declare var plugins;
@Component({
  selector: "app-addmodal",
  templateUrl: "./addmodal.page.html",
  styleUrls: ["./addmodal.page.scss"],
  animations: [fader],
})
export class AddmodalPage implements OnInit {
  addTimer;
  timingSubs: Subscription;
  timeObs: Observable<number>;
  timeLeft: number = 10;
  minutes: number;
  seconds: number;
  isloaded: boolean = false;
  credits;
  iscredited: boolean = false;

  constructor(
    private modalController: ModalController,
    private sharedService: SharedService
  ) {
    // this.timeObs = timer(0,1000);
  }

  ngOnInit() {
    document.addEventListener("admob.rewardvideo.events.LOAD", () => {
           this.sharedService.dismissLoadingController();
    });
    document.addEventListener("admob.rewardvideo.events.CLOSE", () => {
      if (this.iscredited) {
        setTimeout(() => {
          this.sharedService.presentToast(
            "10 Photo rewards added to your account",
            3000
          );
        }, 500);
      }
    });
    document.addEventListener("admob.rewardvideo.events.REWARD", () => {
      this.sharedService.getUserDetail().then((res: any) => {
        res.credits = res.credits + 10;
        this.sharedService.saveUserDetail(res).then(
          (res: any) => {
            this.credits = res.credits;
            this.iscredited = true;
          },
          (err) => {
            console.log(err);
            return err;
          }
        );
      });
    });
  }

  closeImageModal(event) {
    this.modalController.dismiss(this.credits);
  }

  watchAdsForCredit() {
    plugins.AdMob.rewardvideo.config({
      id: "ca-app-pub-3940256099942544/5224354917",
      isTesting: true,
      autoShow: true,
    });
    plugins.AdMob.rewardvideo.prepare().then(
      (res) => {
        console.log(res);
        this.sharedService.loadingControllerDisplay();
        plugins.AdMob.rewardvideo.show().then(
          (res) => {console.log("From Show" + res); this.sharedService.dismissLoadingController()},
          (err) => {console.log(err);
                    this.sharedService.dismissLoadingController();}
        );
      },
      (err) => console.log(err)
    );
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.isloaded = true;
    }, 1000);
  }

  ionViewDidLeave() {}
}
