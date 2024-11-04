import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutobusViewComponent } from './autobus-view.component';

describe('AutobusViewComponent', () => {
  let component: AutobusViewComponent;
  let fixture: ComponentFixture<AutobusViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutobusViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutobusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
