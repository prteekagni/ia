import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContestsPage } from './contests.page';

const routes: Routes = [
  {
    path: '',
    component: ContestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContestsPageRoutingModule {}
