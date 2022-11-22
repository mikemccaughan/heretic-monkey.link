// eslint-disable-next-line no-undef
module.exports = [
  {
    mode: 'production',
    entry: ['./app.scss', './app.js'],
    output: {
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'bundle.css',
              },
            },
            { loader: 'extract-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env']],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ['./node_modules','../node_modules'],
                },
                // Prefer Dart Sass
                // eslint-disable-next-line no-undef
                implementation: require('sass'),

                // See https://github.com/webpack-contrib/sass-loader/issues/804
                webpackImporter: false,
              },
            },
          ],
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              // eslint-disable-next-line no-undef
              presets: [require.resolve('@babel/preset-env')],
            },
          },
        },
      ],
    },
    devServer: {
      static: {
        // eslint-disable-next-line no-undef
        directory: __dirname,
      },
      compress: true,
      port: 8080,
    },
  },
];
