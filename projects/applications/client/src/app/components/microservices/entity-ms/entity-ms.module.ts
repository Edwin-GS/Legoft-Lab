import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { EntitiesComponent } from './entities/entities.component';
import { EntityComponent } from './entities/extra/entity.component';
import { ENTITY_ROUTES } from './entity-ms.routes';
import { ConfirmDialogComponent } from './schema-entities/extra/confirm-dialog/confirm-dialog.component';
import { SchemaEntityComponent } from './schema-entities/extra/schema-entity.component';
import { SchemaEntitiesComponent } from './schema-entities/schema-entities.component';
@NgModule({
  declarations: [
    EntitiesComponent,
    EntityComponent,
    SchemaEntitiesComponent,
    SchemaEntityComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    ENTITY_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
  ],
})
export class EntityMsModule {}
