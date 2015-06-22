import dummyData from './test-tools/dummyData';

import cli from '../module/cli-plugin';

const path = require('path');

const test = require('tape-catch');
const curry = require('1-liners/curry');
const map = require('1-liners/map');
const property = curry(require('1-liners/property'));

const title = curry(require('1-liners/plus'))('CLI plugin:  ');

// Override `process.cwd()` for testing.
const originalCwd = process.cwd;
const mockCwd = () => path.resolve(__dirname, 'cwd');

test(title('Locates the right files'), (is) => {
  process.cwd = mockCwd;

  const mock = dummyData([
    {data: {index: 'one'}},
    {data: {index: 'two'}},
    {data: {index: 'three', appendFilename: true}},
  ]);

  const commentsOutput = (...args) => map(property('output'),
    cli(...args)(mock).docs
  );

  is.deepEqual(
    commentsOutput(),
    ['one', 'two', 'three .doxie.render.js'],
    'Takes the function from `<cwd>/.doxie.render.js` by default.'
  );

  is.deepEqual(
    commentsOutput('myTemplate.js'),
    ['one', 'two', 'three myTemplate.js'],
    'Locates `myTemplate.js`.'
  );

  is.deepEqual(
    commentsOutput('./myTemplate.js'),
    ['one', 'two', 'three myTemplate.js'],
    'Locates `./myTemplate.js`.'
  );

  is.deepEqual(
    commentsOutput('../cwd/myTemplate.js'),
    ['one', 'two', 'three myTemplate.js'],
    'Locates `../cwd/myTemplate.js`.'
  );

  process.cwd = originalCwd;
  is.end();
});

test(title('Fails gracefully'), (is) => {
  process.cwd = mockCwd;

  is.throws(
    () => cli('nonExistent.js'),
    /no template found/i,
    'Throws a helpful error when given a non-existent file.'
  );

  is.throws(
    () => cli('notAFunction.js'),
    /invalid template/i,
    'Throws a helpful error when given a non-function module.'
  );

  is.throws(
    () => cli('badlyFormed.file'),
    SyntaxError,
    'Throws a SyntaxError when given an invalid JS file.'
  );

  process.cwd = originalCwd;
  is.end();
});
