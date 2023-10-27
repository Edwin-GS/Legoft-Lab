import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { DataService } from 'projects/libraries/helpers/src/lib/components/auth/data.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
})
export class ApplicationComponent implements OnInit {
  logoUrl: string = 'assets/favicon/android-icon-48x48.png';
  viche = 'assets/img/viche.png';
  showModal: boolean = false;
  applications: any[] = [];
  newAppForm!: FormGroup;
  user!: string;
  id!: string;
  errornotifier: boolean = false;
  larespuesta: string = '';
  notifier: boolean = false;
  filteredApplications: any[] = [];
  searchTerm: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private handlerService: HandlerService,
    private dataService: DataService
  ) {
    this.user = this.dataService.getUser();
    this.id = this.dataService.getUserId();
  }
  ngOnInit() {
    this.newAppForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      icon: [''],
    });

    this.loadApplications();
    this.errornotifier = false;
    this.notifier = false;
    this.filteredApplications = [];
  }

  onInputChange(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterApplications();
  }

  filterApplications() {
    this.filteredApplications = this.applications.filter((app) =>
      app.name.toLowerCase().includes(this.searchTerm)
    );
  }

  closeDialog() {
    this.notifier = false;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newAppForm.reset();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.newAppForm.patchValue({
        icon: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  createApplication() {
    this.newAppForm.markAllAsTouched();
    if (this.newAppForm.valid) {
      const data = this.newAppForm.value;

      data.icon = btoa(data.icon);

      this.handlerService
        .post(data, `applications/create/${this.dataService.getUser()}`)
        .subscribe(
          (resp) => {
            if (resp && resp.success === false) {
              this.errornotifier = true;
              this.larespuesta = resp['message'];
            } else {
              this.notifier = true;
              this.newAppForm.reset();
              this.loadApplications();
              this.showModal = false;
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

  loadApplications() {
    this.handlerService
      .get(`applications/check/publish/${this.dataService.getUser()}`)
      .subscribe(
        (response) => {
          if (response && response.data) {
            this.applications = response.data.map((app: any) => {
              let decodedIcon = '';
              if (this.isBase64(app.icon)) {
                decodedIcon = atob(app.icon);
              }
              return {
                name: app.name,
                icon: decodedIcon,
                description: app.description,
                _id: app._id,
                manager: app.manager,
              };
            });

            this.filteredApplications = this.applications.filter((app) =>
              app.name.toLowerCase().includes(this.searchTerm)
            );
          } else {
            this.errornotifier = true;
            this.larespuesta = 'Data is not in the expected format.';
          }
        },
        (error) => {
          if (error.status === 404) {
            this.errornotifier = true;
            this.larespuesta = 'Requested resource not found.';
          } else {
            this.errornotifier = true;
            (this.larespuesta = 'Error loading applications: '), error;
          }
        }
      );
  }

  isBase64(str: string) {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }

  IdApli(_id: any) {
    this.dataService.setConsoleLogData(_id);
  }

  closeDialog2() {
    this.errornotifier = false;
  }
}
