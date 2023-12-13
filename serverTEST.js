const express = require("express");
const httpProxy = require("http-proxy");
const bodyParser = require('body-parser');
const rp = require("request-promise-native");

const app = express();
const proxy = httpProxy.createProxyServer();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //parse application/x-www-form-urlencoded

const port = 8080;

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
 
const userServiceRootUrl = `http://${process.env.AUTH_URI}:8081/auth/login`;
 
app.use("/users/auth/login", bodyParser.json(), async (req, res) => {
    const user = await rp({ uri: userServiceRootUrl, body: req.body, json: true, method: 'POST' });
    try {
      res.status(200).json({
        token: user.token,
        tokenValidation: user.tokenValidation
    });
    } catch (error) {
      console.error(error);
    }
    
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
  proxy.web(req, res, { target: `http://${process.env.LOGS_URI}:8084` });
  console.log('After proxy.web call');
});

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});


