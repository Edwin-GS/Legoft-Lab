import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './applications/extra/application.component';
import { RelationshipsComponent } from './relationships/relationships.component';
import { RelationshipComponent } from './relationships/extra/relationship.component';
import { SchemasComponent } from './schemas/schemas.component';
import { AppsShowComponent } from './applications/extra/apps-show/apps-show.component';

const ApplicationRoutes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    title: 'Applications',
  },
  {
    path: 'show/:id',
    component: AppsShowComponent,
  },
  {
    path: 'relationships',
    component: RelationshipsComponent,
    title: 'Relationships',
  },
  {
    path: 'relationship',
    component: RelationshipComponent,
    title: 'Relationship',
  },
  {
    path: 'schemas',
    component: SchemasComponent,
    title: 'Schemas',
  },
];

export const APPLICATION_ROUTES = RouterModule.forChild(ApplicationRoutes);
