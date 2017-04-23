(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['topic.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li>\n    <div class=\"resize\">\n        <div class=\"callout clearfix\">\n            <a>"
    + alias4(((helper = (helper = helpers.topic || (depth0 != null ? depth0.topic : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"topic","hash":{},"data":data}) : helper)))
    + "</a>\n            <a class=\"button float-right\">"
    + alias4(((helper = (helper = helpers.votes || (depth0 != null ? depth0.votes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"votes","hash":{},"data":data}) : helper)))
    + " Votes</a>\n            <a class=\"button float-right\">Downvote</a>\n            <a class=\"button float-right\">Upvote</a>\n        </div>\n    </div>\n</li>";
},"useData":true});
})();