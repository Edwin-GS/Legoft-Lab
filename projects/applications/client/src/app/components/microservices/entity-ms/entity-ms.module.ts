import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesComponent } from './entities/entities.component';
import { EntityComponent } from './entities/extra/entity.component';
import { SchemaEntitiesComponent } from './schema-entities/schema-entities.component';
import { SchemaEntityComponent } from './schema-entities/extra/schema-entity.component';
import { ENTITY_ROUTES } from './entity-ms.routes';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EntitiesComponent,
    EntityComponent,
    SchemaEntitiesComponent,
    SchemaEntityComponent,
  ],
  imports: [CommonModule, ENTITY_ROUTES, FormsModule, ReactiveFormsModule],
})
export class EntityMsModule {}
