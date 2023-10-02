import {RouterModule, Routes} from "@angular/router";
import {ApplicationComponent} from "./applications/extra/application.component";
import {RelationshipsComponent} from "./relationships/relationships.component";
import {RelationshipComponent} from "./relationships/extra/relationship.component";
import {SchemasComponent} from "./schemas/schemas.component";

/**
 * Base route information
 *
 * applications >> /legoft-lab/applications/:user/user_id
 *
 * application >> /legoft-lab/applications/:user/:user_id/application
 *
 * relationships >> /legoft-lab/applications/:user/:user_id/relationships
 *
 * relationship >> /legoft-lab/applications/:user/:user_id/relationship
 *
 * schemas >> /legoft-lab/applications/:user/:user_id/schemas
 *
 * **/

const ApplicationRoutes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    title: 'Applications'
  },
  {
    path: 'application',
    component: ApplicationComponent,
    title: 'Application'
  },
  {
    path: 'relationships',
    component: RelationshipsComponent,
    title: 'Relationships'
  },
  {
    path: 'relationship',
    component: RelationshipComponent,
    title: 'Relationship'
  },
  {
    path: 'schemas',
    component: SchemasComponent,
    title: 'Schemas'
  }
];

export const APPLICATION_ROUTES = RouterModule.forChild(ApplicationRoutes);
