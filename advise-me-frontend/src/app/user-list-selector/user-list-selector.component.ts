import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {UsersListComponent} from "../users-list/users-list.component";

@Component({
  selector: 'app-user-list-selector',
  templateUrl: './user-list-selector.component.html',
  styleUrls: ['./user-list-selector.component.css']
})
export class UserListSelectorComponent implements OnInit {

  @Input() users: any
  @ViewChild(UsersListComponent) child;

  constructor(public modalService: BsModalService,
              public bsModalRef: BsModalRef) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    console.log(this.child?.selectedUsers)
  }

  onConfirm() {
    console.log(this.child?.selectedUsers)
  }

  onCancel() {
    console.log(this.child?.selectedUsers)
  }



}
