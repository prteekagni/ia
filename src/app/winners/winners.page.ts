import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-winners",
  templateUrl: "./winners.page.html",
  styleUrls: ["./winners.page.scss"],
})
export class WinnersPage implements OnInit {
  public unsubscribeBackEvent: Subscription;
  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute,
    private platform: Platform,
    private router: Router
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    console.log(id);
    this.initializeBackButtonCustomHandler();
  }
  async goToWinnerImage() {
    const modal = await this.modalController.create({
      componentProps: {
        type: "iswinner",
      },
      component: ImagemodalPage,
      backdropDismiss: true,
      cssClass: "winner-modal",
    });
    return await modal.present();
  }

  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(
      999999,
      () => {
        console.log(this.route.parent);
        console.log(this.route.root);
        // this.router.navigate(["/tabs/enteries"]);
        // this.router.navigate(["/tabs/enteries"]);
         window.history.back();
      }
    );
    /* here priority 101 will be greater then 100 
    if we have registerBackButtonAction in app.component.ts */
  }
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unsubscribeBackEvent.unsubscribe();
  }
}
