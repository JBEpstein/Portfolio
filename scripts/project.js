'use strict';

var projects = [];

function project (rawDataObj) {
  this.author = rawDataObj.author;
  this.projectUrl = rawDataObj.projectUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
  this.img = rawDataObj.img;
  console.log(this.img);
}

project.prototype.toHtml = function() {
  var $newproject = $('project.template').clone();
  $newproject.removeClass('template');
  if (!this.publishedOn) $newproject.addClass('draft');
  $newproject.data('category', this.category);

  $newproject.find('.byline a').html(this.author);
  $newproject.find('.byline a').attr('href', this.projectUrl);
  $newproject.find('h1:first').html(this.title);
  $newproject.find('.project-body').html(this.body);
  $newproject.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newproject.find('time[pubdate]').attr('title', this.publishedOn);
  $newproject.find('.projectimgs').attr('src', this.img);
  $newproject.append(this.img);
  // Display the date as a relative number of 'days ago'
  $newproject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newproject.append('<hr>');
  return $newproject;
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(projectObject) {
  projects.push(new project(projectObject));
});

projects.forEach(function(project) {
  $('#projects').append(project.toHtml());
});
