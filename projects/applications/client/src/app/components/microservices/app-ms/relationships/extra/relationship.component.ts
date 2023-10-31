import { Component, OnInit } from '@angular/core';
import { DataService } from 'projects/libraries/helpers/src/lib/components/auth/data.service';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.css'],
})
export class RelationshipComponent implements OnInit {
  viche = 'assets/img/viche-x.png';
  user!: string;
  id!: string;
  private id_Apli: any;
  schemasGeneral: any[] = [];
  notifier: boolean = false;

  constructor(
    private dataService: DataService,
    private handlerService: HandlerService
  ) {
    this.user = this.dataService.getUser();
    this.id = this.dataService.getUserId();
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
        } else {
          this.notifier = true;
        }
      },
      (error) => {
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

  IdApli(_id: any) {
    this.dataService.setConsoleLogData(_id);
  }
}
