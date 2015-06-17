import renderError from './tools/error';
  // TODO: Prefix error with [doxie --render]

const {resolve} = require('path');

export default (source = '.doxie.render.js') => {
  let templatePath = resolve(process.cwd(), source);
  let template;

  try {
    template = require(templatePath);
  } catch (error) {throw (
    error.code === 'MODULE_NOT_FOUND' ?
    renderError(
      `No template found. We’ve looked in \`${templatePath}\`.`
        // TODO: Print usage.
    ) :
    error
  );}

  if (typeof template !== 'function') throw renderError(
    `Invalid template. Make sure the file \`${templatePath}\` exports a ` +
    'function.'
  );
};
