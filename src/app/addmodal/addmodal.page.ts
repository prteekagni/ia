import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription, interval, timer, Observable } from 'rxjs';

@Component({
  selector: "app-addmodal",
  templateUrl: "./addmodal.page.html",
  styleUrls: ["./addmodal.page.scss"]
})
export class AddmodalPage implements OnInit {
  addTimer;
  timingSubs:Subscription;
  timeObs:Observable<number>;
  timeLeft:number = 10;
  minutes:number ;
  seconds:number;
  constructor(private modalController: ModalController) {
    // this.timeObs = timer(0,1000);
  }

  ngOnInit() {

  }

  closeImageModal(event) {
    this.modalController.dismiss();
  }

  watchAdsForCredit(){
    
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
