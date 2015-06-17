module.exports = ({data}) => (
  data.index +
  (data.appendFilename ? ' myTemplate.js' : '')
);
