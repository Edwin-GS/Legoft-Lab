import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedComponent } from './followed.component';

describe('FollowedComponent', () => {
  let component: FollowedComponent;
  let fixture: ComponentFixture<FollowedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowedComponent]
    });
    fixture = TestBed.createComponent(FollowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
