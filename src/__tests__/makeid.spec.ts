import { makeid } from "../utils/makeid";


describe('makeid', () => {
  const instance1 = {
    key: makeid(),
  };
  const instance2 = {
    key: makeid(),
  };
  const instance3 = {
    key: undefined,
  };
  const instance4 = {
    key: Date.now(),
  };

  it('sets unique key', () => {
    expect(instance1.key).not.toEqual(instance2.key);
  });

  it('is not undefined', () => {
    expect(instance1.key).not.toEqual(instance3.key);
  });
  it('is not equal to now moment', () => {
    expect(instance1.key).not.toEqual(instance4.key);
  });

  it('is not Null', () => {
    expect(instance1.key).not.toBeNull();
  });

});
