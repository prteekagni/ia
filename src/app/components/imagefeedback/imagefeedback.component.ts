import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SharedService } from 'src/app/api/shared/shared.service';

@Component({
  selector: "app-imagefeedback",
  templateUrl: "./imagefeedback.component.html",
  styleUrls: ["./imagefeedback.component.scss"],
})
export class ImagefeedbackComponent implements OnInit {
  constructor(private popoverController: PopoverController , private sharedService: SharedService) {}

  ngOnInit() {}

  dismissPopover() {
    this.popoverController.dismiss();
  }

  popBtnClick(data){
this.sharedService.presentToast("Thanks you for your feedback for reporting the image as " + data , 2000);
    this.popoverController.dismiss();

  }
}

