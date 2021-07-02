const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const {
  CracoAliasPlugin,
  configPaths,
} = require('react-app-rewire-alias/lib/aliasDangerous')

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}))
          return webpackConfig
        },
      },
    },
    {
      plugin: CracoAliasPlugin,
      options: { alias: configPaths('./tsconfig.paths.json') },
    },
  ],
}
