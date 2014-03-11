/**
 * Module dependencies.
 */
global.myModule = require('./module/module');
var module = myModule.module({
  express: 'express',
  routes: '../routes',
  http: 'http',
  path: 'path',
  ceres: 'ceres.js',
  io: '../connect/io'
}), express = module.express,routes = module.routes,http = module.http,path = module.path, ceres = module.ceres.ceres,
    io = module.io, server, app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.start(server);
