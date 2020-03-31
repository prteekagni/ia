import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: "app-notification",
  templateUrl: "./notification.page.html",
  styleUrls: ["./notification.page.scss"]
})
export class NotificationPage implements OnInit {
  constructor( private modalController : ModalController) {}

  ngOnInit() {}

  dismiss(){
this.modalController.dismiss();
  }
}
