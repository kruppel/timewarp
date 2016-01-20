const expect = chai.expect;

describe('Date', () => {
  it('has correct offset', () => {
    expect((new Date('2015-12-01')).getTimezoneOffset()).to.equal(-540);
  });
});
