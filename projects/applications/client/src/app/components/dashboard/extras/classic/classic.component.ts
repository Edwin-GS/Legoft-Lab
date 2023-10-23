import { Router } from '@angular/router';
import { DataService } from 'projects/libraries/helpers/src/lib/components/auth/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-classic',
  templateUrl: './classic.component.html',
  styleUrls: ['./classic.component.css'],
})
export class ClassicComponent {
  avatar = 'assets/img/Avatar.png';
  logoUrl = 'assets/logo/Legoft-Logo-OK-01-HIGH.png';
  logoMiniUrl = 'assets/favicon/android-icon-192x192.png';
  viche = 'assets/img/viche.png';
  sidebarOpen = true;
  user!: string;
  id!: string;
  activeLink: string;
  notifier: boolean = false;

  constructor(private router: Router, private dataService: DataService) {
    this.user = this.dataService.getUser();
    this.id = this.dataService.getUserId();
    this.activeLink = 'dashboard';
    this.notifier = false;
  }

  navigateTo(route: string) {
    if (route === 'dashboard') {
      this.router.navigate(['/legoft-lab/client', this.user, this.id]);
    } else if (route === 'users') {
      this.router.navigate(['/legoft-lab/client', this.user, this.id, 'users']);
    } else if (route === 'applications') {
      this.router.navigate([
        '/legoft-lab/client',
        this.user,
        this.id,
        'applications',
      ]);
    } else {
      this.router.navigate([route]);
    }
  }

  getTitleForActiveLink(): string {
    switch (this.activeLink) {
      case 'dashboard':
        return 'Dashboard';
      case 'users':
        return 'Users';
      case 'applications':
        return 'Applications';
      default:
        return 'Dashboard';
    }
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }

  isDashboardView() {
    return this.activeLink === 'dashboard';
  }

  clearSession() {
    localStorage.removeItem('LEGOFT_SID_SITE');
  }

  closeDialog2() {
    this.clearSession();
    this.notifier = false;
  }

  closeDialog() {
    this.notifier = false;
  }

  closeDialogOpen() {
    this.notifier = true;
  }
}
