import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}
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
        {
          text: "Cancel",
          handler: () => {
            console.log("Cancelled");
          }
        }
      ]
    });

    await alert.present();
  }

  darkMode(ev) {
    console.log(ev);

    //  const toggle = document.querySelector("#themeToggle");

    // Listen for the toggle check/uncheck to toggle the dark class on the <body>
    //  toggle.addEventListener("ionChange", ev => {
    //  });
    document.body.classList.toggle("dark", ev.detail.checked);

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Listen for changes to the prefers-color-scheme media query
    //  prefersDark.addListener(e => checkToggle(e.matches));

    // Called when the app loads
    function loadApp() {
      checkToggle(prefersDark.matches);
    }

    // Called by the media query to check/uncheck the toggle
    function checkToggle(shouldCheck) {
      ev.detail.checked = shouldCheck;
    }
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

 async deleteAccount(){
     const alert = await this.alertController.create({
       header: "Delete Account",
       subHeader: "",
       message:
         " All the data related to the account will no more be available",
       buttons: [
         {
           text: "Delete",
           handler: () => {
             localStorage.setItem("Login", "");
             this.router.navigate(["login"]);
           }
         },
         {
           text: "Cancel",
           handler: () => {
             console.log("Cancelled");
           }
         }
       ]
     });

     await alert.present();
  }
}
