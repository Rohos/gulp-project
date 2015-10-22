var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    runSequence = require("run-sequence"),
    _paths = require("./config/paths.js");

// Run server
gulp.task("server", function () {
    return browserSync.init({
        notify: false,
        server: { baseDir: _paths.baseDir }
    });
});

// Watch by CSS
gulp.task("w-css", function () {
    return gulp.watch(_paths.cssDir)
                .on("change", browserSync.reload);
});

// Watch by JS
gulp.task("w-js", function () {
    return gulp.watch(_paths.jsDir)
                .on("change", browserSync.reload);
});

// Watch by HTML
gulp.task("w-html", function () {
    return gulp.watch(_paths.htmlDir)
                .on("change", browserSync.reload);
});

// Default task
gulp.task("default", function (cb) {
    runSequence("server",
        ["w-css", "w-js", "w-html"],
        cb
    );
});