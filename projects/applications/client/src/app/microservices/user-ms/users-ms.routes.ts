import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./users/user.component";
import {FollowedsComponent} from "./followeds/followeds.component";
import {FollowedComponent} from "./followeds/extra/followed.component";
import {FollowersComponent} from "./followers/followers.component";
import {FollowerComponent} from "./followers/extra/follower.component";

const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    title: 'Users'
  },
  {
    path: 'followeds',
    component: FollowedsComponent,
    title: 'Followed'
  },
  {
    path: 'followed',
    component: FollowedComponent,
    title: 'Followed'
  },
  {
    path: 'followers',
    component: FollowersComponent,
    title: 'Followed'
  },
  {
    path: 'follower',
    component: FollowerComponent,
    title: 'Follower'
  }
];

export const USER_ROUTES = RouterModule.forChild(UserRoutes);

