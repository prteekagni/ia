import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SmsRetriever } from "@ionic-native/sms-retriever/ngx";
import { Router } from "@angular/router";
import { SharedService } from "../api/shared/shared.service";
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  modalcontro;
  Mobile;
  enterOTP: boolean = true;
  loginForm;
  OTP: string = "";
  showOTPInput: boolean = false;
  displaynumber;
  OTPmessage: string =
    "272258 is your OTP from Photo Rewards valid for 10 minutes. Please do not share it with anyone. L5mGcINS0z/";
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  appHashString;
  otptiming;
  otpinterval;
  isresendactive: boolean = true;
  unsubscribeBackEvent:Subscription;
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
  constructor(
    private fb: FormBuilder,
    private smsRetriever: SmsRetriever,
    private router: Router,
    private sharedService: SharedService,
    private platform : Platform
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
  next() {
    this.displaynumber = this.loginForm.value.Mobile;
    this.showOTPInput = true;
    this.showOTPInput;
    // this.start();
    this.timerMethod(5);
  }
  changeNumber() {
    this.backButton(true);
  }

  ngOnInit() {
    this.OTP = this.OTPmessage.slice(0, 6);
  }


  ionViewWillEnter() {
    this.initializeBackButtonCustomHandler();
  }

  backButton(data) {
    clearInterval(this.otpinterval);
    if (this.showOTPInput == data) this.showOTPInput = !this.showOTPInput;
    else {
      this.router.navigate(["login"]);
    }
  }

  verifyOTP() {
    this.sharedService.presentToast(
      "You are successfully registered",
      false,
      "top",
      1500
    );
    localStorage.setItem("Login", "true");
    this.router.navigate(["/tabs/tab1"], { replaceUrl: true });
  }

  timerMethod(seconds) {
    this.isresendactive = true;
    this.otptiming = seconds;
    this.otpinterval = setInterval(() => {
      console.log(this.otptiming);
      this.otptiming--;

      if (this.otptiming < 1) {
        clearInterval(this.otpinterval);
        this.isresendactive = false;
        this.sharedService.presentToast(
          "Resend OTP if not received",
          false,
          top,
          3000
        );
      }
    }, 1000);
  }

  resendOTP() {
    if (!this.isresendactive) {
      this.timerMethod(10);
    } else {
      this.sharedService.presentToast(
        "Wait for " + this.otptiming + "s",
        false,
        top,
        3000
      );
    }
  }
  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(
      999999,
      async () => {
          clearInterval(this.otpinterval);
        // this.router.navigate(["/tabs/enteries"]);
        // this.router.navigate(["/tabs/enteries"]);
        if(this.showOTPInput){
          this.showOTPInput = !this.showOTPInput;
        } else {
                this.router.navigate(["login"]);

        }
      }
    );
  }
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unsubscribeBackEvent.unsubscribe();
     clearInterval(this.otpinterval);
  }
}
