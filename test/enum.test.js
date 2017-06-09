
'use strict';

const Enum = require('../dist/enum.js').default;
const expect = require('chai').expect;


describe('Enum', function() {
    describe('Value test', function() {
        it('default value "A,B,C"', function() {
            var ENUMS = new Enum('A,B,C');
            expect(+ENUMS.B).to.be.equal(1);
            expect(+ENUMS.B).to.be.equal(1);
            expect(ENUMS.B == 1).to.be.equal(true);
            expect(ENUMS.B === 1).to.be.equal(false);
            expect(ENUMS.B.getValue()).to.be.equal(1);
            expect(ENUMS.B.equals(1)).to.be.equal(true);
        });

        it('default value "A B C"', function() {
            var ENUMS = new Enum('A B C');
            expect(+ENUMS.B).to.be.equal(1);
            expect(+ENUMS.B).to.be.equal(1);
            expect(ENUMS.B == 1).to.be.equal(true);
            expect(ENUMS.B === 1).to.be.equal(false);
            expect(ENUMS.B.getValue()).to.be.equal(1);
            expect(ENUMS.B.equals(1)).to.be.equal(true);
        });

        it('default value "A;B;C"', function() {
            var ENUMS = new Enum('A;B;C');
            expect(+ENUMS.B).to.be.equal(1);
            expect(+ENUMS.B).to.be.equal(1);
            expect(ENUMS.B == 1).to.be.equal(true);
            expect(ENUMS.B === 1).to.be.equal(false);
            expect(ENUMS.B.getValue()).to.be.equal(1);
            expect(ENUMS.B.equals(1)).to.be.equal(true);
        });

        it('default value [A,B,C]', function() {
            var ENUMS = new Enum(['A','B','C']);
            expect(+ENUMS.B).to.be.equal(1);
            expect(+ENUMS.B).to.be.equal(1);
            expect(ENUMS.B == 1).to.be.equal(true);
            expect(ENUMS.B === 1).to.be.equal(false);
            expect(ENUMS.B.getValue()).to.be.equal(1);
            expect(ENUMS.B.equals(1)).to.be.equal(true);
        });

        it('default value [{A},{B},{C}]', function() {
            var ENUMS = new Enum([
                {key: 'A'},
                {key: 'B'},
                {key: 'C'},
            ]);
            expect(+ENUMS.B).to.be.equal(1);
            expect(+ENUMS.B).to.be.equal(1);
            expect(ENUMS.B == 1).to.be.equal(true);
            expect(ENUMS.B === 1).to.be.equal(false);
            expect(ENUMS.B.getValue()).to.be.equal(1);
            expect(ENUMS.B.equals(1)).to.be.equal(true);
        });
    });

    describe('get method test', function() {
        it('default value "A,B,C"', function() {
            var ENUMS = new Enum('A,B,C');
            expect(ENUMS.B.getKey()).to.be.equal('B');
            expect(ENUMS.getEnumKey(1)).to.be.equal('B');
            expect(ENUMS.getEnumKeyName(1)).to.be.equal('B');
            expect(ENUMS.getEnum(1).getKey()).to.be.equal('B');
            expect(ENUMS.getEnum(function(item){
                return item.getValue() === 1;
            }).getKey()).to.be.equal('B');
        });

        it('default value [{A},{B},{C}]', function() {
            var ENUMS = new Enum([
                {key: 'A', name: 'a'},
                {key: 'B', name: 'b'},
                {key: 'C', name: 'c'},
            ]);
            expect(ENUMS.B.getKey()).to.be.equal('B');
            expect(ENUMS.B.getName()).to.be.equal('b');
            expect(ENUMS.getEnum(1).getKey()).to.be.equal('B');
            expect(ENUMS.getEnumKey(1)).to.be.equal('B');
            expect(ENUMS.getEnumKeyName(1)).to.be.equal('B');
        });
    });

    describe('custom index test', function() {
        it('startIndex = 100', function() {
            var ENUMS = new Enum('A,B', 100);
            expect(ENUMS.A.getValue()).to.be.equal(100);
            var ENUMS2 = new Enum(['A', 'B'], 100);
            expect(ENUMS2.A.getValue()).to.be.equal(100);
        });

        it('startIndex = "string"', function() {
            var ENUMS = new Enum(['A', 'B'], 'string');
            expect(ENUMS.A.getValue()).to.be.equal(0);
        });

        it('setup value property', function() {
            var ENUMS = new Enum([
                {key: 'A', value: 100},
                {key: 'B', value: 200},
                {key: 'C', value: 300},
            ]);
            expect(ENUMS.A.getValue()).to.be.equal(100);
        });
    });

    describe('forEach test', function() {
        it('forEach', function() {
            var ENUMS = new Enum('A,B,C');
            var str = '';
            ENUMS.forEach(function(item, key){
                str += key;
            });
            expect(str).to.be.equal('ABC');
            ENUMS.forEach({x: true});
        });
    });

    describe('map test', function() {
        it('map', function() {
            var ENUMS = new Enum('A,B,C');
            var arr = ENUMS.map(function(item, key){
                return item.getValue();
            });
            arr.forEach(function(item, index) {
                expect(item).to.be.equal(index);
            });
            ENUMS.forEach({x: true});
        });
    });

    describe('filter test', function() {
        it('filter', function() {
            var ENUMS = new Enum('A,B,C');
            var arr = ENUMS.filter(function(item, key){
                return item.getValue() > 0;
            });
            arr.forEach(function(item, index) {
                if(index > 0) {
                    expect(item.getValue()).to.be.equal(index + 1);
                }
            });
            ENUMS.forEach({x: true});
        });

        it('filter all', function() {
            var ENUMS = new Enum('A,B,C');
            var arr = ENUMS.filter();
            arr.forEach(function(item, index) {
                if(index > 0) {
                    expect(item.getValue()).to.be.equal(index);
                }
            });
            ENUMS.forEach({x: true});
        });
    });

    describe('abnormal define test', function() {
    });

    describe('invalid set test', function() {
        it('Enum item cannot be modified', function() {
            var ENUMS = new Enum('A,B,C');
            try{
                ENUMS.A = 10;
            } catch(e) {

            }
            expect(+ENUMS.A).to.be.equal(0);
        });
    });

});