import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private user: string = '';
  private userId: string = '';
  private id_Apli: any;

  constructor() {}

  setUser(user: string) {
    this.user = user;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  setConsoleLogData(data: any) {
    this.id_Apli = data;
  }

  getUser(): string {
    return this.user;
  }

  getUserId(): string {
    return this.userId;
  }

  getConsoleLogData() {
    return this.id_Apli;
  }
}
