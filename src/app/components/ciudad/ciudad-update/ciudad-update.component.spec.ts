import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadUpdateComponent } from './ciudad-update.component';

describe('CiudadUpdateComponent', () => {
  let component: CiudadUpdateComponent;
  let fixture: ComponentFixture<CiudadUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiudadUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
