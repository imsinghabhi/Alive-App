const React = require('react');
const { View } = require('react-native');

function GestureHandlerRootView(props) {
  return React.createElement(View, props, props.children);
}

module.exports = {
  GestureHandlerRootView,
};