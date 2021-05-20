const { createServer } = require('https');
const { URL } = require('url');
const next = require('next');
const fs = require('fs');

const port = +process.env.PORT || 7777;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./certificates/localhost-key.pem'),
  cert: fs.readFileSync('./certificates/localhost.pem'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const baseUrl = `https://${req.headers.host}/`;
    const parsedUrl = new URL(req.url, baseUrl);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`server started on port: ${port}`);
  });
});
