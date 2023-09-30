import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FollowedsComponent} from './followeds/followeds.component';
import {FollowersComponent} from './followers/followers.component';
import { FollowerComponent } from './followers/extra/follower.component';
import { FollowedComponent } from './followeds/extra/followed.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/extra/user.component';



@NgModule({
  declarations: [
    FollowedsComponent,
    FollowersComponent,
    FollowerComponent,
    FollowedComponent,
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserMsModule {
}
