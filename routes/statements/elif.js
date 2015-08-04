var _ = require('underscore');
var express = require('express');
var router = express.Router();
var utils = require('../../utils');

router.get('/statements/elif', function(req, res) {
    statement_elif(req, res, null);
});

router.get('/statements/elif/:engine', function(req, res) {
    statement_elif(req, res, req.params.engine);
});

var statement_elif = function(req, res, templateEngine) {

    var types = ['AVEP', 'AVMS_AL', 'AVMS_AP', 'ALEC', 'AVC', 'INTEGRATION', 'INTERNAL', 'OTHER', 'UFOTA'];
    var type = types[_.random(0, types.length - 1)];
    var templateInfo = utils.templateSelection(templateEngine);

    var displayData = {
        // This is the Handlebars pre-processing
        isHBS: templateInfo.template == 'handlebars',
        isNunjucks: templateInfo.template == 'nunjucks',
        type: type
    };
    displayData['is' + type] = true;
    res.render('statements/elif' + templateInfo.extension, _.extend(templateInfo, displayData));
};

module.exports = router;
