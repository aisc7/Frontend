import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNaturalPersonComponent } from './manage.component';

describe('ManageNaturalPersonComponent', () => {
  let component: ManageNaturalPersonComponent;
  let fixture: ComponentFixture<ManageNaturalPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNaturalPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageNaturalPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
