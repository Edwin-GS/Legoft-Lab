import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  sid: string | undefined;

  constructor(private router: Router) {
  }

  logout() {

    localStorage.removeItem('legoft-sid');

    this.router.navigate(['/auth/login']).catch(()=> {
      // Todo: add toast notifier
      console.log('Navigating to login page failed')
    });
  }

  getSID() {

    const sidTmp = localStorage.getItem('legoft-sid');

    if (sidTmp && sidTmp !== 'undefined') {

      this.sid = sidTmp;

    } else {

      this.sid = '';
    }

    return this.sid;
  }

}
