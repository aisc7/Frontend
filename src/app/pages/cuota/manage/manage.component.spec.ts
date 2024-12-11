import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCuotaComponent } from './manage.component';

describe('ManageCuotaComponent', () => {
  let component: ManageCuotaComponent;
  let fixture: ComponentFixture<ManageCuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCuotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
