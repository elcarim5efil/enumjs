import Enum from './Enum';

export default class _enum extends Enum {
  constructor(enums, startIndex, customKeyName) {
    startIndex = parseInt(startIndex || 0) || 0;
    super(enums, {startIndex, customKeyName});

    return this.map;
  }
}
