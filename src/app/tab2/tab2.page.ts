import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  constructor(private router: Router, private alertController: AlertController) {}
 async onClick() {
    const alert = await this.alertController.create({
      header: "Logout",
      subHeader: "",
      message: "Do you want to logout?",
      buttons: [
        {
          text: "Logout",
          handler: () => {
            localStorage.setItem("Login", "");
            this.router.navigate(["login"]);
          }
        },
          {text: "Cancel",
          handler: () => {
         console.log("Cancelled");
         
          }
        }
        
      ]
    });

    await alert.present();

   
  }
}
