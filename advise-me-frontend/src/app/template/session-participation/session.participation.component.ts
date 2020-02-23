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

  constructor(public rest: RestService, public router: Router, public auth: AuthService, public route: ActivatedRoute) {
  }


  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
      const sessionId = params.sessionId
      this.session = await this.rest.getSessionById(sessionId);
      console.log(this.session)
      console.log(this.activePrompts)
      this.displayedItems.push(...this.activePrompts)
      this.syncAnswers()
    });

    this.rest.promptAsked.subscribe(session => {
        console.log('GOT CHANGE!')
        if (session._id === this.session._id) {
          console.log({session})
          this.session = session
          const prompts = this.activePrompts
          this.displayedItems.push(prompts[prompts.length - 1])
        }

      }
    );

    this.rest.sessionsChanged.subscribe(session => {
        console.log('GOT CHANGE!')
        if (session._id === this.session._id) {
          //sync prompt responses
          this.session.prompts = session.prompts;
          this.syncAnswers()
        }

      }
    );
  }

  syncAnswers() {
    this.displayedItems.forEach((displayItem, index) => {
      const matchingPrompt = this.session.prompts.find((prompt) => {
        return prompt._id === displayItem._id
      })
      if (matchingPrompt) {
        matchingPrompt.answer = this.promptResponse(matchingPrompt)
        this.displayedItems[index] = matchingPrompt
      }
    })
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
    const activePrompts = filter(this.session.prompts, (prompt) => {
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
    console.log({response})
    this.rest.answerPrompt(this.session._id, item._id, response)
  }

  isPromptDisplayed(prompt) {
    if (typeof prompt.displayIndex === "undefined") {
      return false
    }
    return true
  }

  promptResponse(prompt) {
    return prompt.answers.find(answer => answer.user === this.auth.user._id)?.response
  }

  async askQuestion(item) {
    // TODO: implement
    const displayIndex = this.activePrompts.length
    console.log({displayIndex})
    const newSession = await this.rest.updatePrompt(this.session._id, item._id, displayIndex)
    console.log({newSession})
  }
}
