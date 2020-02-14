import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ForgotpasswordmodalPage } from 'src/app/forgotpasswordmodal/forgotpasswordmodal.page';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor( private router: Router , private route:ActivatedRoute , private modalController: ModalController) { }

  ngOnInit() {}

  createAccount(){
    this.router.navigate(["register"], { relativeTo: this.route.parent });
  }
  async forgotPassword(){
    const modal = await this.modalController.create(
      {
        component:ForgotpasswordmodalPage,
        
        cssClass:"my-modal"
      }
    );
      return await modal.present();
  }
}
