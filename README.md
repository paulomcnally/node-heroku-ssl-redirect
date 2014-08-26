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
