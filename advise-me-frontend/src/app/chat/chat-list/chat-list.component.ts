import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  @Output() onChatSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input("chats") chats

  selectedChat = {}

  constructor() {
  }

  ngOnInit(): void {

    this.setSelectedChat(this.chats[0])
  }

  isSelected(chat) {
    if (chat === this.selectedChat) {
      return true
    } else {
      return false
    }
  }

  getDisplayNames(chat) {
    return chat.users.map(user => `${user.firstName} ${user.lastName}`).join(", ")
  }

  setSelectedChat(chat) {
    this.selectedChat = chat;
    this.onChatSelected.emit(chat)
  }

}
