import { Component, OnInit } from '@angular/core';
import { DataService } from 'projects/libraries/helpers/src/lib/components/auth/data.service';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.css'],
})
export class RelationshipComponent implements OnInit {
  user!: string;
  private id_Apli: any;
  schemasGeneral: any[] = [];
  noSchemas: boolean = false;

  constructor(
    private dataService: DataService,
    private handlerService: HandlerService
  ) {
    this.user = this.dataService.getUser();
    this.id_Apli = this.dataService.getConsoleLogData();
  }

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.handlerService.get(`schemas/${this.user}/${this.id_Apli}`).subscribe(
      (response) => {
        if (response && response.data) {
          this.schemasGeneral = response.data[0].schemas;
          console.log(this.schemasGeneral, 'Schemas 2');
          this.noSchemas = this.schemasGeneral.length === 0;
        } else {
          console.log('Hubo un error 1');
        }
      },
      (error) => {
        if (error.status === 404) {
          console.log('Hubo un error 2');
        } else {
          console.log('Hubo un error 3');
        }
      }
    );
  }
}
