(function () {
    'use strict';

    var srcDir = "./app",
        buildDir = "./dist";

    module.exports = {
        srcDir: srcDir,
        cssDir: srcDir +"/css/*.css",
        jsDir: srcDir +"/js/*.js",
        imgDir: srcDir +"/img/**/*",
        fontDir: srcDir +"/fonts/",
        htmlDir: srcDir +"/*.html",
        bowerDir: srcDir +"/bower",
        allSrcFilesPatt: srcDir +"/**/*",
        fontsPatt: ["*.eot","*.svg","*.ttf","*.woff","*.woff2"],
        extrasPatt: [srcDir +"/*.*", "!"+ srcDir +"/*.html"],
        allBuildFilesPatt: buildDir +"/**/*",
        buildDir: buildDir,
        buildCssDir: buildDir +"/css/",
        buildJsDir: buildDir +"/js/",
        buildImgDir: buildDir +"/img/",
        buildFontDir: buildDir +"/fonts/",
        buildDelDir: [buildDir +"/**"]
    };
}());