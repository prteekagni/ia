import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: "app-imagefeedback",
  templateUrl: "./imagefeedback.component.html",
  styleUrls: ["./imagefeedback.component.scss"]
})
export class ImagefeedbackComponent implements OnInit {
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  dismissPopover() {
    this.popoverController.dismiss();
  }
}
