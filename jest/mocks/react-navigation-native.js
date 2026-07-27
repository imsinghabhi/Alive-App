const React = require('react');

function NavigationContainer(props) {
  return React.createElement(React.Fragment, null, props.children);
}

function useNavigation() {
  return {
    replace: () => undefined,
    navigate: () => undefined,
    goBack: () => undefined,
  };
}

module.exports = {
  NavigationContainer,
  useNavigation,
};