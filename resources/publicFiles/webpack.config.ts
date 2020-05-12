import nodeExternals from 'webpack-node-externals';
import * as path from 'path';
import { Configuration } from 'node_modules/@types/webpack/index.d';

const nodeModules: string = path.join(__dirname, 'node_modules');

const config: Configuration = {
  entry: {
    publicFiles: path.join(__dirname, 'app.ts'),
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

export { config };
