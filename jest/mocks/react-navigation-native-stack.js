const React = require('react');

function Navigator(props) {
  return React.createElement(React.Fragment, null, props.children);
}

function Screen() {
  return null;
}

function createNativeStackNavigator() {
  return {
    Navigator,
    Screen,
  };
}

module.exports = {
  createNativeStackNavigator,
};