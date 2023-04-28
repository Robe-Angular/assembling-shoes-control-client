import { TestBed } from '@angular/core/testing';

import { UserNoLoggedGuard } from './user-no-logged.guard';

describe('UserNoLoggedGuard', () => {
  let guard: UserNoLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserNoLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
