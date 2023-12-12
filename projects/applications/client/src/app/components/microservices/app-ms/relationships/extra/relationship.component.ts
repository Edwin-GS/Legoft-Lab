import { Component, OnInit } from '@angular/core';
import { DataService } from 'projects/libraries/helpers/src/lib/components/auth/data.service';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.css'],
})
export class RelationshipComponent implements OnInit {
  viche = 'assets/img/viche.png';
  logoUrl: string = 'assets/favicon/android-icon-48x48.png';
  user!: string;
  id!: string;
  applicationId: any;
  schemasGeneral: any[] = [];
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
    this.applicationId = this.dataService.getConsoleLogData();
  }

  ngOnInit() {
    // this.setIdApli(this.id_Apli);
    this.loadSchemas();
  }

  closeDialog2() {
    this.errornotifier = false;
  }

  nombreSchema(name: string) {
    this.dataService.setNombreSchema(name);
  }

  loadSchemas() {
    this.loading = true;
    this.handlerService
      .get(`schemas/${this.user}/${this.applicationId}`)
      .subscribe(
        (response) => {
          if (response && response.data) {
            this.schemasGeneral = response.data[0].schemas;
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

  closeDialog() {
    this.notifier = false;
  }

  setIdApli(_id: any) {
    this.dataService.setConsoleLogData(_id);
  }

  // deleteschema() {
  //   console.log('Para borrar el schema una vez resuelto el problema.');
  // }
}
