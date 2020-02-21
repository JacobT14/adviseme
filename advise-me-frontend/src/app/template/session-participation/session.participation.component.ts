import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {RestService} from "../../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {UserListSelectorComponent} from "../../user-list-selector/user-list-selector.component";
import {initialState} from "ngx-bootstrap/timepicker/reducer/timepicker.reducer";
import {map} from "rxjs/operators";
import AuthService from "../../authentication/auth-service";
import {FormGroup, FormBuilder, FormControl, Validators, FormArray} from '@angular/forms';
import {sortBy, filter, isEmpty} from 'lodash'


@Component({
  selector: 'app-session-participation',
  templateUrl: './session.participation.component.html',
  styleUrls: ['./session.participation.component.css']
})
export class SessionParticipationComponent implements OnInit {

  // Items pushed into the array will be shown in the session
  displayedItems = []

  constructor( public rest: RestService, public router: Router, public auth: AuthService, public route: ActivatedRoute) {
  }


  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
      const sessionId = params.sessionId
      this.session = await this.rest.getSessionById(sessionId);
      console.log(this.session)
      console.log(this.activePrompts)
      this.displayedItems.push(...this.activePrompts)
    });

    this.rest.promptAsked.subscribe(session => {
        this.session = session
        const prompts = this.activePrompts
        this.displayedItems.push(prompts[prompts.length - 1])
      }
    );
  }

  validationMessage: String;

  session: any = {
    topic: "",
    creatorId: this.auth.user._id,
    departmentFilter: "",
    assignedUserIds: [],
    prompts: [],
  }

  get activePrompts() {
    const activePrompts =  filter(this.session.prompts,  (prompt) => {
      return typeof prompt.displayIndex !== "undefined"
    })
    return sortBy(activePrompts, 'displayIndex')
  }

  get inactivePrompts() {
    return this.session.prompts.filter(prompt => typeof prompt.displayIndex === "undefined")
  }

  close() {
    this.validationMessage = null;
  }

  answerPrompt(item, response) {
    this.rest.answerPrompt(this.session._id, item._id, response)
  }

  isPromptDisplayed(prompt) {
    if (prompt.displayIndex === 0) {
      return true
    }
    return !isEmpty(prompt.displayIndex)
  }

  askQuestion(item) {
    // TODO: implement
  }
}
