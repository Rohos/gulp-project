(function () {
    'use strict';

    var distBaseDir = "./dist";

    module.exports = {
        host: "host", 
        user: "user",
        password: "password",
        folder: "folder",
        src: [distBaseDir +"/**/*"],
        base: distBaseDir,
    };
}());