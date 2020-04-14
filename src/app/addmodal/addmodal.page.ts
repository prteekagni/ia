import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Subscription, interval, timer, Observable } from "rxjs";
import { SharedService } from "../api/shared/shared.service";

@Component({
  selector: "app-addmodal",
  templateUrl: "./addmodal.page.html",
  styleUrls: ["./addmodal.page.scss"],
})
export class AddmodalPage implements OnInit {
  addTimer;
  timingSubs: Subscription;
  timeObs: Observable<number>;
  timeLeft: number = 10;
  minutes: number;
  seconds: number;
  constructor(
    private modalController: ModalController,
    private sharedService: SharedService
  ) {
    // this.timeObs = timer(0,1000);
  }

  ngOnInit() {}

  closeImageModal(event) {
    this.modalController.dismiss();
  }

  watchAdsForCredit() {
     this.sharedService.getUserDetail().then((res: any) => {
       //  alert("Current Credit " + res.credits);
       res.credits = res.credits + 10;
       this.sharedService.saveUserDetail(res).then(
         (res: any) => {
           // alert("Updated Credit avaliable " + res.credits);
           console.log(res.credits);
          this.sharedService.presentToast(
            "10 Photo rewards added to your account",
            2000
          );
          this.modalController.dismiss(res.credits);
         },
         (err) => {
           console.log(err);
           return err;
         }
       );
     });
    // this.sharedService.addCredits(10).then((res: any) => {
    //   console.log(res);
    //   this.sharedService.presentToast("10 Photo rewards added to your account", 2000);
    //   this.modalController.dismiss();
    // },err=>{
    //   console.log(err);
    // });

  }

  ionViewWillEnter() {
    //     this.timingSubs = this.timeObs.subscribe((res:any)=>{
    //       var timeleft = (this.timeLeft * 60 ) - res;
    //       console.log(timeleft);
    //       this.minutes = Math.floor(timeleft/60);
    //       this.seconds = Math.floor(timeleft - Math.floor(timeleft / 60) * 60);
    // console.log(Math.floor(timeleft / 60));
    // console.log()
    //     })
  }

  ionViewDidLeave() {
    // this.timingSubs.unsubscribe();
  }
}
