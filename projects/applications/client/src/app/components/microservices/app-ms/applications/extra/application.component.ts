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
  appImageUrl: string = 'assets/img/mail.png';
  viche = 'assets/img/viche.png';
  showModal: boolean = false;
  applications: any[] = [];
  newAppForm!: FormGroup;
  user!: string;
  id!: string;
  appid!: string;
  errornotifier: boolean = false;
  larespuesta: string = '';
  notifier: boolean = false;
  notifier2: boolean = false;
  filteredApplications: any[] = [];
  searchTerm: string = '';

  loading: boolean = false;

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
    this.notifier2 = false;
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

      if (this.appid) {
        this.updateApplication(data);
      } else {
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
                this.larespuesta = resp['message'];
              }
            },
            (err) => {
              this.errornotifier = true;
              this.larespuesta = err['message'];
            }
          );
      }
    } else {
      this.errornotifier = true;
      this.larespuesta = 'Make sure to fill in all the required fields.';
    }
  }

  updateApplication(data: any) {
    if (this.appid) {
      data.icon = btoa(data.icon);
      this.handlerService
        .put(
          data,
          `applications/update/${this.dataService.getUser()}/${this.appid}`
        )
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
    }
  }

  loadApplications() {
    this.loading = true;
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
            this.loading = false;
          } else {
            this.loading = false;
            this.errornotifier = true;
            this.larespuesta = 'Data is not in the expected format.';
          }
        },
        (error) => {
          this.loading = false;
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

  editApplication(application: any) {
    this.newAppForm.patchValue({
      name: application.name,
      description: application.description,
      icon: application.icon,
    });

    this.showModal = true;
    this.appid = application._id;

    this.handlerService.get(`applications/get/${this.appid}`).subscribe(
      (resp) => {
        if (resp && resp.success === false) {
          this.errornotifier = true;
          this.larespuesta = resp['message'];
        } else {
          this.newAppForm.patchValue({
            name: resp.data.name,
            description: resp.data.description,
            icon: resp.data.icon,
          });
          this.loadImageFromDatabase(resp.data.icon);
        }
      },
      (err) => {
        this.errornotifier = true;
        this.larespuesta = err['message'];
      }
    );
  }

  deleteApplication(application: any) {
    const applicationId = application._id;
    this.handlerService
      .delete(
        `applications/delete/${this.dataService.getUser()}/${applicationId}`
      )
      .subscribe(
        (resp) => {
          if (resp && resp.success === false) {
            this.errornotifier = true;
            this.larespuesta = resp['message'];
          } else {
            this.notifier = true;
            this.loadApplications();
            this.larespuesta = resp['message'];
          }
        },
        (err) => {
          this.errornotifier = true;
          this.larespuesta = err.message;
        }
      );
  }

  loadImageFromDatabase(icon: string) {
    if (this.isBase64(icon)) {
      const img = new Image();
      img.src = 'data:image/jpeg;base64,' + icon;
      const imagePreview = document.getElementById(
        'appImage'
      ) as HTMLImageElement;
      if (imagePreview) {
        imagePreview.src = img.src;
      }
    }
  }

  isBase64(str: string) {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }

  setIdApli(_id: any) {
    this.dataService.setConsoleLogData(_id);
  }

  closeDialog2() {
    this.errornotifier = false;
  }

  applicationId: any;

  closeDialogOpen(application: any) {
    this.notifier2 = true;
    this.applicationId = application;
  }

  closeDialogApiYes() {
    this.notifier2 = false;
    this.deleteApplication(this.applicationId);
  }

  closeDialogApi() {
    this.notifier2 = false;
  }
}
