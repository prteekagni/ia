import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpageuploadPage } from './impageupload.page';

const routes: Routes = [
  {
    path: '',
    component: ImpageuploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImpageuploadPageRoutingModule {}
