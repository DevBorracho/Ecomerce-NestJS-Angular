import { VerifyTokenGuard } from './verify-token.guard';

describe('VerifyTokenGuard', () => {
  it('should be defined', () => {
    expect(new VerifyTokenGuard()).toBeDefined();
  });
});
