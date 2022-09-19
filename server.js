const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const port = process.env.PORT
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./infra/ssl/handle-close-friends.com.br.key"),
  cert: fs.readFileSync("./infra/ssl/handle-close-friends.com.br.cert")
};

console.log(`< CERT > `,
  httpsOptions.key,
  httpsOptions.cert
)

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log("ready - started server on url: https://handle-close-friends.com.br:" + port);
  });
});