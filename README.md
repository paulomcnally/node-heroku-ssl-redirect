node-heroku-ssl-redirect
========================

Redirect users to the SSL version of your app. For ExpressJS running on Heroku.

This module works only with **import**, don't try to use **require**.

### Installation

```bash
yarn add heroku-ssl-redirect
```

### Usage

```js
import sslRedirect from 'heroku-ssl-redirect';
import express from 'express';
const app = express();

// enable ssl redirect
app.use(sslRedirect());
 
app.get('/', (req, res) => {
  res.send('hello world');
});
 
app.listen(process.env.PORT || 3000);
```

### Environments

Default environment is production, if you need enable redirect with other environment you need send an array argument.

```js
app.use(sslRedirect([
  'other'
  'development',
  'production'
  ]));
```

### HTTP status code

By default a 302 will be used to redirect. A 301 can be configured with the second argument.

```js
app.use(sslRedirect(['production'], 301));
```
