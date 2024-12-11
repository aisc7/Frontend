import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMunicipalityComponent } from './manage.component';

describe('ManageMunicipalityComponent', () => {
  let component: ManageMunicipalityComponent;
  let fixture: ComponentFixture<ManageMunicipalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMunicipalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
