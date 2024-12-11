import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageVehiculoDriverComponent } from './manage.component';  

describe('ManageVehiculoDriverComponent', () => { 
  let component: ManageVehiculoDriverComponent;
  let fixture: ComponentFixture<ManageVehiculoDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageVehiculoDriverComponent ] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVehiculoDriverComponent);  
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
