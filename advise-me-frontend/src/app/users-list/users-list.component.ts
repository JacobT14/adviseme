import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import {
  trigger,
  transition,
  style,
  animate,
  query
} from "@angular/animations";

export const fadeAnimation = trigger("fadeAnimation", [
  transition(":enter", [
    style({ opacity: 0 }),
    animate("300ms", style({ opacity: 1 }))
  ]),
  transition(":leave", [
    style({ opacity: 1 }),
    animate("300ms", style({ opacity: 0 }))
  ])
]);

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"],
  animations: [fadeAnimation]
})
export class UsersListComponent implements OnInit {
  @Input("users") users;
  @Input("isSelector") isSelector: boolean

  constructor(private router: Router) {}

  get selectedUsers () {
    return this.users.filter(user => user.isSelected);
  }

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
