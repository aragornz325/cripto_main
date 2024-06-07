import { ValidateJwtMiddleware } from './validate-jwt.middleware';

describe('ValidateJwtMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidateJwtMiddleware()).toBeDefined();
  });
});
