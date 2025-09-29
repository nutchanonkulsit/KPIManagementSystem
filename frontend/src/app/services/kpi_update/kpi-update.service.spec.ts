import { TestBed } from '@angular/core/testing';

import { KpiUpdateService } from './kpi-update.service';

describe('KpiUpdateService', () => {
  let service: KpiUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KpiUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
