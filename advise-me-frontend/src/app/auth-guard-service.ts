// src/app/auth/auth-guard.service.ts
import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import AuthService from "./authentication/auth-service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    if (this.auth.isAuthenticated) {
      switch (expectedRole) {
        case "ADMIN": {
          return this.handleRouteCheck(this.auth.isAdmin);
        }
        case "ADVISOR": {
          return this.handleRouteCheck(this.auth.isAdvisor);
        }
        default: {
          return true;
        }
      }
    } else {
      this.router.navigate(["/home"]);
      return false;
    }
  }

  handleRouteCheck(result) {
    if (result) {
      return true;
    } else {
      this.router.navigate(["/home"]);
      return false;
    }
  }
}
