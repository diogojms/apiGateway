const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const proxy = httpProxy.createProxyServer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use('/users', (req, res) => {
  console.log('Before proxy.web call');
  proxy.web(req, res, { target: `http://${process.env.LOGS_URI}:8081` });
  console.log('After proxy.web call');
});

app.use('/logs', (req, res) => {
  console.log('Before proxy.web call');
  proxy.web(req, res, { target: `http://${process.env.LOGS_URI}:8082` });
  console.log('After proxy.web call');
});

app.use('/products', (req, res) => {
  console.log('Before proxy.web call');
  proxy.web(req, res, { target: `http://${process.env.LOGS_URI}:8083` });
  console.log('After proxy.web call');
});

app.use('/services', (req, res) => {
  console.log('Before proxy.web call');
  proxy.web(req, res, { target: `http://${process.env.LOGS_URI}:8083` });
  console.log('After proxy.web call');
});

// Manipulador de erro para o proxy
proxy.on('error', (err, req, res) => {
  console.error(err);
  res.status(500).send('Erro interno no servidor de proxy.');
});

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
