import * as _ from '../utils';

describe('utils', function() {
  describe('#isArray', function() {
    it('using Array.isArray', function() {
      expect(_.isArray([])).toBeTruthy();
      expect(_.isArray({})).toBeFalsy();
    });

    it('without Array.isArray', function() {
      const temp = Array.isArray;
      Array.isArray = undefined;
      expect(_.isArray([])).toBeTruthy();
      expect(_.isArray({})).toBeFalsy();
      Array.isArray = temp;
    });
  });
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
