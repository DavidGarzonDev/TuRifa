export default {
  testEnvironment: 'node',
  // transform: {}, // Ya no es necesario, Jest usará babel-jest automáticamente
  // o si quieres ser explícito:
  // transform: {
  //   '^.+\\.js$': 'babel-jest',
  // },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
};
