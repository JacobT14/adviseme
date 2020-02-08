import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavigationComponent } from "./navigation/navigation.component";
import { AuthenticatedHomeComponent } from "./authenticated-home/authenticated-home.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./user/user.component";
import { AuthGuardService } from "./auth-guard-service";
import { RouterModule } from "@angular/router";
import { AuthService } from "./authentication/auth-service";

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
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
