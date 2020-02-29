import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import AuthService from "../../authentication/auth-service";
import {RestService} from "../../rest.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  _chat

  @Input()
  set chat(chat) {
    this._chat = chat;
  }

  @Input("users") users;

  message

  tags = []

  selectedTags = []

  constructor(public authService: AuthService, public restService: RestService) { }

  ngOnInit(): void {
    const usersToUse = this.users.filter(user => user._id !== this.authService.user._id)
    const tags = usersToUse.map(user => {
      return {
        display: `${user.firstName} ${user.lastName}`,
        value: user,
        readonly: false
      }
    })
    this.tags = tags;
    console.log(this.users)
  }

  ngOnChanges() {
    console.log("CHANGES ARE COMING!!!")
    const usersToUse = this.users.filter(user => user._id !== this.authService.user._id)
    const tags = usersToUse.map(user => {
      return {
        display: `${user.firstName} ${user.lastName}`,
        value: user,
        readonly: false
      }
    })
    this.tags = tags;
    if (this._chat) {
    const chatUsersToUse =  this._chat.users.filter(user => user._id !== this.authService.user._id)
    console.log(this.users)

      this.selectedTags = chatUsersToUse.map(user => {
        return {
          display: `${user.firstName} ${user.lastName}`,
          value: user,
          readonly: true
        }
      })

    }
  }

  ngAfterViewInit() {
    console.log(this._chat)
  }

  async sendMessage(){
    console.log(this.selectedTags);
    if (!this._chat) {
      console.log(this.message)
      const chat = {
        users: [this.authService.user._id, ...this.selectedTags.map(tag => tag.value._id)],
        messages: [{
          from: this.authService.user._id,
          message: this.message,
          date: new Date().toISOString()
        }]
      }
      const response = await this.restService.startPrivateMessage(chat)
      this._chat = response
    }
    else {

      const message = {
        chatId: this._chat._id,
        from: this.authService.user._id,
        message: this.message,
        date: new Date().toISOString()
      }
      console.log({message})
      await this.restService.sendPrivateMessage(this._chat._id, message)
    }
    this.message = null
    this.scrollToBottom()
  }

  getUserName(userId) {
    const user = this._chat.users.find(user => user._id === userId)
    return `${user.firstName} ${user.lastName}`
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

}
