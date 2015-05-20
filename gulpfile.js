var
	gulp = require('gulp'),
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
	fs = require('fs'),
	del = require('del'),
	rename = require("gulp-rename"),
	log = gutil.log,
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

	basePath = 'public/src/',
	baseDevPath = 'public/src/' + options.product + '/',
	baseTempPath = 'public/release-temp/' + options.product + '/',
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
	};


//打包单个文件，如打包 module-test/main.js
gulp.task('rjs', function(cb){
	if(!isModuleExists(baseDevPath + options.name + '.js', 'js')){
		return;
	}
	var outpath = baseTempPath + options.name + '.js';

	if(name.legnth===0) return;
	var command =
		'r.js -o '+ basePath +'rjs-config-s.js name='+
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
gulp.task('rjs-all', function(cb){
	if(!isModuleExists(baseDevPath, 'js', true)){
		return;
	}
	exec('r.js -o '+ baseDevPath +'rjs-config.js' + ' dir='+ baseTempPath, function(err) {
		if (err) return cb(err);
		cb();
	});
});



//less
gulp.task('less', function(){
	if(!isModuleExists(baseDevPath + name[0], 'less')){
		return;
	}

	gulp.src(baseDevPath + name[0] + '/**/*.less')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest(baseTempPath + name[0]));
});



//less all
gulp.task('less-all', function(){
	if(!isModuleExists(baseDevPath, 'less', true)){
		return;
	}
	gulp.src(baseDevPath + '/**/*.less')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest(baseTempPath));
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

		/*
		先把r.js和less打包完的文件放入release-temp文件夹作为临时文件，然后从release-temp
		的文件加上md5版本号，最后删除临时文件
		*/
		del(['public/release-temp/'], function (err, paths) {
			if(err) console.log(err);
		});
	});
};

/*
	打包单个模块，gulp命令：
		gulp release --name module-test/main --exclude zepto,mClone --md5
	*/

gulp.task('release', ['rjs', 'less'], function(cb){
	if(!options.md5) return;
	gulp.src([baseTempPath + name[0] +'/**/*.{js,css}'])
		.pipe(rename(function (path) {
			path.basename += "-" + options.md5;
		}))
		.pipe(rev())
		.pipe(gulp.dest(baseBuildPath  + name[0]))
	//manifest
	//.pipe(rev.manifest())
	//.pipe(gulp.dest(baseBuildPath))
	.pipe(rmOrig())
});

gulp.task('release-all', ['rjs-all', 'less-all'], function() {
	if(!options.md5) return;
	gulp.src([baseTempPath + '**/*.{js,css}'])
		.pipe(rename(function (path) {
			path.basename += "-" + options.md5;
		}))
		.pipe(rev())
		.pipe(gulp.dest(baseBuildPath))
		.pipe(rmOrig())
});



