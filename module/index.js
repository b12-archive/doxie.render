export default (templateFunction) => {
  if (typeof templateFunction !== 'function') throw new Error(
    'Wrong value of `templateFunction`. We expected a function.'
  );
};
