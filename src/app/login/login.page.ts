import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ForgotpasswordmodalPage } from '../forgotpasswordmodal/forgotpasswordmodal.page';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  modalcontro;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  createAccount() {
    this.router.navigate(["register"], { relativeTo: this.route.parent });
  }
  async forgotPassword() {
    const modal = await this.modalController.create({
      component: ForgotpasswordmodalPage,
      animated: true,
      cssClass: "my-modal"
    });
    this.modalcontro = modal;
    return await modal.present();
  }

  onDismiss() {
    this.modalcontro.dismiss();
  }
  login(){
    localStorage.setItem("Login", "true");
    this.router.navigate(["tabs"]);
  }
}
