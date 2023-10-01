import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemasComponent } from './schemas.component';

describe('SchemasComponent', () => {
  let component: SchemasComponent;
  let fixture: ComponentFixture<SchemasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchemasComponent]
    });
    fixture = TestBed.createComponent(SchemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
