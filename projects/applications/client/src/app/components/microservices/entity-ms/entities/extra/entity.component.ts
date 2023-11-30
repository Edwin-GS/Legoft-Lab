import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'projects/libraries/helpers/src/lib/components/auth/data.service';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css'],
})
export class EntityComponent implements OnInit {
  viche = 'assets/img/viche.png';
  logoUrl: string = 'assets/favicon/android-icon-48x48.png';
  user!: string;
  id!: string;
  nameShcema!: string;
  private id_Apli: any;
  schemasGeneral: any[] = [];
  notifier: boolean = false;
  showModal: boolean = false;
  newAppForm!: FormGroup;
  errornotifier: boolean = false;
  larespuesta: string = '';
  notifier2: boolean = false;
  data_Entity: any;
  data_EntityClear: any;

  constructor(
    private formBuilder: FormBuilder,
    private handlerService: HandlerService,
    private dataService: DataService
  ) {
    this.user = this.dataService.getUser();
    this.id = this.dataService.getUserId();
    this.id_Apli = this.dataService.getConsoleLogData();
    this.nameShcema = this.dataService.getNombreSchema();
    this.data_Entity = this.dataService.getDataEntity();
    this.data_EntityClear = this.dataService.clearDataEntity();
  }

  ngOnInit() {
    this.newAppForm = this.formBuilder.group({
      entities: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      schema: [''],
    });

    this.errornotifier = false;
    this.notifier = false;
    this.notifier2 = false;

    this.getSchemas();

    this.newAppForm.get('entities')?.setValue(JSON.stringify(this.data_Entity));
  }

  closeDialog() {
    this.notifier = false;
  }

  closeDialog2() {
    this.errornotifier = false;
  }

  clearText() {
    this.newAppForm
      .get('entities')
      ?.setValue(
        '{"numInvoice": 1,"model": "A4","totals": {"discount":0, "vat": 0,"total": 0}}'
      );
  }

  createEntities() {
    this.newAppForm.markAllAsTouched();

    const data = this.newAppForm.value.entities;
    const parsedData = JSON.parse(data);
    const idValue = parsedData._id;

    if (idValue) {
      this.updataEntities();
    } else {
      if (this.newAppForm.valid) {
        this.handlerService
          .post(
            data,
            `entities/create/${this.user}/${this.nameShcema}/${this.id_Apli}`
          )
          .subscribe(
            (resp) => {
              if (resp && resp.success === false) {
                this.errornotifier = true;
                this.larespuesta = resp['message'];
              } else {
                this.notifier = true;
                this.clearText();
                this.larespuesta = resp['message'];
              }
            },
            (err) => {
              this.errornotifier = true;
              this.larespuesta = err['message'];
            }
          );
      } else {
        this.errornotifier = true;
        this.larespuesta = 'Error.';
      }
    }
  }

  updataEntities() {
    const data = this.newAppForm.value.entities;
    this.handlerService
      .put(
        data,
        `entities/update/${this.user}/${this.nameShcema}/${this.id_Apli}/${this.data_Entity._id}`
      )
      .subscribe(
        (resp) => {
          if (resp && resp.success === false) {
            this.errornotifier = true;
            this.larespuesta = resp['message'];
          } else {
            this.notifier = true;
            this.clearText();
            this.larespuesta = resp['message'];
          }
        },
        (err) => {
          this.errornotifier = true;
          this.larespuesta = err.message;
        }
      );
  }

  getSchemas() {
    this.handlerService
      .get(`schemas/${this.user}/${this.nameShcema}/${this.id_Apli}`)
      .subscribe(
        (response) => {
          if (response && response.data) {
            this.schemasGeneral = response.data.schemas.fields;
            const stringValue = JSON.stringify(this.schemasGeneral, null, 2);
            this.newAppForm.get('schema')?.setValue(stringValue);
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

  setHolaInDescription() {
    this.newAppForm
      .get('entities')
      ?.setValue(
        '{"numInvoice": 1,"model": "A4","totals": {"discount":0, "vat": 0,"total": 0}}'
      );
  }

  setHola1InDescription() {
    this.newAppForm
      .get('entities')
      ?.setValue(
        '{"amount": 10,"price": 0,"discount": 0,"vat": 0, "total": 0,"invoice_id": "<INVOICE_ID>","item_id": "<ITEM_ID>"}'
      );
  }
}
