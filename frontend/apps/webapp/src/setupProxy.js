const { createProxyMiddleware } = require('http-proxy-middleware');

const apiHost = process.env('SERVER_API_URL') || 'http://localhost:8080';

const proxyMiddleware = createProxyMiddleware({
    target: apiHost,
    changeOrigin: true,
  });

module.exports = function(app) {
  app.use(
    '/api',
    proxyMiddleware
  );
};