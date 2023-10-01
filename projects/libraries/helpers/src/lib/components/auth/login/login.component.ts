import {Component, Input} from '@angular/core';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * Login with admin only by email
   * **/

  @Input() isAdmin = false;

}
