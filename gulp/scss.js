const gulp = require('gulp');

gulp.task('lib:scss', function() {
  return gulp
    .src('src/**/*.scss')
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'));
});
