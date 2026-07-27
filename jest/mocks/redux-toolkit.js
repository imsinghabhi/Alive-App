function configureStore(options) {
  return {
    dispatch: () => undefined,
    getState: () => ({}) ,
    subscribe: () => () => undefined,
    replaceReducer: () => undefined,
    ...options,
  };
}

module.exports = {
  configureStore,
};