import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ForgotpasswordmodalPage } from '../forgotpasswordmodal/forgotpasswordmodal.page';
declare var SMSReceive: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  modalcontro;
  Mobile;
  enterOTP: boolean = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private toastCtrl: ToastController
  ) {}

  // ngOnInit() {}
  // createAccount() {
  //   this.router.navigate(["register"], { relativeTo: this.route.parent });
  // }
  // async forgotPassword() {
  //   const modal = await this.modalController.create({
  //     component: ForgotpasswordmodalPage,
  //     animated: true,
  //     cssClass: "my-modal"
  //   });
  //   this.modalcontro = modal;
  //   return await modal.present();
  // }

  // onDismiss() {
  //   this.modalcontro.dismiss();
  // }
  // login() {
  //   localStorage.setItem("Login", "true");
  //   this.router.navigate(["tabs"]);
  // }

  // async usePhone() {
  //   const modal = await this.modalController.create({
  //     component: ForgotpasswordmodalPage,
  //     componentProps: {
  //       mode: "register"
  //     },
  //     animated: true,
  //     cssClass: "my-modal"
  //   });
  //   this.modalcontro = modal;
  //   return await modal.present();
  // }

  // requestOTP(){
  //   this.enterOTP = !this.enterOTP;
  // }

  // submitOtp() {
  //   this.enterOTP = !this.enterOTP;
  // }
  OTP: string = "";
  showOTPInput: boolean = false;
  OTPmessage: string =
    "An OTP is sent to your number. You should receive it in 15 s";

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

  next() {
    this.showOTPInput = true;
    this.start();
  }

  start() {
    // this.processSMS(IncomingSMS);
    this.processSMS(
      "272258 is your OTP from HEALTH QUAD valid for 10 minutes. Please do not share it with anyone. vlH2Uu/03Cj"
    );
    // SMSReceive.startWatch(
    //   () => {
    //     console.log("watch started");
    //     document.addEventListener("onSMSArrive", (e: any) => {
    //       console.log("onSMSArrive()");
    //       var IncomingSMS = e.data;
    //       console.log("sms.address:" + IncomingSMS.address);
    //       console.log("sms.body:" + IncomingSMS.body);
    //       /* Debug received SMS content (JSON) */
    //       console.log(JSON.stringify(IncomingSMS));
    //       this.processSMS(IncomingSMS);
    //     });
    //   },
    //   () => {
    //     console.log("watch start failed");
    //   }
    // );
  }

  stop() {
    SMSReceive.stopWatch(
      () => {
        console.log("watch stopped");
          localStorage.setItem("Login", "true");
          this.router.navigate(["tabs"]);
      },
      () => {
        console.log("watch stop failed");
      }
    );
  }

  processSMS(data) {
    // Check SMS for a specific string sequence to identify it is you SMS
    // Design your SMS in a way so you can identify the OTP quickly i.e. first 6 letters
    // In this case, I am keeping the first 6 letters as OTP
    // const message = data.body;
    const message = data;
    console.log(message);
    this.OTP = data.slice(0, 6);
    if (message && message.indexOf("enappd_starters") != -1) {
      this.OTP = data.slice(0, 6);
      console.log(this.OTP);
      this.OTPmessage = "OTP received. Proceed to register";
      this.stop();
    }
  }

  register() {
    if (this.OTP != "") {
      this.presentToast("You are successfully registered", false, "top", 1500);
    } else {
      this.presentToast("Your OTP is not valid", false, "bottom", 1500);
    }

    localStorage.setItem("Login", "true");
    this.router.navigate(["tabs"]);
  }

  enterCode() {
    this.OTP = "";
  }

  callmethod() {
    console.log("Call Mehtod Clicked");
  }

  changeNumber() {
    this.showOTPInput = false;
  }

    enter(event,next,prev){
      console.log(event.target);
      
  console.log(event.detail.data);
  this.OTP = this.OTP + event.detail.data;
  console.log(this.OTP);
    }
}
