import { createProxyMiddleware } from 'http-proxy-middleware';
// eslint-disable-next-line
export default function (app) {
  app.use(
    '/openapi/service/rest/Covid19/getCovid19InfStateJson',
    createProxyMiddleware({
      target: 'http://openapi.data.go.kr',
      changeOrigin: true,
    })
  );
}
