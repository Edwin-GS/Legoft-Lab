import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'projects/libraries/helpers/src/lib/components/auth/data.service';

@Component({
  selector: 'app-classic',
  templateUrl: './classic.component.html',
  styleUrls: ['./classic.component.css'],
})
export class ClassicComponent {
  avatar = 'assets/img/Avatar.png';
  logoUrl = 'assets/logo/Legoft-Logo-OK-01-HIGH.png';
  logoMiniUrl = 'assets/favicon/android-icon-192x192.png';
  sidebarOpen = true;
  user!: string;
  id!: string;

  constructor(
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = this.dataService.getUser();
    this.id = this.dataService.getUserId();
    console.log('User:', this.user);
    console.log('User ID:', this.id);
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
}
