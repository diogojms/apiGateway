const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const routes = [
  {
    context: "/auth",
    target: `http://${process.env.AUTH_URI}:8081`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/auth": "/auth" },
  },
  {
    context: "/user",
    target: `http://${process.env.AUTH_URI}:8081`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/user": "/user" },
  },
  {
    context: "/api-docs-auth",
    target: `http://${process.env.AUTH_URI}:8081`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/api-docs-auth": "/api-docs-auth" },
  },
  {
    context: "/logs",
    target: `http://${process.env.LOGS_URI}:8082`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/logs": "/logs" },
  },
  {
    context: "/product",
    target: `http://${process.env.PRODUCTS_URI}:8083`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/product": "/product" },
  },
  {
    context: "/stock",
    target: `http://${process.env.PRODUCTS_URI}:8083`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/stock": "/stock" },
  },
  {
    context: "/api-docs-products",
    target: `http://${process.env.PRODUCTS_URI}:8083`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/api-docs-products": "/api-docs-products" },
  },
  {
    context: "/service",
    target: `http://${process.env.SERVICES_URI}:8084`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/service": "/service" },
  },
  {
    context: "/api-docs-services",
    target: `http://${process.env.SERVICES_URI}:8084`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/api-docs-services": "/api-docs-services" },
  },
  {
    context: "/order",
    target: `http://${process.env.ORDERS_URI}:8085`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/order": "/order" },
  },
  {
    context: "/api-docs-orders",
    target: `http://${process.env.ORDERS_URI}:8085`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/api-docs-orders": "/api-docs-orders" },
  },
  {
    context: "/stores",
    target: `http://${process.env.STORES_URI}:8086`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/stores": "/stores" },
  },
  {
    context: "/api-docs-stores",
    target: `http://${process.env.STORES_URI}:8086`,
    secure: false,
    auth: false,
    changeOrigin: true,
    pathRewrite: { "^/api-docs-stores": "/api-docs-stores" },
  },

];

routes.forEach((route) => {
  app.use(
    route.context,
    createProxyMiddleware({
      target: route.target,
      pathRewrite: route.pathRewrite,
      changeOrigin: true,
      secure: false,
    })
  );
});

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});