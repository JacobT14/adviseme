import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  get isAuthenticated() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }
}

export default AuthService;
