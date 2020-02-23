import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {RestService} from "../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {UserListSelectorComponent} from "../user-list-selector/user-list-selector.component";
import {initialState} from "ngx-bootstrap/timepicker/reducer/timepicker.reducer";
import {map} from "rxjs/operators";
import AuthService from "../authentication/auth-service";
import {FormGroup, FormBuilder, FormControl, Validators, FormArray} from '@angular/forms';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  public modalRef: BsModalRef;
  sessionForm: FormGroup;

  constructor(private fb: FormBuilder, public rest: RestService, public router: Router, private modalService: BsModalService, public auth: AuthService, public route: ActivatedRoute) {
  }

  get selectedUsers() {
    return this.selectedTags.map(tag => tag.value._id)
  }

  isAddMode: boolean = false

  users: any

  tags: any

  selectedTags: any = []

  prompts: FormArray;

  sessionId: String

  get promptControls() {
    this.prompts = this.sessionForm.get('prompts') as FormArray;
    return this.prompts.controls
  }

  pushBackToHomeCheck() {
    if (this.auth.isAdvisor) {
      this.router.navigateByUrl("/home")
    }
  }

  async ngOnInit(): Promise<void> {
    this.sessionForm = this.fb.group({
      topic: [, Validators.required],
      departmentFilter: [, Validators.required],
      selectedTags: [, Validators.required],
      prompts: this.fb.array([this.createPrompt()]),
      creatorId: [this.auth.user._id]
    });

    this.route.params.subscribe(async params => {
      const sessionId = params.sessionId
      this.sessionId = sessionId
      if (typeof sessionId === "undefined") {
        this.pushBackToHomeCheck()
        this.isAddMode = true;
      } else {

        this.isAddMode = false
        this.session = await this.rest.getSessionById(sessionId);
        console.log(this.session)
        if (!this.session.isActive) {
          this.pushBackToHomeCheck()
        }
        console.log(this.session.prompts)
        this.sessionForm.patchValue({
          topic: this.session.topic,
          departmentFilter: this.session.departmentFilter,
          selectedTags: this.session.assignedUsers.map(user => {
            return {
              display: `${user.firstName} ${user.lastName}`,
              value: user,
              readonly: false
            }
          })
        })
        this.prompts = this.sessionForm.get('prompts') as FormArray;
        this.prompts.clear()
        this.session.prompts.forEach((prompt) => this.addPrompt(prompt))
        console.log(this.sessionForm.value.prompts)
      }
    });




    const users = await this.rest.getUsers();
    this.users = users;
    const tags = users.map(user => {
      return {
        display: `${user.firstName} ${user.lastName}`,
        value: user,
        readonly: false
      }
    })
    this.tags = tags;

    console.log(this.sessionForm)
  }

  validationMessage: String;

  session: any = {
    topic: "",
    creatorId: this.auth.user._id,
    departmentFilter: "",
    assignedUserIds: [],
    prompts: [],
  }

  addPrompt(prompt?) {
    console.log({prompt})
    this.prompts = this.sessionForm.get('prompts') as FormArray;
    console.log(this.prompts)
    this.prompts.push(this.createPrompt(prompt));
    console.log(this.prompts)
    this.session.prompts.push(prompt || {
      label: "",
      type: null,
      possibleAnswers: null
    })
    console.log(this.sessionForm)
  }


  close() {
    this.validationMessage = null;
  }

  createPrompt(prompt?): FormGroup {
    console.log({prompt})
    return this.fb.group({
      label: prompt?.label || '',
      type: prompt?.type || 'OPEN',
      possibleAnswers: [prompt?.possibleAnswers] || []
    });
  }

  async assignUsersModal() {
    const initialState = {users: this.users}
    this.modalRef = this.modalService.show(UserListSelectorComponent, {initialState});
    this.modalRef.content.onClose.subscribe(result => {
      if (typeof result === "object") {
        const selectedTagsArray = this.sessionForm.get('selectedTags') as FormArray;
        selectedTagsArray.setValue(result.map(user => {
          return {
            display: `${user.firstName} ${user.lastName}`,
            value: user,
            readonly: false
          }
        }))
      }
    })
  }

  get sessionToSend() {
    console.log(this.sessionForm.value)
    const sessionToSend = Object.assign({}, this.sessionForm.value);
    console.log({sessionToSend})
    sessionToSend.assignedUserIds = sessionToSend.selectedTags.map(tag => tag.value._id)
    delete sessionToSend.selectedTags
    sessionToSend.isActive = false;
    return sessionToSend
  }

  async createSession(): Promise<void> {
    this.validationMessage = null;

    try {
      console.log(this.sessionForm)
      const createdSession = await this.rest.createSession(this.sessionToSend);

      console.log({createdSession})


    } catch (e) {
      console.log({e});
    }


  }

  async saveSession(): Promise<void> {
    this.validationMessage = null;

    try {
      const createdSession = await this.rest.updateSession(this.sessionId, this.sessionToSend);

      console.log({createdSession});
      this.router.navigateByUrl("/session-list");


    } catch (e) {
      console.log({e});
    }


  }

  async activateSession(): Promise<void> {
    this.validationMessage = null;
    const sessionToActivate = this.sessionToSend;
    sessionToActivate.isActive = true;
    console.log({sessionToActivate});
    try {
      console.log(this.sessionForm);

      console.log(sessionToActivate);
      const activatedSession = await this.rest.activateSession(this.sessionId, sessionToActivate);
      console.log({activatedSession});
      this.router.navigateByUrl("/session-list");


    } catch (e) {
      console.log({e});
    }


  }
}
