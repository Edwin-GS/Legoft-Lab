import { Component, OnInit } from '@angular/core';
import { DataService } from 'projects/libraries/helpers/src/lib/components/auth/data.service';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css'],
})
export class EntitiesComponent implements OnInit {
  viche = 'assets/img/viche.png';
  vicherror = 'assets/img/viche-x.png';
  logoUrl: string = 'assets/favicon/android-icon-48x48.png';
  user!: string;
  id!: string;
  nameSchema!: string;
  private id_Apli: any;
  entitiesGeneral: any[] = [];
  notifier: boolean = false;
  loading: boolean = false;
  errornotifier: boolean = false;
  larespuesta: string = '';
  notifier2: boolean = false;

  constructor(
    private handlerService: HandlerService,
    private dataService: DataService
  ) {
    this.user = this.dataService.getUser();
    this.id = this.dataService.getUserId();
    this.id_Apli = this.dataService.getConsoleLogData();
    this.nameSchema = this.dataService.getNombreSchema();
  }

  ngOnInit() {
    this.loadEntities();
    this.notifier2 = false;
  }

  loadEntities() {
    this.loading = true;
    this.handlerService
      .get(`entities/${this.user}/${this.nameSchema}/${this.id_Apli}`)
      .subscribe(
        (response) => {
          if (response && response.data) {
            this.entitiesGeneral = response.data;
            this.loading = false;
          } else {
            this.notifier = true;
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
          if (error.status === 404) {
            this.notifier = true;
          } else {
            this.notifier = true;
          }
        }
      );
  }

  applicationId: any;

  closeDialogOpen(application: any) {
    this.notifier2 = true;
    this.applicationId = application;
  }

  closeDialogApiYes() {
    this.notifier2 = false;
    this.deleteEntities(this.applicationId);
  }

  closeDialogApi() {
    this.notifier2 = false;
  }

  closeDialog() {
    this.notifier = false;
  }

  closeDialogError() {
    this.errornotifier = false;
  }

  deleteEntities(application: any) {
    this.handlerService
      .delete(
        `entities/delete/${this.user}/${this.nameSchema}/${this.id_Apli}/${application}`
      )
      .subscribe(
        (resp) => {
          if (resp && resp.success === false) {
            this.errornotifier = true;
            this.larespuesta = resp['message'];
          } else {
            this.notifier = true;
            this.loadEntities();
            this.larespuesta = resp['message'];
          }
        },
        (err) => {
          this.errornotifier = true;
          this.larespuesta = err.message;
        }
      );
  }
}
