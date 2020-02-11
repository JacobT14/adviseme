import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  get user() {
    const user = localStorage.getItem("user");
    if (user) {
      const userParsed = JSON.parse(user);
      return userParsed;
    } else {
      return null;
    }
  }
  get isAuthenticated() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }

  get isAdmin() {
    const user = localStorage.getItem("user");
    if (user) {
      const userParsed = JSON.parse(user);
      return (
        userParsed.permissionLevel === "PRIMARY_ADMIN" ||
        userParsed.permissionLevel === "ADMIN"
      );
    } else {
      return false;
    }
  }

  get isPrimaryAdmin() {
    const user = localStorage.getItem("user");
    if (user) {
      const userParsed = JSON.parse(user);
      return userParsed.permissionLevel === "PRIMARY_ADMIN";
    } else {
      return false;
    }
  }
  get isAdvisor() {
    const user = localStorage.getItem("user");
    if (user) {
      const userParsed = JSON.parse(user);
      return userParsed.permissionLevel === "ADVISOR";
    } else {
      return false;
    }
  }
}

export default AuthService;
