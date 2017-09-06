'use strict';

const projectView = {};

projectView.populateFilters = function() {
  $('project').each(function() {
    if (!$(this).hasClass('template')) {
      let val = $(this).find('address a').text();
      let optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

projectView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('project').hide();
      $(`project[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('project').fadeIn();
      $('project.template').hide();
    }
    $('#category-filter').val('');
  });
};

projectView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('project').hide();
      $(`project[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('project').fadeIn();
      $('project.template').hide();
    }
    $('#author-filter').val('');
  });
};

projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

projectView.setTeasers = function() {
  $('.project-body *:nth-of-type(n+2)').hide();
  $('project').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.project-body *:nth-of-type(n+2)').hide();
    }
  });
};

projectView.initNewprojectPage = function() {
  $('.tab-content').show();
  $('#export-field').hide();
  $('#project-json').on('focus', function(){
    this.select();
  });

  $('#new-form').on('change', 'input, textarea', projectView.create);
  $('#new-form').on('submit', projectView.submit);
};

projectView.create = function() {
  let project;
  $('#projects').empty();

  Project = new Project({
    title: $('#project-title').val(),
    author: $('#project-author').val(),
    authorUrl: $('#project-author-url').val(),
    category: $('#project-category').val(),
    body: $('#project-body').val(),
    publishedOn: $('#project-published:checked').length ? new Date() : null
  });

  $('#projects').append(project.toHtml());

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  $('#export-field').show();
  $('#project-json').val(`${JSON.stringify(project)},`);
};

projectView.submit = function(event) {
  event.preventDefault();
  let Project = new Project({
    title: $('#project-title').val(),
    author: $('#project-author').val(),
    authorUrl: $('#project-author-url').val(),
    category: $('#project-category').val(),
    body: $('#project-body').val(),
    publishedOn: $('#project-published:checked').length ? new Date() : null
  });

  Project.insertRecord();
}

projectView.initIndexPage = function() {
  Project.all.forEach(function(Project){
    $('#projects').append(Project.toHtml())
  });

  projectView.populateFilters();
  projectView.handleCategoryFilter();
  projectView.handleAuthorFilter();
  projectView.handleMainNav();
  projectView.setTeasers();
};
