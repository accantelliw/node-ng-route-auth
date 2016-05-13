var express     = require('express');
var packageJson = require('./package.json');
var bodyParser  = require('body-parser');
var path        = require('path');

var app = express();

console.log()
console.log("*** starting ***")

app.set('port', (process.env.PORT || 5000));

global.App = {
  
  root:       path.join(__dirname),

  appPath: function(path) {
      return this.root + '/' + path
  },  

  require: function(path) {
    return require(this.appPath(path))
  },

  log: function(level, source, msg) {

    var currentLevel = "INFO"
    var levels = ["ERROR", "WARN", "INFO", "DEBUG"];    
    if (levels.indexOf(currentLevel) >= levels.indexOf(level) ) {
      if (typeof msg !== 'string') {
        msg = JSON.stringify(msg);
      };
      console.log(level + "|" + source + "|" + msg);
    }
  },

  version:          packageJson.version,
  jwtSecretKey:     process.env.TOKEN_SECRET||'my super secure key!'
}

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); 

// middleware
require('./app/routes')(app);

app.listen(app.get('port'), function() {
  console.log("Node app is successfully running on port", app.get('port'));
  console.log("*** enjoy ***")
  console.log()
});


