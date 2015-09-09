var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var User = mongoose.model('User');
var Buffer = mongoose.model('Buffer');
// var Promise = require('bluebird');

/* GET users listing. */


router.get('/', function(req, res, next) {
  Buffer.find()
  .then(function (buffers) {
    res.json(buffers);
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
  Buffer.makeAllCompounds(req.body.compounds)
  .then(function (compoundIds) {
    req.body.compounds = req.body.compounds.map(function (compound, index) {
      compound.value = compoundIds[index]
      return compound;
    });
    return Buffer.create(req.body);
  })
  .then(function (buffer) {
    return buffer.populateCompounds();
  })
  .then(function (buffer) {
    res.json(buffer);
  })
  .then(null, next);
});

router.param('bufferId', function (req, res, next, bufferId) {
  Buffer.findOne({_id: bufferId})
  .populate('user')
  .then(function (buffer) {
    return buffer.populateCompounds();
  })
  .then(function (buffer) {
    req.buffer = buffer;
    next();
  })
  .catch(next);
});

router.get('/:bufferId', function (req, res) {
  res.json(req.buffer);
});

router.put('/:bufferId', function (req, res, next) {
  Object.keys(req.body).reduce(function (mem, item) {
    mem[item] = req.body[item];
    return mem;
  }, req.buffer);
  req.buffer.save()
  .then(function (buffer) {
    res.json(buffer);
  })
  .catch(next);
});


module.exports = router;

















