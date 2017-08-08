'use strict';

var articles = [];

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.projectUrl = rawDataObj.projectUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  // var $newArticle = $('article.template').clone();
  $newArticle.removeClass('template');
  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);

  $newArticle.find('.byline a').html(this.author);
  $newArticle.find('.byline a').attr('href', this.projectUrl);
  $newArticle.find('h1:first').html(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  // Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  articles.push(new Article(articleObject));
});

articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
});
// Attempt to add animation to Article when clicked. Larry C.
$(document).ready(function(){
  $('#articles').click(function(){
    var div = $('div');
        div.animate({height: '200px', opacity: '0.4'}, "slow");
        div.animate({backgroundColor:'#4E1402'}, 300);
        div.animate({height: '45px', opacity: '0.8'}, "slow");
        div.animate({backgroundColor:'#943D20'}, 100);
  });
});
