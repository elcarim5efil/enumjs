
'use strict';

const Enum = require('../dist/enum.js').default;
const expect = require('chai').expect;


describe('Enum', function() {
    describe('basic api test with string: "A,B,C"', function() {
        var ENUMS = new Enum('A,B,C');

        it('+ENUMS.length should be 3', function() {
            expect(ENUMS.length).to.be.equal(3);
        });

        it('ENUMS.B should be 1', function() {
            expect(+ENUMS.B).to.be.equal(1);
            expect(ENUMS.B.getValue()).to.be.equal(1);
            expect(ENUMS.B.equals(1)).to.be.equal(true);
        });

        it('ENUMS.getEnumKeyName(2) should be "C"', function() {
            expect(ENUMS.getEnumKeyName(2)).to.be.equal('C');
        });

        it('ENUMS.getEnum(2).getKey() should be "C"', function() {
            expect(ENUMS.getEnum(2).getKey()).to.be.equal('C');
        });

        it('ENUMS.getEnum(2).getKey() should be 2', function() {
            expect(ENUMS.getEnum(2).getValue()).to.be.equal(2);
        });

        it('ENUMS.map', function() {
            var temp = ENUMS.map(function(item, key){
                return +item;
            });
            expect(temp[1]).to.be.equal(1);
        });

        it('ENUMS.forEach', function() {
            var str = '';
            ENUMS.forEach(function(item, key){
                str += key;
            });
            expect(str).to.be.equal('ABC');
        });

        it('ENUMS.A should be unwritable', function() {
            try {
                ENUMS.A = 10;
            } catch(e) {
            }
            expect(+ENUMS.A).to.be.equal(0);
        });
    });

    describe('test define with Array', function() {
        var ENUMS = new Enum([
            {key: 'A', label: 'I am A', value: 100},
            {key: 'B', label: 'I am B', value: 200},
            {key: 'C', label: 'I am C', value: 300},
        ]);

        it('ENUMS.length should be 3', function() {
            expect(ENUMS.length).to.be.equal(3);
        });

        it('ENUMS.getEnum(300).getLabel() should be "I am C"', function() {
            expect(ENUMS.getEnum(300).label).to.be.equal(undefined);
            expect(ENUMS.getEnum(300).getLabel()).to.be.equal('I am C');
        });

        it('ENUMS.getEnum(filter)', function() {
            expect(ENUMS.getEnum(function(item){
                return item.getKey() === 'B';
            }).getKey()).to.be.equal('B');
        });

        it('ENUMS.A should be unwritable', function() {
            try {
                ENUMS.A = 10;
            } catch(e) {
            }
            expect(+ENUMS.A).to.be.equal(100);
        });
    });

    describe('test define case', function() {
        var ENUMS = new Enum([
            {key: 'A '},
            {key: 'B '},
        ]);

        it('', function() {
            expect(ENUMS.getEnum(1).getKey()).to.be.equal('B');
        });
    });
});