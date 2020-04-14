import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from 'src/app/models/User';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor(
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing,
    private nativeStorage : NativeStorage,
    private google: GooglePlus,
    private router : Router,
    private loadingController : LoadingController
  ) {}

  setUserDetail() {}

  setLoginStatus() {
    this.nativeStorage.setItem("Login", "true");
  }
  getLoginStatus() {
    return this.nativeStorage.getItem("Login").then((res)=> res);
  }

  clearLoginStatus(){
    this.nativeStorage.setItem("Login", "");
  }
  async presentToast(message, duration ) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: false,
      position: "top",
      duration:duration     
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
  setProfileCompleteStatus(data){
    this.nativeStorage.setItem("isProfileCompleted" , data).then(res=>console.log(res))
  }
  getProfileStatus(){
    return this.nativeStorage.getItem("isProfileCompleted");
  }

  addCredits(data):Promise<any>{
   return this.getUserDetail().then((res:any)=>{
    //  alert("Current Credit " + res.credits);
      res.credits = res.credits + data;
      this.saveUserDetail(res).then((res:any)=>{
        // alert("Updated Credit avaliable " + res.credits);
        console.log(res.credits);
        return res.credits;
      },err=>{
        console.log(err); 
        return err;
      })
    })
  }

  deleteUser(){
    this.getUserDetail().then((res:User)=>{
      console.log(res);
      if(res.loggedVia == "email"){
        this.google.trySilentLogin().then((res:any)=>{
          console.log(res);
        this.google.disconnect().then((res)=>console.log(res));
        ;  
        },err=> console.log(err)
        )
        
      }
    })
    this.nativeStorage.setItem("User", "");
    this.clearLoginStatus();
}

logOut(){
  this.getUserDetail().then((res: User) => {
    console.log(res);
    if (res.loggedVia == "email") {
      this.google.trySilentLogin({
        offline:false
      }).then((res: any) => {
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
    } else if(res.loggedVia == "phone"){
         this.clearLoginStatus();
         this.router.navigate(["login"]);
    }
  });
}


async loadingControllerDisplay(){
    const loading = await this.loadingController.create({
      spinner: null,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();
  }

  async dismissLoadingController(){
    if(this.loadingController){
      this.loadingController.dismiss();
    }
  }
}



