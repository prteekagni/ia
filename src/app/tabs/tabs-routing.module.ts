import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "tab1",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab1/tab1.module").then((m) => m.Tab1PageModule),
          },
        ],
      },
      {
        path: "tab2",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab2/tab2.module").then((m) => m.Tab2PageModule),
          },
        ],
      },
      {
        path: "tab3",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab3/tab3.module").then((m) => m.Tab3PageModule),
          },
        ],
      },
      {
        path: "enteries",
        loadChildren: () =>
          import("../enteries/enteries.module").then(
            (m) => m.EnteriesPageModule
          ),
      },
      // {
      //   path: "contests",
      //   children: [
      //     {
      //       path: "",
      //       loadChildren: () =>
      //         import("../contests/contests.module").then(
      //           m => m.ContestsPageModule
      //         )
      //     }
      //   ]
      // },
      {
        path: "",
        redirectTo: "/tabs/tab1",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "cdescription/:id",
    loadChildren: () =>
      import("../cdescription/cdescription.module").then(
        (m) => m.CdescriptionPageModule
      ),
  },
  {
    path: "winners/:id",
    loadChildren: () =>
      import("../winners/winners.module").then((m) => m.WinnersPageModule),
  },
  {
    path: "",
    redirectTo: "/tabs/tab1",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
