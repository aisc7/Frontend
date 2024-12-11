import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDistributionCenterComponent } from './manage.component';

describe('ManageDistributionCenterComponent', () => {
  let component: ManageDistributionCenterComponent;
  let fixture: ComponentFixture<ManageDistributionCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDistributionCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDistributionCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
