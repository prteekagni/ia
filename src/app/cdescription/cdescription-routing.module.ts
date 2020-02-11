import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CdescriptionPage } from './cdescription.page';

const routes: Routes = [
  {
    path: "",
    component: CdescriptionPage,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CdescriptionPageRoutingModule {}
