import { Component, ViewChild } from '@angular/core';
import { PopoverController ,IonSlides, ModalController, Platform } from '@ionic/angular';
import { AddmodalPage } from '../addmodal/addmodal.page';
import { NotificationPage } from '../notification/notification.page';
import { ImpageuploadPage } from '../impageupload/impageupload.page';
import { myEnterAnimation } from "../animations/enter";
import { myLeaveAnimation } from "../animations/leave";
import { ActivatedRoute, Router } from '@angular/router';
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationStart } from "@angular/router";
import { Subscription } from 'rxjs';
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  @ViewChild("slider", { static: true }) slider: IonSlides;
  segment = 0;
  public unsubscribeBackEvent: Subscription;

  items: any = [];
  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private platform:Platform
  ) {
    this.items = [
      { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
      { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
      { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
      { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
      { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
      { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
      { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
    ];
    router.events
      .pipe(
        filter((event: NavigationEvent) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event: NavigationStart) => {
        if (
          event.navigationTrigger == "popstate" &&
          event.url == "/tabs/tab1" &&
          localStorage.getItem("Login") == "true"
        ) {
          this.router.navigate(["/tabs/tab1"]);
        }
      });
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: "",
      event: ev,
      translucent: true,
    });

    return await popover.present();
  }
  // async segmentChanged() {
  //   await this.slider.slideTo(this.segment);
  // }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.slider.slideTo(this.segment);

  }
  ionViewWillEnter(){
    this.initializeBackButtonCustomHandler();

  }
  async openAddModalPage() {
    const modal = await this.modalController.create({
      component: AddmodalPage,
      backdropDismiss: true,
      cssClass: "add-modal",
    });
    return await modal.present();
  }
  async openNotificationModal() {
    const modal = await this.modalController.create({
      component: NotificationPage,
      backdropDismiss: true,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
    });
    return await modal.present();
  }

  ionViewDidLeave() {
    console.log("View Did Lwave");
  }
  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(
      999999,
      async () => {
      try {
        const element = await this.modalController.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {}
        // this.router.navigate(["/tabs/enteries"]);
        // this.router.navigate(["/tabs/enteries"]);
        alert("Do you want to exit app?");
      }
    );
  }
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unsubscribeBackEvent.unsubscribe();
  }
}

