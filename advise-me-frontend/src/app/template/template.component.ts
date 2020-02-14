import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RestService } from "../rest.service";
import { Router } from "@angular/router";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {UserListSelectorComponent} from "../user-list-selector/user-list-selector.component";
import {initialState} from "ngx-bootstrap/timepicker/reducer/timepicker.reducer";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  public modalRef: BsModalRef;

  constructor(public rest: RestService, public router: Router, private modalService: BsModalService) { }

  users: any

  tags: any

  selectedTags: any

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

  /*onItemAdded(event) {
    this.session.assignedUserIds = this.Ids.map(x => x._id);
    console.log("HERE!");
  }
  */

  validationMessage: String;

  session: any={
    topic: "",
    creatorFirstName: "",
    creatorId: "",
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

      this.Ids=result;
      
      console.log('results', result);
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
      //
      this.session.assignedUserIds = this.Ids.map(x => x._id);
      console.log(this.session);
      this.rest.createSession(this.session);
    
      
    

    } catch (e) {
      console.log({ e });
    }


  }
}
