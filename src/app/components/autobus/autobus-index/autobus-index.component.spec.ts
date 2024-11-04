import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutobusIndexComponent } from './autobus-index.component';

describe('AutobusIndexComponent', () => {
  let component: AutobusIndexComponent;
  let fixture: ComponentFixture<AutobusIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutobusIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutobusIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
