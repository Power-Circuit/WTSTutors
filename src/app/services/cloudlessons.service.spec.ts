import { TestBed } from '@angular/core/testing';

import { CloudlessonsService } from './cloudlessons.service';

describe('CloudlessonsService', () => {
  let service: CloudlessonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudlessonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
