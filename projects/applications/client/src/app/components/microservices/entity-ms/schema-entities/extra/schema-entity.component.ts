import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'projects/libraries/helpers/src/lib/components/auth/data.service';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';

@Component({
  selector: 'app-schema-entity',
  templateUrl: './schema-entity.component.html',
  styleUrls: ['./schema-entity.component.css'],
})
export class SchemaEntityComponent implements OnInit {
  viche = 'assets/img/viche.png';
  formulario!: FormGroup;
  user!: string;
  private id_Apli: any;
  notifier: boolean = false;
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
      index: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.errornotifier = false;
    this.notifier = false;
  }

  onSubmit() {
    this.formulario.markAllAsTouched();
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      const USER = this.user;
      const APP_ID = this.id_Apli;

      const fields = JSON.parse(formData.description);

      const dataToSend = {
        index: formData.index,
        name: formData.name,
        fields: [fields],
        accessRoles: [{ role: 'SUPER' }, { role: 'ADMIN' }, { role: 'USER' }],
      };

      const dataToSendJSON = JSON.stringify(dataToSend);
      this.handlerService
        .post(dataToSendJSON, `schema-entities/add/${USER}/${APP_ID}`)
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

  setHolaInDescription() {
    this.formulario
      .get('description')
      ?.setValue(
        ' {"name":"nombre", "type": "string", "required": true, "update": true, "unique": true}'
      );
  }

  setHola1InDescription() {
    this.formulario
      .get('description')
      ?.setValue(
        ' {"name":"model", "type": "enum", "required": true, "update": true, "unique": false, "enum": ["A4", "Medium", "Large"]}, {"name":"totals", "type": "object", "required": true, "update": true, "unique": false, "object": [ {"name":"vat", "type": "calculated", "required": true, "update": true, "unique": false, "size": {"min": 1, "max": 9999999}}} ]}'
      );
  }

  closeDialog2() {
    this.errornotifier = false;
  }

  closeDialog() {
    this.notifier = false;
  }
}
