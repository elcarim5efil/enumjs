import Enum from '../index';

describe('Enum', function() {
  describe('Value test', function() {
    it('default value "A,B,C"', function() {
      var ENUMS = new Enum('A,B,C');
      expect(+ENUMS.B).toBe(1);
      expect(+ENUMS.B).toBe(1);
      expect(ENUMS.B == 1).toBeTruthy();
      expect(ENUMS.B === 1).toBeFalsy();
      expect(ENUMS.B.getValue()).toBe(1);
      expect(ENUMS.B.equals(1)).toBeTruthy();
      expect(ENUMS.B.v()).toBe(1);
      expect(ENUMS.B.eq(1)).toBeTruthy();
    });

    it('default value "A B C"', function() {
      var ENUMS = new Enum('A B C');
      expect(+ENUMS.B).toBe(1);
      expect(+ENUMS.B).toBe(1);
      expect(ENUMS.B == 1).toBeTruthy();
      expect(ENUMS.B === 1).toBeFalsy();
      expect(ENUMS.B.v()).toBe(1);
      expect(ENUMS.B.eq(1)).toBeTruthy();
    });

    it('default value "A;B;C"', function() {
      var ENUMS = new Enum('A;B;C');
      expect(+ENUMS.B).toBe(1);
      expect(+ENUMS.B).toBe(1);
      expect(ENUMS.B == 1).toBeTruthy();
      expect(ENUMS.B === 1).toBeFalsy();
      expect(ENUMS.B.v()).toBe(1);
      expect(ENUMS.B.eq(1)).toBeTruthy();
    });

    it('default value [A,B,C]', function() {
      var ENUMS = new Enum(['A','B','C']);
      expect(+ENUMS.B).toBe(1);
      expect(+ENUMS.B).toBe(1);
      expect(ENUMS.B == 1).toBeTruthy();
      expect(ENUMS.B === 1).toBeFalsy();
      expect(ENUMS.B.v()).toBe(1);
      expect(ENUMS.B.eq(1)).toBeTruthy();
    });

    it('default value [{A},{B},{C}]', function() {
      var ENUMS = new Enum([
        {key: 'A'},
        {key: 'B'},
        {key: 'C'},
      ]);
      expect(+ENUMS.B).toBe(1);
      expect(+ENUMS.B).toBe(1);
      expect(ENUMS.B == 1).toBeTruthy();
      expect(ENUMS.B === 1).toBeFalsy();
      expect(ENUMS.B.v()).toBe(1);
      expect(ENUMS.B.eq(1)).toBeTruthy();
    });

    it('default value [{A},{B},{C}]', function() {
      var ENUMS = new Enum([
        {key: 'A', value: -1},
        {key: 'B', value: 0},
        {key: 'C', value: 1}
      ]);
      expect(+ENUMS.B).toBe(0);
      expect(+ENUMS.B).toBe(0);
      expect(ENUMS.B == 0).toBeTruthy();
      expect(ENUMS.B === 0).toBeFalsy();
      expect(ENUMS.B.v()).toBe(0);
      expect(ENUMS.B.eq(0)).toBeTruthy();
    });

    it('value is string', function() {
      var ENUMS = new Enum([
        {key: 'A', value: 'a'},
        {key: 'B', value: 'b'},
        {key: 'C', value: 'c'}
      ]);
      expect(ENUMS.B == 'b').toBeTruthy();
      expect(ENUMS.B === 'b').toBeFalsy();
      expect(ENUMS.B+'' === 'b').toBeTruthy();
      expect(ENUMS.B.toString() === 'b').toBeTruthy();
    });
  });

  describe('get method test', function() {
    it('default value "A,B,C"', function() {
      var ENUMS = new Enum('A,B,C');
      expect(ENUMS.B.getKey()).toBe('B');
      expect(ENUMS.B.k()).toBe('B');
      expect(ENUMS.getEnumKey(1)).toBe('B');
      expect(ENUMS.getEnumKeyName(1)).toBe('B');
      expect(ENUMS.find(1).getKey()).toBe('B');
      expect(ENUMS.find(function(item){
        return item.getValue() === 1;
      }).getKey()).toBe('B');
    });

    it('default value [{A},{B},{C}]', function() {
      var ENUMS = new Enum([
        {key: 'A', name: 'a'},
        {key: 'B', name: 'b'},
        {key: 'C', name: 'c'},
      ]);
      expect(ENUMS.B.getKey()).toBe('B');
      expect(ENUMS.B.getName()).toBe('b');
      expect(ENUMS.find(1).getKey()).toBe('B');
      expect(ENUMS.getEnumKey(1)).toBe('B');
      expect(ENUMS.getEnumKeyName(1)).toBe('B');
    });
  });

  describe('custom index test', function() {
    it('startIndex = 100', function() {
      var ENUMS = new Enum('A,B', 100);
      expect(ENUMS.A.getValue()).toBe(100);
      var ENUMS2 = new Enum(['A', 'B'], 100);
      expect(ENUMS2.A.getValue()).toBe(100);
    });

    it('startIndex = "string"', function() {
      var ENUMS = new Enum(['A', 'B'], 'string');
      expect(ENUMS.A.getValue()).toBe(0);
    });

    it('setup value property', function() {
      var ENUMS = new Enum([
        {key: 'A', value: 100},
        {key: 'B', value: 200},
        {key: 'C', value: 300},
      ]);
      expect(ENUMS.A.getValue()).toBe(100);
    });
  });

  describe('forEach test', function() {
    it('forEach', function() {
      var ENUMS = new Enum('A,B,C');
      var str = '';
      ENUMS.forEach(function(item, key){
        str += key;
      });
      expect(str).toBe('ABC');
      ENUMS.forEach({x: true});
    });
  });

  describe('map test', function() {
    const ENUMS = new Enum('A,B,C');
    it('map', function() {
      const arr = ENUMS.map((item) => {
        return item.getValue();
      });
      expect(arr).toEqual([0, 1, 2]);
      ENUMS.forEach({x: true});
    });
    it('map with non function', () => {
      const arr = ENUMS.map();
      expect(arr).toEqual([undefined, undefined, undefined]);
    });
  });

  describe('customKeyName test', function() {
    const arr = [
      {name: 'Tom', value: 100, id: 'dog1', key: 'dog'},
      {name: 'Jack', value: 101, id: 'cat1', key: 'cat'}
    ];
    const ENUMS = new Enum(arr, 0, 'id');

    it('get value', function() {
      arr.forEach(function(item){
        expect(ENUMS[item.id]).toBe(item.value);
      });
    });

    it('forEach test', function() {
      const res = [];
      ENUMS.forEach(function(item, key){
        res.push(key);
      });
      expect(res).toEqual(['dog1', 'cat1']);
    });

    it('map test', function() {
      const res = ENUMS.map(function(item, key){
        return key;
      });
      
      expect(res).toEqual(['dog1', 'cat1']);
    });

    it('filter test', function() {
      const res = ENUMS.filter(function(item, key){
        return key === 'dog1' || key === 'cat1';
      });

      expect(res).toEqual(['dog1', 'cat1']);
    });

    it('keys test', function() {
      expect(ENUMS.keys()).toEqual(['dog1', 'cat1']);
    });

    it('values test', function() {
      expect(ENUMS.values()).toEqual([100, 101]);
    });
  });

  describe('filter test', function() {
    it('filter', function() {
      var ENUMS = new Enum('A,B,C');
      var arr = ENUMS.filter(function(item){
        return item.getValue() > 0;
      });
      arr.forEach(function(item, index) {
        if(index > 0) {
          expect(item.getValue()).toBe(index + 1);
        }
      });
      ENUMS.forEach({x: true});
    });

    it('filter all', function() {
      var ENUMS = new Enum('A,B,C');
      var arr = ENUMS.filter();
      arr.forEach(function(item, index) {
        if(index > 0) {
          expect(item.getValue()).toBe(index);
        }
      });
      ENUMS.forEach({x: true});
    });
  });

  describe('keys test', function() {
    it('Enum keys', function() {
      var k = ['A', 'B', 'C'];
      var ENUMS = new Enum(k);
      var keys = ENUMS.keys();
      keys.forEach(function(key, index) {
        expect(key).toBe(k[index]);
      });
    });
  });

  describe('values test', function() {
    it('Enum keys', function() {
      var k = ['A', 'B', 'C'];
      var ENUMS = new Enum(k);
      var values = ENUMS.values();
      expect(values).toEqual([0, 1, 2]);
    });
  });

  describe('abnormal define test', function() {
    it('Enum cannot be defined with undefined', function() {
      var ENUMS = new Enum();
      expect(Object.keys(ENUMS).length).toBe(0);
    });

    it('Enum cannot be defined with []', function() {
      var ENUMS = new Enum([]);
      expect(Object.keys(ENUMS).length).toBe(0);
    });

    it('Enum cannot be defined with ""', function() {
      var ENUMS = new Enum('');
      expect(Object.keys(ENUMS).length).toBe(0);
    });

    it('Enum cannot be defined with number', function() {
      var ENUMS = new Enum(1);
      expect(Object.keys(ENUMS).length).toBe(0);
    });

    it('Enum cannot be defined with function', function() {
      var ENUMS = new Enum(function() {});
      expect(Object.keys(ENUMS).length).toBe(0);
    });

    it('Enum cannot be defined with empty key', function() {
      var ENUMS = new Enum([
        {
          value: 0
        }
      ]);
      expect(Object.keys(ENUMS).length).toBe(0);
    });

    it('Enum cannot be defined with number array', function() {
      var ENUMS = new Enum([
        0, 1, 2
      ]);
      expect(Object.keys(ENUMS).length).toBe(0);
    });
  });

  describe('invalid set test', function() {
    it('Enum item cannot be modified', function() {
      var ENUMS = new Enum('A,B,C');
      try{
        ENUMS.A = 10;
      } catch(e) {
        // nothing
      }

      expect(+ENUMS.A).toBe(0);
    });
  });

  describe('pick', function() {
    const ENUMS = new Enum([{
      value: 1,
      key: 'A',
      name: 'ABC'
    }]);
    it('Enum item be picked as Object', function() {
      var a = ENUMS.A.pick(['name', 'value']);
      expect(a).toEqual({
        name: 'ABC',
        value: 1
      });
    });
    it('pick with invalid param' , function() {
      expect(ENUMS.A.pick()).toEqual({});
    });
  });

  describe('pickAs', function() {
    const ENUMS = new Enum([{
      value: 1,
      key: 'A',
      name: 'ABC'
    }]);
    it('Enum item be picked as Object', function() {
      var a = ENUMS.A.pickAs({
        name: 'newName',
        value: 'newValue'
      });
      expect(a).toEqual({
        newName: 'ABC',
        newValue: 1
      });
    });
    it('pickAs with invalid param' , function() {
      expect(ENUMS.A.pickAs()).toEqual({});
    });
  });

});
