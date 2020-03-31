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
import { Base64 } from "@ionic-native/base64/ngx";
import {  SuperTabsModule } from "@ionic-super-tabs/angular";
import { AddmodalPageModule } from './addmodal/addmodal.module';
import { NgOtpInputModule } from "ng-otp-input";
import { TextMaskModule } from "angular2-text-mask";
import { BrMaskerModule } from "br-mask";
import { NgxMaskIonicModule } from "ngx-mask-ionic";
import { NotificationPage } from './notification/notification.page';
import { NotificationPageModule } from './notification/notification.module';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [ImagemodalPage , NotificationPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ImagemodalPageModule,
    ReactiveFormsModule,
    ForgotpasswordmodalPageModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SuperTabsModule.forRoot(),
    AddmodalPageModule,
    NgOtpInputModule,
    BrMaskerModule,
    NgxMaskIonicModule.forRoot(),
    NotificationPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    ImagePicker,
    Base64
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
