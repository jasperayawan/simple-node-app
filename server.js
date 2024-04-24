const express = require("express");
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const path = require("path");
const fs = require("fs");
const https = require('https')

const options = {
  key: fs.readFileSync(path.join(__dirname, 'private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certificate.crt')),
};

const app = express();
const port = 3000;

const api = new ParseServer({
  databaseURI: "mongodb+srv://ejayawan22:kuKvYG2VfIEss9Fj@cluster0.yjbhaod.mongodb.net/?retryWrites=true&w=majority",
  appId: "123",
  masterKey: "1234",
  serverURL: `http://localhost:3000/parse`,
  appName: "simple-node-app"
});

const dashboardConfig = {
  apps: [
    {
      appId: "123",
      masterKey: "1234",
      serverURL: `http://localhost:3000/parse`,
      appName: "simple-node-app"
    }
  ]
};

app.use('/parse', new ParseServer(api));

app.use('/dashboard', new ParseDashboard(dashboardConfig));

app.get('/api', (req, res) => {
  res.send({
    name: 'jasper'
  });
});

app.listen(port, () => {
  console.log("server listening to port:", port);
});

https.createServer(options, app).listen(443, () => console.log('Server running on port 443'));
