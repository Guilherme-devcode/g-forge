import { TestBed } from '@angular/core/testing';

import { GForgeService } from './g-forge.service';

describe('GForgeService', () => {
  let service: GForgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GForgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
