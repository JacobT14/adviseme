import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RestService } from "../rest.service";
import { Router } from "@angular/router";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {UserListSelectorComponent} from "../user-list-selector/user-list-selector.component";
import {initialState} from "ngx-bootstrap/timepicker/reducer/timepicker.reducer";
import {map} from "rxjs/operators";
import AuthService from "../authentication/auth-service";


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  public modalRef: BsModalRef;

  constructor(public rest: RestService, public router: Router, private modalService: BsModalService, public auth: AuthService) { }

  get selectedUsers() {
    return this.selectedTags.map(tag => tag.value._id)
  }

  users: any

  tags: any

  selectedTags: any = []

  Ids: any


 async ngOnInit(): Promise<void> {
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
  }

  validationMessage: String;

  session: any={
    topic: "",
    creatorId: this.auth.user._id,
    departmentFilter: "",
    assignedUserIds: [],
    prompts: [],
  }

  addPrompt() {
    this.session.prompts.push({
      label: "",
      type: null,
      possibleAnswers: null
    })
  }


  close() {
    this.validationMessage = null;
  }

  async assignUsersModal() {
    const initialState = {users: this.users}
    this.modalRef = this.modalService.show(UserListSelectorComponent, {  initialState });
    this.modalRef.content.onClose.subscribe(result => {
      if (typeof result === "object") {
        this.selectedTags = result.map(user => {
          return {
            display: `${user.firstName} ${user.lastName}`,
            value: user,
            readonly: false
          }
        })
      }
    })
  }

  async createSession(): Promise<void> {
    this.validationMessage = null;

    try {
      this.session.assignedUserIds = this.selectedUsers
      console.log(this.session)
      const createdSession = await this.rest.createSession(this.session);

      console.log({createdSession})



    } catch (e) {
      console.log({ e });
    }


  }
}
