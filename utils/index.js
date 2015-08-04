var _ = require('underscore');

module.exports = {
    templateSelection: function(templateName) {
        templateName = _.isString(templateName) ? templateName.trim().toLowerCase() : null;
        return {
            chosen: _.contains(['hbs', 'nunjucks'], templateName),
            extension: 'hbs' == templateName ? '.hbs' : '.nunjucks',
            template: 'hbs' == templateName ? 'handlebars' : 'nunjucks'
        };
    }
};
