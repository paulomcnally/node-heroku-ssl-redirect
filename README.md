node-heroku-ssl-redirect
========================

Redirect users to the SSL version of your app. For ExpressJS running on Heroku

### Installation

    npm install heroku-ssl-redirect

### Usage

    var sslRedirect = require('heroku-ssl-redirect');
    var express = require('express');
    var app = express();

    // enable ssl redirect
    app.use(sslRedirect());

    app.get('/', function(req, res){
      res.send('hello world');
    });

    app.listen(3000);

### Environments

Default environment is production, if you need enable redirect with other environment you need send an array argument.

    app.use(sslRedirect([
      'other'
      'development',
      'production'
      ]));

### HTTP status code

By default a 302 will be used to redirect. A 301 can be configured with the second argument.

    app.use(sslRedirect(['production'], 301));

### ExpressJS 3.x ([issue #1](https://github.com/paulomcnally/node-heroku-ssl-redirect/issues/1))

    npm install git://github.com/paulomcnally/node-heroku-ssl-redirect.git#express3x --save
