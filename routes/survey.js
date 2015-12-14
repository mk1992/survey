var express = require('express'),
    Survey = require('../models/surveys'),
    Comment = require('../models/comments');
var router = express.Router();

/* GET posts listing. */



router.get('/', function(req, res, next) {
  res.render('surveys/index');

});

router.get('/:id', function(req, res, next) {
  Survey.findById(req.params.id, function(err, survey) {
    if(err) {
      return next(err);
    }
    Comment.find({survey: survey.id}, function(err, comments) {
      if (err) {
        return next(err);
      }
      res.render('surveys/show', {survey: survey, comments: comments});
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('surveys/new');
});

router.post('/', function(req, res, next) {
  console.log("들어옴!!");
  var survey = new Survey({
    title: req.body.title,
    email: req.body.email,
    content: req.body.content
  });

  survey.save(function(err, result) {
    if (err) {
      return next(err);
    }
    res.redirect('/survey/' + result._id);
  });
});

router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    Comment.find({survey: survey.id}, function(err, comments) {
      if (err) {
        return next(err);
      }
      res.render('surveys/show', {survey: survey, comments: comments});
    });
  });
});

router.post('/:id/comments', function(req, res, next) {
  console.log('1234' + req.body.type);
  var comment = new Comment({
    survey: req.params.id,
    type: req.body.type
  });

  comment.save(function(err) {
    if (err) {
      return next(err);
    }
    Survey.findByIdAndUpdate(req.params.id, {$inc: {numComment: 1}}, function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/survey/' + req.params.id);
    });
  });
});

module.exports = router;
