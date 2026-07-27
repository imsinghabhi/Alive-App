const React = require('react');

function Provider(props) {
  return React.createElement(React.Fragment, null, props.children);
}

module.exports = {
  Provider,
};