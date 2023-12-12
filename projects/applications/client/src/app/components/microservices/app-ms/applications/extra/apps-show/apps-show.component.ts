import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'projects/libraries/helpers/src/lib/components/auth/data.service';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';

@Component({
  selector: 'app-apps-show',
  templateUrl: './apps-show.component.html',
  styleUrls: ['./apps-show.component.css'],
})
export class AppsShowComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private handlerService: HandlerService,
    private dataService: DataService
  ) {}

  appImageUrl: string = 'assets/img/mail.png';
  logoUrl: string = 'assets/favicon/android-icon-48x48.png';

  applicationId: any;
  application: any;
  // _id: string = '';
  // name: string = '';

  notifier: boolean = false;
  notifier2: boolean = false;
  errornotifier: boolean = false;
  larespuesta: string = '';
  loading: boolean = false;
  user: string = this.dataService.getUser();
  userId: string = this.dataService.getUserId();
  showModal: boolean = false;
  newAppForm!: FormGroup;

  ngOnInit(): void {
    this.getIdApli();
    this.loadApplication();

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
  }

  loadApplication() {
    this.loading = true;
    console.log(this.applicationId);
    this.handlerService
      .get(`applications/find/${this.applicationId}`)
      .subscribe(
        (resp) => {
          if (resp.success === true) {
            let icon = '';
            if (this.isBase64(resp.data.icon)) {
              icon = atob(resp.data.icon);
            }
            this.application = resp.data;
            this.application.icon = icon;
            this.loading = false;
          } else {
            this.loading = false;
            this.errornotifier = true;
            this.larespuesta = 'Data is not in the expected format.';
          }
        },
        (error) => {
          if (error.code === 404) {
            this.loading = false;
            this.errornotifier = true;
            this.larespuesta = 'Requested resource not found.';
          } else {
            this.loading = false;
            this.errornotifier = true;
            this.larespuesta = 'Error loading applications: ' + error;
          }
        }
      );
  }

  getIdApli() {
    this.applicationId = this.dataService.getConsoleLogData();
  }

  isBase64(str: string) {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }

  getTime(timestamp: string) {
    if (!timestamp) {
      return '';
    }

    const currentTime = new Date();
    const updateTimestamp = new Date(timestamp);

    const timeDifference = currentTime.getTime() - updateTimestamp.getTime();
    const minutes = Math.floor(timeDifference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(weeks / 52);

    if (years > 0) {
      return years === 1 ? '1 year ago' : years + ' years ago';
    } else if (weeks > 0) {
      return weeks === 1 ? '1 week ago' : weeks + ' weeks ago';
    } else if (days > 0) {
      return days === 1 ? '1 day ago' : days + ' days ago';
    } else if (hours > 0) {
      return hours === 1 ? '1 hour ago' : hours + ' hours ago';
    } else if (minutes > 0) {
      return minutes === 1 ? '1 minute ago' : minutes + ' minutes ago';
    } else {
      return 'Just now';
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  closeDialog2() {
    this.errornotifier = false;
  }

  closeDialogOpen(application: any) {
    this.notifier2 = true;
    this.applicationId = application;
  }

  editApplication(application: any) {
    this.newAppForm.patchValue({
      name: application.name,
      description: application.description,
      icon: application.icon,
    });

    this.showModal = true;

    this.handlerService.get(`applications/get/${this.applicationId}`).subscribe(
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
}
