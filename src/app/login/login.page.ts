import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Validators, FormBuilder } from '@angular/forms';

declare var SMSReceive: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage {
  modalcontro;
  Mobile;
  enterOTP: boolean = true;
  loginForm;
  timer;
  OTP: string = "";
  showOTPInput: boolean = false;
  OTPmessage: string =
    "An OTP is sent to your number. You should receive it in 15 s";
  @ViewChild("ngOtpInput", { static: true }) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "50px",
      height: "50px"
    }
  };
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  // mobNumberPattern = "/^([+]d{2}[ ])?d{10}$/";
  isValidFormSubmitted = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private fb: FormBuilder
  ) {
    console.log(this.ngOtpInput);
    this.loginForm = this.fb.group({
      Mobile: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.mobNumberPattern)
        ])
      ]
    });
  }

  ionViewWillEnter() {
    this.timer = 10;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.timer = 10;
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

  next(data) {
    console.log(data);

    var IntervalVar = setInterval(
      function() {
        this.timer--;

        if (this.timer === 0) {
          clearInterval(IntervalVar);
        }
      }.bind(this),
      1000
    );
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
    this.OTP = data.slice(0, 6);
    setTimeout(() => {
      this.ngOtpInput.setValue(this.OTP);
      this.register();
    }, 3000);
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
    this.showOTPInput = false;
    localStorage.setItem("Login", "true");
    this.router.navigate(["tabs"]);
  }

  changeNumber() {
    this.showOTPInput = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.showOTPInput = false;
    this.timer = 10;
  }

  ionViewWillLeave() {
    this.timer = 10;
  }

  onOtpChange(data) {
    console.log(data);
  }

  goBack() {
    this.timer = 10;
    this.showOTPInput = false;
  }
}
