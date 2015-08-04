var _ = require('underscore');
var express = require('express');
var router = express.Router();
var utils = require('../../utils');

router.get('/statements/else', function(req, res) {
    satement_else(req, res, null);
});

router.get('/statements/else/:engine', function(req, res) {
    satement_else(req, res, req.params.engine);
});

var satement_else = function(req, res, templateEngine) {
    var templateInfo = utils.templateSelection(templateEngine);
    res.render('statements/else' + templateInfo.extension,
        // Handlebars pre-processing
        _.extend(templateInfo, {
            isHBS: templateInfo.template == 'handlebars',
            isNunjucks: templateInfo.template == 'nunjucks'
        })
    );
};

module.exports = router;
