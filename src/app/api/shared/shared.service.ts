import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})


export class SharedService {
  constructor(private toastCtrl: ToastController) {}

  setUserDetail() {}
  getUserDetail() {}
  setLoginStatus() {}
  getLoginStatus() {}
  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration,
    });
    toast.present();
  }

}
