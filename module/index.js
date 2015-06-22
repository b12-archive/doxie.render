import error from './tools/error';

const assign = require('object-assign');
const map = require('1-liners/map');

export default (templateFunction) => {
  if (typeof templateFunction !== 'function') throw error(
    'Wrong value of `templateFunction`. We expected a function.'
  );

  return (data) => assign({}, data, {docs: map(
    (doc) => {
      const output = templateFunction(doc);

      if (typeof output === 'undefined') return doc;
      return assign({}, doc, {output: String(output)});
    },
    data.docs
  )});
};
