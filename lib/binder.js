'use strict';

class Binder {

  constructor() {
    this._includeMethods = [
      '__',
      '__n',
      '__l',
      '__h',
      '__mf',
      'getLocale',
      'setLocale'
    ];
  }

  exec(object, self) {
    let already = true;
    this._includeMethods.forEach((method) => {
      if (!object[method]) {
        already = false;
        object[method] = self[method].bind(object);
      }
    });
    return already;
  }

}

module.exports = new Binder();
