import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(public rest: RestService, private router: Router) {}

  user: any = {
    username: "",
    password: ""
  };

  validationMessage: String;

  ngOnInit(): void {}

  async login(): Promise<void> {
    this.validationMessage = null;
    try {
      const data = await this.rest.login(this.user);
      localStorage.setItem("user", JSON.stringify(data));
      this.router.navigateByUrl("/home");
    } catch (e) {
      if (e.error === "UNAUTHORIZED") {
        this.validationMessage = "Invalid Username or Password";
      }
    }
  }
}
