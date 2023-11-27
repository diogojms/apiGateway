// const express = require("express");
// var httpProxy = require("http-proxy");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const port = 8080

// app.get("/", (req, res) => {
//     res.status(200).send("Hello World!");
// });

// app.use('/user', (req, res, next) => {
//     httpProxy(`http://${process.env.LOGS_URI}:8081/`)(req, res, next) 
// });

// app.use('/product', (req, res, next) => {
//     httpProxy(`http://${process.env.LOGS_URI}:8083/`)(req, res, next) 
// });

// app.listen(port, () => {
//     console.log(`APIGateway running on port ${port}`)
//   })

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

app.use('/user', (req, res) => {
  proxy.web(req, res, { target: `http://127.0.0.1:8081` });
});

app.use('/product', (req, res) => {
  proxy.web(req, res, { target: `http://${process.env.LOGS_URI}:8083` });
});

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
