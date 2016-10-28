var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    del = require("del"),
    gutil = require("gulp-util"),
    cleanCss = require("gulp-clean-css"),
    concatCss = require("gulp-concat-css"),
    rename = require("gulp-rename"),
    gulpif = require("gulp-if"),
    uglify = require("gulp-uglify"),
    imagemin = require("gulp-imagemin"),
    autoprefixer = require("gulp-autoprefixer"),
    filter = require("gulp-filter"),
    ftp = require("vinyl-ftp"),
    wiredep = require("wiredep").stream,
    useref = require("gulp-useref"),
    size = require("gulp-size"),
    runSequence = require('run-sequence'),
    RS_CONF = {
        ftp: require("./config/ftp-data.js"),
        path: require("./config/paths.js")
    };

/************************************
***************** APP ***************
*************************************/
// Run server
gulp.task("server", function () {
    return browserSync.init({
        notify: false,
        server: { baseDir: RS_CONF.path.srcDir }
    });
});

// Watch by CSS
gulp.task("w-css", function () {
    return gulp.watch(RS_CONF.path.cssDir)
                .on("change", browserSync.reload);
});

// Watch by JS
gulp.task("w-js", function () {
    return gulp.watch(RS_CONF.path.jsDir)
                .on("change", browserSync.reload);
});

// Watch by HTML
gulp.task("w-html", function () {
    return gulp.watch(RS_CONF.path.htmlDir)
                .on("change", browserSync.reload);
});

// Default task
gulp.task('watch', ["w-css", "w-js", "w-html"]);
gulp.task('default', ['watch', 'server']);

/************************************
***************** DIST ***************
*************************************/

// Запускаем локальный сервер для DIST
gulp.task("build-server", function () {
    return browserSync.init({
        notify: false,
        port: 2000,
        server: { baseDir: RS_CONF.path.buildDir }
    });
});

// Очищаем директорию DIST
gulp.task("build-clean", function () {
    return del(RS_CONF.path.buildDelDir);
});

// Перенос основных файлов с кодом
gulp.task("useref", function () {
    var assets = useref.assets();
    return gulp.src(RS_CONF.path.htmlDir)
        .pipe(assets)
        .pipe(gulpif("*.js", uglify()))
        .pipe(gulpif("*.css", cleanCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(RS_CONF.path.buildDir));
});

// Перенос шрифтов
gulp.task("build-fonts", function() {
    return gulp.src(RS_CONF.path.fontDir +"*")
        .pipe(filter(RS_CONF.path.fontsPatt))
        .pipe(gulp.dest(RS_CONF.path.buildFontDir))
});
// Перенос остальных файлов (favicon и т.д.)
gulp.task("build-extras", function () {
    return gulp.src(RS_CONF.path.extrasPatt)
            .pipe(gulp.dest(RS_CONF.path.buildDir));
});
// Перенос картинок
gulp.task("build-images", function () {
    return gulp.src(RS_CONF.path.imgDir)
            .pipe(imagemin({
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(RS_CONF.path.buildImgDir));
});

gulp.task('dist', ["build-images", "build-fonts", "build-extras", "useref"]);
gulp.task('build', ["build-clean"], function () {
    return gulp.start("dist");
});
// Отправка проекта на сервер
gulp.task("deploy", function() {
    var conn = ftp.create({
                    host: RS_CONF.ftp.host, 
                    user: RS_CONF.ftp.user,
                    password: RS_CONF.ftp.password,
                    parallel: 10,
                    log: gutil.log
        });

    return gulp.src(RS_CONF.ftp.src, { base: RS_CONF.ftp.base, buffer: false})
                .pipe(conn.dest(RS_CONF.ftp.folder));
});