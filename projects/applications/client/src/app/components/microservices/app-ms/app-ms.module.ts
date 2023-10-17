import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationComponent } from './applications/extra/application.component';
import { SchemasComponent } from './schemas/schemas.component';
import { RelationshipsComponent } from './relationships/relationships.component';
import { RelationshipComponent } from './relationships/extra/relationship.component';
import { APPLICATION_ROUTES } from './app-ms.routes';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ApplicationsComponent,
    ApplicationComponent,
    SchemasComponent,
    RelationshipsComponent,
    RelationshipComponent,
  ],
  exports: [SchemasComponent],
  imports: [CommonModule, APPLICATION_ROUTES, FormsModule, ReactiveFormsModule],
})
export class AppMsModule {}
