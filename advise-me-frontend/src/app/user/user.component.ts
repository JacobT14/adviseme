import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RestService } from "../rest.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  constructor(private route: ActivatedRoute, private rest: RestService) {}

  successMessage: String;

  isAddMode: boolean;

  user: any;

  ngOnInit(): void {
    console.log(this.route.params);
    this.route.params.subscribe(async params => {
      if (params.userId === "add") {
        this.user = {};
        this.isAddMode = true;
      } else {
        this.user = await this.rest.getUser(params.userId);
        console.log({ user: this.user });
      }
    });
  }

  async update(): Promise<void> {
    console.log("UPDATING!");
    const data = await this.rest.updateUser(this.user.email, this.user);
    this.successMessage = "Success!";
  }

  async create(): Promise<void> {
    console.log("UPDATING!");
    const data = await this.rest.register(this.user);
    this.successMessage = "Success!";
  }
}
