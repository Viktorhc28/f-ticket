import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadCreateComponent } from './ciudad-create.component';

describe('CiudadCreateComponent', () => {
  let component: CiudadCreateComponent;
  let fixture: ComponentFixture<CiudadCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiudadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
