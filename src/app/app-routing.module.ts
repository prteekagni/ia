import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./tabs/tabs.module").then(m => m.TabsPageModule)
  },
  {
    path: "contests",
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
    path: 'imagemodal',
    loadChildren: () => import('./imagemodal/imagemodal.module').then( m => m.ImagemodalPageModule)
  },
  {
    path: 'winners',
    loadChildren: () => import('./winners/winners.module').then( m => m.WinnersPageModule)
  },
  {
    path: 'addmodal',
    loadChildren: () => import('./addmodal/addmodal.module').then( m => m.AddmodalPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
