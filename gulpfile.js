const gulp = require('gulp'),
  requireAll = require('require-all');

require('@mlz/webui-gulp')
  .use(gulp)
  .loadTasks();

requireAll({
  dirname: __dirname + '/gulp',
  filter: /(.*)\.js$/,
  recursive: true
});
