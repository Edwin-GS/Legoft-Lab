import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private user: string = '';
  private userId: string = '';

  constructor() {}

  setUser(user: string) {
    this.user = user;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUser(): string {
    return this.user;
  }

  getUserId(): string {
    return this.userId;
  }
}
