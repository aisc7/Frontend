import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRestaurantComponent } from './manage.component';

describe('ManageRestaurantComponent', () => {
  let component: ManageRestaurantComponent;
  let fixture: ComponentFixture<ManageRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
