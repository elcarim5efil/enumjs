import Enum from './Enum';

export default class _enum extends Enum {
  constructor(enums, startIndex) {
    startIndex = parseInt(startIndex || 0) || 0;
    super(enums, {startIndex});

    return this.map;
  }
}
