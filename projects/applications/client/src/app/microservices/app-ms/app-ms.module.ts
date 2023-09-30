import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationComponent } from './applications/extra/application.component';
import { SchemasComponent } from './schemas/schemas.component';
import { RelationshipsComponent } from './relationships/relationships.component';
import { RelationshipComponent } from './relationships/extra/relationship.component';



@NgModule({
  declarations: [
    ApplicationsComponent,
    ApplicationComponent,
    SchemasComponent,
    RelationshipsComponent,
    RelationshipComponent
  ],
  exports: [
    SchemasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppMsModule { }
