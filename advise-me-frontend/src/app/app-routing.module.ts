import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./user/user.component";
import { TemplateComponent } from "./template/template.component";
import { AuthGuardService } from "./auth-guard-service";
import {SessionListComponent} from "./session-list/session-list.component";
import {ChatListComponent} from "./chat/chat-list/chat-list.component";
import {ChatCombinedComponent} from "./chat/chat-combined/chat-combined.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "session-list",
    component: SessionListComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRole: "ADMIN"
    }
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRole: "ADMIN"
    }
  },
  {
    path: "users/:userId",
    component: UserComponent,
    canActivate: [AuthGuardService],
    data: {
      expectedRole: "ADMIN"
    }
  },
  {
    path: "sessions",
    component: TemplateComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "sessions/:sessionId",
    component: TemplateComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "chat",
    component: ChatCombinedComponent,
    canActivate: [AuthGuardService],
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
