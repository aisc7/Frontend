import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHotelComponent } from './manage.component';

describe('ManageHotelComponent', () => {
  let component: ManageHotelComponent;
  let fixture: ComponentFixture<ManageHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
