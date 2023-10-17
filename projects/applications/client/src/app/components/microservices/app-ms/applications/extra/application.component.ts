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
  showModal: boolean = false;
  applications: any[] = [];
  newAppForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private handlerService: HandlerService,
    private dataService: DataService
  ) {}

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
      icon: [''], // Added an icon field in the form
    });
    this.loadApplications();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.newAppForm.patchValue({
        icon: e.target.result, // Save the base64 string to the form
      });
    };
    reader.readAsDataURL(file);
  }

  createApplication() {
    if (this.newAppForm.valid) {
      const data = this.newAppForm.value;

      // Convert the icon to base64 before sending it to the server
      data.icon = btoa(data.icon);

      this.handlerService
        .post(data, `applications/create/${this.dataService.getUser()}`)
        .subscribe(
          (resp) => {
            if (resp && resp.success === false) {
              console.log('Error creating application:', resp.message);
            } else {
              console.log('Application created successfully:', resp);
              this.newAppForm.reset();
              this.loadApplications();
              this.showModal = false;
            }
          },
          (err) => {
            console.error('Error creating application:', err);
          }
        );
    } else {
      console.error('Make sure to fill in all the required fields.');
    }
  }

  loadApplications() {
    this.handlerService
      .get(`applications/check/publish/${this.dataService.getUser()}`)
      .subscribe(
        (response) => {
          console.log('Received data:', response);
          if (response && response.data) {
            this.applications = response.data.map((app: any) => {
              // Convert the base64 icon back to a readable image
              let decodedIcon = '';
              if (this.isBase64(app.icon)) {
                decodedIcon = atob(app.icon);
              }
              return {
                name: app.name,
                icon: decodedIcon,
                description: app.description,
              };
            });
            console.log('Loaded applications:', this.applications);
          } else {
            console.error('Data is not in the expected format.');
          }
        },
        (error) => {
          if (error.status === 404) {
            console.error('Requested resource not found.');
          } else {
            console.error('Error loading applications: ', error);
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
}
