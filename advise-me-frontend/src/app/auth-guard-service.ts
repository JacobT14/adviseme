// src/app/auth/auth-guard.service.ts
import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      this.router.navigate(["/home"]);
      return false;
    }
  }
}
