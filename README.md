# gulp-file-ready
Gulp plugin to wait until writing to the file is over. (ファイルの更新が完了するまで待機させるGulpプラグイン)

## install
```bash
npm install --save-dev gulp-file-ready
```

## Example
gulpfile.js
```javascript
var gulp  = require("gulp");
var ready = require("gulp-file-ready");

gulp.task('default',function(){
	return gulp.src(['tool/large.txt'])
		.pipe(ready())
		.pipe(gulp.dest('dist/'));
});
```

## API
### ready(option)
#### option
specify msec. default is 1000ms.
```javascript
	return gulp.src(['tool/large.txt'])
		.pipe(ready(100))  //100msec
		.pipe(gulp.dest('dist/'));
```

## Test
Please start this Program(need Bash, and md5 command). This program is write too long random string.
```bash
$ cd yourdirectory
$ tool/makeLargeFile.sh
0
1
2
3
:
:
```

Launch a new Terminal and run `gulp` .If the file has been updated it will not proceed.If you stop `tool/makeLargeFile.sh`, Gulp will proceed to the next process

```bash
$ cd yourdirectory
$ gulp
[18:38:17] Using gulpfile /Develop/gulp-file-ready/gulpfile.js
[18:38:17] Starting 'default'...
```

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)
