import { Component } from '@angular/core';
import { Platform, AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  unsubscribeBackEvent;
  constructor(private platform : Platform , private router: Router , private modalController: ModalController , private actionSheetController : ActionSheetController) {
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  ionViewWillEnter() {
    this.initializeBackButtonCustomHandler();
    
  }
  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(
      999999,
      async () => {
             try {
         const element = await this.actionSheetController.getTop();

         if (element) {
           element.dismiss();
           return;
         }
       } catch (error) {}

       try {
         const element = await this.modalController.getTop();
         if (element) {
           element.dismiss();
           return;
         }
       } catch (error) {}
        // this.router.navigate(["/tabs/enteries"]);
        this.router.navigate(["/tabs"]);
        // alert("Do you want to exit app?");
      }
    );
  }
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unsubscribeBackEvent.unsubscribe();
  }
}
