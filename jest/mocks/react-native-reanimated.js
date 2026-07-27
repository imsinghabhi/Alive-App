const React = require('react');

function useSharedValue(initialValue) {
  return { value: initialValue };
}

function withTiming(value) {
  return value;
}

function withDelay(_delay, value) {
  return value;
}

function useAnimatedStyle(factory) {
  return factory();
}

function AnimatedView(props) {
  return React.createElement('View', props, props.children);
}

const Animated = {
  View: AnimatedView,
};

module.exports = {
  __esModule: true,
  default: Animated,
  Animated,
  useSharedValue,
  withTiming,
  withDelay,
  useAnimatedStyle,
};