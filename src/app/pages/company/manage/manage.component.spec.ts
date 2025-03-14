import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompanyComponent } from './manage.component';

describe('ManageCompanyComponent', () => {
  let component: ManageCompanyComponent;
  let fixture: ComponentFixture<ManageCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
