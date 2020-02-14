import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import {
  trigger,
  transition,
  style,
  animate,
  query
} from "@angular/animations";

export const fadeAnimation = trigger("fadeAnimation", [
  transition(":enter", [
    style({ opacity: 0 }),
    animate("300ms", style({ opacity: 1 }))
  ]),
  transition(":leave", [
    style({ opacity: 1 }),
    animate("300ms", style({ opacity: 0 }))
  ])
]);

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"],
  animations: [fadeAnimation]
})
export class UsersListComponent implements OnInit {
  @Input("users") users;
  @Input("isSelector") isSelector: boolean

  constructor(private router: Router) {}

  get selectedUsers () {
    return this.users.filter(user => user.isSelected);
  }

  ngOnInit(): void {
    console.log("IN HERE!");
    console.log(this.users);
  }

  editUser(user): void {
    console.log({ user });
    this.router.navigate([`/users`, user.email]);
  }

  create(): void {
    this.router.navigate([`/users`, "add"]);
  }

  getRandomSample(num: number) {
    this.users.forEach(user => {
      user.isSelected = false;
    })
    console.log(this.users)
    console.log('here!')
    const randomSample = (arr, k, withReplacement = false) => {
      let sample;
      if (withReplacement === true) {  // sample with replacement
        sample = Array.from({length: k}, () => arr[Math.floor(Math.random() *  arr.length)]);
      } else {// sample without replacement
        const length = k > arr.length ? arr.length : k

        sample = arr.map(a => [a, Math.random()]).sort((a, b) => {
          return a[1] < b[1] ? -1 : 1;}).slice(0, length).map(a => a[0]);
      };
      return sample;
    };
    const users = randomSample(this.users, num )

    console.log({users})
    console.log(this.users)

    users.forEach(user => {
      const foundUser = this.users.find(otherUser => otherUser._id == user._id)
      foundUser.isSelected = true
    })
  }


}
