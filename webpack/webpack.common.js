const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
	entry: {
		index: path.resolve(__dirname, '../src/index.jsx')
	},
	module: {
		rules: [
			//javascript
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			//images
			{
				test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "static/images"
        }
			},
			//audios
			{
        test: /\.(aac|mp3)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "static/audio",
            esModule: false
          }
        }
      },
			//videos
			{
        test: /\.(webm|mp4)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "static/video",
            esModule: false
          }
        }
			}
		]
	},
	plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Repogit',
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/ico/icons8-github-48.png'),
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new WebpackPwaManifest({
      filename: "manifest.json",
      name: 'Repogit',
      short_name: 'Repogit',
      description: 'Analytics WebApp',
      background_color: '#ffffff',
      theme_color: "#ddd",
      crossorigin: 'anonymous', //can be null, use-credentials or anonymous
      publicPath: '/',
      includeDirectory: true,
      icons: [
        {
          src: path.resolve(__dirname, '../src/assets/images/icons/icons8-octocat-48.png'),
          sizes: '48x48',
          destination: path.join('static/icons')
        },
        {
          src: path.resolve(__dirname, '../src/assets/images/icons/icons8-octocat-96.png'),
          sizes: '96x96',
          destination: path.join('static/icons')
        },
        {
          src: path.resolve(__dirname, '../src/assets/images/icons/icons8-octocat-144.png'),
          sizes: '144x144',
          destination: path.join('static/icons')
        },
        {
          src: path.resolve(__dirname, '../src/assets/images/icons/icons8-octocat-240.png'),
          sizes: '240x240',
          destination: path.join('static/icons')
        },
        {
          src: path.resolve(__dirname, '../src/assets/images/icons/icons8-octocat-480.png'),
          sizes: '480x480',
          destination: path.join('static/icons')
        }
      ]
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, '../src/serviceWorker.js'),
      swDest: "service-worker.js"
    })
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss']
  },
  stats: 'verbose'
}