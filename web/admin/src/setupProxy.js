const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {

    mw = createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
      });

    app.use('/api', mw);
    app.use('/plugins', mw);
};