'use strict';

const _ = require('lodash');
const path = require('path');
const binder = require('./lib/binder');
const ResourceManager = require('./lib/resource_manager');

class Internationalize {

  constructor() {
    this._options = {
      defaultLocale: 'en',
      directory: path.join(__dirname, '/locales'),
      extension: 'json'
    };
    this._resource = new ResourceManager();
    this._current = null;
  }

  configure(options) {
    _.extend(this._options, options);
    if (_.isEmpty(this._current)) {
      this._current = this._options.defaultLocale;
    }
  }

  init(request, response, next) {
    if (!_.isObject(request)) {
      throw new Error('must be called with one parameter minimum)');
    }
    this._apply(request);
    this.setLocale(this._current);

    if (_.isObject(response)) {
      this._apply(response);
      this.setLocale(this._current);
    }

    if (_.isFunction(next)) {
      return next();
    }
  }

  getLocale() {
    return this._current || this._options.defaultLocale;
  }

  setLocale(locale) {
    if (!_.isString(locale)) {
      throw new Error('invalid variable type, allowed only a string.');
    }
    if (this._current === locale) {
      return;
    }
    const opt = this._options;
    this._resource.set({
      locale: locale,
      directory: opt.directory,
      extension: opt.extension
    });
  }

  _apply(object) {
    if (binder.exec(object, this)) {
      return;
    }
    const self = this;
    ['res', 'object'].forEach((key) => {
      if (object[key]) {
        self._apply(object);
      }
    });
  }

}

module.exports = new Internationalize();
