import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSeguroComponent } from './manage.component';

describe('ManageSeguroComponent', () => {
  let component: ManageSeguroComponent;
  let fixture: ComponentFixture<ManageSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSeguroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
