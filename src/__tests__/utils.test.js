import * as _ from '../utils';

describe('utils', function() {
  describe('#setUnenumerable', function() {
    it('set unenumerable without value', function() {
      const obj = {x: 1, y: 2};
      _.setUnenumerable(obj, 'y');
      for(let key in obj) {
        expect(key).not.toBe('y');
      }
    });
  });
  describe('#setUnwritable', function() {
    it('set unwritable without value', function() {
      const obj = {x: 1, y: 2};
      _.setUnwritable(obj, 'y');
      try {
        obj.y = 10;
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });
});
