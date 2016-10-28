'use strict';

const _ = require('lodash');
const path = require('path');

class Internationalize {

  constructor() {
    this._options = {
      defaultLocale: 'en',
      directory: path.join(__dirname, '/locales'),
      extension: 'json'
    };
    this._locale = null;
  }

  configure(options) {
    _.extend(this._options, options);
  }

  setLocale(locale) {
    if (!_.isString(locale)) {
      throw new Error('invalid variable type, allowed only a string.')
    }
    this._locale = locale;
  }

  getLocale() {
    return this._locale || this._options.defaultLocale;
  }
}