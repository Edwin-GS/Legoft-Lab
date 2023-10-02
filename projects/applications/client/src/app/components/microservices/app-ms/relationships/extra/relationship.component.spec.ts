import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipComponent } from './relationship.component';

describe('RelationshipComponent', () => {
  let component: RelationshipComponent;
  let fixture: ComponentFixture<RelationshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelationshipComponent]
    });
    fixture = TestBed.createComponent(RelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
