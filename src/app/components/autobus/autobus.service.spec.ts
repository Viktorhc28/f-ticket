import { TestBed } from '@angular/core/testing';

import { AutobusService } from './autobus.service';

describe('AutobusService', () => {
  let service: AutobusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutobusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
