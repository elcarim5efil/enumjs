import Enum from './Enum';

export default function _enum(enums, startIndex) {
  startIndex = parseInt(startIndex || 0) || 0;
  const enumObj = new Enum(enums, {
    startIndex
  });

  return enumObj.map;
}
