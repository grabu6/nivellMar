import { TestBed } from '@angular/core/testing';

import { CridesService } from './crides.service';

describe('CridesService', () => {
  let service: CridesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CridesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
