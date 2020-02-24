import {Component, Input, OnInit} from '@angular/core';
import {RestService} from "../../../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import AuthService from "../../../authentication/auth-service";

@Component({
  selector: 'app-session-participation-prompts',
  templateUrl: './session-participation-prompts.component.html',
  styleUrls: ['./session-participation-prompts.component.css']
})
export class SessionParticipationPromptsComponent implements OnInit {
  @Input("session") session;
  @Input("displayedItems") displayedItems;


  constructor(public rest: RestService, public router: Router, public auth: AuthService, public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  answerPrompt(item, response) {
    console.log({response})
    this.rest.answerPrompt(this.session._id, item._id, response)
  }

  promptResponse(prompt) {
    return prompt.answers.find(answer => answer.user === this.auth.user._id)?.response
  }

}
