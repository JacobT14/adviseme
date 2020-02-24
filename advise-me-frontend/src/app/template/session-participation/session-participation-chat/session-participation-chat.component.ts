import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-session-participation-chat',
  templateUrl: './session-participation-chat.component.html',
  styleUrls: ['./session-participation-chat.component.css']
})
export class SessionParticipationChatComponent implements OnInit {
  @Input("message") message;

  constructor() { }

  ngOnInit(): void {
  }

}
