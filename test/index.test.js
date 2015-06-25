/* jshint -W079 */

import render from '../module/index';

const test = require('tape-catch');
const noop = require('1-liners/noop');
const always = require('1-liners/always');
const map = require('1-liners/map');
const curry = require('1-liners/curry');
const hasOwnProperty = curry(require('1-liners/hasOwnProperty'));
const property = curry(require('1-liners/property'));
const omit = require('101/omit');
const plus = curry(require('1-liners/plus'));
const dummy = require('doxie-dummy');

const title = plus('Programmatic API:  ');

test(title('Renders comments’ output'), (is) => {
  const input = dummy([
    {data: {dummyProperty: false}},
    {data: {dummyProperty: false}, metadata: 'something'},
    {data: {dummyProperty: true}},
  ]);

  const check = (template) => render(template)(input);
  const checkOutputs = (template) => map(property('output'),
    check(template).docs
  );

  is.deepEqual(
    checkOutputs(always('result')),
    ['result', 'result', 'result'],
    'stuffing the returned string into the `.output` property'
  );

  is.deepEqual(
    map(omit('output'),
      check(always('anything')).docs
    ),
    input.docs,
    'leaving the rest of the comment intact'
  );

  is.deepEqual(
    check(noop),
    input,
    'ignoring comment output when the render function returns no value'
  );

  is.deepEqual(
    map(hasOwnProperty('output'),
      check(({data}) => (data.dummyProperty ? 'Yeeeah!' : undefined)).docs
    ),
    [false, false, true],
    'handling it well when only some comments produce output'
  );

  is.deepEqual(
    checkOutputs(({data}) => data.dummyProperty),
    ['false', 'false', 'true'],
    'casting non-string return values'
  );

  is.end();
});

test(title('Fails with informative messages'), (is) => {
  is.throws(
    () => render(/something wrong/),
    /expected a function/i,
    'when given a non-function'
  );

  is.end();
});
