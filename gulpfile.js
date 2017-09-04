/**
 * Sample gulpfile.js
 */

var gulp = require("gulp");
var ready = require("./index.js"); // require("gulp-file-ready");

gulp.task('default', function() {
    return gulp.src('tool/large.txt')
        .pipe(ready())
        .pipe(gulp.dest('dist/'));
});