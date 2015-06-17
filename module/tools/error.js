const {cyan} = require('chalk');

export default require('tiny-error')({
  prefix: `${cyan('[doxie.render]')} `,
});
