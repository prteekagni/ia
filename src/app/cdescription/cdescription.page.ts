import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: "app-cdescription",
  templateUrl: "./cdescription.page.html",
  styleUrls: ["./cdescription.page.scss"]
})
export class CdescriptionPage implements OnInit {
  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {}

  async goToTabBar() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image",
      buttons: [
        {
          text: "Camera",
          icon: "camera",
          handler: () => {
            console.log("Share clicked");
          }
        },
        {
          text: "Gallery",
          icon: "arrow-dropright-circle",
          handler: () => {
            console.log("Play clicked");
          }
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }
  onClick(){
    this.router.navigate(["/enteries"]);
  }
}
