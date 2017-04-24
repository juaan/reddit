(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['topic.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<li>\n    <div class=\"resize\">\n        <div class=\"callout clearfix\">\n            <a class=\"topic\">"
    + alias2(alias1((depth0 != null ? depth0.topic : depth0), depth0))
    + "</a>\n            <a class=\"button float-right votes\">"
    + alias2(alias1((depth0 != null ? depth0.votes : depth0), depth0))
    + " Votes</a>\n            <a class=\"button float-right downvote\">Downvote</a>\n            <a class=\"button float-right upvote\">Upvote</a>\n        </div>\n    </div>\n</li>";
},"useData":true});
})();