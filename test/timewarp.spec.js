const expect = chai.expect;
const timeZone = __karma__.config.args[0];

const offsets = {
  '2015-07-15': {
    'Moscow': [-180, 'Wed Jul 15 2015 03:00:00 GMT+0300 (MSK)'],
    'Tokyo': [-540, 'Wed Jul 15 2015 09:00:00 GMT+0900 (Tokyo Standard Time)']
  },
  '2015-12-01': {
    'Moscow': [-180, 'Tue Dec 01 2015 03:00:00 GMT+0300 (MSK)'],
    'Tokyo': [-540, 'Tue Dec 01 2015 09:00:00 GMT+0900 (Tokyo Standard Time)']
  }
};

describe('Date', () => {
  Object.keys(offsets).forEach(iso8601 => {
    const date = new Date(iso8601);
    const [offset, str] = offsets[iso8601][timeZone];

    describe(iso8601, () => {
      it('has correct offset', () => {
        expect(date.getTimezoneOffset()).to.equal(offset);
      });

      it('has correct string representation', () => {
        expect(date.toString()).to.equal(str);
      });
    });
  });
});
