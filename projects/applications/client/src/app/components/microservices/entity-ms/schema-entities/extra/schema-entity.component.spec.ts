import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaEntityComponent } from './schema-entity.component';

describe('SchemaEntityComponent', () => {
  let component: SchemaEntityComponent;
  let fixture: ComponentFixture<SchemaEntityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchemaEntityComponent]
    });
    fixture = TestBed.createComponent(SchemaEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
