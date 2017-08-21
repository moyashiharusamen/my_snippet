var gulp = require('gulp'),
  // sass
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),//ベンダープレフィクス
  plumber = require('gulp-plumber'),//エラー時にwatchを止めない
  cssbeautify = require('gulp-cssbeautify'),//cssのインデントを揃える
  header = require('gulp-header'),//ファイルの先頭にテキストを付与してくれる、CSSのcharsetに使用
  charset = '@charset "UTF-8";\n\n\n',
  // ejs
  ejs = require('gulp-ejs');

gulp.task('sass',function(){
  gulp.src('sass/**/*scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify({
      indent: ' ',
      openbrace: 'end-of-line',
      autosemicolon: true
    }))
    .pipe(header(charset))
    .pipe(gulp.dest('./css'));
});

gulp.task('ejs',function(){
  gulp.src(
    ['app/dev/ejs/**/*.ejs','!' + 'app/dev/ejs/**/_*.ejs']
  )
    .pipe(ejs( {}, {
      ext: '.html'
    }))
    .pipe(gulp.dest('app/public'));
});

gulp.task('default', ['sass', 'ejs'] , function(){
  gulp.watch('sass/**/*.scss',['sass']);
  gulp.watch('app/dev/ejs/**/*.ejs',['ejs']);
});
