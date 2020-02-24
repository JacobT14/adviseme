import { BrowserModule } from "@angular/platform-browser";
import { TagInputModule } from 'ngx-chips';
import { ModalModule } from 'ngx-bootstrap';
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavigationComponent } from "./navigation/navigation.component";
import { AuthenticatedHomeComponent } from "./authenticated-home/authenticated-home.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./user/user.component";
import { AuthGuardService } from "./auth-guard-service";
import { RouterModule } from "@angular/router";
import { AuthService } from "./authentication/auth-service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { SessionListComponent } from "./session-list/session-list.component";
import { TemplateComponent } from './template/template.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserListSelectorComponent } from './user-list-selector/user-list-selector.component';
import {SessionParticipationComponent} from "./template/session-participation/session.participation.component";
import { SessionParticipationChatComponent } from './template/session-participation/session-participation-chat/session-participation-chat.component';
import { SessionParticipationPromptsComponent } from './template/session-participation/session-participation-prompts/session-participation-prompts.component';

const config: SocketIoConfig = { url: "http://localhost:3000", options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NavigationComponent,
    AuthenticatedHomeComponent,
    UsersListComponent,
    UsersComponent,
    UserComponent,
    SessionListComponent,
    TemplateComponent,
    UserListSelectorComponent,
    SessionParticipationComponent,
    SessionParticipationChatComponent,
    SessionParticipationPromptsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    TagInputModule,
    ModalModule.forRoot()
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
