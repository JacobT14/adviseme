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


@Component({
  selector: "app-session-list",
  templateUrl: "./session-list.component.html",
  styleUrls: ["./session-list.component.css"],
 
})
export class SessionListComponent implements OnInit {

  @Input("sessions") sessions;
  @Input("isSelector") isSelector: boolean
  constructor(private rest: RestService, private router: Router) {}

  ngOnInit(): void {
    const sessionsAddedSub = this.rest.sessionsAdded.subscribe(session => {
      console.log({ session });
      console.log(session._id);
      
    });
    console.log(this.sessions);
    const sessionsChangedSub = this.rest.sessionsChanged.subscribe(session =>
      console.log(session._id + " CHANGED")
    );
  }

  get selectedUsers () {
    return this.sessions.filter(session => session.isSelected);
  }

  create(): void {
    this.router.navigateByUrl("/sessions");
  }

  
}
