import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowedsComponent } from './followeds/followeds.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowerComponent } from './followers/extra/follower.component';
import { FollowedComponent } from './followeds/extra/followed.component';
import { UserComponent } from './users/user.component';
import { USER_ROUTES } from './users-ms.routes';

@NgModule({
  declarations: [
    FollowedsComponent,
    FollowersComponent,
    FollowerComponent,
    FollowedComponent,
    UserComponent,
  ],
  imports: [CommonModule, USER_ROUTES],
})
export class UserMsModule {}
