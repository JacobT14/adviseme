import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {UsersListComponent} from "../users-list/users-list.component";
import {Subject} from "rxjs";

@Component({
  selector: 'app-user-list-selector',
  templateUrl: './user-list-selector.component.html',
  styleUrls: ['./user-list-selector.component.css']
})
export class UserListSelectorComponent implements OnInit {

  @Input() users: any
  @ViewChild(UsersListComponent) child;
  public onClose: Subject<any>;

  numOfSelection: number = 5


  constructor(public modalService: BsModalService,
              public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }
  ngAfterViewInit() {
    console.log(this.child?.selectedUsers)
  }

  onConfirm() {
    console.log(this.child?.selectedUsers)
    this.onClose.next(this.child?.selectedUsers)
    this.bsModalRef.hide()
  }

  onCancel() {
    console.log(this.child?.selectedUsers)
    this.onClose.next([])
    this.bsModalRef.hide()
  }

  getRandomSample() {
    const users = this.child?.getRandomSample(this.numOfSelection)
  }



}
