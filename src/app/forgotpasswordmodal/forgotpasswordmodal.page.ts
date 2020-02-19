import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { ModalController } from '@ionic/angular';

@Component({
  selector: "app-forgotpasswordmodal",
  templateUrl: "./forgotpasswordmodal.page.html",
  styleUrls: ["./forgotpasswordmodal.page.scss"],
  // animations: [
  //   trigger("otpanimation", [
  //     transition(":enter", [
  //       query(":self", style({ transform: "translateY(-100%)" }), {
  //         optional: true
  //       }),
  //       query(":self", [
  //         animate("500ms", style({ transform: "translateY(0)" }))
  //       ])
  //     ])
  //   ]),
    // transition(":leave", [
    //   query(":self", style({ transform: "translateX(0)", opacity: 0 }), {
    //     optional: true
    //   }),
    //   query(
    //     ":self",
    //     stagger("0ms", [
    //       animate(
    //         "500ms",
    //         style({ transform: "translateX(+100%)", opacity: 1 })
    //       )
    //     ]),
    //     { optional: true }
    //   )
    // ])

    // trigger("forgotpasswordanimation", [
    //   transition(":enter", [
    //     query(":self", style({ transform: "translateY(+100%)", opacity: 0 }), {
    //       optional: true
    //     }),
    //     query(
    //       ":self",
    //       stagger("10ms", [
    //         animate("500ms", style({ transform: "translateY(0)", opacity: 1 }))
    //       ]),
    //       { optional: true }
    //     )
    //   ])
      // transition(":leave", [
      //   query(
      //     ":self",
      //     style({
      //       transform: "translateY(0)",
      //       opacity: 1
      //     }),
      //     {
      //       optional: true
      //     }
      //   ),
      //   query(
      //     ":self",
      //     stagger("0ms", [
      //       animate(
      //         "500ms",
      //         style({ transform: "translateY(1000px)", opacity: 0 })
      //       )
      //     ]),
      //     { optional: true }
      //   )
      // ])
  //   ])
  // ]
})
export class ForgotpasswordmodalPage implements OnInit {
  otprequested: boolean = false;
  currentModal = null;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  requestOtp() {
    this.otprequested = !this.otprequested;
  }
  // onAnimationEvent(data) {}

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
