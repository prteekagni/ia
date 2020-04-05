import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: "app-forgotpasswordmodal",
  templateUrl: "./forgotpasswordmodal.page.html",
  styleUrls: ["./forgotpasswordmodal.page.scss"]
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
  @Input() mode;
  @Output() voted = new EventEmitter<boolean>();
  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}
  requestOtp() {
    this.otprequested = !this.otprequested;
  }
  // onAnimationEvent(data) {}

  dismissModal() {
    this.modalCtrl.dismiss(false);
  }

  register() {
    this.modalCtrl.dismiss();
    localStorage.setItem("Login", "true");
    this.router.navigate(["tabs"]);
  }

  superVote() {
     this.modalCtrl.dismiss(true);
  }
   boosPost() {
     this.modalCtrl.dismiss(true);
  }
}
