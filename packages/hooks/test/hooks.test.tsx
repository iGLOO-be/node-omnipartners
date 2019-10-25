import * as hooks from '../src';

describe('hooks', () => {
  it('exports', () => {
    expect(Object.keys(hooks).sort()).toMatchSnapshot()
  });
});
