import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './users/user.component';
import { FollowedsComponent } from './followeds/followeds.component';
import { FollowedComponent } from './followeds/extra/followed.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowerComponent } from './followers/extra/follower.component';

/**
 * Base route information
 *
 * users >> /legoft-lab/users/:user/:user_id
 *
 * followeds >> /legoft-lab/users/:user/:user_id/followeds
 *
 * followed >> /legoft-lab/users/:user/:user_id/followed
 *
 * followers >> /legoft-lab/users/:user/:user_id/followers
 *
 * follower >> /legoft-lab/users/:user/:user_id/follower
 *
 * **/

const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    title: 'Users',
  },
  {
    path: 'followeds',
    component: FollowedsComponent,
    title: 'Followed',
  },
  {
    path: 'followed',
    component: FollowedComponent,
    title: 'Followed',
  },
  {
    path: 'followers',
    component: FollowersComponent,
    title: 'Followed',
  },
  {
    path: 'follower',
    component: FollowerComponent,
    title: 'Follower',
  },
];

export const USER_ROUTES = RouterModule.forChild(UserRoutes);
