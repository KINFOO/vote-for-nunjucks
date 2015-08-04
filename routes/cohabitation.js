var express = require('express');
var router = express.Router();

router.get('/cohabitation', function(req, res) {
    res.render('cohabitation');
});

module.exports = router;
