import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  constructor(public rest: RestService) {}

  users: any;

  ngOnInit(): void {
    this.rest.getUsers().then(data => {
      this.users = data;
    });
  }
}
