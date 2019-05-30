const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('http-proxy-middleware');

const { routes } = require('../proxyconfig.json');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

for (route of routes) {
  app.use(route.route,
    proxy({
      target: route.address,
      pathRewrite: (path, req) => {
        return path.split('/').slice(2).join('/');
      }
    })
  );
}

// app.use('/', (req, res) => {
//   proxy({
//     target: 'http://localhost:3418',
//     pathRewrite: (path, req) => {
//       console.log(path);
//       return path.split('/').slice(2).join('/');
//     }
//   })
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
