import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutobusUpdateComponent } from './autobus-update.component';

describe('AutobusUpdateComponent', () => {
  let component: AutobusUpdateComponent;
  let fixture: ComponentFixture<AutobusUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutobusUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutobusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
