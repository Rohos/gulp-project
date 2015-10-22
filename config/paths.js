(function () {
    'use strict';

    var baseDir = "./app",
        distBaseDir = "./dist";

    module.exports = {
        baseDir: baseDir,
        cssDir: baseDir +"/css/*.css",
        jsDir: baseDir +"/js/*.js",
        htmlDir: baseDir +"/*.html",
        distDir: distBaseDir,
        distCssDir: distBaseDir +"/css/",
        distJsDir: distBaseDir +"/js/",
        distDelDir: [distBaseDir +"/**", "!"+ distBaseDir]
    };
}());