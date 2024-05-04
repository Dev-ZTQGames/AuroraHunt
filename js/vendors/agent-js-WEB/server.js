const express = require("express");
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();

var options = {
  key: fs.readFileSync('/ssl_aurorahunt.xyz/2023/aurorahunt.xyz.key.pem'),
  cert: fs.readFileSync('/ssl_aurorahunt.xyz/2023/aurorahunt-ssl-bundle-2023.crt.pem')
};

const hostname = '0.0.0.0';
const port = 8080;

app.use(express.static(path.join(__dirname, 'WEB', 'dist')));

const indexPath = path.join(__dirname, 'WEB', 'dist', 'index.html');

app.get('*', (req, res) => {
    res.sendFile(indexPath);
});

https.createServer(options, app).listen(port, hostname, () => {   console.log(`Server running at https://0.0.0.0:${port}/`); });