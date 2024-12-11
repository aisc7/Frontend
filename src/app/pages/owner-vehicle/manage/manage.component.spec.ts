import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOwnerVehicleComponent } from './manage.component';

describe('ManageComponent', () => {
  let component: ManageOwnerVehicleComponent;
  let fixture: ComponentFixture<ManageOwnerVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOwnerVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOwnerVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
