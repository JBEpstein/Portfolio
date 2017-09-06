'use strict';

function Project (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

Project.all = [];

Project.prototype.toHtml = function() {
  let template = Handlebars.compile($('#Project-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

Project.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  })
}

Project.fetchAll = function() {
  if (localStorage.rawData) {
    Project.loadAll(JSON.parse(localStorage.rawData));
    projectView.initIndexPage();
  } else {
    $.getJSON('/data/projectIpsum.json')
    .then(function(rawData) {
      Project.loadAll(rawData);
      localStorage.rawData = JSON.stringify(rawData);
      projectView.initIndexPage();
    }, function(err) {
      console.error(err);
    });
  }
}

Project.prototype.insertRecord = function(callback) {
  $.post('/Projects', {author: this.author, authorUrl: this.authorUrl, body: this.body, category: this.category, publishedOn: this.publishedOn, title: this.title})
  .then(function(data) {
    console.log(data);
    if (callback) callback();
  })
};
