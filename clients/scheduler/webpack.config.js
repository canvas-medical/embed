const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const esmOutput = {
  path: path.join(__dirname, 'dist'),
  filename: 'scheduler.js',
  library: {
    type: 'module',
  },
}

const umdOutput = {
  path: path.join(__dirname, 'dist'),
  filename: 'scheduler.js',
  library: 'Scheduler',
  libraryTarget: 'umd',
  umdNamedDefine: true,
}

const production = {
  mode: 'production',
}

const development = {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 4000,
  },
}

module.exports = ({ esm, prod }) => {
  let options = {}
  if (prod) {
    options = production
  } else {
    options = development
  }

  return {
    ...options,
    entry: path.join(__dirname, 'src'),
    output: esm ? esmOutput : umdOutput,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /\.\/node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          loader: 'css-loader',
        },
      ],
    },
    experiments: {
      outputModule: esm,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.html'],
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime',
      },
    },
  }
}
