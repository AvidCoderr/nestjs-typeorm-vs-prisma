import { ApiConstants } from "./dto.constants";

describe('dto-js', () => {
  it('password length should be 6', () => {
    expect(ApiConstants.EMAIL_BODY_MIN_LENGTH).toEqual(6);
  });
});
