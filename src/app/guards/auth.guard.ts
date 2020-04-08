import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    console.log(localStorage.getItem("Login"));

    if (localStorage.getItem("Login") == "true") {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
