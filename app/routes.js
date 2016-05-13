module.exports = function(app) {

  app.use(function(req, res, next){
    //console.log();
    //console.log("-- REQ:: "+req.url);
    //console.log();
    next();
  });

  app.get('/', function(req, res) {
      res.json({ message: 'welcome to our api!' });   
  });

  app.get('/api/test', function (req, res) {
    res.json({ message: '/api/test' });
  });

  var authCtrl = require('./controllers/authCtrl');
  app.post  ('/api/auth/login',   authCtrl.login);
  app.get   ('/api/auth/profile', authCtrl.getUserProfile);

  var dataCtrl = require('./controllers/dataCtrl');
  app.all   ('/api/data',         authCtrl.authenticate);
  app.get   ('/api/data',         dataCtrl.list);
  app.get   ('/api/data/get/:id', dataCtrl.getById);
  app.get   ('/api/data/stats',   dataCtrl.getStatistics);
  
  app.get('*', function(req, res) { 
    res.status(404).send({message:'resource not found'}).end();
  }); 
  
} 