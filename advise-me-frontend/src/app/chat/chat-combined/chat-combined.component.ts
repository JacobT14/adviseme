import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UsersListComponent} from "../../users-list/users-list.component";
import {ChatListComponent} from "../chat-list/chat-list.component";
import {RestService} from "../../rest.service";
import {find} from 'lodash'

@Component({
  selector: 'app-chat-combined',
  templateUrl: './chat-combined.component.html',
  styleUrls: ['./chat-combined.component.css']
})
export class ChatCombinedComponent implements OnInit {
  @ViewChild(ChatListComponent) child: ChatListComponent;


  selectedChat = null

  chats = []

  users = []

  tags = []

  constructor(public rest: RestService, private cd: ChangeDetectorRef) {
  }


  ngOnInit() {

    this.rest.getChats().then(chats => {
      console.log({chats})
      this.chats = chats
      this.cd.detectChanges()
    })

    this.rest.getUsers().then(users => {
      this.users = users;
      console.log(users)
      this.cd.detectChanges()
      this.updateSelectedChat();
      this.cd.detectChanges()
    });


    this.rest.privateMessage.subscribe(newMessage => {
        console.log('GOT CHANGE!')
        console.log({newMessage})
        console.log(newMessage)
        const chat = find(this.chats, {_id: newMessage.chatId})
        chat.messages.push(newMessage.message)

        this.updateSelectedChat();
        this.cd.detectChanges()
      }
    );

    this.rest.startPrivateMessageSub.subscribe(newMessage => {
        console.log('GOT NEW CHAT!')
        console.log({newMessage})
        console.log(newMessage)
        this.chats.push(newMessage.message)
        this.cd.detectChanges()
        this.updateSelectedChat();
        this.cd.detectChanges()
      }
    );
  }

  setSelectedChat(chat) {
    this.selectedChat = chat
  }

  updateSelectedChat() {
    setTimeout(() => {
      this.selectedChat = this.chats.find(chat => chat._id === this.selectedChat._id)
      console.log(this.selectedChat)
    }, 100);
    this.cd.detectChanges()

  }

}
