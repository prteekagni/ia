import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ModalController,
  ToastController,
  NavController,
  Platform,
} from "@ionic/angular";
import { Validators, FormBuilder } from "@angular/forms";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
declare var SMSReceive: any;
import { User } from "../models/User";
import { SharedService } from '../api/shared/shared.service';
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
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
      height: "50px",
    },
  };
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  isValidFormSubmitted = false;
  userData: User;
  objData: User;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private GooglePlus: GooglePlus ,
    private sharedService : SharedService,
    private platform: Platform
  ) {
    this.loginForm = this.fb.group({
      Mobile: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.mobNumberPattern),
        ]),
      ],
    });
  }

  ionViewWillEnter() {
    this.timer = 10;
    this.userData = new User();
    
      this.sharedService.getUserDetail().then(
        (res: any) => {
          this.userData = { ...res };
        },
        (err) => {
          console.log("No User detail found " + err);
        }
      );
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.timer = 10;
    // this.userData  = new User();
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration,
    });
    toast.present();
  }

  next(data) {
    console.log(data);

    var IntervalVar = setInterval(
      function () {
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
      "272258 is your OTP from Photo Rewards valid for 10 minutes. Please do not share it with anyone. L5mGcINS0z/"
    );
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

  loginWithGoogle() {
        var loggedVia = "email";
        // if (this.userData.email !== null) {
        //   console.log(this.userData);
        //   // this.userData.phone = this.loginForm.get("phone").value;
        //   this.userData.loggedVia = loggedVia;
        // } else {
        //   this.userData = { ...this.loginForm.value };
        //   this.userData.loggedVia = loggedVia;
        //   this.userData.isprofileCompleted = false;
        // }

  
this.sharedService.loadingControllerDisplay();
    this.GooglePlus.login({})
      .then((res:any) => {
        if (res.email == this.userData.email && this.userData.loggedVia == "email") {
          this.userData.email = res.email;
          this.userData.loggedVia = "email";
          console.log(this.userData);
          this.sharedService.setLoginStatus();
          this.userData.loggedVia = loggedVia;
          this.sharedService.saveUserDetail(this.userData).then(
            (res) => console.log(res),
            (err) => console.log(err)
          );
          this.sharedService.dismissLoadingController();
          this.router.navigate(["/tabs/tab1"], { replaceUrl: true });
        } else {
          // this.userData = { ...res };
          this.userData = new User();
          this.userData.displayName = res.displayName;
          this.userData.email = res.email;
          this.userData.loggedVia = "email";
          this.userData.isprofileCompleted = false;
          this.userData.credits = 0;
          this.sharedService.setLoginStatus();
          this.sharedService.saveUserDetail(this.userData).then(
            (res) => console.log(res),
            (err) => console.log(err)
          );
          this.sharedService.dismissLoadingController();

          this.router.navigate(["/tabs/tab1"], { replaceUrl: true });
        }
      
      })
      .catch((err) => console.error(err));
  }

  async loginWithNumber() {
    this.router.navigate(["register"]);
  }
}
