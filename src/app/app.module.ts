import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImagemodalPage } from './imagemodal/imagemodal.page';
import { ImagemodalPageModule } from './imagemodal/imagemodal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordmodalPageModule } from './forgotpasswordmodal/forgotpasswordmodal.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClientModule } from "@angular/common/http";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import {  SuperTabsModule } from "@ionic-super-tabs/angular";
import { AddmodalPageModule } from './addmodal/addmodal.module';
import { NgOtpInputModule } from "ng-otp-input";
import { BrMaskerModule } from "br-mask";
import { NgxMaskIonicModule } from "ngx-mask-ionic";
import { NotificationPageModule } from './notification/notification.module';
import { ImpageuploadPageModule } from './impageupload/impageupload.module';
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { SmsRetriever } from "@ionic-native/sms-retriever/ngx";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Crop } from "@ionic-native/crop/ngx";
import { EditprofilemodalPageModule } from './editprofilemodal/editprofilemodal.module';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppMinimize } from "@ionic-native/app-minimize/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Deeplinks } from "@ionic-native/deeplinks/ngx";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode :"md",
      hardwareBackButton: true,
      swipeBackEnabled: true,
    }),
    AppRoutingModule,
    ImagemodalPageModule,
    ReactiveFormsModule,
    ImpageuploadPageModule,
    ForgotpasswordmodalPageModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SuperTabsModule.forRoot(),
    AddmodalPageModule,
    NgOtpInputModule,
    BrMaskerModule,
    NgxMaskIonicModule.forRoot(),
    NotificationPageModule,
    EditprofilemodalPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    Camera,
    ImagePicker,
    GooglePlus,
    SmsRetriever,
    Crop,
    NativeStorage,
    AppMinimize,
    SocialSharing,
    Deeplinks,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
