import { TestBed } from '@angular/core/testing';

import { MynsweeprService } from './mynsweepr.service';

describe('MynsweeprService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MynsweeprService = TestBed.get(MynsweeprService);
    expect(service).toBeTruthy();
  });
});
