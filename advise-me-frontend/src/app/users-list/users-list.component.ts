import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"]
})
export class UsersListComponent implements OnInit {
  @Input("users") users;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log("IN HERE!");
    console.log(this.users);
  }

  editUser(user): void {
    console.log({ user });
    this.router.navigate([`/users`, user.email]);
  }

  create(): void {
    this.router.navigate([`/users`, "add"]);
  }
}
