import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RestService } from "../rest.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor(public rest: RestService, public router: Router) { }

  ngOnInit(): void {
  }

  validationMessage: String;
  prompt: any = {
    label: "",
    type: null,
    possibleAnswers: null
  };

  session: any={
    topic: "",
    creatorFirstName: "",
    creatorEmail: "",
    departmentFilter: "",
    assignedUserIds: [],
    prompts: [this.prompt]
  }
  

  close() {
    this.validationMessage = null;
  }

  async createSession(): Promise<void> {
    this.validationMessage = null;
    try {
      //const promptData = await this.rest.createPrompt(this.prompt);
      const data = await this.rest.createSession(this.session);
      console.log({ data });
      localStorage.setItem("session", JSON.stringify(data));
      
    } catch (e) {
      console.log({ e });
    }
      
  }
}
