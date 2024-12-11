import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpentComponent } from './manage.component';

describe('ManageSpentComponent', () => {
  let component: ManageSpentComponent;
  let fixture: ComponentFixture<ManageSpentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSpentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSpentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
