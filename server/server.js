var express = require('express');
var compress = require('compression');
var path = require('path');
var app = express();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var path = require('path');
var Imagemin = require('imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var html = require('html');
var read = require('fs-readdir-recursive');

const joinForWebPath = function() {
  return Array.from(arguments).join('/').replace(/^./, '');
};
app.use(compress());
app.use(express.static(path.join(__dirname, './../')));

app.get('/', function(req,res) {
  res.sendFile('/index.html');
});

var cpUpload = upload.fields([
  { name: 'hero', maxCount: 1 },
  { name: 'divider', maxCount: 1 },
  { name: 'feature', maxCount: 1 }
]);
app.post('/uploads', cpUpload, function (req, res, next) {
  fs.exists(path.join('./Content', req.body.productName), function(exists) {
    if (!exists) {
      fs.mkdirSync(path.join('./Content', req.body.productName));
      fs.mkdirSync(path.join('./Content', req.body.productName, 'img'));
    }
  });

  var minr = new Imagemin();
  minr.src(req.files[req.body.imageName][0].path)
      .dest('./uploads/tmp');

  switch(req.files[req.body.imageName][0].mimetype) {
    case 'image/jpeg':
    minr.use(imageminJpegRecompress({loops: 3, progressive: true, quality: 'high'}));
    break;

    case 'image/png':
    minr.use(Imagemin.optipng({optimizationLevel: 3}));
    break;

    case 'image/gif':
    minr.use(Imagemin.gifsicle({interlaced: true}));
    break;

    default:
    minr.use(Imagemin.jpegtran({progressive: true}));
    break;
  }

  minr.run(function (err, files) {
  	console.log(files[0]);
  	// => {path: 'build/images/foo.jpg', contents: <Buffer 89 50 4e ...>}
    if(err) {
      res.status(500).json({'error': err});
      res.end();
    } else {
      fs.rename(files[0].path, path.join('./Content', req.body.productName, 'img', req.files[req.body.imageName][0].originalname), function(err) {
        if(err) {
          res.status(500).json({'error': err});
          res.end();
        } else {
          res.json({'path': joinForWebPath('./Content', req.body.productName,'img', req.files[req.body.imageName][0].originalname)});
          res.end();
        }
      });
      console.log(req.files, req.body);
    }
  });
});

app.post('/export', cpUpload, function (req, res, next) {
  fs.exists(path.join('./Content', req.body.productName), function(exists) {
    if(!exists) {
      fs.mkdirSync(path.join('./Content', req.body.productName));
      fs.mkdirSync(path.join('./Content', req.body.productName, 'img'));
    }
    fs.writeFileSync(path.join('./Content', req.body.productName, 'Default.html'), html.prettyPrint(JSON.parse(req.body.html), {indent_size: 2}));
    fs.writeFileSync(path.join('./Content', req.body.productName, 'appState.js'), req.body.js);
    fs.createReadStream(path.join('./js', 'modernizr.js')).pipe(fs.createWriteStream(path.join('./Content', req.body.productName, 'modernizr.js')));
    fs.createReadStream(path.join('./css', 'custom.css')).pipe(fs.createWriteStream(path.join('./Content', req.body.productName, 'custom.css')));
    res.end('got it');
  });

});

app.get('/available', cpUpload, (req, res, next) => {
  const files = read('./Content').filter((f) => f.indexOf('appState') > -1).map((f) => f.replace(/\\/, '/')) || [];
  res.json(files);
  res.end();
});

app.post('/state', cpUpload, (req, res, next) => {
  const appState = fs.readFileSync(path.join('./Content/', req.body.appStatePath), 'utf-8');
  res.json(appState);
  res.end();
});

app.listen(8080, function() {
  console.log('Server is listening on port 8080');
});
