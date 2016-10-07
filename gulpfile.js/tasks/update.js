// ==== UPDATE ==== //

var gulp = require('gulp'),
  update = require('gulp-update')
;

gulp.task('update', function () {
  gulp.watch('./package.json').on('change', function (file) {
    update.write(file);
  });
});
