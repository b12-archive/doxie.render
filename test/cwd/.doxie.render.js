module.exports = ({data}) => (
  data.index +
  (data.appendFilename ? ' .doxie.render.js' : '')
);
