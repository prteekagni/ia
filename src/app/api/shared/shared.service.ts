import { Injectable, Output, EventEmitter } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from 'src/app/models/User';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
// import { AsyncSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  // subject = new AsyncSubject();
  //  subject = new Subject<any>();
  @Output() credits: EventEmitter<number> = new EventEmitter();
  loading;
  constructor(
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing,
    private nativeStorage: NativeStorage,
    private google: GooglePlus,
    private router: Router,
    private loadingController: LoadingController,
    private httpClient : HttpClient
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

 async  loadingControllerDisplay() {
     this.loading = await this.loadingController.create({
      message: "Please wait...",
    });
     this.loading.present();
  }

  async dismissLoadingController() {
    if (this.loading) {
      this.loading.dismiss();
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

  remoteVoteFromData(data){
   let tempVote = [];
   return this.nativeStorage.getItem("Vote").then(
     (res: any) => {
      let toKeep:any = [];
      for (let i of res) {
        if (i.id !== data) {
          toKeep.push(i);
        }
      }
      this.nativeStorage.setItem("Vote", toKeep);
    });
  }

  getTimeDifference(data , totaldifference){
    var timeInMiliseconds = totaldifference*60*1000;
    var timediff = timeInMiliseconds - (new Date().getTime() - data);
    return timediff
  }

  convertToHumanize(data){
    return moment.duration(data).humanize();
  }

  uploadToS3(image, url){
     this.httpClient
       .put(
         "https://testbucketforia.s3.ap-south-1.amazonaws.com/mytestimage.jpg?X-Amz-Expires=6000&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWQHHE5TFZQOXXHQ/20200422/ap-south-1/s3/aws4_request&X-Amz-Date=20200422T090542Z&X-Amz-SignedHeaders=host&X-Amz-Signature=736e92744d0753bd0e5807992bfea641ac75366c27789d608439deb1477adfe4",
         image,
         {
           headers: {
             "Content-Type": "image/jpeg",
           },
         }
       )
       .subscribe(
         (res: any) => {
           console.log(res);
         },
         (err) => {
           console.log(err);
         }
       );
    }

    getUploadUrl(imagedata){
      return 1;
    }


  }






