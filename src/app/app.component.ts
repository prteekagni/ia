import { Component, ViewChildren, QueryList } from "@angular/core";
import {
  Platform,
  IonRouterOutlet,
  ModalController,
  ToastController,
  ActionSheetController,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router, ActivatedRoute } from "@angular/router";
import { Deeplinks } from "@ionic-native/deeplinks/ngx";
import { Tab1Page } from "./tab1/tab1.page";
import { CdescriptionPage } from "./cdescription/cdescription.page";
import { ImagemodalPage } from "./imagemodal/imagemodal.page";
import { ImpageuploadPage } from "./impageupload/impageupload.page";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { File } from "@ionic-native/file/ngx";

import {
  AndroidPermissionResponse,
  AndroidPermissions,
} from "@ionic-native/android-permissions/ngx";
import { ThemeDetection, ThemeDetectionResponse } from '@ionic-native/theme-detection/ngx';

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
    public toast: ToastController,
    public deepLinks: Deeplinks,
    private router: Router,
    private modalController: ModalController,
    private imagePicker: ImagePicker,
    private androidPermissions: AndroidPermissions,
    private themeDetection: ThemeDetection,
    private file: File
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString("#3880ff");
      this.splashScreen.hide();
      this.routeConfig();
      this.hasReadPermission();
      if (this.platform.is("android")) {
        this.androidPermissions.checkPermission("WRITE_EXTERNAL_STORAGE").then(
          (res: any) => {
            console.log(res);
            if (!res.hasPermission) {
              this.androidPermissions.requestPermission(
                "WRITE_EXTERNAL_STORAGE"
              );
            }
          },
          (err) => {}
        );  this.androidPermissions.checkPermission("READ_EXTERNAL_STORAGE").then(
          (res: any) => {
            console.log(res);
            if (!res.hasPermission) {
              this.androidPermissions.requestPermission(
                "READ_EXTERNAL_STORAGE"
              );
            }
          },
          (err) => {}
        );
      }
      this.themeDetectionmethod();
    this.file
      .checkDir(this.file.externalApplicationStorageDirectory, "mydir")
      .then((_) => console.log("Directory exists"))
      .catch((err) => {
        console.log("Directory doesnt exist");
      });
    });
    this.platform.resume.subscribe((res) => {
      // alert("App Resumed from ");
      this.routeConfig();
      this.themeDetectionmethod();

    });
  }
  themeDetectionmethod(){
    this.themeDetection
        .isAvailable()
        .then((res: ThemeDetectionResponse) => {
          if (res.value) {
            this.themeDetection
              .isDarkModeEnabled()
              .then((res: ThemeDetectionResponse) => {
                if (res.value) {
                  this.setDarkMode(true);
                } else {
                  this.bdarkmode =
                    localStorage.getItem("darkmode") == "true" ? true : false;
                  // console.log(this.bdarkmode);
                  this.setDarkMode(this.bdarkmode);
                }
              })
              .catch((error: any) => console.error(error));
          }
        },err=>{
           this.bdarkmode =
             localStorage.getItem("darkmode") == "true" ? true : false;
           // console.log(this.bdarkmode);
           this.setDarkMode(this.bdarkmode);
        })
        .catch((error: any) => console.error(error));
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
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  }

  routeConfig() {
    this.deepLinks
      .route({
        "/contests": Tab1Page,
        "/cdescription/:id": CdescriptionPage,
        "/entry/:contestid/:entryid": ImagemodalPage,
      })
      .subscribe(
        (match) => {
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data
          console.log("Successfully matched route", match);
          // this.router.navigate(["/cdescription", "1" ]);
          if (
            match.$link.path ==
            "/entry/" + match.$args.contestid + "/" + match.$args.entryid
          ) {
            console.log("vote modal");
            // this.modalController1(match.$args)
            this.router.navigate(["/cdescription", match.$args.contestid], {
              queryParams: { entryId: match.$args.entryid },
            });
          }
        },
        (nomatch) => {
          // nomatch.$link - the full link data
          console.error("Got a deeplink that didn't match", nomatch);
        }
      );
  }

  async modalController1(data) {
    console.log(data);

    const modal = await this.modalController.create({
      component: ImpageuploadPage,
      backdropDismiss: true,
      cssClass: "imageupload-modal",
      componentProps: {
        imageUrl: "../../assets/google.png",
      },
    });
    modal.present();
  }

  hasReadPermission() {
    this.imagePicker.hasReadPermission().then((res: any) => {
      if (res) {
        console.log(res);
      } else {
        this.imagePicker.requestReadPermission();
      }
    });
  }
}
