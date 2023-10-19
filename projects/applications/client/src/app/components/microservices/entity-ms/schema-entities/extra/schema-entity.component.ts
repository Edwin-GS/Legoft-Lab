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
  formulario!: FormGroup;
  user!: string;
  private id_Apli: any;

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
      name: ['', Validators.required],
      type: ['', Validators.required],
      required: ['', Validators.required],
      update: ['', Validators.required],
      unique: ['', Validators.required],
      // size: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      const USER = this.user;
      const APP_ID = this.id_Apli;
      const dataToSend = {
        index: 5,
        name: formData.name,
        fields: [
          {
            name: formData.name,
            type: formData.type,
            required: formData.required === 'true',
            update: formData.update === 'true',
            unique: formData.unique === 'true',
          },
        ],
        accessRoles: [{ role: 'SUPER' }, { role: 'ADMIN' }, { role: 'USER' }],
      };

      console.log(dataToSend, 'Datos a enviar');
      const dataToSendJSON = JSON.stringify(dataToSend);
      console.log(dataToSendJSON, 'Datos a enviar en formato JSON');

      this.handlerService
        .post(dataToSendJSON, `schema-entities/add/${USER}/${APP_ID}`)
        .subscribe(
          (resp) => {
            if (resp && resp.success === false) {
              console.log('Error creating schema:', resp.message);
            } else {
              console.log('Schema created successfully:', resp);
            }
          },
          (err) => {
            console.error('Error creating schema:', err);
          }
        );
    } else {
      console.error('Make sure to fill in all the required fields.');
    }
  }
}

// onSubmit() {
//   if (this.formulario.valid) {
//     const formData = this.formulario.value;
//     const USER = this.user;
//     const APP_ID = this.id_Apli;
//     console.log(formData.name, 'Los datos');
//     console.log(USER, 'Pendejo');
//     console.log(APP_ID, 'Pendejo de nuevo');
//   }
// }
