var
	gulp = require('gulp'),
	gulpif = require('gulp-if'),
	path = require('path'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util'),
	through = require('through2'),
	argv = require('yargs').argv,
	_ = require('underscore'),
	exec = require('child_process').exec,
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	rev = require('gulp-rev'),
	clean = require('gulp-clean'),
	fs = require('fs'),
	log = gutil.log,
	md5 = require("gulp-md5"),
	colors = gutil.colors;


var
	//获取gulp命令的参数
	options = _.extend({}, {
		name: '',
		exclude: '',
		md5: '',
		product: 'demo'
	}, argv),


	//@baseDevPath 是业务开发目录，默认为public/src/demo/ 可通过options.product参数改变
	//@baseBuildPath 是业务打包目录，默认值和参数同上

	rjsConfigPath = 'public/src/',
	baseDevPath = 'public/src/' + options.product + '/',
	baseBuildPath = 'public/release/' + options.product + '/',
	name = options.name.split('/'),

	isModuleExists = function(fsName, type, all){
		if(!options.name && !all){
			log(colors.red('请输入 --name参数，指定模块名称!'));
			return false;
		}
		if(!fs.existsSync(fsName)){
			log(colors.red('没有找到该目录的'+ type +'文件：'), fsName);
			return false;
		}

		return true;
	}


//clean old files
gulp.task('clean-css', function(){
	return gulp.src(baseBuildPath + name[0] + '/**/*.css', {read: false})
		.pipe(clean())
})
gulp.task('clean-allcss', function(){
	return gulp.src(baseBuildPath + '**/*.css', {read: false})
		.pipe(clean())
})
gulp.task('clean-js', function(){
	return gulp.src(baseBuildPath + name[0] + '/**/*.js', {read: false})
		.pipe(clean())
})
gulp.task('clean-alljs', function(){
	return gulp.src(baseBuildPath + '**/*.js', {read: false})
		.pipe(clean())
})



//打包单个文件，如打包 module-test/main.js
gulp.task('rjs', ['clean-js'], function(cb){
	if(!isModuleExists(baseDevPath + options.name + '.js', 'js')){
		return;
	}
	var outpath = baseBuildPath + options.name + '.js';

	if(name.legnth===0) return;
	var command =
		'r.js -o '+ rjsConfigPath +'rjs-config-s.js name='+
		name[1] +
		' baseUrl='+ baseDevPath +
		name[0] +
		' out=' + outpath +
		(options.exclude ? (' exclude=' + options.exclude) : '');
	console.log(command);
	exec(command, function(err) {
		if (err) return cb(err);
		cb();
	});
});


//打包demo目录下的所有在rjs-config配置文件modules数组里的文件
gulp.task('rjs-all',  ['clean-alljs'], function(cb){
	if(!isModuleExists(baseDevPath, 'js', true)){
		return;
	}
	exec('r.js -o '+ baseDevPath +'rjs-config.js' + ' dir='+ baseBuildPath, function(err) {
		if (err) return cb(err);
		cb();
	});
});



//less
gulp.task('less', ['clean-css'], function(){
	if(!isModuleExists(baseDevPath + name[0], 'less')){
		return;
	}

	gulp.src(baseDevPath + name[0] + '/**/*.less')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest(baseBuildPath + name[0]));
});



//less all
gulp.task('less-all', ['clean-allcss'], function(){
	if(!isModuleExists(baseDevPath, 'less', true)){
		return;
	}
	gulp.src(baseDevPath + '/**/*.less')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest(baseBuildPath));
});


//删除rev之前的原始文件
var rmOrig = function() {
	return through.obj(function(file, enc, cb) {
		this.push(file); // We'll just pass this file along

		if (!file.revOrigPath) {
			return cb(); // Nothing to remove :)
		}

		//log(colors.red('DELETING'), file.revOrigPath);
		fs.unlink(file.revOrigPath, function(err) {
			cb();
		});
	});
};

/*
	打包单个模块，gulp命令：
		gulp release --name module-test/main --exclude zepto,mClone --md5
	*/

gulp.task('release', ['rjs', 'less'], function(){
	if(!options.md5) return;
	gulp.src([baseBuildPath + name[0] +'/**/*.js', baseBuildPath + name[0] + '/**/*.css'])
		.pipe(rev())
		.pipe(gulp.dest(baseBuildPath  + name[0]))
	//manifest
	//.pipe(rev.manifest())
	//.pipe(gulp.dest(baseBuildPath))
	.pipe(rmOrig())
});

gulp.task('release-all', ['rjs-all', 'less-all'], function() {
	if(!options.md5) return;
	gulp.src([baseBuildPath + '**/*.js', baseBuildPath + '**/*.css'])
		.pipe(rev())
		.pipe(gulp.dest(baseBuildPath))
		.pipe(rmOrig())
});



