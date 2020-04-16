import { Injectable, Output, EventEmitter } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from 'src/app/models/User';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
// import { AsyncSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  // subject = new AsyncSubject();
  //  subject = new Subject<any>();
  @Output() credits: EventEmitter<number> = new EventEmitter();
  constructor(
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing,
    private nativeStorage: NativeStorage,
    private google: GooglePlus,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  setUserDetail() {}

  setLoginStatus() {
    this.nativeStorage.setItem("Login", "true");
  }
  getLoginStatus() {
    return this.nativeStorage.getItem("Login").then((res) => res);
  }

  clearLoginStatus() {
    this.nativeStorage.setItem("Login", "");
  }
  async presentToast(message, duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: false,
      position: "top",
      duration: duration,
    });
    toast.present();
  }

  sharingToOther(data) {
    this.socialSharing
      .share(
        "Please vote my entry in the contests and help me win.",
        "",
        "",
        "https://photorewards.page.link/muUh1"
      )
      .then(
        (res) => {},
        (error) => {
          console.log(error);
        }
      );
  }

  saveUserDetail(data) {
    return this.nativeStorage.setItem("User", data);
  }
  getUserDetail() {
    return this.nativeStorage.getItem("User");
  }
  setProfileCompleteStatus(data) {
    this.nativeStorage
      .setItem("isProfileCompleted", data)
      .then((res) => console.log(res));
  }
  getProfileStatus() {
    return this.nativeStorage.getItem("isProfileCompleted");
  }

  addCredits(data): Promise<any> {
    // this.subject.next(20);
    // this.credits.emit(100);
    return this.getUserDetail().then((res: any) => {
      res.credits = res.credits + data;
      this.saveUserDetail(res).then(
        (res: any) => {
          console.log(res.credits);
          // this.subject.next(res.credits);
          return res.credits;
        },
        (err) => {
          console.log(err);
          return err;
        }
      );
    });
  }

  deleteUser() {
    this.getUserDetail().then((res: User) => {
      console.log(res);
      if (res.loggedVia == "email") {
        this.google.trySilentLogin().then(
          (res: any) => {
            console.log(res);
            this.google.disconnect().then((res) => console.log(res));
          },
          (err) => console.log(err)
        );
      }
    });
    this.nativeStorage.setItem("User", "");
    this.clearLoginStatus();
  }

  logOut() {
    this.getUserDetail().then((res: User) => {
      console.log(res);
      if (res.loggedVia == "email") {
        this.google
          .trySilentLogin({
            offline: false,
          })
          .then((res: any) => {
            console.log(res);
            this.google.logout().then(
              (res: any) => {
                console.log(res);
                this.clearLoginStatus();
                this.router.navigate(["login"]);
              },
              (err) => console.log(err)
            );
          });
      } else if (res.loggedVia == "phone") {
        this.clearLoginStatus();
        this.router.navigate(["login"]);
      }
    });
  }

  async loadingControllerDisplay() {
    const loading = await this.loadingController.create({
      spinner: null,
      message: "Click the backdrop to dismiss early...",
      translucent: true,
      cssClass: "custom-class custom-loading",
      backdropDismiss: true,
    });
    await loading.present();
  }

  async dismissLoadingController() {
    if (this.loadingController) {
      this.loadingController.dismiss();
    }
  }

  addVote(data){
  let tempVote = [];
  return this.nativeStorage.getItem("Vote").then((res:any)=>{
    if(res.length > 0){  
    tempVote = res;
        if(tempVote.length > 0){
          tempVote.push(data);
          return this.nativeStorage.setItem("Vote", tempVote);
        }
      } else {
        return this.nativeStorage.setItem("Vote", [data]);
      }
      },err=>{
        return this.nativeStorage.setItem("Vote" , [data]);
      })
  }

  getVoteData(){
    return this.nativeStorage.getItem("Vote");
  }

  clearVoteData(){
    this.nativeStorage.setItem("Vote", []);
  }
}



