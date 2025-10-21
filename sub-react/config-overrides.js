const { name } = require('./package.json');
console.log(name)

module.exports = {
  webpack: function override(config, env) {
    config.entry = config.entry.filter(
      (e) => !e.includes('webpackHotDevClient')
    );

    // Tips：强制设置 publicPath 为子路径，这样直接访问根路径时静态资源会 404
    // config.output.publicPath = '/subapp/sub-react/';
    config.output.publicPath = process.env.PUBLIC_URL;

    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    return config;
  },
  devServer: (configFunction) => {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.open = false;
      config.hot = false;
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };
      // Return your customised Webpack Development Server config.
      return config;
    };
  },
};
