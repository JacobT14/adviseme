import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor() {}

  get isAuthenticated() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {}
}
