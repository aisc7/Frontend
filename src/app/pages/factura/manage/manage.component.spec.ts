import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFacturaComponent } from './manage.component';

describe('ManageFacturaComponent', () => {
  let component: ManageFacturaComponent;
  let fixture: ComponentFixture<ManageFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
