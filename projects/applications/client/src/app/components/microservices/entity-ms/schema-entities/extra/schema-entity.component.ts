import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  Form,
  AbstractControl,
} from '@angular/forms';
import { DataService } from 'projects/libraries/helpers/src/lib/components/auth/data.service';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { Field, FieldColumns } from './model/field';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-schema-entity',
  templateUrl: './schema-entity.component.html',
  styleUrls: ['./schema-entity.component.css'],
})
export class SchemaEntityComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private handlerService: HandlerService,
    private dataService: DataService,
    private dialog: MatDialog
  ) {
    this.user = this.dataService.getUser();
    this.id_Apli = this.dataService.getConsoleLogData();
  }
  user!: string;
  private id_Apli: any;
  notifier: boolean = false;
  errornotifier: boolean = false;
  larespuesta: string = '';
  viche = 'assets/img/viche.png';

  fields: Array<Field> = [];
  displayedColumns: string[] = FieldColumns.map((col) => col.key);
  columnsSchema: any = FieldColumns;
  dataSource = new MatTableDataSource<Field>();
  valid: any = {};

  formulario!: FormGroup;

  formulario2!: FormGroup;
  jsonData: any[] = [
    {
      name: 'numInvoice',
      type: 'number',
      required: true,
      update: true,
      unique: true,
      size: { min: 1, max: 9999999 },
    },
    {
      name: 'model',
      type: 'enum',
      required: true,
      update: true,
      unique: false,
      enum: ['A4', 'Medium', 'Large'],
    },
    {
      name: 'totals',
      type: 'object',
      required: true,
      update: true,
      unique: false,
      object: [
        {
          name: 'vat',
          type: 'calculated',
          required: true,
          update: true,
          unique: false,
          size: { min: 1, max: 9999999 },
        },
        {
          name: 'discount',
          type: 'calculated',
          required: true,
          update: true,
          unique: false,
          size: { min: 1, max: 9999999 },
        },
        {
          name: 'total',
          type: 'calculated',
          required: true,
          update: true,
          unique: false,
          size: { min: 1, max: 9999999 },
        },
      ],
    },
  ];

  ngOnInit() {
    this.formulario2 = this.formBuilder.group({});

    this.formulario = this.formBuilder.group({
      index: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.errornotifier = false;
    this.notifier = false;
  }

  editRow(row: Field) {
    if (row.id === 0) {
      row.isEdit = false;
      row.id = this.generateUniqueId();
      this.fields.push(row);
    } else {
      const indexToUpdate = this.fields.findIndex((f) => f.id === row.id);

      if (indexToUpdate !== -1) {
        this.fields[indexToUpdate].name = row.name;
        this.fields[indexToUpdate].type = row.type;
        // Update other properties as needed
        this.fields[indexToUpdate].isEdit = false;
      }
    }
  }

  addRow() {
    const newRow: Field = {
      id: 0,
      isSelected: false,
      name: '',
      type: '',
      required: false,
      update: false,
      unique: false,
      size: {},
      enum: [],
      object: [],
      objectId: '',
      isEdit: true,
    };
    this.fields = [newRow, ...this.fields];
    this.dataSource.data = this.fields;
  }

  removeRow(id: number) {
    const indexToRemove = this.fields.findIndex((f) => f.id === id);
    if (indexToRemove !== -1) {
      this.fields.splice(indexToRemove, 1);
      this.dataSource.data = this.fields;
    }
  }

  removeSelectedRows() {
    const selectedFields = this.fields.filter((field) => field.isSelected);

    if (selectedFields.length === 0) {
      return; // No selected fields to remove
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.fields = this.fields.filter((field) => !field.isSelected);
        this.dataSource.data = this.fields;
      }
    });
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }

  isAllSelected() {
    return this.dataSource.data.every((item) => item.isSelected);
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected);
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }));
  }

  getOptions(key: string): string[] {
    switch (key) {
      case 'type':
        return ['number', 'enum', 'object', 'calculated', 'objectId'];
      // Add more cases as needed
      default:
        return [];
    }
  }

  generateUniqueId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
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
