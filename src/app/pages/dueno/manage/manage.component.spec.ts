import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDuenoComponent } from './manage.component';

describe('ManageComponent', () => {
  let component: ManageDuenoComponent;
  let fixture: ComponentFixture<ManageDuenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDuenoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDuenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
