import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'projects/libraries/helpers/src/lib/components/auth/data.service';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';

@Component({
  selector: 'app-relationships',
  templateUrl: './relationships.component.html',
  styleUrls: ['./relationships.component.css'],
})
export class RelationshipsComponent implements OnInit {
  viche = 'assets/img/viche.png';
  user!: string;
  private id_Apli: any;
  notifier: boolean = false;
  formulario!: FormGroup;
  errornotifier: boolean = false;
  larespuesta: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private handlerService: HandlerService,
    private dataService: DataService
  ) {
    this.user = this.dataService.getUser();
    this.id_Apli = this.dataService.getConsoleLogData();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      refs: ['', Validators.required],
    });
    this.errornotifier = false;
    this.notifier = false;
    this.relationships();
  }

  relationships() {}

  onSubmit() {
    this.formulario.markAllAsTouched();
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      const USER = this.user;
      const APP_ID = this.id_Apli;

      const parsedData = JSON.parse(`[${formData.refs}]`);

      const dataToSend = {
        relationships: parsedData,
      };

      const dataToSendJSON = JSON.stringify(dataToSend);

      this.handlerService
        .post(dataToSendJSON, `schemas/add/relationships/${USER}/${APP_ID}`)
        .subscribe(
          (resp) => {
            if (resp && resp.success === false) {
              this.errornotifier = true;
              this.larespuesta = resp['message'];
            } else {
              this.notifier = true;
              this.formulario.reset();
            }
          },
          (err) => {
            this.errornotifier = true;
            this.larespuesta = err['message'];
          }
        );
    } else {
      this.errornotifier = true;
      this.larespuesta = 'Make sure to fill in all the required fields.';
    }
  }

  closeDialog() {
    this.notifier = false;
  }

  closeDialog2() {
    this.errornotifier = false;
  }

  setHolaInDescription() {
    this.formulario
      .get('refs')
      ?.setValue(
        '{"type": "one-to-many","refs":{"index": 1,"mode": "simple","local": "invoice","ref": {"schema":"invoiceline"}}},{ "type": "many-to-one","refs": { "index": 2,"mode": "simple","local": "invoiceline","ref": {"schema":"invoice"}}}'
      );
  }

  setHola1InDescription() {
    this.formulario
      .get('refs')
      ?.setValue(
        '{"type": "one-to-many","refs": {"index": 1,"mode": "simple","local": "modelos", "ref": {"schema":"garantiavehiculos"}}},{"type": "many-to-one","refs": {"index": 2,"mode": "simple","local": "garantiavehiculos","ref": {"schema":"modelos"}} }'
      );
  }
}
