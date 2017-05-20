var gulp = require('gulp'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	plumber = require('gulp-plumber'),
	cssbeautify = require('gulp-cssbeautify'),
	header = require('gulp-header'),
	browser = require('browser-sync'),
	charset = '@charset "UTF-8";\n\n';

gulp.task('server',function(){
	browser({
		server: {
			baseDir: './htdocs'
		}
	})
});

gulp.task('sass',function(){
	gulp.src(['sass/**/*scss','!' + 'sass/**/_*scss'])
		.pipe(plumber())
		.pipe(sass())
		.pipe(cssbeautify({
			indent: '	',
			openbrace: 'end-of-line',
			autosemicolon: true
		}))
		.pipe(header(charset))
		.pipe(gulp.dest('htdocs/css'))
		.pipe(browser.reload({stream:true}));
});

gulp.task('pug', function() {
	return gulp.src(['src/**/*.pug', '!src/**/_*.pug'])
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('htdocs'))
	.pipe(browser.reload({stream:true}));
});

gulp.task('default', ['sass','pug','server'] , function(){
	gulp.watch('src/sass/**/*.scss',['sass']);
	gulp.watch('src/pug/**/*.pug',['pug']);
});
