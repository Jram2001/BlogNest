var express = require('express');
var router = express.Router();
var auth = require('./auth.routes');
var blog = require('./blog.routes');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/auth', auth)
router.use('/blog', blog)


module.exports = router;
