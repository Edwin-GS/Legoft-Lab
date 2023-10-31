import { RouterModule, Routes } from '@angular/router';
import { EntitiesComponent } from './entities/entities.component';
import { EntityComponent } from './entities/extra/entity.component';
import { SchemaEntitiesComponent } from './schema-entities/schema-entities.component';
import { SchemaEntityComponent } from './schema-entities/extra/schema-entity.component';

const EntityRoutes: Routes = [
  {
    path: '',
    component: SchemaEntityComponent,
    title: 'Schemaentity',
  },
  {
    path: 'entities/:schema_name',
    component: EntitiesComponent,
    title: 'Entities',
  },
  {
    path: 'entity/:schema_name',
    component: EntityComponent,
    title: 'Entity',
  },
  {
    path: 'schema-entities',
    component: SchemaEntitiesComponent,
    title: 'Schema Entities',
  },
];

export const ENTITY_ROUTES = RouterModule.forChild(EntityRoutes);
