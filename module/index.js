const assign = require('object-assign');
const map = require('1-liners/map');
const {cyan} = require('chalk');
const error = require('tiny-error')({
  prefix: `${cyan('[doxie.render]')} `,
});

export default (templateFunction) => {
  if (typeof templateFunction !== 'function') throw error(
    'Wrong value of `templateFunction`. We expected a function.'
  );

  return (data) => assign({}, data, {chunks: map(
    (chunk) => {
      const output = templateFunction(chunk);

      if (typeof output === 'undefined') return chunk;
      return assign({}, chunk, {output: String(output)});
    },
    data.chunks
  )});
};
