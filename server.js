const express = require("express");
const { ParseServer } = require('parse-server');
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
    serverURL: `https://54.160.165.190/parse`,
    appName: "simple-node-app"
});

const dashboardConfig = new ParseDashboard({
    apps: [
        {
          appId: "123",
          masterKey: "1234",
          serverURL: `https://54.160.165.190/parse`,
          appName: "simple-node-app"
        }
      ]
})

api.start();

app.use('/parse', api.app)
app.use('/dashboard', dashboardConfig)

app.get('/api', (req, res) => {
  res.send({
    name: 'jaspers cute'
  });
});

app.listen(port, () => {
  console.log("server listening to port:", port);
});

https.createServer(options, app).listen(443, () => console.log('Server running on port 443'));
