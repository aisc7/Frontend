import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServicioComponent } from './manage.component';

describe('ManageServicioComponent', () => {
  let component: ManageServicioComponent;
  let fixture: ComponentFixture<ManageServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
