import { Component, OnInit , Input} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { RestService } from "../rest.service";
import { Session } from "../models/session";
import { Router } from "@angular/router";
import {
  trigger,
  transition,
  style,
  animate,
  query
} from "@angular/animations";
import AuthService from "../authentication/auth-service";
import {fadeAnimation} from "../users-list/users-list.component";


@Component({
  selector: "app-session-list",
  templateUrl: "./session-list.component.html",
  styleUrls: ["./session-list.component.css"],
  animations: [fadeAnimation]

})
export class SessionListComponent implements OnInit {

  constructor(private rest: RestService, private router: Router, private auth: AuthService) {}

  sessions: []
  ngOnInit(): void {
    const sessionsAddedSub = this.rest.sessionsAdded.subscribe(session => {
      console.log({ session });
      console.log(session._id);

    });
    console.log(this.sessions);
    const sessionsChangedSub = this.rest.sessionsChanged.subscribe(session =>
      console.log(session._id + " CHANGED")
    );
    console.log("loading!")
    this.loadSessions()
  }

 async loadSessions() {
    console.log("loading sessions")
    this.sessions = await this.rest.getSessionsByUserIds([this.auth.user._id])
   console.log(this.sessions)
  }



  create(): void {
    this.router.navigateByUrl("/sessions");
  }

  editSession(session): void {
    console.log({ session });
    this.router.navigate([`/sessions`, session._id]);
  }


}
