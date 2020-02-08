import { Component, OnInit } from "@angular/core";
import { HomeComponent } from "../home/home.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../authentication/auth-service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit(): void {}
}
