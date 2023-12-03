const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/cars', require('./cars'));

module.exports = router;