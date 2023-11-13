import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private user: string = '';
  private userId: string = '';
  private nombreSchema: string = '';
  private id_Apli: any;
  private data_entity: any;

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

  setNombreSchema(name: string) {
    this.nombreSchema = name;
  }

  setDataEntity(data: any) {
    this.data_entity = data;
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

  getNombreSchema(): string {
    return this.nombreSchema;
  }

  getDataEntity(): any {
    return this.data_entity;
  }

  clearDataName() {
    return (this.nombreSchema = '');
  }

  clearDataEntity() {
    return (this.data_entity = 'Press a sample button');
  }
}
