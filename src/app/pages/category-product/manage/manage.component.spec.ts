import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryProductComponent } from './manage.component';

describe('ManageCategoryProductComponent', () => {
  let component: ManageCategoryProductComponent;
  let fixture: ComponentFixture<ManageCategoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCategoryProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
