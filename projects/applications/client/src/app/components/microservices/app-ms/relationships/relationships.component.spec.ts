import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipsComponent } from './relationships.component';

describe('RelationshipsComponent', () => {
  let component: RelationshipsComponent;
  let fixture: ComponentFixture<RelationshipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelationshipsComponent]
    });
    fixture = TestBed.createComponent(RelationshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
