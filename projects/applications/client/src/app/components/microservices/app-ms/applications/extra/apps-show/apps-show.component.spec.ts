import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsShowComponent } from './apps-show.component';

describe('AppsShowComponent', () => {
  let component: AppsShowComponent;
  let fixture: ComponentFixture<AppsShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppsShowComponent]
    });
    fixture = TestBed.createComponent(AppsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
