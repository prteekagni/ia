import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { SharedService } from '../api/shared/shared.service';

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router , private sharedService: SharedService) {}
  canActivate() {
    
  //  return this.sharedService.getLoginStatus().then((res)=>{
  //     if(res == "true"){
  //       return true
  //     } else {
  //       this.router.navigate(["/login"]);
  //       return false;
  //     }
  //   },err=>{
  //      this.router.navigate(["/login"]);
  //     return false;
      
  //   })
      return this.sharedService.getLoginStatus().then(
        (res) => {
          if (res == "true") {
            return true;
          } else {
            return true;
          }
        },
        (err) => {
          
          return true;
        }
      );

    // if (localStorage.getItem("Login") == "true") {
    //   return true;
    // } else {
    //   this.router.navigate(["/login"]);
    //   return false;
    }
  
}
