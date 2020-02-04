const nodeExternals = require('webpack-node-externals');
const path = require('path');

const nodeModules = path.join(__dirname, 'node_modules');

module.exports = {
  entry: {
    publicGraphql: path.join(__dirname, 'app.ts'),
  },
  // find the local node_modules dir
  resolve: {
    modules: [nodeModules],
  },
  // exclude the local node_modules dir
  externals: [
    nodeExternals({
      modulesDir: nodeModules,
    }),
  ],
};
