const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/openapi/service/rest/Covid19/getCovid19InfStateJson',
    createProxyMiddleware({
      target: 'http://openapi.data.go.kr',
      changeOrigin: true,
    })
  );
};
