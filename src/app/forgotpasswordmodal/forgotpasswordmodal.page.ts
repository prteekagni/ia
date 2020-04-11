import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
  keyframes,
} from "@angular/animations";
import { ModalController } from "@ionic/angular";
import { Router } from "@angular/router";
import { SharedService } from '../api/shared/shared.service';

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
  @Input() mode;
  @Output() voted = new EventEmitter<boolean>();
  userPRC;
  constructor(private modalCtrl: ModalController, private router: Router , private sharedService : SharedService) {}

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
    this.sharedService.getUserDetail().then((res:any)=>{
      this.userPRC = res.credits;
      if(this.userPRC >= 20){
      this.modalCtrl.dismiss(true);
      } else{
            this.sharedService.presentToast(
              "Not enough credits avaliable. You need "+ "<strong>" + Math.abs(this.userPRC-20) + "</strong>"+ " credits more to super vote. Please watch an add and collect credits to your account.",4000
            );

      }
    })
  }
  boosPost() {
        this.sharedService.getUserDetail().then((res: any) => {
          this.userPRC = res.credits;
          if (this.userPRC >= 30) {
              this.modalCtrl.dismiss(true);
          }
          else {
            this.sharedService.presentToast(
              "Not enough credits avaliable. You need " +
                "<strong>" +
                Math.abs(this.userPRC - 30) +
                "</strong>" +
                " credits more to boost your post. Please watch an add and collect credits to your account.",4000
            );
          }
        });
  }
}
