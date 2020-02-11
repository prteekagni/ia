import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: "app-contests",
  templateUrl: "./contests.page.html",
  styleUrls: ["./contests.page.scss"]
})
export class ContestsPage implements OnInit {
  constructor( private route:Router) {}

  ngOnInit() {}

  goToContest(){
      this.route.navigate(["/cdescription"]).then(res=> console.log(res));
  }
}
