const {cyan} = require('chalk');
const error = require('tiny-error')({
  prefix: `${cyan('[doxie.render]')} `,
});

export default (templateFunction) => {
  if (typeof templateFunction !== 'function') throw error(
    'Wrong value of `templateFunction`. We expected a function.'
  );
};
