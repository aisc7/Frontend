import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdministratorComponent } from './manage.component';

describe('ManageAdministratorComponent', () => {
  let component: ManageAdministratorComponent;
  let fixture: ComponentFixture<ManageAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAdministratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
