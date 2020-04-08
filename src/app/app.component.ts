import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, IonRouterOutlet, ModalController, ToastController, ActionSheetController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router';

import { TabsPage } from './tabs/tabs.page';
import { filter } from 'rxjs/operators';

import { Event as NavigationEvent } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  navLinksArray = [];
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  bdarkmode;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,

    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    public toast: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString("#3880ff");
      this.splashScreen.hide();
    });

    this.bdarkmode = localStorage.getItem("darkmode") == "true" ? true : false;
    console.log(this.bdarkmode);
    this.setDarkMode(this.bdarkmode);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.router.navigate([""]);
    //  FCMPlugin.onNotification(function (data) {
    //    if (data.wasTapped) {
    //      //Notification was received on device tray and tapped by the user.
    //      alert(JSON.stringify(data));
    //    } else {
    //      //Notification was received in foreground. Maybe the user needs to be notified.
    //      alert(JSON.stringify(data));
    //    }
    //  });
  }

  // backButtonEvent() {
  //   this.platform.backButton.subscribe(async () => {
  //     try {
  //       const element = await this.actionSheetCtrl.getTop();

  //       if (element) {
  //         element.dismiss();
  //         return;
  //       }
  //     } catch (error) {}

  //     try {
  //       const element = await this.modalCtrl.getTop();
  //       if (element) {
  //         element.dismiss();
  //         return;
  //       }
  //     } catch (error) {}

  //     // this.routerOutlets.forEach((outlet: IonRouterOutlet) => {

  //     // if (outlet && outlet.canGoBack()) {
  //     //   outlet.pop();
  //     // }
  //     if (this.router.url == "/tabs/tab1") {
  //       alert(this.router.url);
  //       if (
  //         new Date().getTime() - this.lastTimeBackPress <
  //         this.timePeriodToExit
  //       ) {
  //         console.log("App need to exit");
  //       } else {
  //         this.createToast();
  //         this.lastTimeBackPress = new Date().getTime();
  //       }
  //     } else if (
  //       this.router.url == "/tabs/tab2" ||
  //       this.router.url == "/tabs/tab2" ||
  //       this.router.url == "/tabs/tab3" ||
  //       this.router.url == "/tabs/enteries"
  //     ) {
  //       this.router.navigate(["/tabs/tab1"]);
  //     }
  //   });
  //   // });
  //   // })
  // }

  ionViewDidLeave() {
    this.platform.backButton.unsubscribe();
  }

  async createToast() {
    const toast = await this.toast.create({
      message: "Sad to see you go ",
      duration: 2000,
      position: "top",
    });
    toast.present();
  }

  setDarkMode(data) {
    document.body.classList.toggle("dark", data);
    // document.body.classList.toggle("dark", ev.detail.checked);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  }
}
