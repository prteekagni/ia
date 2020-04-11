import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

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
    private router : Router
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

  addCredits(data){
    
   return this.getUserDetail().then((res:any)=>{
      res.credits = res.credits + data;
      console.log(res);
      
      this.saveUserDetail(res).then((res:any)=>{
        console.log(res);
      },err=>{
        console.log(err); 
      })
    })
  }

  deleteUser(){
    this.getUserDetail().then((res:User)=>{
      console.log(res);
      if(res.loggedVia == "email"){
        this.google.logout();
      }
    })
    this.nativeStorage.setItem("User", "");
    this.clearLoginStatus();
}

logOut(){
  this.getUserDetail().then((res: User) => {
    console.log(res);
    if (res.loggedVia == "email") {
      this.google.logout().then((res:any)=>{
         this.clearLoginStatus();
         this.router.navigate(["login"]);
      },err=>{console.log(err);
      })
    } else if(res.loggedVia == "phone"){
         this.clearLoginStatus();
         this.router.navigate(["login"]);
    }
  });
}


}
