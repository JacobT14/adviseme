import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { RestService } from "../rest.service";
import { Session } from "../models/session";

@Component({
  selector: "app-session-list",
  templateUrl: "./session-list.component.html",
  styleUrls: ["./session-list.component.css"]
})
export class SessionListComponent implements OnInit {
  constructor(private rest: RestService) {}

  ngOnInit(): void {
    const sessionsAddedSub = this.rest.sessionsAdded.subscribe(session => {
      console.log({ session });
      console.log(session._id);
    });

    const sessionsChangedSub = this.rest.sessionsChanged.subscribe(session =>
      console.log(session._id + " CHANGED")
    );
  }
}
