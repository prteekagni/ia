import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotpasswordmodalPage } from './forgotpasswordmodal.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotpasswordmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotpasswordmodalPageRoutingModule {}
