import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBatchComponent } from './manage.component';

describe('ManageBatchComponent', () => {
  let component: ManageBatchComponent;
  let fixture: ComponentFixture<ManageBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
