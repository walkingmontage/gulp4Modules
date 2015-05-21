var
	gulp = require('gulp'),
	path = require('path'),
	gulpif = require('gulp-if'),
	gutil = require('gulp-util'),
	through = require('through2'),
	argv = require('yargs').argv,
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
	name = argv.n || '',
	exclude = argv.e || '',
	md5 = typeof argv.m === 'boolean' ? false : argv.m,
	product = argv.p || 'demo', //product 业务模块
	moduleName = name.split('/')[0],
	fileName = name.split('/')[1],
	gulpCommand = argv._[0];


if(gulpCommand === 'release' && (!name || !moduleName || !fileName)){
	log(colors.red('请补充 -n 参数，指定模块名称!'));
	return;
}


var
	basePath = 'public/src/',
	baseDevPath = 'public/src/' + product + '/',
	baseTempPath = 'public/release-temp/' + product + '/',
	baseBuildPath = 'public/release/' + product + '/',


	isModuleExists = function(fsName, type, all){
		if(!fs.existsSync(fsName)){
			log(colors.red('没有找到该目录的'+ type +'文件：'), fsName);
			return false;
		}
		return true;
	};

//使用r.js打包单个文件，如打包 module-test/main.js
gulp.task('rjs', function(cb){
	if(!isModuleExists(baseDevPath + name + '.js', 'js')){
		return;
	}
	var outpath = baseTempPath + name + '.js';

	var command =
		'r.js -o '+ basePath +'rjs-config-s.js name='+
		fileName +
		' baseUrl='+ baseDevPath +
		moduleName +
		' out=' + outpath +
		(exclude ? (' exclude=' + exclude) : '');

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
	if(!isModuleExists(baseDevPath + moduleName, 'less')){
		return;
	}

	gulp.src(baseDevPath + moduleName + '/**/*.less')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest(baseTempPath + moduleName));
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



/***************** 发布命令 ****************/

// 打包单个模块，gulp命令：
// gulp release -n module-test/main

gulp.task('release', ['rjs', 'less'], function(cb){
	gulp.src([baseTempPath + moduleName +'/**/*.{js,css}'])
		.pipe(gulpif(!!md5, rename(function (path) {
			path.basename += "-" + md5;
		})))
		.pipe(rev())
		.pipe(gulp.dest(baseBuildPath  + moduleName))

		//manifest
		//.pipe(rev.manifest())
		//.pipe(gulp.dest(baseBuildPath))
	.pipe(rmOrig())
});


// 打包文件夹，gulp命令：
// gulp release-all

gulp.task('release-all', ['rjs-all', 'less-all'], function() {

	//{js,css} node-glob语法，逗号后不能有空格
	gulp.src([baseTempPath + '**/*.{js,css}'])

		//gulpif 第一个参数 只能接受boolean类型
		.pipe(gulpif(!!md5, rename(function (path) {
			path.basename += "-" + md5;
		})))
		.pipe(rev())
		.pipe(gulp.dest(baseBuildPath))
		.pipe(rmOrig())
});



