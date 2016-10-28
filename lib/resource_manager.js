'use strict';

const sprintf = require('sprintf').sprintf;
const _ = require('lodash');
const fs = require('fs');

module.exports = class {

  constructor() {
    this._allowExtensions = ['js', 'json'];
    this._resource = null;
  }

  get() {
    return this._resource;
  }

  set(path) {
    path = this._path(path);
    const extension = path.extension;
    if (_.isEmpty(path) || !_.isString(path)) {
      throw new Error('invalid path');
    }
    if (this._allowExtensions.includes(extension)) {
      throw new Error('invalid extension');
    }
    const context = fs.readFileSync(path);
    switch (extension) {
      case 'json':
        this._resource = JSON.parse(context);
        return;
      case 'js':
        this._resource = context;
        return;
      default:
        throw new Error('error logic.');
    }
  }

  _path(path) {
    const required = ['directory', 'locale', 'extension'];
    if (_.isObject(path)) {
      if (!_.has(path, required)) {
        return null;
      }
      path.directory = this._lastSlash(path.directory);
      return sprintf('%(directory)s%(locale)s.%(extension)s', path);
    }
    return path;
  }

  _lastSlash(t) {
    return t.slice(-1) === '/' ? t : `${t}/`;
  }

};
