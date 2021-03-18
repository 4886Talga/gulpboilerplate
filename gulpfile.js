const { src, dest, watch, parallel } = require("gulp");
const sass = require('gulp-sass');
const sync = require("browser-sync").create();

function generateCSS(cb) {
    src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./dist/css'))
        .pipe(sync.stream());
    cb();
}

function watchFiles(cb) {
    watch('./src/sass/**.scss', generateCSS);
    watch("./*.html");
}

function browserSync(cb) {
    sync.init({
        server: {
            baseDir: "./"
        }
    });
    watch('./src/sass/**.scss', generateCSS);
    watch("./*.html").on('change', sync.reload);
}

exports.css = generateCSS;
exports.watch = watchFiles;
exports.sync = browserSync;
exports.default = parallel(browserSync,watchFiles,generateCSS);

