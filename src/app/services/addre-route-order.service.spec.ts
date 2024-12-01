import { TestBed } from '@angular/core/testing';

import { AddreRouteOrderService } from './addre-route-order.service';

describe('AddreRouteOrderService', () => {
  let service: AddreRouteOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddreRouteOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
