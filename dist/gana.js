require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * gana-compile <https://github.com/tunnckoCore/gana-compile>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */
'use strict'

var isObject = require('isobject')

/**
 * > Compiles a `template` to a function, which
 * accepts `locals` object to populate the template.
 *
 * **Example**
 *
 * ```js
 * var ganaCompile = require('gana-compile')
 *
 * var template = 'Welcome here, ${ucfirst(name)}! And have fun!'
 * var locals = {
 *   name: 'charlike',
 *   ucfirst: function ucfirst (val) {
 *     return val.charAt(0).toUpperCase() + val.slice(1)
 *   }
 * }
 *
 * var fn = ganaCompile(template)
 * var str = fn(locals)
 *
 * console.log(str)
 * // => 'Welcome here, Charlike! And have fun!'
 * ```
 *
 * @param  {String} `template` string to compile to a function
 * @return {Function} like `compileFn(locals)`, where `locals` must be `object`
 * @throws {TypeError} if `template` not a string
 * @throws {TypeError} if `locals` not an object
 * @throws {ReferenceError} if key not exists in `locals` object
 * @api public
 */

module.exports = function ganaCompile (template) {
  if (typeof template !== 'string') {
    throw new TypeError('ganaCompile: expect `template` to be a string')
  }

  return function compileFn (locals) {
    if (!isObject(locals)) {
      throw new TypeError('ganaCompile: expect `locals` to be an object')
    }

    var keys = []
    var vals = []

    for (var key in locals) {
      keys.push(key)
      vals.push(locals[key])
    }

    /* eslint-disable no-new-func */
    var fn = new Function(keys, 'return `' + template + '`')
    return fn.apply(locals, vals)
  }
}

},{"isobject":3}],2:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],3:[function(require,module,exports){
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isArray = require('isarray');

module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && isArray(val) === false;
};

},{"isarray":2}],"gana":[function(require,module,exports){
/*!
 * gana <https://github.com/tunnckoCore/gana>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var ganaCompile = require('gana-compile')

/**
 * > Sync and async compile, using `${}` delimiters
 * and ES2015 Template Strings. Workin' on node@0.10 too.
 *
 * **Example**
 *
 * ```js
 * var gana = require('gana')
 *
 * var template = 'Hello, ${ucfirst(author.name)}! Welcome in our ${place}.'
 * var locals = {
 *   author: {
 *     name: 'charlike'
 *   },
 *   place: 'club',
 *   ucfirst: function ucfirst (val) {
 *     return val.charAt(0).toUpperCase() + val.slice(1)
 *   }
 * }
 *
 * // sync
 * var compileFn = gana(template)
 * var result = compileFn(locals)
 * console.log(result)
 * // => 'Hello, Charlike! Welcome in our club.'
 *
 * // asynchronous
 * gana(template, function callback (err, compileFn) {
 *   if (err) return console.error(err)
 *
 *   var result = compileFn(locals)
 *   console.log(result)
 *   // => 'Hello, Charlike! Welcome in our club.'
 * })
 * ```
 *
 * @param  {String}   `<template>` template to compile.
 * @param  {Function} `[cb]` optional, function with `cb(err, compileFn)` signature.
 * @return {Function} if no `cb`, returns `compileFn` that accept object.
 * @api public
 */

module.exports = function gana (template, cb) {
  if (typeof cb === 'function') {
    tryCatch(function () {
      return ganaCompile(template)
    }, cb)
    return
  }
  return ganaCompile(template)
}

/**
 * try/catch block with callback
 *
 * @param  {Function} `fn`
 * @param  {Function} `cb`
 * @api private
 */

function tryCatch (fn, cb) {
  var ret = null
  try {
    ret = fn()
  } catch (err) {
    cb(err)
    return
  }
  cb(null, ret)
}

},{"gana-compile":1}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2FuYS1jb21waWxlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaXNvYmplY3QvaW5kZXguanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAqIGdhbmEtY29tcGlsZSA8aHR0cHM6Ly9naXRodWIuY29tL3R1bm5ja29Db3JlL2dhbmEtY29tcGlsZT5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgQ2hhcmxpa2UgTWlrZSBSZWFnZW50IDxAdHVubmNrb0NvcmU+IChodHRwOi8vd3d3LnR1bm5ja29jb3JlLnRrKVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG4ndXNlIHN0cmljdCdcblxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnaXNvYmplY3QnKVxuXG4vKipcbiAqID4gQ29tcGlsZXMgYSBgdGVtcGxhdGVgIHRvIGEgZnVuY3Rpb24sIHdoaWNoXG4gKiBhY2NlcHRzIGBsb2NhbHNgIG9iamVjdCB0byBwb3B1bGF0ZSB0aGUgdGVtcGxhdGUuXG4gKlxuICogKipFeGFtcGxlKipcbiAqXG4gKiBgYGBqc1xuICogdmFyIGdhbmFDb21waWxlID0gcmVxdWlyZSgnZ2FuYS1jb21waWxlJylcbiAqXG4gKiB2YXIgdGVtcGxhdGUgPSAnV2VsY29tZSBoZXJlLCAke3VjZmlyc3QobmFtZSl9ISBBbmQgaGF2ZSBmdW4hJ1xuICogdmFyIGxvY2FscyA9IHtcbiAqICAgbmFtZTogJ2NoYXJsaWtlJyxcbiAqICAgdWNmaXJzdDogZnVuY3Rpb24gdWNmaXJzdCAodmFsKSB7XG4gKiAgICAgcmV0dXJuIHZhbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhbC5zbGljZSgxKVxuICogICB9XG4gKiB9XG4gKlxuICogdmFyIGZuID0gZ2FuYUNvbXBpbGUodGVtcGxhdGUpXG4gKiB2YXIgc3RyID0gZm4obG9jYWxzKVxuICpcbiAqIGNvbnNvbGUubG9nKHN0cilcbiAqIC8vID0+ICdXZWxjb21lIGhlcmUsIENoYXJsaWtlISBBbmQgaGF2ZSBmdW4hJ1xuICogYGBgXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBgdGVtcGxhdGVgIHN0cmluZyB0byBjb21waWxlIHRvIGEgZnVuY3Rpb25cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBsaWtlIGBjb21waWxlRm4obG9jYWxzKWAsIHdoZXJlIGBsb2NhbHNgIG11c3QgYmUgYG9iamVjdGBcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgYHRlbXBsYXRlYCBub3QgYSBzdHJpbmdcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gaWYgYGxvY2Fsc2Agbm90IGFuIG9iamVjdFxuICogQHRocm93cyB7UmVmZXJlbmNlRXJyb3J9IGlmIGtleSBub3QgZXhpc3RzIGluIGBsb2NhbHNgIG9iamVjdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdhbmFDb21waWxlICh0ZW1wbGF0ZSkge1xuICBpZiAodHlwZW9mIHRlbXBsYXRlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2dhbmFDb21waWxlOiBleHBlY3QgYHRlbXBsYXRlYCB0byBiZSBhIHN0cmluZycpXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gY29tcGlsZUZuIChsb2NhbHMpIHtcbiAgICBpZiAoIWlzT2JqZWN0KGxvY2FscykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2dhbmFDb21waWxlOiBleHBlY3QgYGxvY2Fsc2AgdG8gYmUgYW4gb2JqZWN0JylcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdXG4gICAgdmFyIHZhbHMgPSBbXVxuXG4gICAgZm9yICh2YXIga2V5IGluIGxvY2Fscykge1xuICAgICAga2V5cy5wdXNoKGtleSlcbiAgICAgIHZhbHMucHVzaChsb2NhbHNba2V5XSlcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYyAqL1xuICAgIHZhciBmbiA9IG5ldyBGdW5jdGlvbihrZXlzLCAncmV0dXJuIGAnICsgdGVtcGxhdGUgKyAnYCcpXG4gICAgcmV0dXJuIGZuLmFwcGx5KGxvY2FscywgdmFscylcbiAgfVxufVxuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvKiFcbiAqIGlzb2JqZWN0IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pc29iamVjdD5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIGlzQXJyYXkodmFsKSA9PT0gZmFsc2U7XG59O1xuIiwiLyohXG4gKiBnYW5hIDxodHRwczovL2dpdGh1Yi5jb20vdHVubmNrb0NvcmUvZ2FuYT5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgQ2hhcmxpa2UgTWlrZSBSZWFnZW50IDxAdHVubmNrb0NvcmU+IChodHRwOi8vd3d3LnR1bm5ja29jb3JlLnRrKVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgZ2FuYUNvbXBpbGUgPSByZXF1aXJlKCdnYW5hLWNvbXBpbGUnKVxuXG4vKipcbiAqID4gU3luYyBhbmQgYXN5bmMgY29tcGlsZSwgdXNpbmcgYCR7fWAgZGVsaW1pdGVyc1xuICogYW5kIEVTMjAxNSBUZW1wbGF0ZSBTdHJpbmdzLiBXb3JraW4nIG9uIG5vZGVAMC4xMCB0b28uXG4gKlxuICogKipFeGFtcGxlKipcbiAqXG4gKiBgYGBqc1xuICogdmFyIGdhbmEgPSByZXF1aXJlKCdnYW5hJylcbiAqXG4gKiB2YXIgdGVtcGxhdGUgPSAnSGVsbG8sICR7dWNmaXJzdChhdXRob3IubmFtZSl9ISBXZWxjb21lIGluIG91ciAke3BsYWNlfS4nXG4gKiB2YXIgbG9jYWxzID0ge1xuICogICBhdXRob3I6IHtcbiAqICAgICBuYW1lOiAnY2hhcmxpa2UnXG4gKiAgIH0sXG4gKiAgIHBsYWNlOiAnY2x1YicsXG4gKiAgIHVjZmlyc3Q6IGZ1bmN0aW9uIHVjZmlyc3QgKHZhbCkge1xuICogICAgIHJldHVybiB2YWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2YWwuc2xpY2UoMSlcbiAqICAgfVxuICogfVxuICpcbiAqIC8vIHN5bmNcbiAqIHZhciBjb21waWxlRm4gPSBnYW5hKHRlbXBsYXRlKVxuICogdmFyIHJlc3VsdCA9IGNvbXBpbGVGbihsb2NhbHMpXG4gKiBjb25zb2xlLmxvZyhyZXN1bHQpXG4gKiAvLyA9PiAnSGVsbG8sIENoYXJsaWtlISBXZWxjb21lIGluIG91ciBjbHViLidcbiAqXG4gKiAvLyBhc3luY2hyb25vdXNcbiAqIGdhbmEodGVtcGxhdGUsIGZ1bmN0aW9uIGNhbGxiYWNrIChlcnIsIGNvbXBpbGVGbikge1xuICogICBpZiAoZXJyKSByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpXG4gKlxuICogICB2YXIgcmVzdWx0ID0gY29tcGlsZUZuKGxvY2FscylcbiAqICAgY29uc29sZS5sb2cocmVzdWx0KVxuICogICAvLyA9PiAnSGVsbG8sIENoYXJsaWtlISBXZWxjb21lIGluIG91ciBjbHViLidcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgYDx0ZW1wbGF0ZT5gIHRlbXBsYXRlIHRvIGNvbXBpbGUuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYFtjYl1gIG9wdGlvbmFsLCBmdW5jdGlvbiB3aXRoIGBjYihlcnIsIGNvbXBpbGVGbilgIHNpZ25hdHVyZS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBpZiBubyBgY2JgLCByZXR1cm5zIGBjb21waWxlRm5gIHRoYXQgYWNjZXB0IG9iamVjdC5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnYW5hICh0ZW1wbGF0ZSwgY2IpIHtcbiAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeUNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnYW5hQ29tcGlsZSh0ZW1wbGF0ZSlcbiAgICB9LCBjYilcbiAgICByZXR1cm5cbiAgfVxuICByZXR1cm4gZ2FuYUNvbXBpbGUodGVtcGxhdGUpXG59XG5cbi8qKlxuICogdHJ5L2NhdGNoIGJsb2NrIHdpdGggY2FsbGJhY2tcbiAqXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gYGZuYFxuICogQHBhcmFtICB7RnVuY3Rpb259IGBjYmBcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHRyeUNhdGNoIChmbiwgY2IpIHtcbiAgdmFyIHJldCA9IG51bGxcbiAgdHJ5IHtcbiAgICByZXQgPSBmbigpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNiKGVycilcbiAgICByZXR1cm5cbiAgfVxuICBjYihudWxsLCByZXQpXG59XG4iXX0=
