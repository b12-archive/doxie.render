/* jshint -W079 */

import dummyData from './test-tools/dummyData';

import render from '../module/index';

const test = require('tape-catch');
const noop = require('1-liners/noop');
const always = require('1-liners/always');
const map = require('1-liners/map');
const hasOwnProperty = require('1-liners/hasOwnProperty');
const curry = require('1-liners/curry');
const property = curry(require('1-liners/property'));
const drop = curry(require('1-liners/drop'));
const plus = curry(require('1-liners/plus'));

const title = plus('Programmatic API:  ');

test(title('Renders comments’ output'), (is) => {
  const input = dummyData([
    {data: {dummyProperty: false}},
    {data: {dummyProperty: false}, metadata: 'something'},
    {data: {dummyProperty: true}},
  ]);

  const check = (template) => render(template)(input);
  const checkOutputs = (template) => map(property('output'),
    check(template).chunks
  );

  is.deepEqual(
    checkOutputs(always('result')),
    ['result', 'result', 'result'],
    'stuffing the returned string into the `.output` property'
  );

  is.deepEqual(
    map(drop('output'),
      check(always('anything')).chunks
    ),
    input.chunks,
    'leaving the rest of the comment intact'
  );

  is.deepEqual(
    check(noop),
    input,
    'ignoring comment output when the render function returns no value'
  );

  is.deepEqual(
    map(hasOwnProperty,
      checkOutputs(({data}) => (data.dummyProperty ? 'Yeeeah!' : undefined))
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
