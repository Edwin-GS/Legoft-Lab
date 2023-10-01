import {RouterModule, Routes} from "@angular/router";
import {EntitiesComponent} from "./entities/entities.component";
import {EntityComponent} from "./entities/extra/entity.component";
import {SchemaEntitiesComponent} from "./schema-entities/schema-entities.component";
import {SchemaEntityComponent} from "./schema-entities/extra/schema-entity.component";

const EntityRoutes: Routes = [
  {
    path: '',
    component: EntitiesComponent,
    title: 'Entities'
  },
  {
    path: 'entity',
    component: EntityComponent,
    title: 'Entity'
  },
  {
    path: 'schema-entities',
    component: SchemaEntitiesComponent,
    title: 'Schema Entities'
  },
  {
    path: 'schema-entity',
    component: SchemaEntityComponent,
    title: 'Schema Entity'
  }
];

export const ENTITY_ROUTES = RouterModule.forChild(EntityRoutes);
