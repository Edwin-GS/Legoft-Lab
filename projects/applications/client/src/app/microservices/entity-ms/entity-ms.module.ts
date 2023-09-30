import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesComponent } from './entities/entities.component';
import { EntityComponent } from './entities/extra/entity.component';
import { SchemaEntitiesComponent } from './schema-entities/schema-entities.component';
import { SchemaEntityComponent } from './schema-entities/extra/schema-entity.component';
import {AppMsModule} from "../app-ms/app-ms.module";



@NgModule({
  declarations: [
    EntitiesComponent,
    EntityComponent,
    SchemaEntitiesComponent,
    SchemaEntityComponent
  ],
    imports: [
        CommonModule,
        AppMsModule
    ]
})
export class EntityMsModule { }
