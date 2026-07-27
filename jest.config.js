module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@react-navigation/native$': '<rootDir>/jest/mocks/react-navigation-native.js',
    '^@react-navigation/native-stack$': '<rootDir>/jest/mocks/react-navigation-native-stack.js',
    '^@reduxjs/toolkit$': '<rootDir>/jest/mocks/redux-toolkit.js',
    '^react-native-gesture-handler$': '<rootDir>/jest/mocks/react-native-gesture-handler.js',
    '^react-native-reanimated$': '<rootDir>/jest/mocks/react-native-reanimated.js',
    '^react-redux$': '<rootDir>/jest/mocks/react-redux.js',
  },
};
