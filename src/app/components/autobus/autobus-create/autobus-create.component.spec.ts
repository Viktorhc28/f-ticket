import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutobusCreateComponent } from './autobus-create.component';

describe('AutobusCreateComponent', () => {
  let component: AutobusCreateComponent;
  let fixture: ComponentFixture<AutobusCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutobusCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutobusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
