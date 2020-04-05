import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SmsRetriever } from "@ionic-native/sms-retriever/ngx";
import { Router } from '@angular/router';
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
  timer;
  OTP: string = "";
  showOTPInput: boolean = false;
  OTPmessage: string =
    "An OTP is sent to your number. You should receive it in 15 s";
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  appHashString;
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
    private router: Router
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
    console.log();

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
    this.showOTPInput;
    // this.start();
  }
  changeNumber() {
    // this.showOTPInput = false;
    //  this.smsRetriever.getAppHash()
    // .then((res: any) => {
    //   this.appHashString = res;
    //   console.log(res);
    // })
    // .catch((error: any) => console.error(error));
  }

  ngOnInit() {
    //  this.smsRetriever
    //    .startWatching()
    //    .then((res: any) => console.log(res))
    //    .catch((error: any) => console.error(error));
  }

  backButton() {
    this.showOTPInput = !this.showOTPInput;
  }

  verifyOTP() {
    localStorage.setItem("Login", "true");
    this.router.navigate(["tabs"]);
  }
}
