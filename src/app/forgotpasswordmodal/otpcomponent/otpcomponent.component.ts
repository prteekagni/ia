import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-otpcomponent",
  templateUrl: "./otpcomponent.component.html",
  styleUrls: ["./otpcomponent.component.scss"]
})
export class OtpcomponentComponent implements OnInit {
  otprequested: boolean = true;
  constructor() {}

  ngOnInit() {}
  requestOtp() {
    this.otprequested = !this.otprequested;
    console.log(this.otprequested);
  }
}
