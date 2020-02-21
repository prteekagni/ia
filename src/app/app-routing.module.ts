import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
   {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule),
    
  },
  {
    path: "contests/:type",
    loadChildren: () =>
      import("./contests/contests.module").then(m => m.ContestsPageModule)
  },
  {
    path: "cdescription",
    loadChildren: () =>
      import("./cdescription/cdescription.module").then(
        m => m.CdescriptionPageModule
      )
  },
  {
    path: "enteries",
    loadChildren: () =>
      import("./enteries/enteries.module").then(m => m.EnteriesPageModule)
  },
  {
    path: "imagemodal",
    loadChildren: () =>
      import("./imagemodal/imagemodal.module").then(m => m.ImagemodalPageModule)
  },
  {
    path: "winners",
    loadChildren: () =>
      import("./winners/winners.module").then(m => m.WinnersPageModule)
  },
  {
    path: "addmodal",
    loadChildren: () =>
      import("./addmodal/addmodal.module").then(m => m.AddmodalPageModule)
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then(m => m.RegisterPageModule)
  },
  {
    path: "forgotpasswordmodal",
    loadChildren: () =>
      import("./forgotpasswordmodal/forgotpasswordmodal.module").then(
        m => m.ForgotpasswordmodalPageModule
      )
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'impageupload',
    loadChildren: () => import('./impageupload/impageupload.module').then( m => m.ImpageuploadPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
