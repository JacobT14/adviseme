import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(public rest: RestService) {}

  validationMessage: String;
  user: any = {
    email: "",
    password: "",
    firstName: null,
    lastName: null,
    title: null,
    department: null
  };

  ngOnInit(): void {}

  async register(): Promise<void> {
    this.validationMessage = null;
    try {
      const data = await this.rest.register(this.user);
      console.log({ data });
      localStorage.setItem("user", this.user.username);
      localStorage.setItem("password", this.user.password);
    } catch (e) {
      if (e.error === "UNAUTHORIZED") {
        this.validationMessage = "Invalid Username or Password";
      }
    }
  }
}
