import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classic',
  templateUrl: './classic.component.html',
  styleUrls: ['./classic.component.css'],
})
export class ClassicComponent {
  logoUrl = 'assets/logo/Legoft-Logo-OK-01-HIGH.png';
  logoMiniUrl = 'assets/favicon/android-icon-192x192.png';
  sidebarOpen = true;
  user!: string;
  userId!: number;
  menuItems: any[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
    { path: '/applications', title: 'Applications', icon: 'apps', class: '' },
    { path: '/entities', title: 'Entities', icon: 'E', class: '' },
    { path: '/owner', title: 'Owner', icon: 'business', class: '' },
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
