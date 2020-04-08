import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/loginguard.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then((m) => m.RegisterPageModule),
  },
  // {
  //   path: "cdescription/:id",
  //   loadChildren: () =>
  //     import("./cdescription/cdescription.module").then(
  //       (m) => m.CdescriptionPageModule
  //     ),
  // },

  // {
  //   path: "imagemodal",
  //   loadChildren: () =>
  //     import("./imagemodal/imagemodal.module").then(
  //       (m) => m.ImagemodalPageModule
  //     ),
  // },
  // {
  //   path: "winners/:id",
  //   loadChildren: () =>
  //     import("./winners/winners.module").then((m) => m.WinnersPageModule),
  // },
  // {
  //   path: "addmodal",
  //   loadChildren: () =>
  //     import("./addmodal/addmodal.module").then((m) => m.AddmodalPageModule),
  // },
  // {
  //   path: "register",
  //   loadChildren: () =>
  //     import("./register/register.module").then((m) => m.RegisterPageModule),
  // },
  // {
  //   path: "forgotpasswordmodal",
  //   loadChildren: () =>
  //     import("./forgotpasswordmodal/forgotpasswordmodal.module").then(
  //       (m) => m.ForgotpasswordmodalPageModule
  //     ),
  // },
  // {
  //   path: "login",
  //   loadChildren: () =>
  //     import("./login/login.module").then((m) => m.LoginPageModule),
  // },
  // {
  //   path: "impageupload",
  //   loadChildren: () =>
  //     import("./impageupload/impageupload.module").then(
  //       (m) => m.ImpageuploadPageModule
  //     ),
  // },
  // {
  //   path: "editprofilemodal",
  //   loadChildren: () =>
  //     import("./editprofilemodal/editprofilemodal.module").then(
  //       (m) => m.EditprofilemodalPageModule
  //     ),
  // },
  // {
  //   path: 'notification',
  //   loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { preloadingStrategy: PreloadAllModules }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
